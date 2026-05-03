import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import StatusBar from '../../imports/StatusBar/StatusBar';

interface Slide {
  emoji: string;
  title: string;
  body: string;
}

const slides: Slide[] = [
  {
    emoji: '?',
    title: '같은 학교,\n다른 학과 친구들',
    body: '?indeed에서 새로운 만남을 시작하세요.\n학생증 인증된 친구들만 만날 수 있어요.',
  },
  {
    emoji: '👥',
    title: '같은 과 친구와\n팀을 만들어요',
    body: '2:2, 3:3 인원으로 팀을 꾸리고\n초대 링크로 친구를 불러보세요.',
  },
  {
    emoji: '💌',
    title: '매칭되면\n바로 채팅 시작',
    body: '서로 마음에 들면 채팅이 열려요.\n약속 잡고 학교 근처에서 만나요!',
  },
];

export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const isLast = idx === slides.length - 1;
  const slide = slides[idx];

  const next = () => (isLast ? onDone() : setIdx(idx + 1));

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      {/* Skip */}
      <div className="absolute top-[44px] right-4 h-[56px] flex items-center">
        <button onClick={onDone} className="text-[13px] text-[#6a7282]">건너뛰기</button>
      </div>

      {/* Hero */}
      <div className="absolute top-[140px] left-0 right-0 flex flex-col items-center px-8">
        <div className="w-[140px] h-[140px] rounded-full bg-black flex items-center justify-center mb-10">
          <span className={idx === 0 ? "font-['Protest_Riot'] text-white text-[80px] leading-none" : 'text-[64px]'}>
            {slide.emoji}
          </span>
        </div>
        <h1 className="font-bold text-[26px] text-[#0a0a0a] text-center leading-[34px] whitespace-pre-line mb-4">
          {slide.title}
        </h1>
        <p className="text-[14px] text-[#6a7282] text-center leading-[22px] whitespace-pre-line">
          {slide.body}
        </p>
      </div>

      {/* Dots */}
      <div className="absolute bottom-[160px] left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-[6px] rounded-full transition-all ${i === idx ? 'w-6 bg-black' : 'w-[6px] bg-[#e5e7eb]'}`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={next}
          className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold flex items-center justify-center gap-1 active:bg-gray-800"
        >
          {isLast ? '시작하기' : '다음'} <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}