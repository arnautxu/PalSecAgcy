import { PageFrame } from "@/components/PageFrame"
import { BrandWatermark } from "@/components/BrandWatermark"

export function Services() {
  return (
    <PageFrame className="relative">
      <BrandWatermark variant="light" />
      <div className="h-full w-full overflow-y-auto px-6 py-8">
        <div className="max-w-[520px] text-bodymd leading-[1.6] tracking-nav text-ink md:text-body">
          <p className="mb-4 text-nav opacity-60">SERVICES</p>
          <p className="mb-3">
            CREATIVE DIRECTION · BRAND IDENTITY · DIGITAL DESIGN · DEVELOPMENT
          </p>
          <p className="opacity-70">
            THIS IS A PLACEHOLDER PAGE. REPLACE WITH YOUR OFFER, PROCESS, AND CONTACT CTA.
          </p>
        </div>
      </div>
    </PageFrame>
  )
}

