import { AnimatePresence, motion } from "framer-motion"
import { Outlet, useLocation } from "react-router-dom"
import { BottomNav } from "./BottomNav"

export function RootLayout() {
  const location = useLocation()

  return (
    <div className="relative h-full w-full overflow-hidden bg-page">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.55, ease: [0.4, 0.24, 0.4, 1] }}
          className="absolute inset-0 overflow-hidden"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <BottomNav />
    </div>
  )
}
