import { useState } from 'react';
import { Heart, Search, Bell, ChevronRight, Users, UserPlus } from 'lucide-react';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface TeamMember {
  name: string;
  role: '팀장' | '팀원';
}

interface MyTeam {
  university: string;
  department: string;
  studentId: string;
  userName: string;
  teamName: string;
  members: TeamMember[];
  maxMembers: number;
}

interface RestaurantCard {
  id: number;
  name: string;
  location: string;
  district: string;
  teamCount: number;
  seats: number;
}

// ─── 팀 없는 상태 StatusCard ───────────────────────────────────────────────
function NoTeamStatusCard({ onCreateTeam }: { onCreateTeam: () => void }) {
  return (
    <div className="bg-black rounded-[20px] p-6 mb-4">
      <div className="text-white/70 text-[14px] mb-3">충북대 · 심리학과 · 2099123456 · 홍길동</div>
      <h2 className="text-white text-[24px] font-bold mb-2">팀이 없어요</h2>
      <p className="text-white/80 text-[14px] mb-5 leading-[20px]">
        같은 과 친구들이랑 팀 만들고<br />과팅을 시작해보세요!
      </p>
      <button
        className="bg-white text-black px-5 py-[8px] rounded-full text-[14px] font-semibold inline-flex items-center gap-1"
        onClick={onCreateTeam}
      >
        팀 만들기 <ChevronRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}

// ─── 팀 있는 상태 StatusCard ────────────────────────────────────────────────
function HasTeamStatusCard({
  team,
  onInviteTeam,
  initialApplied = false,
}: {
  team: MyTeam;
  onInviteTeam: () => void;
  initialApplied?: boolean;
}) {
  const [applied, setApplied] = useState(initialApplied);

  return (
    <div className="bg-black rounded-[20px] p-6 mb-4">
      <div className="text-white/70 text-[14px] mb-4">
        {team.university} · {team.department} · {team.studentId} · {team.userName}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-white text-[22px] font-bold">{team.teamName}</h2>
        {applied && (
          <span className="bg-white/20 text-white text-[12px] font-bold px-3 py-1 rounded-full">
            대기중
          </span>
        )}
      </div>
      <div className="mb-5">
        <div className="flex items-center gap-1 mb-2">
          <Users size={14} className="text-white/60" />
          <span className="text-white/60 text-[12px]">팀원 {team.members.length}/{team.maxMembers}명</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {team.members.map((member, idx) => (
            <div key={idx} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
              <div className="w-[6px] h-[6px] rounded-full bg-white" />
              <span className="text-white text-[12px]">{member.name}</span>
              {member.role === '팀장' && (
                <span className="text-white/50 text-[10px]">팀장</span>
              )}
            </div>
          ))}
          {team.members.length < team.maxMembers && (
            <button
              onClick={onInviteTeam}
              className="flex items-center gap-1.5 border border-white/30 rounded-full px-3 py-1 active:bg-white/10"
            >
              <UserPlus size={11} className="text-white/50" />
              <span className="text-white/50 text-[12px]">초대하기</span>
            </button>
          )}
        </div>
      </div>

      {applied ? (
        <div className="bg-white/10 rounded-[12px] px-5 py-[12px] flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-[5px] h-[5px] bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-white/70 text-[14px] font-medium">대기 중</span>
        </div>
      ) : (
        <button
          onClick={() => setApplied(true)}
          className="w-full bg-white text-black py-[10px] rounded-full text-[14px] font-semibold inline-flex items-center justify-center gap-1"
        >
          과팅 신청하기 <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

// ─── 통계 섹션 ──────────────────────────────────────────────────────────────
function StatsSection({ hasTeam }: { hasTeam: boolean }) {
  const stats = hasTeam
    ? [
        { value: 12, label: '오늘 신청' },
        { value: 8, label: '여자 대기' },
        { value: 6, label: '오늘 매칭' },
      ]
    : [
        { value: 12, label: '남자 대기' },
        { value: 8, label: '여자 대기' },
        { value: 6, label: '오늘 매칭' },
      ];

  return (
    <div className="grid grid-cols-3 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <div className="text-[30px] font-bold text-black leading-[36px]">{stat.value}</div>
          <div className="text-[12px] text-[#6a7282] mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 식당 카드 (이미지 없음) ──────────────────────────────────────────────────
function RestaurantListItem({ item }: { item: RestaurantCard }) {
  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] border border-[#f3f4f6]">
      {/* 빈 이미지 영역 */}
      <div className="h-[100px] bg-[#f3f4f6] flex items-center justify-center">
        <span className="text-[#d1d5dc] text-[11px]">사진 준비 중</span>
      </div>
      <div className="pt-2.5 px-3 pb-3">
        <h3 className="font-bold text-[13px] text-[#0a0a0a] mb-0.5 leading-[18px]">{item.name}</h3>
        <p className="text-[11px] text-[#6a7282]">{item.location} · {item.district}</p>
      </div>
    </div>
  );
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function MainHome({
  hasTeam,
  onTabChange,
  onCreateTeam,
  onInviteTeam,
  appliedState = false,
}: {
  hasTeam: boolean;
  onTabChange: (tab: Tab) => void;
  onCreateTeam: () => void;
  onInviteTeam: () => void;
  appliedState?: boolean;
}) {
  const myTeam: MyTeam = {
    university: '충북대',
    department: '심리학과',
    studentId: '2099123456',
    userName: '홍길동',
    teamName: '충북대 심리학과팀',
    members: [
      { name: '홍길동', role: '팀장' },
      { name: '김민준', role: '팀원' },
    ],
    maxMembers: 3,
  };

  const restaurants: RestaurantCard[] = [
    { id: 1, name: '치킨앤비어 중대점', location: '서울', district: '도봉구', teamCount: 3, seats: 20 },
    { id: 2, name: '물맥주 중대점', location: '서울', district: '도봉구', teamCount: 3, seats: 16 },
    { id: 3, name: '청춘삼겹 중대점', location: '서울', district: '도봉구', teamCount: 2, seats: 24 },
    { id: 4, name: '호프마을 중대점', location: '서울', district: '도봉구', teamCount: 4, seats: 30 },
  ];

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]" data-name="MainHome">

      {/* ── Status bar ── */}
      <div className="absolute h-[44px] left-0 overflow-clip top-0 w-[390px]">
        <div className="absolute bg-white h-[44px] left-0 top-0 w-[390px]" />
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-[normal] left-[20px] not-italic text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* ── Header ── */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-[#f3f4f6]">
        <div className="flex items-center gap-2">
          <span className="font-['Protest_Riot'] text-[24px] leading-[32px]">?</span>
          <span className="font-['Protest_Riot'] text-[20px] leading-[28px]">indeed</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2"><Search size={24} /></button>
          <button className="p-2 relative">
            <Bell size={24} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="absolute top-[110px] left-0 right-0 bottom-[90px] overflow-y-auto px-4 pt-4">
        {hasTeam
          ? <HasTeamStatusCard team={myTeam} onInviteTeam={onInviteTeam} initialApplied={appliedState} />
          : <NoTeamStatusCard onCreateTeam={onCreateTeam} />
        }

        <StatsSection hasTeam={hasTeam} />

        {/* 근처 식당 */}
        <div className="mb-4">
          <h2 className="font-bold text-[18px] text-[#0a0a0a] mb-3">근처 식당</h2>
          <div className="grid grid-cols-2 gap-3">
            {restaurants.map((item) => (
              <RestaurantListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="absolute bottom-[34px] left-0 right-0 bg-white border-t border-[#f3f4f6] px-4 pt-[13px] h-[56px]">
        <div className="flex items-center justify-around">
          <button onClick={() => onTabChange('home')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-[4px] bg-black rounded-full" />
            <span className="text-[12px] font-medium text-[#0a0a0a]">홈</span>
          </button>
          <button onClick={() => onTabChange('matching')} className="flex flex-col items-center gap-1">
            <Heart size={24} className="text-[#99a1af]" />
            <span className="text-[12px] text-[#99a1af]">매칭</span>
          </button>
          <button onClick={() => onTabChange('chat')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-[#99a1af] rounded-full" />
            <span className="text-[12px] text-[#99a1af]">채팅</span>
          </button>
          <button onClick={() => onTabChange('my')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-[#99a1af] rounded-full" />
            <span className="text-[12px] text-[#99a1af]">MY</span>
          </button>
        </div>
      </div>

      {/* ── Home Indicator ── */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
