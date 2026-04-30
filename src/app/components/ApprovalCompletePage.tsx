import { CheckCircle } from 'lucide-react';

interface Props {
  onDone: () => void;
}

export default function ApprovalCompletePage({ onDone }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* Status bar */}
      <div className="absolute h-[44px] top-0 left-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">
          3:14
        </p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center justify-center border-b border-[#f3f4f6]">
        <span className="font-['Protest_Riot'] text-[20px] text-black">indeed</span>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[100px] flex flex-col items-center justify-center px-[30px] text-center">
        {/* Icon */}
        <div className="w-[100px] h-[100px] bg-black rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={52} className="text-white" strokeWidth={1.5} />
        </div>

        <h1 className="font-bold text-[30px] text-[#0a0a0a] mb-3 leading-[38px]">
          승인됐어요!
        </h1>
        <p className="text-[15px] text-[#6a7282] leading-[24px] mb-10">
          학생증 인증이 완료됐어요.<br />
          이제 팀을 만들고 과팅을 시작해보세요!
        </p>

        {/* Step preview */}
        <div className="w-full bg-[#f9fafb] rounded-[20px] p-5">
          <p className="text-[12px] font-semibold text-[#6a7282] uppercase tracking-wide mb-4">
            이제 이렇게 해보세요
          </p>
          {[
            { step: '01', text: '같은 과 친구들이랑 팀 만들기', icon: '👥' },
            { step: '02', text: '초대 링크로 팀원 초대하기', icon: '🔗' },
            { step: '03', text: '과팅 신청 후 매칭 기다리기', icon: '💌' },
          ].map(({ step, text, icon }) => (
            <div
              key={step}
              className="flex items-center gap-3 py-2.5 border-b border-[#f3f4f6] last:border-0"
            >
              <div className="w-[34px] h-[34px] rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-[16px]">{icon}</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-[#99a1af] font-semibold uppercase tracking-wide leading-none mb-0.5">
                  STEP {step}
                </p>
                <p className="text-[14px] text-[#0a0a0a] font-medium">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={onDone}
          className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold"
        >
          팀 만들러 가기
        </button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
