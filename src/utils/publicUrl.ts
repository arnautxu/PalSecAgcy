export function publicUrl(path: string): string {
  // Absolute URLs (picsum, etc.)
  if (/^https?:\/\//i.test(path)) return path

  const base = import.meta.env.BASE_URL || "/"
  const baseNorm = base.endsWith("/") ? base : `${base}/`
  const rel = path.startsWith("/") ? path.slice(1) : path
  return `${baseNorm}${rel}`
}

