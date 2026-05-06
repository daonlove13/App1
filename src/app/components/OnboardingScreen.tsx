import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Props {
  onDone: () => void;
}

const SLIDES = [
  {
    emoji: '🎓',
    title: '같은 학교,\n다른 학과',
    desc: '충북대학교 학생들끼리\n학과를 넘어 새로운 인연을 만들어요.',
  },
  {
    emoji: '👥',
    title: '팀으로 함께,\n2:2 또는 3:3',
    desc: '혼자가 아닌 팀으로 참여해요.\n부담 없이 즐거운 과팅이 시작돼요.',
  },
  {
    emoji: '✅',
    title: '학생증으로\n안전하게',
    desc: '학생증 인증을 통해\n재학생만 참여할 수 있어요.',
  },
];

export default function OnboardingScreen({ onDone }: Props) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;
  const current = SLIDES[slide];

  const next = () => {
    if (isLast) onDone();
    else setSlide(s => s + 1);
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px] flex flex-col">

      {/* 건너뛰기 */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={onDone}
          className="text-[13px] text-[#99a1af]"
        >
          건너뛰기
        </button>
      </div>

      {/* 슬라이드 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <div className="text-[80px] mb-10 leading-none">{current.emoji}</div>
        <h2 className="font-bold text-[28px] text-[#0a0a0a] mb-4 whitespace-pre-line leading-[38px]">
          {current.title}
        </h2>
        <p className="text-[15px] text-[#6a7282] leading-[24px] whitespace-pre-line">
          {current.desc}
        </p>
      </div>

      {/* 하단 영역 */}
      <div className="px-6 pb-[48px] flex flex-col gap-6 items-center">
        {/* 도트 인디케이터 */}
        <div className="flex gap-[6px]">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === slide ? 'w-[20px] bg-black' : 'w-[6px] bg-[#e5e7eb]'
              }`}
            />
          ))}
        </div>

        {/* 버튼 */}
        <button
          onClick={next}
          className="w-full bg-black text-white rounded-[15px] h-[56px] flex items-center justify-center gap-2"
        >
          <span className="text-[17px] font-semibold">
            {isLast ? '시작하기' : '다음'}
          </span>
          {!isLast && <ChevronRight size={18} strokeWidth={2.5} />}
        </button>
      </div>
    </div>
  );
}
