function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">9:41</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[70.094px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] whitespace-nowrap">●●● 100%</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between pb-[6px] pt-[14px] px-[20px] relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[25.5px] relative shrink-0 w-[34px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[25.5px] left-0 not-italic text-[#0a0a0a] text-[17px] top-[-1px] whitespace-nowrap">채팅</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[46.5px] relative shrink-0 w-[359px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[11px] pl-[18px] pr-[307px] pt-[10px] relative size-full">
        <Text2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start pb-[6px] pt-[14px] px-[18px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16.5px] min-w-px not-italic relative text-[#6a7282] text-[11px]">진행 중인 과팅</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#eeedfe] content-stretch flex items-center justify-center left-0 rounded-[33554400px] size-[48px] top-0" data-name="Container">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#3c3489] text-[16px] whitespace-nowrap">이</p>
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#534ab7] border-2 border-solid border-white left-[38px] rounded-[33554400px] size-[10px] top-0" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute left-[18px] size-[48px] top-[20.77px]" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#e1f5ee] content-stretch flex h-[18.281px] items-start left-[130.77px] px-[6px] py-[2px] rounded-[33554400px] top-[3.27px] w-[45.516px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[14.286px] min-w-px not-italic relative text-[#085041] text-[10px]">진행 중</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[21.547px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-0 whitespace-nowrap">{`경영학과 이지원 팀 `}</p>
      <Text3 />
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-0 whitespace-nowrap">좋아요! 충대 근처 어떠세요?</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[16.5px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16.5px] min-w-px not-italic relative text-[#e24b4a] text-[11px]">23시간 후 자동 종료</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[61.547px] items-start left-[80px] top-[14px] w-[200.547px]" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[46.453px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">오후 6:05</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="bg-[#534ab7] flex-[1_0_0] min-h-px relative rounded-[10px] w-[17.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[6px] not-italic text-[10px] text-white top-[2px] whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[39.5px] items-end left-[294.55px] top-[25.02px] w-[46.453px]" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[90.547px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f9fafb] border-b border-solid inset-0 pointer-events-none" />
      <Container6 />
      <Container9 />
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[36.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start pb-[6px] pt-[14px] px-[18px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16.5px] min-w-px not-italic relative text-[#6a7282] text-[11px]">완료된 과팅</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#e1f5ee] relative rounded-[33554400px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] not-italic relative shrink-0 text-[#085041] text-[16px] whitespace-nowrap">김</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[18.281px] items-start left-[130.77px] px-[6px] py-[2px] rounded-[33554400px] top-[3.27px] w-[32px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[14.286px] min-w-px not-italic relative text-[#6a7282] text-[10px]">완료</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[21.547px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-0 whitespace-nowrap">{`사회학과 김다은 팀 `}</p>
      <Text6 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-0 whitespace-nowrap">즐거운 시간이었어요 :)</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="flex-[202.953_0_0] h-[43.047px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[44.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16.5px] not-italic relative shrink-0 text-[#99a1af] text-[11px] whitespace-nowrap">3월 21일</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[44.047px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end relative size-full">
        <Text7 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[77px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f9fafb] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[14px] items-center pb-[15px] pt-[14px] px-[18px] relative size-full">
          <Container16 />
          <Container17 />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[635.5_0_0] min-h-px relative w-[359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container4 />
        <Container5 />
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Container23() {
  return <div className="bg-[#e5e7eb] flex-[1_0_0] min-h-px rounded-[8px] w-[24px]" data-name="Container" />;
}

function Text8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[10px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-0 whitespace-nowrap">홈</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="flex-[89.75_0_0] h-[43px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container23 />
        <Text8 />
      </div>
    </div>
  );
}

function Container25() {
  return <div className="bg-[#e5e7eb] flex-[1_0_0] min-h-px rounded-[8px] w-[24px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="h-[15px] relative shrink-0 w-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-0 whitespace-nowrap">매칭</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="flex-[89.75_0_0] h-[43px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container25 />
        <Text9 />
      </div>
    </div>
  );
}

function Container27() {
  return <div className="bg-[#eeedfe] flex-[1_0_0] min-h-px rounded-[8px] w-[24px]" data-name="Container" />;
}

function Text10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#534ab7] text-[10px] top-0 whitespace-nowrap">채팅</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[89.75_0_0] h-[43px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container27 />
        <Text10 />
      </div>
    </div>
  );
}

function Container29() {
  return <div className="bg-[#e5e7eb] flex-[1_0_0] min-h-px rounded-[8px] w-[24px]" data-name="Container" />;
}

function Text11() {
  return (
    <div className="h-[15px] relative shrink-0 w-[20px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-0 whitespace-nowrap">마이</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[89.75_0_0] h-[43px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container29 />
        <Text11 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-white h-[78px] relative shrink-0 w-[359px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[24px] pt-[11px] relative size-full">
        <Container22 />
        <Container24 />
        <Container26 />
        <Container28 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white h-[812px] left-[567.5px] rounded-[40px] top-[20px] w-[375px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[inherit] size-full">
        <Container1 />
        <Container2 />
        <Container3 />
        <Container21 />
      </div>
      <div aria-hidden="true" className="absolute border-8 border-black border-solid inset-0 pointer-events-none rounded-[40px]" />
    </div>
  );
}

function Body() {
  return (
    <div className="bg-[#f3f4f6] h-[1222px] relative shrink-0 w-full" data-name="Body">
      <Container />
    </div>
  );
}

export default function Html() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="HTML 파일로 목업 생성">
      <Body />
    </div>
  );
}