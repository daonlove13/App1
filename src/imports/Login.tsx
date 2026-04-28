import svgPaths from "./svg-ll91t992hz";

function Group() {
  return (
    <div className="absolute contents font-['Protest_Riot:Regular',sans-serif] leading-[normal] left-[91.79px] not-italic text-black top-[107px]">
      <p className="absolute left-[162.54px] text-[164.531px] top-[107px] whitespace-nowrap">?</p>
      <p className="absolute h-[88.847px] left-[91.79px] text-[74.039px] top-[278.94px] w-[209.777px]">indeed</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black h-[58.32px] relative rounded-[15.12px] shrink-0 w-[318.6px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[25.92px] left-[159.47px] not-italic text-[17.28px] text-center text-white top-[14.04px] whitespace-nowrap">학교 이메일로 시작하기</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[15.12px] w-[318.6px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.08px] border-solid inset-0 pointer-events-none rounded-[15.12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[25.92px] left-[159.54px] not-italic text-[#1e2939] text-[17.28px] text-center top-[15.12px] whitespace-nowrap">로그인</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10.8px] h-[129.6px] items-start left-[30.7px] top-[569.2px] w-[318.6px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function LoginPage() {
  return (
    <div className="absolute h-[59.75px] left-[8px] top-[759px] w-[359px]" data-name="LoginPage">
      <div className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[0] left-[179.5px] not-italic text-[#99a1af] text-[11px] text-center top-[-1px] w-[319px]">
        <p className="mb-0">
          <span className="leading-[17.875px]">{`시작하면 `}</span>
          <span className="leading-[17.875px] text-black">이용약관</span>
          <span className="leading-[17.875px]">{` 및 `}</span>
          <span className="leading-[17.875px] text-black">개인정보처리방침</span>
          <span className="leading-[17.875px]">에</span>
        </p>
        <p className="leading-[17.875px]">동의하는 것으로 간주돼요</p>
      </div>
    </div>
  );
}

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

export default function Login() {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="Login">
      <Group />
      <Container />
      <div className="absolute font-['Protest_Riot:Regular','Noto_Sans_KR:Regular',sans-serif] h-[76px] leading-[0] left-[36px] text-[35px] text-black top-[471px] w-[269px]" style={{ fontVariationSettings: "'wght' 400" }}>
        <p className="leading-[normal] mb-0">대학 과팅,</p>
        <p className="leading-[normal]">이제 indeed로</p>
      </div>
      <LoginPage />
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
    </div>
  );
}