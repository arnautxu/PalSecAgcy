/** Primary studio contact — use for all mailto CTAs */
export const CONTACT_EMAIL = "info@palsec.agency"

const SUBJECT_PROJECT = "PARLEM DEL TEU PROJECTE?"

/** mailto: link for “let’s talk about your project” CTA */
export function mailtoProjectInquiryHref(): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT_PROJECT)}`
}
