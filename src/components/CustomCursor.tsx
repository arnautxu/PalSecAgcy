import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls, useSpring } from "framer-motion"

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [overWhiteZone, setOverWhiteZone] = useState(false)
  const [clicking, setClicking] = useState(false)
  const red = "#ff0000"
  const color = overWhiteZone ? "#ffffff" : red

  const dotX = useSpring(0, { stiffness: 900, damping: 45, mass: 0.2 })
  const dotY = useSpring(0, { stiffness: 900, damping: 45, mass: 0.2 })

  // ring follows with more delay
  const ringX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.9 })
  const ringY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.9 })
  const ringControls = useAnimationControls()
  const clickTimer = useRef<number | null>(null)
  const animatingClick = useRef(false)

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

  useEffect(() => {
    const onClick = async () => {
      if (animatingClick.current) return
      animatingClick.current = true

      setClicking(true)
      if (clickTimer.current != null) window.clearTimeout(clickTimer.current)

      await ringControls.start({ rotate: 0, scale: 1, transition: { duration: 0 } })
      await ringControls.start({
        rotate: 360,
        scale: 1.14,
        transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
      })
      await ringControls.start({
        rotate: 0,
        scale: 1,
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      })

      clickTimer.current = window.setTimeout(() => {
        setClicking(false)
        animatingClick.current = false
      }, 120)
    }

    window.addEventListener("mousedown", onClick, { passive: true })
    return () => {
      window.removeEventListener("mousedown", onClick)
      if (clickTimer.current != null) window.clearTimeout(clickTimer.current)
    }
  }, [ringControls])

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
        <motion.div animate={ringControls}>
          <div
            className="h-[26px] w-[26px] rounded-full border bg-transparent"
            style={{
              borderColor: color,
              borderStyle: clicking ? "dotted" : "solid",
              borderWidth: clicking ? 2 : 1,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

