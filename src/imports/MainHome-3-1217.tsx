import svgPaths from "./svg-h7zstcnfh7";
import imgImage from "figma:asset/502a357224f9252d8869ed6cec080e2016e36c28.png";
import imgImage1 from "figma:asset/509b5f9a55baba1e0909144f51cc48564adefaa1.png";

function Container2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[95.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(255,255,255,0.7)] top-0 whitespace-nowrap">{`충북대 · 심리학과 · 2099123456 · 홍길동 `}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start justify-between left-[24px] pr-[199.719px] top-[24px] w-[295px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[32px] left-[24px] top-[52px] w-[295px]" data-name="Heading 2">
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[32px] left-0 text-[24px] text-white top-[-1px] whitespace-nowrap">팀이 없어요</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[40px] left-[24px] top-[92px] w-[295px]" data-name="Paragraph">
      <div className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[0] left-0 text-[14px] text-[rgba(255,255,255,0.8)] top-0 w-[295px]">
        <p className="leading-[20px] mb-0">같은 과 친구들이랑 팀 만들고</p>
        <p className="leading-[20px]">과팅을 시작해보세요!</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[79.73px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white h-[36px] left-[24px] rounded-[33554400px] top-[148px] w-[119.734px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:SemiBold',sans-serif] font-semibold leading-[20px] left-[50px] text-[14px] text-black text-center top-[8px] whitespace-nowrap">{`팀 만들기 `}</p>
      <Icon />
    </div>
  );
}

