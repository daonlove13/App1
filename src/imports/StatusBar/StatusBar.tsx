import svgPaths from "./svg-8sveb3ppmg";

function Levels() {
  return (
    <div className="absolute h-[12.576px] right-[18.39px] top-[18px] w-[68.92px]" data-name="Levels">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 68.9199 12.5764">
        <g id="Levels">
          <g id="Battery">
            <path d={svgPaths.p5199a30} id="Border" opacity="0.35" stroke="var(--stroke-0, black)" strokeWidth="0.821512" />
            <path d={svgPaths.p1cb11300} fill="var(--fill-0, black)" id="Cap" opacity="0.4" />
            <rect fill="var(--fill-0, black)" height="8.33768" id="Capacity" rx="1.6" width="18.739" x="45.9243" y="2.37204" />
          </g>
          <path clipRule="evenodd" d={svgPaths.p36f30500} fill="var(--fill-0, black)" fillRule="evenodd" id="Cellular Connection" />
          <path clipRule="evenodd" d={svgPaths.p1942a000} fill="var(--fill-0, black)" fillRule="evenodd" id="Wifi" />
        </g>
      </svg>
    </div>
  );
}

export default function StatusBar() {
  return (
    <div className="relative size-full" data-name="Status bar">
      <div className="absolute bg-white h-[44px] left-0 top-0 w-[390px]" data-name="Background" />
      <div className="-translate-x-1/2 absolute h-[34px] left-1/2 top-0 w-[207.16px]" data-name="The notch">
        <div className="absolute inset-[0_8.21%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 173.16 34">
            <path d={svgPaths.p10628500} fill="var(--fill-0, black)" id="The notch" />
          </svg>
        </div>
      </div>
      <Levels />
      <p className="-translate-x-1/2 absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-[normal] left-[52.35px] not-italic text-[16px] text-black text-center top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
    </div>
  );
}