import { MessageCircle, X } from 'lucide-react';

interface Props {
  department?: string;
  onGoToChat: () => void;
  onLater: () => void;
}

export default function MatchSuccessPage({ department = '경영학과', onGoToChat, onLater }: Props) {
  return (
    <div className="bg-black overflow-clip relative rounded-[40px] w-[390px] h-[844px] flex flex-col">

      {/* Close button */}
      <div className="absolute top-[16px] right-4 z-10">
        <button onClick={onLater} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          <X size={18} className="text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6">

        {/* Logo Animation */}
        <div className="relative mb-10">
          {/* Glow rings */}
          <div className="absolute inset-0 -m-6 rounded-full border border-white/10" />
          <div className="absolute inset-0 -m-12 rounded-full border border-white/5" />
          <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-['Protest_Riot'] text-[52px] leading-none">?</span>
          </div>
        </div>

        {/* Text */}
        <p className="text-white/50 text-[13px] tracking-[2px] uppercase mb-3">Match!</p>
        <h1 className="text-white text-[30px] font-bold text-center leading-[38px] mb-3">
          매칭됐습니다!
        </h1>
        <p className="text-white/70 text-[16px] text-center leading-[24px] mb-2">
          <span className="text-white font-semibold">{department} 팀</span>과<br />
          매칭이 성사됐어요
        </p>

        {/* Match Info Card */}
        <div className="w-full bg-white/10 rounded-[20px] p-5 mt-8 mb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <p className="text-white/50 text-[11px] mb-1">우리 팀</p>
              <p className="text-white font-semibold text-[14px]">충북대 심리학과</p>
              <p className="text-white/50 text-[12px]">3명</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-px bg-white/30" />
              <span className="text-white/60 text-[11px] font-bold">VS</span>
              <div className="w-8 h-px bg-white/30" />
            </div>
            <div className="text-center flex-1">
              <p className="text-white/50 text-[11px] mb-1">상대 팀</p>
              <p className="text-white font-semibold text-[14px]">충북대 {department}</p>
              <p className="text-white/50 text-[12px]">3명</p>
            </div>
          </div>
          <div className="border-t border-white/10 pt-4">
            <p className="text-white/40 text-[11px] text-center">
              채팅방이 개설됐어요 · 7일 후 자동 종료
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="px-5 pb-[24px] flex flex-col gap-3 shrink-0">
        <button
          onClick={onGoToChat}
          className="w-full bg-white text-black rounded-[14px] py-[15px] text-[15px] font-semibold flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} strokeWidth={2} />
          채팅하러 가기
        </button>
        <button
          onClick={onLater}
          className="w-full bg-white/10 text-white rounded-[14px] py-[14px] text-[15px] font-medium"
        >
          나중에 할게요
        </button>
      </div>
    </div>
  );
}