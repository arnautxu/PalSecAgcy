import { NavLink, useLocation } from "react-router-dom"

function Sep({ dark }: { dark: boolean }) {
  return (
    <span className={`mx-[6px] ${dark ? "text-white/50" : "text-ink/50"}`}>·</span>
  )
}

export function BottomNav() {
  const location = useLocation()
  const dark = location.pathname === "/"

  const linkClass = (active: boolean) =>
    [
      "text-nav uppercase tracking-nav transition-[opacity,color] duration-200",
      dark
        ? "text-white hover:text-[#ff1a1a] hover:opacity-100"
        : "text-ink hover:opacity-40",
      active ? "opacity-40" : "opacity-100",
    ].join(" ")

  return (
    <nav
      className={[
        "pointer-events-auto fixed bottom-0 left-1/2 z-50 -translate-x-1/2 pb-[18px]",
        "text-nav uppercase tracking-nav",
      ].join(" ")}
      aria-label="Primary"
    >
      <div
        className={[
          "flex items-center justify-center",
          "px-4 py-[10px]",
          "border",
          "backdrop-blur-[10px]",
          "rounded-full",
          dark
            ? "bg-black/35 border-white/20"
            : "bg-[#f5e6e2]/85 border-[#f5e6e2]",
        ].join(" ")}
      >
        <NavLink
          to="/"
          className={[
            "mr-[10px] inline-flex items-center hover:opacity-100",
            linkClass(false),
          ].join(" ")}
          aria-label="PALSEC AGCY HOME"
        >
          PALSEC AGCY
        </NavLink>
        <Sep dark={dark} />
        <NavLink to="/services" className={({ isActive }) => linkClass(isActive)}>
          SERVICES
        </NavLink>
        <Sep dark={dark} />
        <NavLink to="/projects" className={({ isActive }) => linkClass(isActive)}>
          PROJECTS
        </NavLink>
        <Sep dark={dark} />
        <NavLink to="/about-us" className={({ isActive }) => linkClass(isActive)}>
          ABOUT US
        </NavLink>
      </div>
    </nav>
  )
}
