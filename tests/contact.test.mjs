import assert from 'node:assert/strict'
import test from 'node:test'
import { createContactHandler } from '../api/contact.js'

const FIXED_NOW = Date.parse('2026-09-22T12:00:00Z')
const FIRST_REQUEST_ID = '00000000-0000-4000-8000-000000000001'
const SECOND_REQUEST_ID = '00000000-0000-4000-8000-000000000002'
const TEST_ENV = {
  RESEND_API_KEY: 'test-key-never-used-on-network',
  CONTACT_FROM: 'Website <website@example.test>',
  CONTACT_TO: 'owner@example.test',
}

function validBody(overrides = {}, currentTime = FIXED_NOW) {
  return {
    name: 'Visitant de prova',
    email: 'visitor@example.test',
    brand: 'Marca de prova',
    website: 'https://example.test',
    message: 'Volem definir una web a mida per al nostre projecte.',
    service: 'web',
    lang: 'ca',
    intent: 'quote',
    requestId: FIRST_REQUEST_ID,
    company_url: '',
    startedAt: currentTime - 10_000,
    ...overrides,
  }
}

function harness({ env = TEST_ENV, provider } = {}) {
  let currentTime = FIXED_NOW
  const calls = []
  // Every handler receives this stub explicitly. No test uses real fetch or sends mail.
  const fetcher = async (url, options) => {
    calls.push({ url, options })
    if (provider) return provider(url, options, calls.length)
    return { ok: true, json: async () => ({ id: 'provider-message-id' }) }
  }
  const handler = createContactHandler({ env: { ...env }, fetcher, now: () => currentTime })
  return {
    calls,
    advance(milliseconds) { currentTime += milliseconds },
    async submit({ method = 'POST', body = validBody({}, currentTime), headers = {}, ip = '192.0.2.10' } = {}) {
      const response = {
        statusCode: 200,
        headers: {},
        body: undefined,
        setHeader(name, value) { this.headers[name.toLowerCase()] = value },
        status(code) { this.statusCode = code; return this },
        json(value) { this.body = value; return this },
      }
      await handler({
        method,
        headers: { origin: 'https://palsec.agency', 'content-type': 'application/json', ...headers },
        body,
        socket: { remoteAddress: ip },
      }, response)
      assert.equal(response.headers['cache-control'], 'no-store')
      assert.equal(response.headers['x-content-type-options'], 'nosniff')
      return response
    },
  }
}

function assertFailure(response, status, code) {
  assert.equal(response.statusCode, status)
  assert.deepEqual(response.body, { ok: false, code })
}

test('delivers to the configured recipient and uses the visitor only as reply_to', async () => {
  const app = harness()
  const response = await app.submit({ body: validBody({
    name: '  Visitant de prova  ',
    email: '  visitor@example.test  ',
    to: 'attacker@example.test',
    from: 'attacker@example.test',
    reply_to: 'attacker@example.test',
    subject: 'Visitor-controlled subject',
  }) })
  assert.equal(response.statusCode, 200)
  assert.deepEqual(response.body, { ok: true, id: 'provider-message-id' })
  assert.equal(app.calls.length, 1)
  const { url, options } = app.calls[0]
  assert.equal(url, 'https://api.resend.com/emails')
  assert.equal(options.method, 'POST')
  assert.equal(options.headers.Authorization, `Bearer ${TEST_ENV.RESEND_API_KEY}`)
  assert.equal(options.headers['Content-Type'], 'application/json')
  assert.equal(options.headers['Idempotency-Key'], `palsec-contact/${FIRST_REQUEST_ID}`)
  assert.ok(options.signal instanceof AbortSignal)
  assert.equal(options.signal.aborted, false)
  const mail = JSON.parse(options.body)
  assert.equal(mail.from, TEST_ENV.CONTACT_FROM)
  assert.deepEqual(mail.to, [TEST_ENV.CONTACT_TO])
  assert.equal(mail.reply_to, 'visitor@example.test')
  assert.equal(mail.subject, 'PALSEC · Web a mida')
  assert.match(mail.text, /Nom: Visitant de prova\n/)
  assert.match(mail.text, /Empresa o marca: Marca de prova\n/)
  assert.match(mail.text, /Web o perfil: https:\/\/example\.test\n/)
  assert.match(mail.text, /Volem definir una web a mida/)
  assert.equal(mail.html, undefined)
})

