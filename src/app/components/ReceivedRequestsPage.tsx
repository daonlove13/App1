import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RequestTeam {
  id: number;
  name: string;
  university: string;
  department: string;
  size: string;
  initial: string;
  receivedAt: string;
  matchType: string;
}

interface Props {
  onBack: () => void;
  onViewTeam: (team: RequestTeam) => void;
}

const requests: RequestTeam[] = [
  {
    id: 1,
    name: '연세대 경영학과팀',
    university: '연세대',
    department: '경영학과',
    size: '2:2',
    initial: '연',
    receivedAt: '방금 전',
    matchType: '신입생 전용',
  },
  {
    id: 2,
    name: '고려대 사회학과팀',
    university: '고려대',
    department: '사회학과',
    size: '2:2',
    initial: '고',
    receivedAt: '13분 전',
    matchType: '자유 매칭',
  },
  {
    id: 3,
    name: '충북대 컴퓨터공학과팀',
    university: '충북대',
    department: '컴퓨터공학과',
    size: '2:2',
    initial: '충',
    receivedAt: '1시간 전',
    matchType: '신입생 전용',
  },
];

export { type RequestTeam };

export default function ReceivedRequestsPage({ onBack, onViewTeam }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">받은 신청</p>
        <div className="ml-auto bg-black text-white text-[11px] font-bold px-[10px] py-[4px] rounded-full">
          {requests.length}
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[34px] overflow-y-auto">

        {/* 안내 배너 */}
        <div className="mx-4 mt-[16px] mb-[12px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[12px] px-[14px] py-[12px]">
          <p className="text-[12px] text-[#4a5565] leading-[19px]">
            신청은 <span className="font-semibold text-black">24시간</span> 내에 수락하지 않으면 자동으로 만료돼요.<br />
            팀 프로필을 확인한 후 수락 또는 거절해주세요.
          </p>
        </div>

        <p className="px-4 text-[11px] text-[#6a7282] mb-[10px]">신청 목록</p>

        <div className="flex flex-col">
          {requests.map((team, idx) => (
            <button
              key={team.id}
              onClick={() => onViewTeam(team)}
              className={`w-full px-4 py-[16px] flex items-center gap-[14px] border-b border-[#f9fafb] active:bg-[#f9fafb] ${idx === 0 ? 'border-t border-[#f9fafb]' : ''}`}
            >
              {/* Avatar */}
              <div className="w-[46px] h-[46px] rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-white text-[16px] font-semibold">{team.initial}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-[6px] mb-[3px]">
                  <span className="font-semibold text-[14px] text-[#0a0a0a]">{team.name}</span>
                  <span className="shrink-0 bg-[#f3f4f6] text-[#6a7282] text-[10px] font-semibold px-[8px] py-[2px] rounded-full">{team.matchType}</span>
                </div>
                <p className="text-[12px] text-[#6a7282]">{team.university} · {team.department} · {team.size}</p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-[4px] shrink-0">
                <span className="text-[11px] text-[#99a1af]">{team.receivedAt}</span>
                <ChevronRight size={14} className="text-[#d1d5dc]" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}