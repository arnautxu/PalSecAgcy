import { useState } from "react"

export function Home() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        className={`hero-home absolute inset-0 h-full w-full ${paused ? "paused" : ""}`}
        aria-hidden
      />
      <button
        type="button"
        className="text-nav fixed bottom-[52px] left-6 z-[60] uppercase tracking-nav text-white/90 transition-opacity duration-200 hover:opacity-40"
        onClick={() => setPaused((p) => !p)}
      >
        PAUSE
      </button>
    </div>
  )
}
