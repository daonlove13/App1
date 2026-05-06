import { ChevronLeft, Users } from 'lucide-react';
import type { RequestTeam } from './ReceivedRequestsPage';

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

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">팀 프로필</p>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[96px] overflow-y-auto px-4 pt-[20px]">

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

          <div className="flex gap-[6px] flex-wrap">
            {[team.size, team.matchType, team.university].map((tag, i) => (
              <span key={i} className="bg-white/15 text-white text-[11px] font-medium px-[10px] py-[4px] rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 팀원 */}
        <div className="border border-[#e5e7eb] rounded-[16px] px-4 pt-[16px] pb-[14px] mb-[14px]">
          <div className="flex items-center gap-2 mb-[12px]">
            <Users size={14} className="text-[#6a7282]" />
            <p className="text-[12px] font-semibold text-[#6a7282]">팀원 ({mockMembers.length}명)</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            {mockMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-[10px]">
                <div className="w-[36px] h-[36px] rounded-full bg-[#f3f4f6] flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-[#0a0a0a]">{m.initial}</span>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#0a0a0a]">{m.initial}OO</p>
                  <p className="text-[11px] text-[#6a7282]">{m.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-[#f9fafb] rounded-[12px] px-[14px] py-[12px]">
          <p className="text-[12px] text-[#4a5565] leading-[19px]">
            수락하면 채팅방이 열리고 과팅이 시작돼요.<br />
            거절하면 상대 팀에게 알림이 전송돼요.
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="absolute bottom-[0px] left-0 right-0 px-4 pb-[20px] pt-[12px] bg-white border-t border-[#f3f4f6] flex gap-3">
        <button
          onClick={onReject}
          className="flex-1 py-[14px] rounded-[14px] border-2 border-[#e5e7eb] text-[#6a7282] font-semibold text-[15px]"
        >
          거절하기
        </button>
        <button
          onClick={onAccept}
          className="flex-1 py-[14px] rounded-[14px] bg-black text-white font-semibold text-[15px]"
        >
          수락하기
        </button>
      </div>
    </div>
  );
}
