import { motion } from "framer-motion"
import { NavLink } from "react-router-dom"

function Sep() {
  return (
    <span className="mx-[6px] text-white/60">·</span>
  )
}

export function BottomNav() {
  const linkClass = (active: boolean) =>
    [
      "text-nav uppercase tracking-nav transition-[opacity,color] duration-200",
      "text-white hover:text-ink hover:opacity-100",
      active ? "opacity-70" : "opacity-100",
    ].join(" ")

  return (
    <motion.nav
      layoutId="nav-pill"
      className={[
        "pointer-events-auto",
        "text-nav uppercase tracking-nav",
        "flex items-center justify-center",
        "px-4 py-[10px]",
        "border",
        "backdrop-blur-[10px]",
        "rounded-full",
        "bg-[#ff0000]/90 border-white/20",
      ].join(" ")}
      aria-label="Primary"
      transition={{ duration: 0.55, ease: [0.4, 0.24, 0.4, 1] }}
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
        <Sep />
        <NavLink to="/services" className={({ isActive }) => linkClass(isActive)}>
          SERVICES
        </NavLink>
        <Sep />
        <NavLink to="/projects" className={({ isActive }) => linkClass(isActive)}>
          PROJECTS
        </NavLink>
        <Sep />
        <NavLink to="/about-us" className={({ isActive }) => linkClass(isActive)}>
          ABOUT US
        </NavLink>
        <Sep />

        <motion.a
          href="mailto:info@palsec.agency?subject=PARLEM%20DEL%20TEU%20PROJECTE%3F"
          className={[
            "ml-[2px] inline-flex items-center",
            "rounded-full border px-3 py-[6px]",
            "text-nav uppercase tracking-nav",
            "transition-[opacity,color,background-color,border-color] duration-200",
            "border-white/35 bg-white/10 text-white hover:text-ink",
          ].join(" ")}
          initial={false}
          animate={{
            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          aria-label="Parlem del teu projecte? Escriu-nos a info@palsec.agency"
        >
          PARLEM DEL TEU PROJECTE?
        </motion.a>
    </motion.nav>
  )
}
