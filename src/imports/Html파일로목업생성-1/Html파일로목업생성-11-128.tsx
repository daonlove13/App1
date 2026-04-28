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
    <div className="h-[19.5px] relative shrink-0 w-[42.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6a7282] text-[13px] top-0 whitespace-nowrap">← 뒤로</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[20px] left-[61px] not-italic text-[#0a0a0a] text-[14px] text-center top-0 whitespace-nowrap">경영학과 이지원 팀</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[60.64px] not-italic text-[#6a7282] text-[10px] text-center top-0 whitespace-nowrap">약속 완료 전까지 유지</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[37px] relative shrink-0 w-[121.844px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[39.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#534ab7] text-[12px]">가게 →</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[58px] relative shrink-0 w-[359px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[11px] pt-[10px] px-[18px] relative size-full">
        <Text2 />
        <Container3 />
        <Text3 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute h-[16.25px] left-[14px] top-[10px] w-[299px]" data-name="Container">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[16.25px] left-0 not-italic text-[#7f77dd] text-[10px] top-[-1px] whitespace-nowrap">안내 봇</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#eeedfe] h-[111.75px] left-[16px] rounded-[14px] top-[14px] w-[327px]" data-name="Container">
      <Container8 />
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[17.875px] left-[14px] not-italic text-[#3c3489] text-[11px] top-[29.25px] w-[299px]">{`안녕하세요! 매칭이 완료됐어요. 채팅은 약속 잡는 용도로만 사용해요. 24시간 무응답 시 자동 종료되며 패널티가 부여돼요. 약속이 잡히면 팀장이 '약속 완료' 버튼을 눌러주세요. 과팅 당일과 다음날도 채팅방이 유지돼요.`}</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[35.5px] left-0 rounded-bl-[14px] rounded-br-[14px] rounded-tl-[4px] rounded-tr-[14px] top-0 w-[160.703px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-[12px] not-italic text-[13px] text-black top-[8px] whitespace-nowrap">안녕하세요! 반가워요 :)</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[15px] left-0 top-[37.5px] w-[327px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-0 whitespace-nowrap">오후 6:02</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute h-[52.5px] left-[16px] top-[139.75px] w-[327px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#534ab7] h-[35.5px] left-[105.97px] rounded-bl-[14px] rounded-br-[14px] rounded-tl-[14px] rounded-tr-[4px] top-0 w-[221.031px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-[12px] not-italic text-[13px] text-white top-[8px] whitespace-nowrap">반가워요! 이번 주 토요일 어때요?</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[15px] left-[284.77px] top-[37.5px] w-[42.234px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-0 whitespace-nowrap">오후 6:03</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[52.5px] left-[16px] top-[198.25px] w-[327px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[35.5px] left-0 rounded-bl-[14px] rounded-br-[14px] rounded-tl-[4px] rounded-tr-[14px] top-0 w-[190.453px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[19.5px] left-[12px] not-italic text-[13px] text-black top-[8px] whitespace-nowrap">좋아요! 충대 근처 어떠세요?</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[15px] left-0 top-[37.5px] w-[327px]" data-name="Container">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-0 whitespace-nowrap">오후 6:05</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[52.5px] left-[16px] top-[256.75px] w-[327px]" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[120.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px]">제휴 가게 리스트 보기</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[11.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#534ab7] text-[12px] whitespace-nowrap">→</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex h-[36px] items-center justify-between left-[16px] px-[14px] py-[10px] rounded-[10px] top-[319.25px] w-[327px]" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[581.5_0_0] min-h-px relative w-[359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container7 />
        <Container9 />
        <Container12 />
        <Container15 />
        <Container18 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1d9e75] h-[44px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[20px] left-[163.53px] not-italic text-[14px] text-center text-white top-[12px] whitespace-nowrap">약속 완료</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#f9fafb] flex-[281_0_0] h-[41.5px] min-w-px relative rounded-[33554400px]" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[14px] py-[10px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-[rgba(153,161,175,0.5)] whitespace-nowrap">메시지 입력...</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#534ab7] relative rounded-[33554400px] shrink-0 size-[38px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">→</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[41.5px] items-center relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Button1 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[120.5px] relative shrink-0 w-[359px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start pt-[11px] px-[16px] relative size-full">
        <Button />
        <Container20 />
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
        <Container6 />
        <Container19 />
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