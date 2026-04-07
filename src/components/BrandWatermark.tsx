type Props = {
  variant: "dark" | "light"
}

export function BrandWatermark({ variant }: Props) {
  const src =
    variant === "dark" ? "/brand/palsec-negative.png" : "/brand/palsec-positive.jpg"

  return (
    <div className="pointer-events-none absolute left-6 top-6 z-10 select-none">
      <img
        src={src}
        alt=""
        className="h-[18px] w-auto opacity-[0.08]"
        draggable={false}
      />
    </div>
  )
}

