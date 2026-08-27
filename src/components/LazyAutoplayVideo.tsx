import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react"

type LazyAutoplayVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay"> & {
  src: string
}

/**
 * Keeps autoplay thumbnails out of the initial network waterfall until they
 * are close to the viewport. Once activated, native video behaviour remains
 * unchanged, so the visible experience stays the same.
 */
export function LazyAutoplayVideo({ src, preload = "none", ...props }: LazyAutoplayVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)
  const poster = typeof props.poster === "string" && props.poster.startsWith("/")
    ? props.poster.replace(/\.(png|jpe?g)$/i, ".webp")
    : props.poster

  useEffect(() => {
    const element = ref.current
    if (!element || activated) return

    if (!("IntersectionObserver" in window)) {
      setActivated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setActivated(true)
        observer.disconnect()
      },
      { rootMargin: "240px 0px" },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [activated])

  return (
    <video
      ref={ref}
      src={activated ? src : undefined}
      autoPlay={activated}
      preload={preload}
      muted
      loop
      playsInline
      {...props}
      poster={poster}
    />
  )
}
