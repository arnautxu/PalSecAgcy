export function AiLabCardVisual() {
  return (
    <div data-testid="ai-lab-card-visual" className="relative aspect-[3/4] overflow-hidden bg-[#111315] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.11) 1px, transparent 1px)", backgroundSize: "31px 31px" }} />
      <div className="relative flex h-full flex-col p-5 sm:p-7">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          <span>PALSEC / AI LAB</span><span className="flex items-center gap-2"><span className="h-[6px] w-[6px] rounded-full bg-[#e62323]" />001</span>
        </div>
        <div className="mt-4 w-[142%] -rotate-[6deg] overflow-hidden rounded-[14px] border border-white/20 bg-white text-[#263238] shadow-[0_25px_70px_rgba(0,0,0,0.4)]">
          <div className="flex h-8 items-center gap-2 border-b border-[#eee] bg-white px-3">
            <span className="h-[6px] w-[6px] rounded-full bg-[#de4b48]" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#dfc766]" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#65aa79]" />
            <span className="ml-auto font-mono text-[8px] text-[#999]">AiBrain · prototip</span>
          </div>
          <div className="flex aspect-[24/9] bg-white font-sans text-[9px]">
            <div className="w-[41%] shrink-0 border-r border-[#e7e8e6] p-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold"><span className="grid h-4 w-4 place-items-center rounded bg-[#292b2b] text-[8px] text-white">A</span>AiBrain</div>
              <p className="mt-8 text-[9px] text-[#929896]">Exemples / Presentació</p>
              <p className="mt-9 font-medium leading-[1.5]">Presentació executiva completada en dos formats:</p>
              <div className="mt-5 rounded-md border border-[#e1e3e1] px-3 py-3 text-[8px] font-medium">▣ &nbsp; AiBrain_resum_2025.pptx</div>
              <div className="mt-2 rounded-md border border-[#e1e3e1] px-3 py-3 text-[8px] font-medium">▣ &nbsp; AiBrain_resum_2025.pdf</div>
              <div className="mt-10 h-8 rounded-lg border border-[#e1e3e1] bg-[#fafafa]" />
            </div>
            <div className="w-[59%] bg-[#f7f7f6] p-4">
              <div className="border-b border-[#e4e6e4] pb-3 text-[8px] font-medium">AiBrain_resum_2025.pptx <span className="float-right text-[#8a918f]">1 / 3　−　＋</span></div>
              <div className="mt-6 aspect-[16/9] bg-[#fbf9f4] p-5 shadow-[0_8px_22px_rgba(0,0,0,.12)]">
                <p className="text-[6px] font-bold uppercase tracking-[.14em] text-[#c96554]">Resum executiu</p>
                <p className="mt-3 text-[11px] font-bold">Resultat 2025</p>
                <p className="mt-5 text-[28px] font-semibold tracking-tight text-[#c96554]">0,91 M€</p>
                <p className="text-[7px] text-[#778084]">Dades fictícies · demostració</p>
                <div className="mt-4 flex h-[7px] w-full"><i className="w-[64%] bg-[#273840]" /><i className="w-[15%] bg-[#657b72]" /><i className="w-[10%] bg-[#97b0a7]" /><i className="w-[11%] bg-[#c96554]" /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <img src="/media/projects/ai-lab/aibrain-mark.svg" alt="" className="h-7 w-7 object-contain" width="28" height="28" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ff6868]">AIBRAIN / PROTOTIP</span>
          </div>
          <p className="mt-3 font-sans text-[clamp(44px,5vw,80px)] font-semibold leading-[0.83] tracking-[-0.08em]">AI<br />LAB<span className="text-[#e62323]">.</span></p>
          <div className="mt-7 h-px w-full bg-white/20" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">CONTEXT → INTELLIGENCE → ACTION</p>
        </div>
      </div>
    </div>
  )
}