test('accepts the audit enquiry without requiring a quote message or optional brand details', async () => {
  const app = harness()
  const response = await app.submit({ body: validBody({ intent: 'audit', service: 'audit', message: '', brand: '', website: '' }) })
  assert.equal(response.statusCode, 200)
  const mail = JSON.parse(app.calls[0].options.body)
  assert.equal(mail.subject, 'PALSEC · Auditoria de marca gratuïta')
  assert.match(mail.text, /Empresa o marca: No indicat/)
  assert.match(mail.text, /Context:\nNo indicat$/)
})

test('rejects unsupported methods without reaching the provider', async (t) => {
  for (const method of ['GET', 'PUT', 'OPTIONS']) {
    await t.test(method, async () => {
      const app = harness()
      const response = await app.submit({ method })
      assertFailure(response, 405, 'method')
      assert.equal(response.headers.allow, 'POST')
      assert.equal(app.calls.length, 0)
    })
  }
})

test('accepts both production origins and the explicitly configured preview origin', async (t) => {
  for (const origin of ['https://palsec.agency', 'https://www.palsec.agency', 'https://palsec-preview.vercel.app']) {
    await t.test(origin, async () => {
      const app = harness({ env: { ...TEST_ENV, VERCEL_URL: 'palsec-preview.vercel.app' } })
      assert.equal((await app.submit({ headers: { origin } })).statusCode, 200)
      assert.equal(app.calls.length, 1)
    })
  }
})

test('rejects absent, insecure, unrelated and lookalike origins', async (t) => {
  for (const origin of [undefined, 'null', 'http://palsec.agency', 'https://example.test', 'https://palsec.agency.example.test', 'https://unconfigured.vercel.app']) {
    await t.test(String(origin), async () => {
      const app = harness()
      assertFailure(await app.submit({ headers: { origin } }), 403, 'origin')
      assert.equal(app.calls.length, 0)
    })
  }
})

test('requires the application/json media type while allowing charset parameters', async (t) => {
  for (const contentType of ['application/json; charset=utf-8', 'Application/JSON; Charset=UTF-8']) {
    await t.test(`accepts ${contentType}`, async () => {
      const app = harness()
      assert.equal((await app.submit({ headers: { 'content-type': contentType } })).statusCode, 200)
    })
  }
  for (const contentType of [undefined, 'text/plain', 'application/x-www-form-urlencoded', 'application/jsonp', 'application/json-patch+json']) {
    await t.test(`rejects ${String(contentType)}`, async () => {
      const app = harness()
      assertFailure(await app.submit({ headers: { 'content-type': contentType } }), 415, 'content_type')
      assert.equal(app.calls.length, 0)
    })
  }
})

test('parses valid JSON strings and rejects malformed or non-object bodies', async (t) => {
  const app = harness()
  assert.equal((await app.submit({ body: JSON.stringify(validBody()) })).statusCode, 200)
  for (const body of ['{broken', 'null', '[]', '42', null, []]) {
    await t.test(`rejects ${JSON.stringify(body)}`, async () => {
      const invalidApp = harness()
      assertFailure(await invalidApp.submit({ body }), 400, 'invalid')
      assert.equal(invalidApp.calls.length, 0)
    })
  }
})

test('enforces payload size from either the header or actual UTF-8 body bytes', async (t) => {
  await t.test('declared payload size', async () => {
    const app = harness()
    assertFailure(await app.submit({ headers: { 'content-length': '12001' } }), 413, 'size')
    assert.equal(app.calls.length, 0)
  })
  await t.test('body exceeds the byte limit even with a small content-length header', async () => {
    const app = harness()
    assertFailure(await app.submit({ body: validBody({ message: '界'.repeat(4000) }), headers: { 'content-length': '100' } }), 413, 'size')
    assert.equal(app.calls.length, 0)
  })
})

