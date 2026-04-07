export type ProjectSlug =
  | "vira"
  | "arkuos"
  | "galeon"
  | "el-xiringuito"
  | "enteza"
  | "gent-gran-de-calonge-i-sant-antoni"
  | "cms"
  | "estudi-dental-carrera"

export type Project = {
  slug: ProjectSlug
  title: string
  /** picsum seeds for main carousel stills */
  carouselSeeds: string[]
  /** seed for filmstrip thumb */
  thumbSeed: string
  /** Optional local (public/) images for a project */
  localImages?: {
    slides: string[]
    thumb: string
    /** Optional looping video thumb (public/) */
    thumbVideo?: string
  }
}

export const PROJECTS: Project[] = [
  {
    slug: "vira",
    title: "VIRA",
    carouselSeeds: ["vira-1", "vira-2", "vira-3", "vira-4"],
    thumbSeed: "vira-thumb",
    localImages: {
      slides: [
        "/projects/vira/01.png",
        "/projects/vira/02.png",
        "/projects/vira/03.png",
        "/projects/vira/04.png",
      ],
      thumb: "/projects/vira/02.png",
    },
  },
  {
    slug: "arkuos",
    title: "ARKUOS",
    carouselSeeds: ["arkuos-1", "arkuos-2", "arkuos-3", "arkuos-4"],
    thumbSeed: "arkuos-thumb",
    localImages: {
      slides: [
        "/projects/arkuos/1.png",
        "/projects/arkuos/2.png",
        "/projects/arkuos/3.png",
        "/projects/arkuos/4.png",
        "/projects/arkuos/5.png",
      ],
      thumb: "/projects/arkuos/1.jpg",
    },
  },
  {
    slug: "galeon",
    title: "GALEÓN",
    carouselSeeds: ["galeon-1", "galeon-2", "galeon-3", "galeon-4"],
    thumbSeed: "galeon-thumb",
    localImages: {
      slides: [
        "/projects/galeon/01.png",
        "/projects/galeon/02.png",
        "/projects/galeon/03.png",
        "/projects/galeon/04.png",
      ],
      thumb: "/projects/galeon/02.png",
      thumbVideo: "/projects/galeon/thumb.mp4",
    },
  },
  {
    slug: "el-xiringuito",
    title: "EL XIRINGUITO",
    carouselSeeds: ["xiringuito-1", "xiringuito-2", "xiringuito-3", "xiringuito-4"],
    thumbSeed: "xiringuito-thumb",
  },
  {
    slug: "enteza",
    title: "ENTEZA",
    carouselSeeds: ["enteza-1", "enteza-2", "enteza-3", "enteza-4"],
    thumbSeed: "enteza-thumb",
  },
  {
    slug: "gent-gran-de-calonge-i-sant-antoni",
    title: "GENT GRAN DE CALONGE I SANT ANTONI",
    carouselSeeds: ["gentgran-1", "gentgran-2", "gentgran-3", "gentgran-4"],
    thumbSeed: "gentgran-thumb",
  },
  {
    slug: "cms",
    title: "CMS",
    carouselSeeds: ["cms-1", "cms-2", "cms-3", "cms-4"],
    thumbSeed: "cms-thumb",
  },
  {
    slug: "estudi-dental-carrera",
    title: "ESTUDI DENTAL CARRERA",
    carouselSeeds: ["carrera-1", "carrera-2", "carrera-3", "carrera-4"],
    thumbSeed: "carrera-thumb",
  },
]

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function picsum(seed: string, w: number, h: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
}

export type IndexRow = {
  project: string
  direction: string
  client: string
  year: string
  no: string
  slug?: ProjectSlug
}

export const INDEX_ROWS: IndexRow[] = [
  { project: "VIRA", direction: "WEBSITE", client: "PALSEC", year: "2026", no: "001", slug: "vira" },
  { project: "ARKUOS", direction: "WEBSITE", client: "PALSEC", year: "2026", no: "002", slug: "arkuos" },
  { project: "GALEÓN", direction: "WEBSITE", client: "PALSEC", year: "2026", no: "003", slug: "galeon" },
  {
    project: "EL XIRINGUITO",
    direction: "WEBSITE",
    client: "PALSEC",
    year: "2026",
    no: "004",
    slug: "el-xiringuito",
  },
  { project: "ENTEZA", direction: "WEBSITE", client: "PALSEC", year: "2026", no: "005", slug: "enteza" },
  {
    project: "GENT GRAN DE CALONGE I SANT ANTONI",
    direction: "WEBSITE",
    client: "PALSEC",
    year: "2026",
    no: "006",
    slug: "gent-gran-de-calonge-i-sant-antoni",
  },
  { project: "CMS", direction: "WEBSITE", client: "PALSEC", year: "2026", no: "007", slug: "cms" },
  {
    project: "ESTUDI DENTAL CARRERA",
    direction: "WEBSITE",
    client: "PALSEC",
    year: "2026",
    no: "008",
    slug: "estudi-dental-carrera",
  },
]

export type PhotoCell = {
  label: string
  slug: ProjectSlug
  seed: string
}

export const PHOTO_GRID: PhotoCell[] = [
  { label: "VIRA", slug: "vira", seed: "photo-vira-1" },
  { label: "ARKUOS", slug: "arkuos", seed: "photo-arkuos-1" },
  { label: "GALEÓN", slug: "galeon", seed: "photo-galeon-1" },
  { label: "EL XIRINGUITO", slug: "el-xiringuito", seed: "photo-xiringuito-1" },
  { label: "ENTEZA", slug: "enteza", seed: "photo-enteza-1" },
  {
    label: "GENT GRAN DE CALONGE I SANT ANTONI",
    slug: "gent-gran-de-calonge-i-sant-antoni",
    seed: "photo-gentgran-1",
  },
  { label: "CMS", slug: "cms", seed: "photo-cms-1" },
  { label: "ESTUDI DENTAL CARRERA", slug: "estudi-dental-carrera", seed: "photo-carrera-1" },
]
