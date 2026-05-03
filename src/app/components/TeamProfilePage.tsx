import { ChevronLeft, Users } from 'lucide-react';
import type { RequestTeam } from './ReceivedRequestsPage';
import StatusBar from '../../imports/StatusBar/StatusBar';

interface Props {
  team: RequestTeam;
  onBack: () => void;
  onAccept: () => void;
  onReject: () => void;
}

const mockMembers = [
  { initial: '이', grade: '24학번' },
  { initial: '김', grade: '24학번' },
];

export default function TeamProfilePage({ team, onBack, onAccept, onReject }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">팀 프로필</p>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[130px] overflow-y-auto px-4 pt-[20px]">

        {/* 팀 메인 카드 */}
        <div className="bg-black rounded-[20px] p-[22px] mb-[16px]">
          <div className="flex items-start justify-between mb-[14px]">
            <div>
              <p className="text-white/60 text-[12px] mb-[4px]">{team.university} · {team.department}</p>
              <h2 className="text-white font-bold text-[22px] leading-[30px]">{team.name}</h2>
            </div>
            <div className="w-[48px] h-[48px] rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-[20px] font-bold">{team.initial}</span>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex gap-[6px] flex-wrap">
            {[team.size, team.matchType, team.university].map((tag, i) => (
              <span key={i} className="bg-white/15 text-white text-[11px] font-medium px-[10px] py-[4px] rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 팀원 */}
        <div className="mb-[16px]">
          <div className="flex items-center gap-[6px] mb-[10px]">
            <Users size={13} className="text-[#6a7282]" />
            <p className="text-[12px] text-[#6a7282]">팀원 {mockMembers.length}명</p>
          </div>
          <div className="flex flex-col gap-[8px]">
            {mockMembers.map((m, i) => (
              <div key={i} className="bg-[#f9fafb] rounded-[12px] px-[14px] py-[11px] flex items-center gap-[12px]">
                <div className="w-[36px] h-[36px] rounded-full bg-black flex items-center justify-center shrink-0">
                  <span className="text-white text-[13px] font-semibold">{m.initial}</span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#0a0a0a]">익명 {i + 1}</p>
                  <p className="text-[11px] text-[#6a7282]">{m.grade}</p>
                </div>
                {i === 0 && (
                  <span className="ml-auto text-[10px] text-[#6a7282] bg-[#e5e7eb] px-[8px] py-[2px] rounded-full">팀장</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 매칭 유형 정보 */}
        <div className="border border-[#e5e7eb] rounded-[14px] px-[16px] py-[14px] mb-[16px]">
          <p className="text-[12px] text-[#6a7282] mb-[8px]">매칭 정보</p>
          <div className="flex flex-col gap-[6px]">
            {[
              { label: '매칭 유형', value: team.matchType },
              { label: '인원 구성', value: team.size },
              { label: '신청 시각', value: team.receivedAt },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-[12px] text-[#6a7282]">{label}</span>
                <span className="text-[12px] font-medium text-[#0a0a0a]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-[#f9fafb] rounded-[12px] px-[14px] py-[12px]">
          <p className="text-[12px] text-[#6a7282] leading-[19px]">
            · 수락 시 채팅방이 열리고 약속을 잡을 수 있어요.<br />
            · 거절해도 상대에게 알림이 가지 않아요.
          </p>
        </div>
      </div>

      {/* 수락/거절 버튼 */}
      <div className="absolute bottom-[34px] left-0 right-0 px-4 flex flex-col gap-[10px] pt-[12px] bg-white border-t border-[#f3f4f6]">
        <button
          onClick={onAccept}
          className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold"
        >
          수락하기
        </button>
        <button
          onClick={onReject}
          className="w-full bg-white border-2 border-[#e5e7eb] text-[#6a7282] rounded-[14px] py-[14px] text-[15px] font-semibold"
        >
          거절하기
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}