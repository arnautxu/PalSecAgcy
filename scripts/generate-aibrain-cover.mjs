import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import sharp from "sharp"

const out = join(process.cwd(), "public/media/projects/ai-lab")
await mkdir(out, { recursive: true })
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1208" height="1610" viewBox="0 0 1208 1610">
<defs>
  <pattern id="grid" width="62" height="62" patternUnits="userSpaceOnUse"><path d="M62 0H0V62" fill="none" stroke="#303334" stroke-width="1"/></pattern>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="25" stdDeviation="28" flood-color="#000" flood-opacity=".4"/></filter>
  <clipPath id="window"><rect x="0" y="0" width="1420" height="930" rx="18"/></clipPath>
</defs>
<rect width="1208" height="1610" fill="#141617"/><rect width="1208" height="1610" fill="url(#grid)"/>
<text x="58" y="79" fill="#aaaeb0" font-family="monospace" font-size="19" letter-spacing="6">PALSEC / AI LAB</text><circle cx="1088" cy="72" r="6" fill="#e62323"/><text x="1110" y="79" fill="#aaaeb0" font-family="monospace" font-size="19" letter-spacing="5">001</text>
<g transform="translate(38 263) rotate(-6 710 465)" filter="url(#shadow)" clip-path="url(#window)">
  <rect width="1420" height="930" fill="#fff"/>
  <rect width="1420" height="62" fill="#fff"/><circle cx="31" cy="31" r="6" fill="#de4b48"/><circle cx="57" cy="31" r="6" fill="#dfc766"/><circle cx="83" cy="31" r="6" fill="#65aa79"/><text x="1200" y="38" fill="#999" font-family="monospace" font-size="16">AiBrain · prototip</text><path d="M0 62h1420" stroke="#e8e9e7"/>
  <rect x="0" y="62" width="540" height="868" fill="#fff"/><path d="M540 62v868" stroke="#e1e3e1"/>
  <rect x="35" y="100" width="31" height="31" rx="7" fill="#292b2b"/><text x="44" y="123" fill="#fff" font-family="Arial" font-size="21" font-weight="bold">A</text><text x="83" y="124" fill="#263238" font-family="Arial" font-size="27" font-weight="bold">AiBrain</text>
  <text x="42" y="227" fill="#929896" font-family="Arial" font-size="21">Exemples / Presentació</text>
  <text x="42" y="342" fill="#263238" font-family="Arial" font-size="25" font-weight="bold">Presentació executiva completada</text><text x="42" y="379" fill="#263238" font-family="Arial" font-size="25" font-weight="bold">en dos formats:</text>
  <rect x="42" y="439" width="450" height="89" rx="16" fill="#fff" stroke="#e1e3e1" stroke-width="2"/><text x="68" y="493" fill="#263238" font-family="Arial" font-size="20" font-weight="bold">▣  AiBrain_resum_2025.pptx</text>
  <rect x="42" y="546" width="450" height="89" rx="16" fill="#fff" stroke="#e1e3e1" stroke-width="2"/><text x="68" y="600" fill="#263238" font-family="Arial" font-size="20" font-weight="bold">▣  AiBrain_resum_2025.pdf</text>
  <rect x="42" y="789" width="450" height="70" rx="18" fill="#fafafa" stroke="#e1e3e1" stroke-width="2"/>
  <rect x="541" y="62" width="879" height="868" fill="#f7f7f6"/><text x="578" y="126" fill="#263238" font-family="Arial" font-size="23" font-weight="bold">AiBrain_resum_2025.pptx</text><text x="1162" y="126" fill="#8a918f" font-family="Arial" font-size="21">1 / 3</text><path d="M541 156h879" stroke="#e1e3e1"/>
  <rect x="614" y="229" width="1000" height="550" fill="#fbf9f4"/>
  <text x="668" y="297" fill="#c96554" font-family="Arial" font-size="16" font-weight="bold" letter-spacing="3">RESUM EXECUTIU</text>
  <text x="668" y="349" fill="#273840" font-family="Arial" font-size="35" font-weight="bold">Resultat 2025</text>
  <text x="668" y="526" fill="#c96554" font-family="Arial" font-size="105" font-weight="bold">0,91 M€</text>
  <text x="673" y="563" fill="#778084" font-family="Arial" font-size="18">DADES FICTÍCIES · DEMOSTRACIÓ</text>
  <rect x="678" y="641" width="500" height="22" fill="#273840"/><rect x="1178" y="641" width="105" height="22" fill="#657b72"/><rect x="1283" y="641" width="80" height="22" fill="#97b0a7"/><rect x="1363" y="641" width="52" height="22" fill="#c96554"/>
</g>
<rect x="58" y="1128" width="52" height="52" rx="11" fill="#292b2b"/><text x="72" y="1166" fill="#fff" font-family="Arial" font-size="37" font-weight="bold">A</text><text x="132" y="1164" fill="#ff6868" font-family="monospace" font-size="20" letter-spacing="3">AIBRAIN / PROTOTIP</text>
<text x="58" y="1317" fill="#fff" font-family="Arial" font-size="155" font-weight="bold" letter-spacing="-13">AI</text><text x="58" y="1458" fill="#fff" font-family="Arial" font-size="155" font-weight="bold" letter-spacing="-13">LAB<tspan fill="#e62323">.</tspan></text>
<path d="M58 1500h1092" stroke="#5b5d5e"/><text x="58" y="1552" fill="#abb0b1" font-family="monospace" font-size="20" letter-spacing="5">CONTEXT → INTELLIGENCE → ACTION</text>
</svg>`
const source = Buffer.from(svg)
await sharp(source).png().toFile(join(out, "cover.png"))
await sharp(source).webp({ quality: 82 }).toFile(join(out, "cover.webp"))
for (const width of [160, 720]) await sharp(source).resize({ width }).webp({ quality: 80 }).toFile(join(out, `cover.${width}.webp`))
console.log("Wrote generic AiBrain cover assets")
