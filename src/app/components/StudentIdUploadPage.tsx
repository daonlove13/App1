import { useState } from 'react';
import { Camera, CheckCircle, Upload } from 'lucide-react';

interface Props {
  onDone: () => void;
}

export default function StudentIdUploadPage({ onDone }: Props) {
  const [state, setState] = useState<'idle' | 'uploaded' | 'pending'>('idle');

  const handleUpload = () => {
    setState('uploaded');
    setTimeout(() => setState('pending'), 800);
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center justify-center px-4">
        <div className="flex items-center gap-2">
          <span className="font-['Protest_Riot'] text-[22px] leading-[28px]">?</span>
          <span className="font-['Protest_Riot'] text-[18px] leading-[26px]">indeed</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[34px] px-5 pt-8 flex flex-col">

        {state !== 'pending' ? (
          <>
            {/* Title */}
            <div className="mb-8">
              <p className="text-[12px] text-[#99a1af] mb-1">마지막 단계</p>
              <h2 className="text-[24px] font-bold text-[#0a0a0a] leading-[32px] mb-2">
                학생증을<br />인증해주세요
              </h2>
              <p className="text-[14px] text-[#6a7282] leading-[22px]">
                재학 중인 학교 학생증 사진을 올려주세요.<br />
                확인 후 24시간 내 승인돼요.
              </p>
            </div>

            {/* Upload Area */}
            <button
              onClick={handleUpload}
              className={`flex-1 max-h-[300px] border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.98]
                ${state === 'uploaded' ? 'border-black bg-[#f9fafb]' : 'border-[#d1d5dc] bg-[#f9fafb]'}`}
            >
              {state === 'uploaded' ? (
                <>
                  <CheckCircle size={48} className="text-black" strokeWidth={1.5} />
                  <p className="text-[15px] font-semibold text-black">업로드 완료!</p>
                </>
              ) : (
                <>
                  <div className="w-[72px] h-[72px] bg-black rounded-full flex items-center justify-center">
                    <Camera size={32} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-semibold text-[#0a0a0a] mb-1">사진 찍기 또는 불러오기</p>
                    <p className="text-[13px] text-[#99a1af]">학생증이 잘 보이게 촬영해주세요</p>
                  </div>
                </>
              )}
            </button>

            {/* Tips */}
            <div className="bg-[#f9fafb] rounded-[14px] p-4 mt-5">
              <p className="text-[12px] text-[#6a7282] leading-[20px]">
                · 이름, 학번, 학교명이 모두 보여야 해요<br />
                · 모자이크나 가림 없이 선명하게 찍어주세요<br />
                · 제출 정보는 인증 목적으로만 사용돼요
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={handleUpload}
              className="mt-5 w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              갤러리에서 선택
            </button>
          </>
        ) : (
          /* Pending State */
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <div className="w-[88px] h-[88px] bg-black rounded-full flex items-center justify-center mb-6">
              <span className="text-white font-['Protest_Riot'] text-[40px]">?</span>
            </div>
            <h2 className="text-[24px] font-bold text-[#0a0a0a] mb-3">심사 중이에요</h2>
            <p className="text-[14px] text-[#6a7282] leading-[22px] mb-8">
              학생증을 확인하고 있어요.<br />
              보통 24시간 내로 승인돼요.
            </p>

            <div className="w-full bg-[#f9fafb] rounded-[20px] p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                <span className="text-[14px] font-semibold text-[#0a0a0a]">승인 대기 중</span>
              </div>
              <p className="text-[12px] text-[#6a7282] leading-[19px] text-left">
                승인이 완료되면 알림을 보내드려요.<br />
                앱을 종료해도 괜찮아요.
              </p>
            </div>

            <button
              onClick={onDone}
              className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold"
            >
              홈으로 이동
            </button>
          </div>
        )}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
