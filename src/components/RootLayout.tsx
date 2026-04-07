import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import { BottomNav } from "./BottomNav"
import { CustomCursor } from "./CustomCursor"

const warp = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    transform: "perspective(1200px) translateZ(-120px) scale(0.96) rotateY(10deg)",
    clipPath: "circle(0% at 50% 50%)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transform: "perspective(1200px) translateZ(0px) scale(1) rotateY(0deg)",
    clipPath: "circle(160% at 50% 50%)",
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    transform: "perspective(1200px) translateZ(-160px) scale(0.98) rotateY(-10deg)",
    clipPath: "circle(0% at 50% 50%)",
  },
}

export function RootLayout() {
  const location = useLocation()
  const navOnTop =
    location.pathname === "/projects" ||
    location.pathname === "/services" ||
    location.pathname === "/about-us" ||
    location.pathname.startsWith("/project/")

  return (
    <div className="relative h-full w-full overflow-hidden bg-page">
      <CustomCursor />
      <LayoutGroup>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={warp}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.4, 0.24, 0.4, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        {/* NAV: same component everywhere, animates position */}
        <div className="pointer-events-none fixed inset-0 z-50">
          <div
            className={[
              "pointer-events-none mx-auto flex w-full max-w-[1200px] px-6",
              navOnTop ? "pt-5 justify-center" : "h-full items-end justify-center pb-[18px]",
            ].join(" ")}
          >
            <div className="pointer-events-auto">
              <BottomNav />
            </div>
          </div>
        </div>
      </LayoutGroup>
    </div>
  )
}
