import { NavLink, useLocation } from "react-router-dom"

function Sep({ dark }: { dark: boolean }) {
  return (
    <span className={`mx-[6px] ${dark ? "text-white/40" : "text-ink opacity-40"}`}>·</span>
  )
}

export function BottomNav() {
  const location = useLocation()
  const dark = location.pathname === "/" || location.pathname === "/index"

  const linkClass = (active: boolean) =>
    [
      "text-nav uppercase tracking-nav transition-opacity duration-200 hover:opacity-40",
      dark ? "text-white" : "text-ink",
      active ? "opacity-40" : "opacity-100",
    ].join(" ")

  return (
    <nav
      className="pointer-events-auto fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 items-center justify-center pb-[18px] text-nav uppercase tracking-nav"
      aria-label="Primary"
    >
      <NavLink to="/" className={({ isActive }) => linkClass(isActive)} end>
        THEON KALLISTRATOS
      </NavLink>
      <Sep dark={dark} />
      <NavLink to="/photography" className={({ isActive }) => linkClass(isActive)}>
        PHOTOGRAPHY
      </NavLink>
      <Sep dark={dark} />
      <NavLink to="/index" className={({ isActive }) => linkClass(isActive)}>
        INDEX
      </NavLink>
      <Sep dark={dark} />
      <NavLink to="/films" className={({ isActive }) => linkClass(isActive)}>
        FILMS
      </NavLink>
      <Sep dark={dark} />
      <NavLink to="/info" className={({ isActive }) => linkClass(isActive)}>
        INFO
      </NavLink>
    </nav>
  )
}