function StatusCard() {
  return (
    <div className="absolute bg-black h-[208px] left-[16px] rounded-[10px] top-[16px] w-[343px]" data-name="StatusCard">
      <Container1 />
      <Heading />
      <Paragraph />
      <Button />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[36px] min-w-px relative text-[30px] text-black text-center">12</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-[53.41px] text-[#6a7282] text-[12px] text-center top-0 whitespace-nowrap">남자 대기</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[56px] items-start left-[16px] top-[240px] w-[106.328px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[36px] min-w-px relative text-[30px] text-black text-center">8</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-[53.41px] text-[#6a7282] text-[12px] text-center top-0 whitespace-nowrap">여자 대기</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[56px] items-start left-[134.33px] top-[240px] w-[106.328px]" data-name="Container">
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[36px] min-w-px relative text-[30px] text-black text-center">6</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-[53.42px] text-[#6a7282] text-[12px] text-center top-0 whitespace-nowrap">오늘 매칭</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[56px] items-start left-[252.66px] top-[240px] w-[106.344px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#0a0a0a] text-[14px] top-0 whitespace-nowrap">여자 팀이 적어요</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#4a5565] text-[12px] top-0 whitespace-nowrap">{`지금 매칭 완료 시 제휴 가게 추가 할인 `}</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[40px] relative shrink-0 w-[176.656px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-black h-[28px] relative rounded-[33554400px] shrink-0 w-[62.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[20px] left-[12px] text-[14px] text-white top-[4px] whitespace-nowrap">+10%</p>
      </div>
    </div>
  );
}

function NoticeCard() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[74px] items-center justify-between left-[16px] p-[17px] rounded-[10px] top-[312px] w-[343px]" data-name="NoticeCard">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container12 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[16px] left-0 top-[48px] w-[118.781px]" data-name="Container">
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-0 whitespace-nowrap">시험 권장 기간 종료 후 오픈 예정</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[64px] relative shrink-0 w-[118.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#99a1af] text-[12px] top-0 whitespace-nowrap">다음 정기 오픈</p>
        <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[28px] left-0 text-[18px] text-white top-[20px] whitespace-nowrap">목요일 오후 6시</p>
        <Container17 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[40px] relative rounded-[33554400px] shrink-0 w-[60.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[24px] left-[16px] text-[16px] text-black top-[7px] whitespace-nowrap">D-3</p>
      </div>
    </div>
  );
}

function NoticeCard1() {
  return (
    <div className="absolute bg-black content-stretch flex h-[96px] items-center justify-between left-[16px] p-[16px] rounded-[10px] top-[398px] w-[343px]" data-name="NoticeCard">
      <Container16 />
      <Container18 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[31.125px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[28px] left-0 text-[#0a0a0a] text-[18px] top-0 whitespace-nowrap">근처 식당</p>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[55.83px] size-[16px] top-[2px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[71.828px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[20px] left-[26px] text-[14px] text-black text-center top-0 underline whitespace-nowrap">{`전체 보기 `}</p>
        <Icon1 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[28px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Button1 />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="Image (치킨앤비어 중대정)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Image />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#0a0a0a] text-[16px] top-[-1px] whitespace-nowrap">치킨앤비어 충대점</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-0 whitespace-nowrap">정문 · 도보 3분 · ★ 4.6</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[16px] relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function TeamListItem() {
  return (
    <div className="absolute bg-white h-[210px] left-0 rounded-[16px] top-0 w-[165.5px]" data-name="TeamListItem">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container22 />
        <Container23 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Image1() {
  return (
    <div className="h-[128px] relative shrink-0 w-full" data-name="Image (물맥을 중대정)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#e5e7eb] content-stretch flex flex-col h-[128px] items-start relative shrink-0 w-full" data-name="Container">
      <Image1 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Pretendard_Variable:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#0a0a0a] text-[16px] top-[-1px] whitespace-nowrap">룸앤룸 충대점</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Pretendard_Variable:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#6a7282] text-[14px] top-0 whitespace-nowrap">정문 · 도보 3분 · ★ 4.7</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[16px] relative size-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function TeamListItem1() {
  return (
    <div className="absolute bg-white h-[210px] left-[177.5px] rounded-[16px] top-0 w-[165.5px]" data-name="TeamListItem">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container24 />
        <Container25 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[210px] relative shrink-0 w-full" data-name="Container">
      <TeamListItem />
      <TeamListItem1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[250px] items-start left-[16px] top-[510px] w-[343px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[1448px] left-0 overflow-clip top-[110px] w-[390px]" data-name="Container">
      <StatusCard />
      <Container3 />
      <Container6 />
      <Container9 />
      <NoticeCard />
      <NoticeCard1 />
      <Container19 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[32px] relative shrink-0 w-[12.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Protest_Riot:Regular',sans-serif] leading-[32px] left-0 not-italic text-[#0a0a0a] text-[24px] top-[-1px] whitespace-nowrap">?</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Protest_Riot:Regular',sans-serif] leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] top-0 whitespace-nowrap">indeed</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[32px] relative shrink-0 w-[77px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_20.83%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path d={svgPaths.pedb3a30} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[69.58%_12.5%_12.5%_69.58%]" data-name="Vector">
        <div className="absolute inset-[-23.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.3 6.3">
            <path d="M5.3 5.3L1 1" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] px-[8px] size-[40px] top-0" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[8px] size-[24px] top-[8px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p369f8680} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p21b0a2c0} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return <div className="absolute bg-black left-[28px] rounded-[33554400px] size-[8px] top-[4px]" data-name="Container" />;
}

function Button3() {
  return (
    <div className="absolute left-[52px] size-[40px] top-0" data-name="Button">
      <Icon3 />
      <Container31 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[40px] relative shrink-0 w-[92px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-white content-stretch flex h-[73px] items-center justify-between left-0 pb-[17px] pt-[16px] px-[16px] top-[44px] w-[390px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Container27 />
      <Container30 />
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

function Container34() {
  return <div className="bg-black h-[4px] rounded-[33554400px] shrink-0 w-[24px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[10.375px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[18px] left-[5.5px] text-[#0a0a0a] text-[12px] text-center top-0 whitespace-nowrap">홈</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[26px] relative shrink-0 w-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container34 />
        <Text />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-[24px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
              <path d={svgPaths.p1b764040} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[18px] left-[10.5px] text-[#99a1af] text-[12px] text-center top-0 whitespace-nowrap">매칭</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[46px] relative shrink-0 w-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Icon4 />
        <Text1 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[33554400px] w-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[18px] left-[10.5px] text-[#99a1af] text-[12px] text-center top-0 whitespace-nowrap">채팅</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[46px] relative shrink-0 w-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container35 />
        <Text2 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-h-px relative rounded-[33554400px] w-[24px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18px] relative shrink-0 w-[18.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Pretendard_Variable:Medium',sans-serif] font-medium leading-[18px] left-[9.5px] text-[#99a1af] text-[12px] text-center top-0 whitespace-nowrap">MY</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[46px] relative shrink-0 w-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center relative size-full">
        <Container36 />
        <Text3 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[46px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32.75px] relative size-full">
          <Button4 />
          <Button5 />
          <Button6 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[56px] items-start left-0 pt-[14px] px-[16px] top-[754px] w-[390px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Container33 />
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-black h-[4px] left-[125.5px] rounded-[33554400px] top-[22px] w-[139px]" data-name="Container" />;
}

function Container37() {
  return (
    <div className="absolute bg-white h-[34px] left-0 top-[810px] w-[390px]" data-name="Container">
      <Container38 />
    </div>
  );
}

export default function MainHome() {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="MainHome">
      <Container />
      <Container26 />
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
      <Container32 />
      <Container37 />
    </div>
  );
}