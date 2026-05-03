import { useState, useEffect } from 'react';
import { Bell, ChevronRight, Users } from 'lucide-react';
import StatusBar from '../../imports/StatusBar/StatusBar';
import BottomNav from './BottomNav';
import type { Team, TeamMember } from '../services/api';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  team: Team | null;
  onTabChange: (tab: Tab) => void;
  onOpenNotifications?: () => void;
  onApply?: () => void;
  onUpdateTeam?: (team: Team) => void;
  unreadCount?: number;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

export default function MatchingPage({ team, onTabChange, onOpenNotifications, onApply, onUpdateTeam, unreadCount = 0 }: Props) {
  const [teamSize, setTeamSize] = useState<'2v2' | '3v3'>(team?.size ?? '2v2');
  const [matchType, setMatchType] = useState<'freshman' | 'free'>('freshman');
  const [members, setMembers] = useState<TeamMember[]>(team?.members ?? []);
  const [saving, setSaving] = useState(false);

  // team 바뀌면 로컬 상태 동기화
  useEffect(() => {
    if (team) {
      setTeamSize(team.size);
      setMembers(team.members);
    }
  }, [team]);

  const removeMember = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const maxMembers = teamSize === '2v2' ? 2 : 3;

  const handleSave = async () => {
    if (!team) return;
    setSaving(true);
    try {
      await onUpdateTeam?.({
        ...team,
        size: teamSize,
        members,
        maxMembers,
      });
      onTabChange('home');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndApply = async () => {
    if (!team) return;
    setSaving(true);
    try {
      await onUpdateTeam?.({ ...team, size: teamSize, members, maxMembers });
      onApply?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]" data-name="MatchingPage">

      {/* ── Status bar ── */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      {/* ── Header ── */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-[#f3f4f6] h-[73px]">
        <span className="font-['Protest_Riot'] text-[22px] leading-[28px]">indeed</span>
        <button className="p-2 relative" onClick={onOpenNotifications}>
          <Bell size={24} />
          {unreadCount > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />}
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

          {/* 팀이 없을 때 안내 */}
          {!team && (
            <div className="bg-[#f9fafb] rounded-[14px] p-4 text-center">
              <p className="text-[14px] font-medium text-[#0a0a0a] mb-1">아직 팀이 없어요</p>
              <p className="text-[12px] text-[#6a7282]">홈에서 팀을 먼저 만들어주세요</p>
            </div>
          )}

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
              팀원 구성{team ? <span className="text-[#0a0a0a]"> ({team.gender})</span> : ''}
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
                { key: 'free',     label: '자유 매칭' },
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
              onClick={handleSave}
              disabled={saving || !team}
              className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold active:bg-gray-800 disabled:opacity-50"
            >
              {saving ? '저장 중...' : '저장하고 돌아가기'}
            </button>
            <button
              onClick={handleSaveAndApply}
              disabled={saving || !team}
              className="w-full bg-white border-2 border-black text-black rounded-[14px] py-[14px] text-[15px] font-semibold active:bg-gray-100 disabled:opacity-50"
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