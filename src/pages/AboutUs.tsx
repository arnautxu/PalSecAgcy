import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"

export function AboutUs() {
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="flex h-full min-h-0 flex-col px-6 pb-8 pt-[92px] md:flex-row md:gap-10">
        <div className="w-full md:w-[40%]">
          <p className="mb-4 text-nav opacity-60">ABOUT US</p>
          <p className="text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
            PALSEC AGCY IS A DESIGN-LED STUDIO WORKING ACROSS BRAND, DIGITAL, AND VISUAL SYSTEMS.
            WE BUILD PRECISE, MINIMAL, HIGH-CONTRAST EXPERIENCES.
          </p>
          <div className="my-5 h-px w-full bg-frame" />
          <p className="text-bodymd leading-[1.6] tracking-nav text-ink/70 md:text-body">
            BASED IN BARCELONA · AVAILABLE WORLDWIDE · INFO@PALSEC.AGENCY
          </p>
        </div>

        <div className="mt-8 flex flex-1 items-center justify-center md:mt-0">
          <div className="w-[min(44vw,520px)] overflow-hidden rounded-[2px] border border-frame bg-white">
            <img
              src="/brand/palsec-positive.jpg"
              alt=""
              className="aspect-[2/1] w-full object-cover opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

