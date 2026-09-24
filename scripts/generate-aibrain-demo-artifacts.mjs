import { mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import pptxgen from "pptxgenjs"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

const out = join(process.cwd(), "public/media/projects/ai-lab/demo")
const basename = "AiBrain_resum_executiu_2025_dades_ficticies"
await mkdir(out, { recursive: true })

const colors = { bg: "FBF9F4", ink: "273840", coral: "C96554", muted: "778084", line: "DEDCD5" }
const pptx = new pptxgen()
pptx.layout = "LAYOUT_WIDE"
pptx.author = "PALSEC AI LAB"
pptx.subject = "Demostració d'AiBrain amb dades fictícies"
pptx.title = "AiBrain — Resum executiu fictici"
pptx.lang = "ca-ES"
pptx.theme = { headFontFace: "Aptos", bodyFontFace: "Aptos", lang: "ca-ES" }

function baseSlide(kicker, title, page) {
  const slide = pptx.addSlide()
  slide.background = { color: colors.bg }
  slide.addText(kicker, { x: .56, y: .48, w: 8, h: .25, fontFace: "Aptos", fontSize: 9, bold: true, color: colors.coral, charSpacing: 1.5, margin: 0 })
  slide.addText(title, { x: .56, y: .83, w: 11.9, h: .54, fontFace: "Aptos Display", fontSize: 25, bold: true, color: colors.ink, margin: 0 })
  slide.addShape(pptx.ShapeType.line, { x: .55, y: 7.05, w: 12.25, h: 0, line: { color: colors.line, width: 1 } })
  slide.addText("AIBRAIN · PROVA AMB DADES FICTÍCIES", { x: .55, y: 7.12, w: 8.2, h: .18, fontSize: 7, bold: true, color: colors.muted, charSpacing: 1, margin: 0 })
  slide.addText(String(page), { x: 12.25, y: 7.12, w: .55, h: .18, fontSize: 7, color: colors.muted, align: "right", margin: 0 })
  return slide
}

const first = baseSlide("RESUM EXECUTIU", "Resultat 2025: 0,91 M€", 1)
first.addText("0,91 M€", { x: .58, y: 2.35, w: 4.8, h: .9, fontSize: 50, bold: true, color: colors.coral, margin: 0 })
first.addText("RESULTAT CALCULAT", { x: .61, y: 3.24, w: 4, h: .24, fontSize: 8, bold: true, charSpacing: 1.2, color: colors.muted, margin: 0 })
first.addText("10,8%", { x: .6, y: 4.15, w: 2.2, h: .55, fontSize: 28, bold: true, color: colors.ink, margin: 0 })
first.addText("marge sobre facturació", { x: .62, y: 4.75, w: 2.8, h: .22, fontSize: 9, color: colors.muted, margin: 0 })
first.addText("7,51 M€", { x: 3.7, y: 4.15, w: 2.3, h: .55, fontSize: 28, bold: true, color: colors.ink, margin: 0 })
first.addText("despeses totals", { x: 3.72, y: 4.75, w: 2.4, h: .22, fontSize: 9, color: colors.muted, margin: 0 })
first.addText("Composició de la facturació", { x: 7.5, y: 2.08, w: 5.3, h: .3, fontSize: 14, bold: true, color: colors.ink, margin: 0 })
const segments = [[5.46,"273840"],[1.18,"657B72"],[.54,"97B0A7"],[.33,"D8D3C7"],[.91,colors.coral]]
let segmentX = 7.5
for (const [value, color] of segments) {
  const w = 4.7 * Number(value) / 8.42
  first.addShape(pptx.ShapeType.rect, { x: segmentX, y: 2.72, w, h: .43, line: { color }, fill: { color } })
  segmentX += w
}
const lines = [["Cost de producte","5,46 M€"],["Personal","1,18 M€"],["Lloguers i subministraments","0,54 M€"],["Altres despeses","0,33 M€"],["Resultat","0,91 M€"]]
lines.forEach(([label,value], index) => {
  const y = 3.45 + index * .47
  first.addText(label, { x: 7.5, y, w: 3.5, h: .22, fontSize: 10, color: colors.ink, margin: 0 })
  first.addText(value, { x: 11, y, w: 1.2, h: .22, fontSize: 10, bold: true, color: colors.ink, align: "right", margin: 0 })
})
first.addText("La presentació mostra només la reconciliació aritmètica de les xifres facilitades. No atribueix causes al resultat.", { x: .6, y: 6.25, w: 11.6, h: .3, fontSize: 9, color: colors.muted, margin: 0 })

const second = baseSlide("RESULTAT 2025 · PROVA FICTÍCIA", "De la facturació al resultat", 2)
second.addText("Reconciliació aritmètica de les xifres facilitades.", { x: .58, y: 1.52, w: 10, h: .3, fontSize: 12, color: colors.muted, margin: 0 })
const waterfall = [["Facturació", "8,42 M€", 8.42],["Cost de producte", "−5,46 M€", 5.46],["Personal", "−1,18 M€", 4.28],["Altres costos", "−0,87 M€", 3.41],["Resultat", "0,91 M€", .91]]
waterfall.forEach(([label,value,amount], index) => {
  const y = 2.12 + index * .83
  second.addText(String(label), { x: .6, y, w: 2.6, h: .3, fontSize: 12, color: colors.ink, margin: 0 })
  second.addShape(pptx.ShapeType.rect, { x: 3.45, y: y + .02, w: 7.9 * Number(amount) / 8.42, h: .28, line: { color: index === 4 ? colors.coral : colors.ink }, fill: { color: index === 4 ? colors.coral : colors.ink } })
  second.addText(String(value), { x: 11.35, y, w: 1.2, h: .3, fontSize: 12, bold: true, color: colors.ink, align: "right", margin: 0 })
})

const third = baseSlide("ABANS DE PRENDRE DECISIONS", "Dades pendents de contrastar", 3)
;["Origen i període de les dades de facturació","Criteri d’imputació dels costos i despeses","Partides extraordinàries i ajustos","Comparació amb exercicis anteriors"].forEach((line, index) => {
  const y = 2.1 + index * .9
  third.addText(String(index + 1).padStart(2,"0"), { x: .6, y, w: .5, h: .35, fontSize: 13, bold: true, color: colors.coral, margin: 0 })
  third.addText(line, { x: 1.45, y, w: 10.5, h: .4, fontSize: 17, color: colors.ink, margin: 0 })
  third.addShape(pptx.ShapeType.line, { x: .6, y: y + .56, w: 11.9, h: 0, line: { color: colors.line, width: 1 } })
})
third.addText("Aquest document és una demostració. Totes les xifres són fictícies.", { x: .6, y: 6.38, w: 11.6, h: .3, fontSize: 9, color: colors.muted, margin: 0 })
await pptx.writeFile({ fileName: join(out, `${basename}.pptx`) })

const pdf = await PDFDocument.create()
const regular = await pdf.embedFont(StandardFonts.Helvetica)
const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
const paper = rgb(251/255, 249/255, 244/255)
const ink = rgb(39/255, 56/255, 64/255)
const coral = rgb(201/255, 101/255, 84/255)
const muted = rgb(112/255, 126/255, 131/255)
function pdfPage(kicker, title, number) {
  const page = pdf.addPage([960, 540])
  page.drawRectangle({ x: 0, y: 0, width: 960, height: 540, color: paper })
  page.drawText(kicker, { x: 48, y: 490, font: bold, size: 9, color: coral })
  page.drawText(title, { x: 48, y: 450, font: bold, size: 25, color: ink })
  page.drawLine({ start: {x: 48, y: 46}, end: {x: 912, y: 46}, thickness: .7, color: muted })
  page.drawText("AIBRAIN · PROVA AMB DADES FICTICIES", { x: 48, y: 30, font: bold, size: 7, color: muted })
  page.drawText(String(number), { x: 908, y: 30, font: regular, size: 7, color: muted })
  return page
}
const p1 = pdfPage("RESUM EXECUTIU", "Resultat 2025: 0,91 M€", 1)
p1.drawText("0,91 M€", { x: 50, y: 270, font: bold, size: 58, color: coral })
p1.drawText("RESULTAT CALCULAT", { x: 52, y: 249, font: bold, size: 8, color: muted })
p1.drawText("10,8%       7,51 M€", { x: 52, y: 190, font: bold, size: 25, color: ink })
p1.drawText("marge sobre facturacio        despeses totals", { x: 52, y: 171, font: regular, size: 9, color: muted })
p1.drawText("Composicio de la facturacio", { x: 535, y: 350, font: bold, size: 14, color: ink })
let pdfX = 535
for (const [value, color] of segments) {
  const w = 330 * Number(value) / 8.42
  const [r,g,b] = String(color).match(/.{2}/g).map((part) => parseInt(part,16)/255)
  p1.drawRectangle({ x: pdfX, y: 320, width: w, height: 22, color: rgb(r,g,b) })
  pdfX += w
}
lines.forEach(([label,value], index) => { p1.drawText(label, { x: 535, y: 284-index*29, font: regular, size: 10, color: ink }); p1.drawText(value, { x: 850, y: 284-index*29, font: bold, size: 10, color: ink }) })
p1.drawText("La presentacio mostra nomes la reconciliacio aritmetica de les xifres facilitades.", { x: 52, y: 77, font: regular, size: 9, color: muted })
const p2 = pdfPage("RESULTAT 2025 · PROVA FICTICIA", "De la facturacio al resultat", 2)
waterfall.forEach(([label,value,amount], index) => { const y=350-index*62; p2.drawText(String(label), {x:50,y,font:regular,size:12,color:ink}); p2.drawRectangle({x:245,y:y-2,width:490*Number(amount)/8.42,height:18,color:index===4?coral:ink}); p2.drawText(String(value).replaceAll("−", "-"),{x:780,y,font:bold,size:12,color:ink}) })
const p3 = pdfPage("ABANS DE PRENDRE DECISIONS", "Dades pendents de contrastar", 3)
;["Origen i periode de les dades de facturacio","Criteri d'imputacio dels costos i despeses","Partides extraordinaries i ajustos","Comparacio amb exercicis anteriors"].forEach((line,index)=>{const y=350-index*65;p3.drawText(String(index+1).padStart(2,"0"),{x:52,y,font:bold,size:13,color:coral});p3.drawText(line,{x:108,y,font:regular,size:17,color:ink})})
p3.drawText("Aquest document es una demostracio. Totes les xifres son ficticies.", {x:52,y:78,font:regular,size:9,color:muted})
await writeFile(join(out, `${basename}.pdf`), await pdf.save())
console.log(`Wrote ${basename}.pptx and .pdf to ${out}`)
