import svgPaths from "./svg-s3ei693cod";

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

function Container() {
  return (
    <div className="absolute h-[45.5px] left-[91px] top-[538px] w-[209.828px]" data-name="Container">
      <div className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[0] left-[105px] not-italic text-[14px] text-[rgba(255,255,255,0.5)] text-center top-0 w-[130px]">
        <p className="leading-[22.75px] mb-0">같은 학교, 다른 학과</p>
        <p className="leading-[22.75px]">과팅의 새로운 방법</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents font-['Protest_Riot:Regular',sans-serif] leading-[normal] left-[102.28px] not-italic text-white top-[206px]">
      <p className="absolute left-[165.96px] text-[148.078px] top-[206px] whitespace-nowrap">?</p>
      <p className="absolute h-[79.962px] left-[102.28px] text-[66.635px] top-[360.74px] w-[188.8px]">indeed</p>
    </div>
  );
}

export default function Splash() {
  return (
    <div className="bg-black overflow-clip relative rounded-[40px] size-full" data-name="splash">
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px]" data-name="Home Indicator">
        <div className="absolute bg-white h-[34px] left-0 right-0 top-0" data-name="Background" />
        <div className="-translate-x-1/2 absolute bottom-[8.29px] flex h-[4.389px] items-center justify-center left-[calc(50%+0.01px)] w-[138.923px]">
          <div className="-scale-y-100 flex-none rotate-180">
            <div className="bg-black h-[4.389px] rounded-[100px] w-[138.923px]" data-name="Home Indicator" />
          </div>
        </div>
      </div>
      <div className="absolute h-[44px] left-0 overflow-clip top-0 w-[390px]" data-name="Status bar">
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
      <Container />
      <Group />
    </div>
  );
}