test('validates fields before sending any email', async (t) => {
  const cases = [
    ['blank name', { name: '   ' }, 'invalid'],
    ['name header injection', { name: 'Visitor\r\nBcc: somebody@example.test' }, 'invalid'],
    ['overlong name', { name: 'x'.repeat(121) }, 'invalid'],
    ['invalid email', { email: 'visitor@example' }, 'invalid'],
    ['email newline', { email: 'visitor@example.test\nBcc: other@example.test' }, 'invalid'],
    ['non-string brand', { brand: {} }, 'invalid'],
    ['missing website field', { website: undefined }, 'invalid'],
    ['unknown service', { service: 'unexpected' }, 'invalid'],
    ['inherited property is not a service', { service: 'toString' }, 'invalid'],
    ['unknown language', { lang: 'fr' }, 'invalid'],
    ['unknown intent', { intent: 'send' }, 'invalid'],
    ['audit intent with unrelated service', { intent: 'audit', service: 'web' }, 'invalid'],
    ['quote message too short after trimming', { message: '   short   ' }, 'message'],
    ['overlong message', { message: 'x'.repeat(5001) }, 'invalid'],
    ['missing request id', { requestId: '' }, 'invalid'],
    ['malformed request id', { requestId: 'not-a-request-id' }, 'invalid'],
  ]
  for (const [name, overrides, code] of cases) {
    await t.test(name, async () => {
      const app = harness()
      assertFailure(await app.submit({ body: validBody(overrides) }), 400, code)
      assert.equal(app.calls.length, 0)
    })
  }
})

test('rejects the honeypot and invalid form timing without contacting the provider', async (t) => {
  const cases = [
    ['filled honeypot', { company_url: 'https://spam.example.test' }],
    ['missing honeypot', { company_url: undefined }],
    ['too fast', { startedAt: FIXED_NOW - 1499 }],
    ['future timestamp', { startedAt: FIXED_NOW + 1000 }],
    ['expired form', { startedAt: FIXED_NOW - 86_400_001 }],
    ['invalid timestamp', { startedAt: 'not-a-time' }],
    ['missing timestamp', { startedAt: undefined }],
  ]
  for (const [name, overrides] of cases) {
    await t.test(name, async () => {
      const app = harness()
      assertFailure(await app.submit({ body: validBody(overrides) }), 400, 'verification')
      assert.equal(app.calls.length, 0)
    })
  }
})

test('accepts form timing at both valid boundaries', async (t) => {
  for (const elapsed of [1500, 86_400_000]) {
    await t.test(`${elapsed}ms`, async () => {
      const app = harness()
      assert.equal((await app.submit({ body: validBody({ startedAt: FIXED_NOW - elapsed }) })).statusCode, 200)
    })
  }
})

test('missing mail configuration never produces a success or provider call', async (t) => {
  for (const missing of ['RESEND_API_KEY', 'CONTACT_FROM', 'CONTACT_TO']) {
    await t.test(missing, async () => {
      const env = { ...TEST_ENV }
      delete env[missing]
      const app = harness({ env })
      assertFailure(await app.submit(), 503, 'unavailable')
      assert.equal(app.calls.length, 0)
    })
  }
})

test('provider rejection, including an idempotency conflict, is never reported as delivered', async (t) => {
  for (const status of [400, 401, 409, 429, 500]) {
    await t.test(`provider ${status}`, async () => {
      const app = harness({ provider: async () => ({ ok: false, status, json: async () => ({ id: 'must-not-be-success' }) }) })
      assertFailure(await app.submit(), 502, 'delivery')
    })
  }
})

test('a provider response must contain a non-empty message id', async (t) => {
  for (const receipt of [{}, { id: 123 }, { id: '' }, { id: '   ' }]) {
    await t.test(JSON.stringify(receipt), async () => {
      const app = harness({ provider: async () => ({ ok: true, json: async () => receipt }) })
      assertFailure(await app.submit(), 502, 'delivery')
    })
  }
})

