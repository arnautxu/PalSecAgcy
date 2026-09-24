export type PortfolioWebsite = {
  slug: string
  title: string
  url: string
  domain: string
  desktop: string
  mobile: string
}

export const PORTFOLIO_WEBSITES: readonly PortfolioWebsite[] = [
  {
    slug: "neutral-studio",
    title: "Neutral Studio",
    url: "https://www.neutralstudio.co/",
    domain: "neutralstudio.co",
    desktop: "/media/projects/weboteca/neutral-studio-desktop.jpg",
    mobile: "/media/projects/weboteca/neutral-studio-mobile.jpg",
  },
  {
    slug: "estudi-dental-carrera",
    title: "Estudi Dental Carrera",
    url: "https://www.estudidentalcarrera.com/",
    domain: "estudidentalcarrera.com",
    desktop: "/media/projects/weboteca/estudi-dental-carrera-desktop.jpg",
    mobile: "/media/projects/weboteca/estudi-dental-carrera-mobile.jpg",
  },
  {
    slug: "casino-castellarenc",
    title: "Casino Castellarenc",
    url: "https://www.casinocastellarenc.org/",
    domain: "casinocastellarenc.org",
    desktop: "/media/projects/weboteca/casino-castellarenc-desktop.jpg",
    mobile: "/media/projects/weboteca/casino-castellarenc-mobile.jpg",
  },
  {
    slug: "pocket-voice",
    title: "Pocket Voice",
    url: "https://pocket-voice.vercel.app/",
    domain: "pocket-voice.vercel.app",
    desktop: "/media/projects/weboteca/pocket-voice-desktop.jpg",
    mobile: "/media/projects/weboteca/pocket-voice-mobile.jpg",
  },
  {
    slug: "vueik",
    title: "Vueik",
    url: "https://vueik.com/",
    domain: "vueik.com",
    desktop: "/media/projects/weboteca/vueik-desktop.jpg",
    mobile: "/media/projects/weboteca/vueik-mobile.jpg",
  },
]
