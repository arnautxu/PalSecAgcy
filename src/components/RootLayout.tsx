import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import { BottomNav } from "./BottomNav"
import { ErrorBoundary } from "./ErrorBoundary"
import { isLang } from "@/i18n/lang"

// Page transition: blur/fade + subtle depth
const warp = {
  initial: {
    opacity: 0,
    y: 14,
    scale: 0.985,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 1.01,
    filter: "blur(6px)",
  },
}

export function RootLayout() {
  const location = useLocation()
  const pathnameSegs = location.pathname.split("/").filter(Boolean)
  const restPath = isLang(pathnameSegs[0]) ? `/${pathnameSegs.slice(1).join("/")}` : location.pathname
  const navOnTop =
    restPath === "/projects" ||
    restPath === "/services" ||
    restPath === "/about-us" ||
    restPath.startsWith("/project/")

  return (
    <div className="relative h-full w-full overflow-hidden bg-page">
      {/* Skip link — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded focus:bg-[#ff1a1a] focus:px-3 focus:py-2 focus:text-nav focus:uppercase focus:tracking-nav focus:text-white"
      >
        Skip to main content
      </a>

      <LayoutGroup>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={location.key ?? location.pathname}
            variants={warp}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
            style={{ willChange: "filter, transform, opacity" }}
          >
            <ErrorBoundary>
              <div id="main-content" className="h-full">
                <Outlet />
              </div>
            </ErrorBoundary>
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
