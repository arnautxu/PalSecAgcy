import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"

export function Services() {
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="h-full w-full overflow-y-auto px-6 pb-8 pt-[92px]">
        <div className="max-w-[520px] text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
          <p className="mb-4 text-nav opacity-60">SERVICES</p>
          <p className="mb-3 opacity-80">
            ESTRATÈGIA DE MARCA · BRANDING · DISSENY WEB · GRÀFICA IMPRESA · MOTION GRAPHICS ·
            DIRECCIÓ CREATIVA
          </p>
          <p className="mb-3">
            TREBALLEM DES DE LA DEFINICIÓ FINS A L’EXECUCIÓ: POSICIONAMENT, NOMENCLATURA, TO DE VEU,
            SISTEMA VISUAL I APLICACIONS.
          </p>
          <p className="mb-3">
            DISSENYEM WEBS EDITORIALS I PRODUCTES DIGITALS AMB UX/UI, COMPONENTS I SISTEMES
            ESCALABLES. TAMBÉ DESPLEGUEM IDENTITATS EN PECES IMPRESES I MATERIALS D’ESPAI.
          </p>
          <p className="opacity-70">
            SI TENS UNA IDEA O UNA MARCA EN EVOLUCIÓ, PARLEM DEL TEU PROJECTE.
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

