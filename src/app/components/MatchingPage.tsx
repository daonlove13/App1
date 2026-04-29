import { useState } from 'react';
import { Bell, X, UserPlus } from 'lucide-react';
import BottomNav from './BottomNav';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Member {
  id: number;
  name: string;
  role: '팀장' | '팀원';
  initial: string;
}

interface Props {
  onTabChange: (tab: Tab) => void;
  onOpenNotifications?: () => void;
  onApply?: () => void;
}

export default function MatchingPage({ onTabChange, onOpenNotifications, onApply }: Props) {
  const [teamSize, setTeamSize] = useState<'2v2' | '3v3'>('2v2');
  const [matchType, setMatchType] = useState<'freshman' | 'free'>('freshman');
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: '홍길동', role: '팀장', initial: '나' },
    { id: 2, name: '김민준', role: '팀원', initial: '김' },
  ]);

  const removeMember = (id: number) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const maxMembers = teamSize === '2v2' ? 2 : 3;

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]" data-name="MatchingPage">

      {/* ── Status bar ── */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* ── Header ── */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-[#f3f4f6] h-[73px]">
        <div className="flex items-center gap-2">
          <span className="font-['Protest_Riot'] text-[22px] leading-[28px]">indeed</span>
        </div>
        <button className="p-2 relative" onClick={onOpenNotifications}>
          <Bell size={24} />
          <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="absolute top-[117px] left-0 right-0 bottom-[90px] overflow-y-auto">

        {/* 서브 타이틀 */}
        <div className="px-4 pt-5 pb-4 border-b border-[#f3f4f6]">
          <h2 className="font-bold text-[18px] text-[#0a0a0a]">매칭 설정</h2>
          <p className="text-[12px] text-[#6a7282] mt-[2px]">팀 정보를 설정하고 과팅을 신청하세요</p>
        </div>

        <div className="px-4 pt-5 pb-4 flex flex-col gap-6">

          {/* 인원 선택 */}
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[10px]">인원 선택</p>
            <div className="grid grid-cols-2 gap-3">
              {(['2v2', '3v3'] as const).map(size => {
                const isSelected = teamSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setTeamSize(size)}
                    className={`rounded-[14px] py-[18px] border-2 transition-colors ${
                      isSelected ? 'bg-black border-black' : 'bg-[#f9fafb] border-[#e5e7eb]'
                    }`}
                  >
                    <div className={`text-[22px] font-bold leading-[28px] ${isSelected ? 'text-white' : 'text-[#0a0a0a]'}`}>
                      {size === '2v2' ? '2 : 2' : '3 : 3'}
                    </div>
                    <div className={`text-[11px] mt-[4px] ${isSelected ? 'text-white/60' : 'text-[#6a7282]'}`}>
                      {size === '2v2' ? '소규모' : '기본'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 팀원 구성 */}
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[10px]">
              팀원 구성 <span className="text-[#0a0a0a]">(심리학과만)</span>
            </p>
            <div className="flex flex-col gap-2">
              {members.map(member => (
                <div
                  key={member.id}
                  className="bg-[#f9fafb] rounded-[10px] px-3 py-[10px] flex items-center gap-3"
                >
                  <div className="w-[38px] h-[38px] rounded-full bg-black flex items-center justify-center shrink-0">
                    <span className="text-white text-[13px] font-semibold">{member.initial}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#0a0a0a] leading-[20px]">{member.name}</p>
                    <p className="text-[11px] text-[#6a7282]">{member.role}</p>
                  </div>
                  {member.role !== '팀장' && (
                    <button onClick={() => removeMember(member.id)} className="p-1 shrink-0">
                      <X size={16} className="text-[#99a1af]" />
                    </button>
                  )}
                </div>
              ))}

              {/* 빈 슬롯 */}
              {members.length < maxMembers && Array.from({ length: maxMembers - members.length }).map((_, i) => (
                <button
                  key={`empty-${i}`}
                  className="bg-[#f9fafb] rounded-[10px] px-3 py-[10px] flex items-center gap-3 border-2 border-dashed border-[#e5e7eb]"
                >
                  <div className="w-[38px] h-[38px] rounded-full border-2 border-[#e5e7eb] flex items-center justify-center shrink-0">
                    <UserPlus size={16} className="text-[#d1d5dc]" />
                  </div>
                  <p className="text-[13px] text-[#99a1af]">팀원 초대하기</p>
                </button>
              ))}
            </div>
          </div>

          {/* 매칭 유형 */}
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[10px]">매칭 유형</p>
            <div className="flex gap-2 flex-wrap">
              {([
                { key: 'freshman', label: '신입생 전용' },
                { key: 'free', label: '자유 매칭' },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setMatchType(key)}
                  className={`px-[14px] py-[5px] rounded-full text-[12px] border transition-colors ${
                    matchType === key
                      ? 'bg-black border-black text-white'
                      : 'bg-[#f9fafb] border-[#e5e7eb] text-[#6a7282]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onTabChange('home')}
              className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold active:bg-gray-800"
            >
              저장하고 돌아가기
            </button>
            <button
              onClick={onApply}
              className="w-full bg-white border-2 border-black text-black rounded-[14px] py-[14px] text-[15px] font-semibold active:bg-gray-100"
            >
              저장하고 즉시 매칭 →
            </button>
          </div>

        </div>
      </div>

      <BottomNav active="matching" onTabChange={onTabChange} />
    </div>
  );
}
