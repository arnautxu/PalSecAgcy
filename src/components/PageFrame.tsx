import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

/** White mat + 4px salmon frame, full area, hidden overflow */
export function PageFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`box-border h-full w-full overflow-hidden border-[4px] border-frame bg-white ${className}`}
    >
      {children}
    </div>
  )
}