test('network, timeout and unreadable provider responses fail without exposing internal error details', async (t) => {
  const providers = [
    ['network', async () => { throw new Error('private-network-error') }],
    ['timeout', async () => { throw new DOMException('private-timeout-error', 'TimeoutError') }],
    ['invalid provider JSON', async () => ({ ok: true, json: async () => { throw new SyntaxError('private-json-error') } })],
  ]
  for (const [name, provider] of providers) {
    await t.test(name, async () => {
      const app = harness({ provider })
      assertFailure(await app.submit(), 503, 'delivery')
    })
  }
})

test('allows five attempts per IP, blocks the sixth, and permits another IP', async () => {
  const app = harness()
  for (let index = 0; index < 5; index++) assert.equal((await app.submit()).statusCode, 200)
  const blocked = await app.submit()
  assertFailure(blocked, 429, 'rate_limit')
  assert.equal(blocked.headers['retry-after'], '600')
  assert.equal(app.calls.length, 5)
  assert.equal((await app.submit({ ip: '192.0.2.11' })).statusCode, 200)
  assert.equal(app.calls.length, 6)
})

test('rate limiting uses the trusted Vercel address before other IP sources', async () => {
  const app = harness()
  for (let index = 0; index < 5; index++) {
    const response = await app.submit({ headers: { 'x-vercel-forwarded-for': '192.0.2.100, 192.0.2.200', 'x-forwarded-for': `198.51.100.${index}` }, ip: `203.0.113.${index}` })
    assert.equal(response.statusCode, 200)
  }
  assertFailure(await app.submit({ headers: { 'x-vercel-forwarded-for': '192.0.2.100', 'x-forwarded-for': '198.51.100.99' }, ip: '203.0.113.99' }), 429, 'rate_limit')
  assert.equal(app.calls.length, 5)
})

test('the rate-limit window expires and Retry-After decreases with elapsed time', async () => {
  const app = harness()
  for (let index = 0; index < 5; index++) await app.submit()
  app.advance(30_000)
  const blocked = await app.submit()
  assertFailure(blocked, 429, 'rate_limit')
  assert.equal(blocked.headers['retry-after'], '570')
  app.advance(570_000)
  assert.equal((await app.submit()).statusCode, 200)
  assert.equal(app.calls.length, 6)
})

test('provider failures still count toward the five-attempt guard', async () => {
  const app = harness({ provider: async () => ({ ok: false }) })
  for (let index = 0; index < 5; index++) assertFailure(await app.submit(), 502, 'delivery')
  assertFailure(await app.submit(), 429, 'rate_limit')
  assert.equal(app.calls.length, 5)
})

test('invalid submissions do not consume the valid submission allowance', async () => {
  const app = harness()
  for (let index = 0; index < 6; index++) assertFailure(await app.submit({ body: validBody({ name: '' }) }), 400, 'invalid')
  for (let index = 0; index < 5; index++) assert.equal((await app.submit()).statusCode, 200)
  assert.equal(app.calls.length, 5)
})

test('retries preserve the provider idempotency key and payload after an uncertain response', async () => {
  const app = harness({ provider: async (_url, _options, callNumber) => {
    if (callNumber === 1) throw new Error('Response lost after the provider may have accepted the message')
    return { ok: true, json: async () => ({ id: 'retried-message-id' }) }
  } })
  const body = validBody()
  assertFailure(await app.submit({ body }), 503, 'delivery')
  assert.deepEqual((await app.submit({ body })).body, { ok: true, id: 'retried-message-id' })
  assert.equal(app.calls.length, 2)
  assert.equal(app.calls[0].options.headers['Idempotency-Key'], app.calls[1].options.headers['Idempotency-Key'])
  assert.equal(app.calls[0].options.body, app.calls[1].options.body)
  assert.equal(app.calls[1].options.headers['Idempotency-Key'], `palsec-contact/${FIRST_REQUEST_ID}`)
  assert.equal((await app.submit({ body: validBody({ requestId: SECOND_REQUEST_ID }) })).statusCode, 200)
  assert.equal(app.calls[2].options.headers['Idempotency-Key'], `palsec-contact/${SECOND_REQUEST_ID}`)
  assert.notEqual(app.calls[1].options.headers['Idempotency-Key'], app.calls[2].options.headers['Idempotency-Key'])
})
