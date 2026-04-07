import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [overWhiteZone, setOverWhiteZone] = useState(false)
  const red = "#ff0000"
  const color = overWhiteZone ? "#ffffff" : red

  const dotX = useSpring(0, { stiffness: 900, damping: 45, mass: 0.2 })
  const dotY = useSpring(0, { stiffness: 900, damping: 45, mass: 0.2 })

  // ring follows with more delay
  const ringX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.9 })
  const ringY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.9 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setVisible(true)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      setOverWhiteZone(!!el?.closest?.('[data-cursor="white"]'))
    }

    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move, { passive: true })
    window.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseleave", leave)
    }
  }, [dotX, dotY, ringX, ringY])

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      <motion.div
        className="absolute"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div
          className="h-[9px] w-[9px] rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 0.9 : 0,
        }}
      >
        <div
          className="h-[26px] w-[26px] rounded-full border"
          style={{
            borderColor: color,
          }}
        />
      </motion.div>
    </div>
  )
}

