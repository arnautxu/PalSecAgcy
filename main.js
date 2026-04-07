const projects = [
  {
    title: "Project One",
    description: "One-line problem + one-line result. What did you improve or ship?",
    tags: ["React", "TypeScript", "API"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/" },
    ],
  },
  {
    title: "Project Two",
    description: "Keep it concrete: performance, UX, automation, reliability, or growth impact.",
    tags: ["Node.js", "Postgres", "CI"],
    links: [{ label: "Case study", href: "https://example.com" }],
  },
  {
    title: "Project Three",
    description: "What’s interesting here? A hard constraint, a clever trade-off, or a new skill.",
    tags: ["Design system", "Accessibility"],
    links: [{ label: "Write-up", href: "https://example.com" }],
  },
]

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v)
    else node.setAttribute(k, v)
  }
  for (const child of children) {
    node.append(child)
  }
  return node
}

function renderProjects() {
  const grid = document.getElementById("project-grid")
  if (!grid) return

  grid.innerHTML = ""

  for (const p of projects) {
    const tags = el(
      "ul",
      { class: "chips", "aria-label": `Tech used in ${p.title}` },
      p.tags.map((t) => el("li", {}, [t])),
    )

    const links = el(
      "div",
      { class: "project-links" },
      (p.links || []).map((l) =>
        el("a", { href: l.href, target: "_blank", rel: "noreferrer" }, [l.label]),
      ),
    )

    const card = el("article", { class: "panel project-card" }, [
      el("h3", {}, [p.title]),
      el("p", { class: "muted" }, [p.description]),
      el("div", { class: "project-meta" }, [tags, links]),
    ])

    grid.append(card)
  }
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle")
  const links = document.getElementById("nav-links")
  if (!(toggle instanceof HTMLButtonElement) || !(links instanceof HTMLElement)) return

  function setOpen(next) {
    links.classList.toggle("is-open", next)
    toggle.setAttribute("aria-expanded", String(next))
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains("is-open")
    setOpen(!isOpen)
  })

  links.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) setOpen(false)
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false)
  })
}

function setupContactForm() {
  const form = document.getElementById("contact-form")
  const note = document.getElementById("form-note")
  if (!(form instanceof HTMLFormElement) || !(note instanceof HTMLElement)) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    note.textContent = "Thanks! Hook this up to Formspree / Netlify Forms / your backend when ready."
  })
}

function setYear() {
  const year = document.getElementById("year")
  if (year) year.textContent = String(new Date().getFullYear())
}

renderProjects()
setupNav()
setupContactForm()
setYear()

