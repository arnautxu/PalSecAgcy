import { Link } from "react-router-dom"
import { useState } from "react"
import { INDEX_ROWS } from "@/data/projects"
import type { IndexRow } from "@/data/projects"

function Row({ row }: { row: IndexRow }) {
  const cells = (
    <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)_minmax(0,0.75fr)_minmax(0,0.35fr)_minmax(0,0.25fr)] gap-x-4 border-b border-white/10 py-[6px] text-nav uppercase tracking-nav text-white transition-[letter-spacing] duration-200 hover:tracking-[0.12em]">
      <span>{row.project}</span>
      <span>{row.direction}</span>
      <span>{row.client}</span>
      <span>{row.year}</span>
      <span className="text-right">{row.no}</span>
    </div>
  )

  if (row.slug) {
    return (
      <Link to={`/project/${row.slug}`} className="block">
        {cells}
      </Link>
    )
  }

  return <div>{cells}</div>
}

export function IndexPage() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        className={`hero-index absolute inset-0 h-full w-full ${paused ? "paused" : ""}`}
        aria-hidden
      />
      <button
        type="button"
        className="text-nav fixed bottom-[52px] left-6 z-[60] uppercase tracking-nav text-white/90 transition-opacity duration-200 hover:opacity-40"
        onClick={() => setPaused((p) => !p)}
      >
        PAUSE
      </button>

      <div className="pointer-events-none absolute bottom-[60px] right-10 z-[55] w-[min(92vw,720px)] text-nav uppercase tracking-nav">
        <div className="pointer-events-auto text-white">
          <div className="mb-2 grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)_minmax(0,0.75fr)_minmax(0,0.35fr)_minmax(0,0.25fr)] gap-x-4 border-b border-white/20 pb-2 opacity-50">
            <span>PROJECT</span>
            <span>DIRECTION</span>
            <span>CLIENT</span>
            <span>YEAR</span>
            <span className="text-right">NO.</span>
          </div>
          <div className="max-h-[min(52vh,420px)] overflow-y-auto">
            {INDEX_ROWS.map((row) => (
              <Row key={row.no} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
