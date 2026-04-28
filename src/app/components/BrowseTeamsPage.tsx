import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface BrowseTeam {
  id: number;
  name: string;
  university: string;
  department: string;
  size: string;
  matchType: string;
  initial: string;
  postedAt: string;
  image?: string;
}

interface Props {
  onBack: () => void;
  onApply: (team: BrowseTeam) => void;
}

const ALL_TEAMS: BrowseTeam[] = [
  { id: 1, name: '연세대 경영학과팀', university: '연세대', department: '경영학과', size: '2:2', matchType: '신입생 전용', initial: '연', postedAt: '5분 전' },
  { id: 2, name: '고려대 사회학과팀', university: '고려대', department: '사회학과', size: '2:2', matchType: '자유 매칭', initial: '고', postedAt: '12분 전' },
  { id: 3, name: '성균관대 미디어학과팀', university: '성균관대', department: '미디어학과', size: '2:2', matchType: '신입생 전용', initial: '성', postedAt: '23분 전' },
  { id: 4, name: '한양대 컴공과팀', university: '한양대', department: '컴퓨터공학과', size: '3:3', matchType: '자유 매칭', initial: '한', postedAt: '31분 전' },
  { id: 5, name: '이화여대 심리학과팀', university: '이화여대', department: '심리학과', size: '2:2', matchType: '신입생 전용', initial: '이', postedAt: '45분 전' },
];

const FILTERS = ['전체', '신입생 전용', '자유 매칭', '2:2', '3:3'];

export default function BrowseTeamsPage({ onBack, onApply }: Props) {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [applied, setApplied] = useState<number[]>([]);

  const filtered = ALL_TEAMS.filter(t => {
    if (activeFilter === '전체') return true;
    if (activeFilter === '2:2') return t.size === '2:2';
    if (activeFilter === '3:3') return t.size === '3:3';
    return t.matchType === activeFilter;
  });

  const handleApply = (team: BrowseTeam) => {
    setApplied(prev => [...prev, team.id]);
    onApply(team);
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6]">
        <div className="h-[56px] flex items-center px-4">
          <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
            <ChevronLeft size={16} />
            뒤로
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">과팅 신청</p>
          <button className="ml-auto p-1">
            <SlidersHorizontal size={20} className="text-[#0a0a0a]" />
          </button>
        </div>

        {/* 필터 바 */}
        <div className="flex gap-[8px] px-4 pb-[12px] overflow-x-auto no-scrollbar">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-[14px] py-[6px] rounded-full text-[12px] font-medium border transition-colors ${
                activeFilter === f
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[#6a7282] border-[#e5e7eb]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Team List */}
      <div className="absolute top-[148px] left-0 right-0 bottom-[34px] overflow-y-auto px-4 pt-[14px]">
        <p className="text-[11px] text-[#6a7282] mb-[12px]">총 {filtered.length}팀</p>

        <div className="flex flex-col gap-[10px]">
          {filtered.map(team => {
            const isApplied = applied.includes(team.id);
            return (
              <div key={team.id} className="border border-[#e5e7eb] rounded-[16px] px-[16px] py-[14px]">
                <div className="flex items-center gap-[12px] mb-[12px]">
                  {/* Avatar */}
                  <div className="w-[44px] h-[44px] rounded-full bg-black flex items-center justify-center shrink-0">
                    <span className="text-white text-[16px] font-semibold">{team.initial}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[14px] text-[#0a0a0a] truncate">{team.name}</p>
                    <p className="text-[12px] text-[#6a7282]">{team.university} · {team.department}</p>
                  </div>

                  <span className="text-[11px] text-[#99a1af] shrink-0">{team.postedAt}</span>
                </div>

                {/* 태그 + 신청 버튼 */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-[6px]">
                    {[team.size, team.matchType].map(tag => (
                      <span key={tag} className="bg-[#f3f4f6] text-[#6a7282] text-[11px] font-medium px-[10px] py-[4px] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => !isApplied && handleApply(team)}
                    className={`px-[14px] py-[7px] rounded-full text-[12px] font-semibold transition-colors ${
                      isApplied
                        ? 'bg-[#f3f4f6] text-[#99a1af]'
                        : 'bg-black text-white'
                    }`}
                  >
                    {isApplied ? '신청완료' : '신청하기'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-[20px]" />
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

export type { BrowseTeam };
