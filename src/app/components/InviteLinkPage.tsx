import { useState } from 'react';
import { ChevronLeft, Copy, Check, Link2 } from 'lucide-react';

interface Props {
  teamName?: string;
  size?: '2v2' | '3v3';
  gender?: '남성' | '여성';
  onBack: () => void;
  onDone: () => void;
}

export default function InviteLinkPage({
  teamName = '충북대 심리학과팀',
  size = '3v3',
  gender = '남성',
  onBack,
  onDone,
}: Props) {
  const [copied, setCopied] = useState(false);
  const inviteLink = 'indeed.app/join/INDEE-7283';
  const maxMembers = size === '2v2' ? 2 : 3;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          이전
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">팀원 초대</p>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[34px] px-5 pt-7">

        {/* Title */}
        <div className="mb-7">
          <h2 className="text-[22px] font-bold text-[#0a0a0a] mb-2">
            같은 과 친구를<br />초대해보세요
          </h2>
          <p className="text-[13px] text-[#6a7282]">링크를 공유하면 바로 팀에 합류할 수 있어요</p>
        </div>

        {/* Team Summary Card */}
        <div className="bg-black rounded-[20px] p-5 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white/50 text-[11px] tracking-[1px] mb-1">우리 팀</p>
              <p className="text-white font-bold text-[18px]">{teamName}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {size === '2v2' ? '2:2' : '3:3'}
              </span>
              <span className="bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                {gender}
              </span>
            </div>
          </div>
          {/* Member slots */}
          <div className="flex gap-2 mt-3">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1">
              <div className="w-[5px] h-[5px] rounded-full bg-white" />
              <span className="text-white text-[12px]">홍길동 (나)</span>
              <span className="text-white/40 text-[10px]">팀장</span>
            </div>
            {Array.from({ length: maxMembers - 1 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5 border border-dashed border-white/30 rounded-full px-3 py-1">
                <span className="text-white/40 text-[12px]">대기 중</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Link */}
        <p className="text-[12px] text-[#6a7282] mb-2 font-medium">초대 링크</p>
        <div className="border-2 border-[#e5e7eb] rounded-[14px] px-4 py-[14px] flex items-center gap-3 mb-3">
          <Link2 size={16} className="text-[#99a1af] shrink-0" />
          <span className="text-[13px] text-[#0a0a0a] flex-1 truncate font-mono">{inviteLink}</span>
          <button
            onClick={handleCopy}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
              copied ? 'bg-black text-white' : 'bg-[#f3f4f6] text-[#0a0a0a]'
            }`}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? '복사됨' : '복사'}
          </button>
        </div>
        <p className="text-[11px] text-[#99a1af] mb-6">· 링크는 72시간 동안 유효해요 &nbsp;·&nbsp; 같은 과 학생만 참여 가능해요</p>

        {/* Share Buttons */}
        <p className="text-[12px] text-[#6a7282] mb-3 font-medium">공유하기</p>
        <div className="flex flex-col gap-3">
          {/* KakaoTalk */}
          <button className="w-full rounded-[14px] py-[14px] flex items-center justify-center gap-2 text-[15px] font-semibold"
            style={{ backgroundColor: '#FEE500', color: '#191919' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M10 2C5.582 2 2 4.91 2 8.49c0 2.25 1.418 4.23 3.572 5.42L4.7 17.25c-.073.27.198.49.44.34l4.13-2.74c.24.02.482.03.73.03 4.418 0 8-2.91 8-6.49C18 4.91 14.418 2 10 2Z" fill="#191919"/>
            </svg>
            카카오톡으로 공유
          </button>

          {/* Other share */}
          <button
            onClick={handleCopy}
            className="w-full bg-[#f3f4f6] text-[#0a0a0a] rounded-[14px] py-[14px] text-[15px] font-medium"
          >
            다른 방법으로 공유
          </button>
        </div>

        {/* Done button */}
        <button
          onClick={onDone}
          className="w-full mt-4 border-2 border-[#e5e7eb] text-[#6a7282] rounded-[14px] py-[13px] text-[14px] font-medium"
        >
          나중에 초대할게요
        </button>
      </div>
    </div>
  );
}