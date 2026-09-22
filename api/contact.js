import { createHash } from 'node:crypto'

const SERVICES = { branding: 'Branding', web: 'Web a mida', apps: 'Desenvolupament d’apps', audit: 'Auditoria de marca gratuïta', other: 'Projecte per definir' }
const MAX_BYTES = 12000
const WINDOW_MS = 10 * 60 * 1000

export function createContactHandler({ env = process.env, fetcher = fetch, now = Date.now } = {}) {
  // A small per-instance guard complements the honeypot and origin validation.
  const attempts = new Map()
  return async function contact(req, res) {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    const fail = (status, code) => res.status(status).json({ ok: false, code })
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return fail(405, 'method') }
    const origins = new Set(['https://www.palsec.agency', 'https://palsec.agency'])
    if (env.VERCEL_URL) origins.add(`https://${env.VERCEL_URL}`)
    if (!origins.has(req.headers.origin)) return fail(403, 'origin')
    if (String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase() !== 'application/json') return fail(415, 'content_type')
    if (Number(req.headers['content-length']) > MAX_BYTES) return fail(413, 'size')

    let body
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      if (!body || typeof body !== 'object' || Array.isArray(body)) return fail(400, 'invalid')
      if (Buffer.byteLength(JSON.stringify(body)) > MAX_BYTES) return fail(413, 'size')
    } catch { return fail(400, 'invalid') }
    const text = (key, max) => typeof body[key] === 'string' && body[key].length <= max ? body[key].trim() : null
    const name = text('name', 120), email = text('email', 254), brand = text('brand', 160), website = text('website', 500), message = text('message', 5000)
    const service = text('service', 20), lang = text('lang', 2), intent = text('intent', 5)
    const requestId = text('requestId', 36)
    if (!name || !email || !/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(email) || /[\r\n]/.test(name)) return fail(400, 'invalid')
    if (brand === null || website === null || message === null || !Object.hasOwn(SERVICES, service || '') || !['ca', 'es', 'en'].includes(lang) || !['audit', 'quote'].includes(intent)) return fail(400, 'invalid')
    if (intent === 'audit' && service !== 'audit') return fail(400, 'invalid')
    if (intent === 'quote' && message.length < 10) return fail(400, 'message')
    if (!requestId || !/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(requestId)) return fail(400, 'invalid')
    const elapsed = now() - Number(body.startedAt)
    if (body.company_url !== '' || !Number.isFinite(elapsed) || elapsed < 1500 || elapsed > 86400000) return fail(400, 'verification')

    const ip = String(req.headers['x-vercel-forwarded-for'] || req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
    const key = createHash('sha256').update(ip).digest('hex')
    for (const [entry, value] of attempts) if (value.until <= now()) attempts.delete(entry)
    const attempt = attempts.get(key) || { count: 0, until: now() + WINDOW_MS }
    if (attempt.count >= 5) { res.setHeader('Retry-After', String(Math.ceil((attempt.until - now()) / 1000))); return fail(429, 'rate_limit') }
    if (attempts.size >= 2000 && !attempts.has(key)) return fail(429, 'rate_limit')
    attempt.count += 1
    attempts.set(key, attempt)
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO) return fail(503, 'unavailable')

    const content = [
      `Nova sol·licitud des de palsec.agency`, '', `Tipus: ${SERVICES[service]}`, `Idioma: ${lang}`,
      `Nom: ${name}`, `Correu: ${email}`, `Empresa o marca: ${brand || 'No indicat'}`,
      `Web o perfil: ${website || 'No indicat'}`, '', 'Context:', message || 'No indicat',
    ].join('\n')
    try {
      const result = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `palsec-contact/${requestId}` },
        body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email, subject: `PALSEC · ${SERVICES[service]}`, text: content }),
        signal: AbortSignal.timeout(12000),
      })
      if (!result.ok) return fail(502, 'delivery')
      const receipt = await result.json()
      if (typeof receipt.id !== 'string' || !receipt.id.trim()) return fail(502, 'delivery')
      return res.status(200).json({ ok: true, id: receipt.id })
    } catch { return fail(503, 'delivery') }
  }
}

export default createContactHandler()
