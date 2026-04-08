/** Primary studio contact — use for all mailto CTAs */
export const CONTACT_EMAIL = "info@palsec.agency"

const SUBJECT_BY_LANG = {
  en: "LET’S TALK ABOUT YOUR PROJECT?",
  ca: "PARLEM DEL TEU PROJECTE?",
  es: "¿HABLAMOS DE TU PROYECTO?",
} as const

/** mailto: link for “let’s talk about your project” CTA */
export function mailtoProjectInquiryHref(lang: keyof typeof SUBJECT_BY_LANG = "ca"): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT_BY_LANG[lang])}`
}
