export type ProjectSlug =
  | "dust-of-dawn"
  | "vory-mechanica"
  | "unfurnished-dreams"
  | "anima-in-transit"
  | "glass-haze"
  | "obsidian-garden"
  | "zero-meridian"
  | "flicker-motel"

export type Project = {
  slug: ProjectSlug
  title: string
  /** picsum seeds for main carousel stills */
  carouselSeeds: string[]
  /** seed for filmstrip thumb */
  thumbSeed: string
}

export const PROJECTS: Project[] = [
  {
    slug: "dust-of-dawn",
    title: "DUST OF DAWN",
    carouselSeeds: ["dd-main", "dd-2", "dd-3", "dd-4", "dd-5"],
    thumbSeed: "dd-strip",
  },
  {
    slug: "vory-mechanica",
    title: "VORY MECHANICA",
    carouselSeeds: ["vm-1", "vm-2", "vm-3", "vm-4"],
    thumbSeed: "vm-strip",
  },
  {
    slug: "unfurnished-dreams",
    title: "UNFURNISHED DREAMS",
    carouselSeeds: ["ud-1", "ud-2", "ud-3", "ud-4", "ud-5"],
    thumbSeed: "ud-strip",
  },
  {
    slug: "anima-in-transit",
    title: "ANIMA IN TRANSIT",
    carouselSeeds: ["ait-1", "ait-2", "ait-3"],
    thumbSeed: "ait-strip",
  },
  {
    slug: "glass-haze",
    title: "GLASS HAZE",
    carouselSeeds: ["gh-1", "gh-2", "gh-3", "gh-4"],
    thumbSeed: "gh-strip",
  },
  {
    slug: "obsidian-garden",
    title: "OBSIDIAN GARDEN",
    carouselSeeds: ["og-1", "og-2", "og-3", "og-4", "og-5"],
    thumbSeed: "og-strip",
  },
  {
    slug: "zero-meridian",
    title: "ZERO MERIDIAN",
    carouselSeeds: ["zm-1", "zm-2", "zm-3"],
    thumbSeed: "zm-strip",
  },
  {
    slug: "flicker-motel",
    title: "FLICKER MOTEL",
    carouselSeeds: ["fm-1", "fm-2", "fm-3", "fm-4"],
    thumbSeed: "fm-strip",
  },
]

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function picsum(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
}

/** Films list page order */
export const FILMS_ORDER: ProjectSlug[] = [
  "dust-of-dawn",
  "unfurnished-dreams",
  "glass-haze",
  "flicker-motel",
  "vory-mechanica",
  "anima-in-transit",
  "obsidian-garden",
  "zero-meridian",
]

export type IndexRow = {
  project: string
  direction: string
  client: string
  year: string
  no: string
  slug?: ProjectSlug
}

export const INDEX_ROWS: IndexRow[] = [
  {
    project: "DUST OF DAWN",
    direction: "DOCUMENTARY",
    client: "LAMODA",
    year: "2025",
    no: "001",
    slug: "dust-of-dawn",
  },
  {
    project: "VORY MECHANICA",
    direction: "SHORT FILMS",
    client: "BLUE ORIGINE",
    year: "2025",
    no: "002",
    slug: "vory-mechanica",
  },
  {
    project: "UNFURNISHED DREAMS",
    direction: "EXPERIMENTAL VIDEO",
    client: "PRISM ROOM",
    year: "2024",
    no: "003",
    slug: "unfurnished-dreams",
  },
  {
    project: "ANIMA IN TRANSIT",
    direction: "INSTALLATION",
    client: "GLASS HAZE",
    year: "2024",
    no: "004",
    slug: "anima-in-transit",
  },
  {
    project: "GLASS HAZE",
    direction: "VIDEO ESSAY",
    client: "VOID & VELVET",
    year: "2023",
    no: "005",
    slug: "glass-haze",
  },
  {
    project: "OBSIDIAN GARDEN",
    direction: "MUSIC VIDEO",
    client: "ECHO CURATIONS",
    year: "2023",
    no: "006",
    slug: "obsidian-garden",
  },
  {
    project: "ZERO MERIDIAN",
    direction: "TRAILER",
    client: "HORIZON PARLOR",
    year: "2022",
    no: "007",
    slug: "zero-meridian",
  },
  {
    project: "FLICKER MOTEL",
    direction: "TRAILER",
    client: "HORIZON PARLOR",
    year: "2022",
    no: "008",
    slug: "flicker-motel",
  },
]

export type PhotoCell = {
  label: string
  slug: ProjectSlug
  seed: string
}

export const PHOTO_GRID: PhotoCell[] = [
  { label: "DUST OF DAWN", slug: "dust-of-dawn", seed: "photo-dd-1" },
  { label: "DUST OF DAWN", slug: "dust-of-dawn", seed: "photo-dd-2" },
  { label: "UNFURNISHED DREAMS", slug: "unfurnished-dreams", seed: "photo-ud-1" },
  { label: "GLASS HAZE", slug: "glass-haze", seed: "photo-gh-1" },
  { label: "GLASS HAZE", slug: "glass-haze", seed: "photo-gh-2" },
  { label: "FLICKER MOTEL", slug: "flicker-motel", seed: "photo-fm-1" },
  { label: "FLICKER MOTEL", slug: "flicker-motel", seed: "photo-fm-2" },
]
