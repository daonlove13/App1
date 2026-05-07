import { XCircle } from 'lucide-react';

interface Props {
  reason?: string;
  onRetry: () => void;
}

export default function RejectionPage({ reason, onRetry }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 h-[56px] flex items-center justify-center border-b border-[#f3f4f6]">
        <span className="font-['Protest_Riot'] text-[20px] text-black">indeed</span>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[100px] flex flex-col items-center justify-center px-[30px] text-center">
        {/* Icon */}
        <div className="w-[100px] h-[100px] bg-[#f3f4f6] rounded-full flex items-center justify-center mb-8">
          <XCircle size={52} className="text-[#e24b4a]" strokeWidth={1.5} />
        </div>

        <h1 className="font-bold text-[28px] text-[#0a0a0a] mb-3 leading-[36px]">
          인증이 거부됐어요
        </h1>
        <p className="text-[15px] text-[#6a7282] leading-[24px] mb-6">
          학생증 인증이 확인되지 않았어요.<br />
          아래 사유를 확인하고 다시 시도해주세요.
        </p>

        {/* 거부 사유 */}
        {reason && (
          <div className="w-full bg-[#fff5f5] border border-[#fecaca] rounded-[16px] p-5 mb-6 text-left">
            <p className="text-[12px] font-semibold text-[#e24b4a] mb-2">거부 사유</p>
            <p className="text-[14px] text-[#0a0a0a] leading-[22px]">{reason}</p>
          </div>
        )}

        {/* 안내 */}
        <div className="w-full bg-[#f9fafb] rounded-[16px] p-5 text-left">
          <p className="text-[12px] font-semibold text-[#6a7282] mb-3">다시 시도할 때 확인해주세요</p>
          {[
            '학생증 전체가 선명하게 보여야 해요',
            '이름과 학번이 잘 보여야 해요',
            '모바일 학생증 앱 화면을 캡처해주세요',
          ].map((tip, i) => (
            <p key={i} className="text-[13px] text-[#6a7282] leading-[22px]">· {tip}</p>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="absolute bottom-[24px] left-[30px] right-[30px]">
        <button
          onClick={onRetry}
          className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold"
        >
          다시 업로드하기
        </button>
      </div>
    </div>
  );
}
