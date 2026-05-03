import { Bell, ChevronRight, Users, UserPlus } from 'lucide-react';
import BottomNav from './BottomNav';
import { useProfile } from '../hooks/useData';
import { useStats } from '../hooks/useData';
import { useRestaurants } from '../hooks/useData';
import type { Team } from '../services/api';
import type { Restaurant } from '../services/api';

type Tab = 'home' | 'matching' | 'chat' | 'my';

// ─── 오픈 이벤트 카운트다운 ──────────────────────────────────────────────────
const OPEN_EVENT_DATE = new Date('2026-05-09T18:00:00');

function getDaysUntilOpen(): number {
  const now = new Date();
  const diff = OPEN_EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function OpenEventBanner() {
  const days = getDaysUntilOpen();

  if (days === 0) {
    return (
      <div className="bg-black rounded-[16px] px-4 py-3 mb-4 flex items-center justify-between">
        <div>
          <p className="text-white/50 text-[11px] font-medium mb-0.5">오픈 일자</p>
          <p className="text-white font-bold text-[15px]">오늘 오후 6시 오픈!</p>
        </div>
        <div className="bg-white rounded-[10px] px-3 py-1.5">
          <p className="font-bold text-[18px] text-black leading-none">D-DAY</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f7] rounded-[16px] px-4 py-3 mb-4 flex items-center justify-between">
      <div>
        <p className="text-[11px] text-[#b0b8c1] font-medium mb-0.5">오픈 일자</p>
        <p className="font-bold text-[14px] text-black">5월 9일 (금) 오후 6시</p>
      </div>
      <div className="bg-black rounded-[10px] px-3 py-2">
        <p className="font-bold text-[20px] text-white leading-none tracking-tight">
          D-{days}
        </p>
      </div>
    </div>
  );
}

// ─── 팀 없는 상태 StatusCard ────────────────────────────────────────────────
function NoTeamStatusCard({
  info,
  onCreateTeam,
}: {
  info: { name: string; university: string; department: string; studentId: string };
  onCreateTeam: () => void;
}) {
  return (
    <div className="bg-black rounded-[20px] p-6 mb-4">
      <div className="text-white/70 text-[14px] mb-3">
        {info.university} · {info.department} · {info.studentId} · {info.name}
      </div>
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

// ─── 팀 있는 상태 StatusCard ─────────────────────────────────────────────────
function HasTeamStatusCard({
  team,
  onInviteTeam,
  onToggleApply,
}: {
  team: Team;
  onInviteTeam: () => void;
  onToggleApply: () => void;
}) {
  const applied = team.applied;

  return (
    <div className="bg-black rounded-[20px] p-6 mb-4">
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
          <span className="text-white/60 text-[12px]">
            팀원 {team.members.length}/{team.maxMembers}명 · {team.gender} · {team.size === '2v2' ? '2:2' : '3:3'}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
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
        <button
          onClick={onToggleApply}
          className="w-full bg-white/10 rounded-[12px] px-5 py-[12px] flex items-center justify-center gap-2 active:bg-white/20"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-[5px] h-[5px] bg-white/60 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-white/70 text-[14px] font-medium">대기 중 · 탭하면 취소</span>
        </button>
      ) : (
        <button
          onClick={onToggleApply}
          className="w-full bg-white text-black py-[10px] rounded-full text-[14px] font-semibold inline-flex items-center justify-center gap-1"
        >
          과팅 신청하기 <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

// ─── 통계 섹션 ────────────────────────────────────────────────────────────────
function StatsSection({ hasTeam, todayApplications, maleWaiting, femaleWaiting, todayMatches, loading }: {
  hasTeam: boolean;
  todayApplications: number;
  maleWaiting: number;
  femaleWaiting: number;
  todayMatches: number;
  loading: boolean;
}) {
  const stats = hasTeam
    ? [
        { value: todayApplications, label: '오늘 신청' },
        { value: femaleWaiting,     label: '여자 대기' },
        { value: todayMatches,      label: '오늘 매칭' },
      ]
    : [
        { value: maleWaiting,   label: '남자 대기' },
        { value: femaleWaiting, label: '여자 대기' },
        { value: todayMatches,  label: '오늘 매칭' },
      ];

  return (
    <div className="grid grid-cols-3 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center">
          <div className={`text-[30px] font-bold text-black leading-[36px] ${loading ? 'opacity-30' : ''}`}>
            {stat.value}
          </div>
          <div className="text-[12px] text-[#6a7282] mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 식당 카드 ────────────────────────────────────────────────────────────────
function RestaurantListItem({ item, onClick }: { item: Restaurant; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-[16px] overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)] border border-[#f3f4f6] text-left active:bg-[#fafafa]"
    >
      <div className="h-[100px] bg-[#f3f4f6] flex items-center justify-center">
        <span className="text-[#d1d5dc] text-[11px]">사진 준비 중</span>
      </div>
      <div className="pt-2.5 px-3 pb-3">
        <h3 className="font-bold text-[13px] text-[#0a0a0a] mb-0.5 leading-[18px]">{item.name}</h3>
        <p className="text-[11px] text-[#6a7282]">{item.location} · {item.district}</p>
      </div>
    </button>
  );
}

// ─── 로딩 스켈레톤 ──────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function MainHome({
  team,
  teamLoading,
  onTabChange,
  onCreateTeam,
  onInviteTeam,
  onOpenRestaurant,
  onOpenNotifications,
  onToggleApply,
  unreadCount = 0,
}: {
  team: Team | null;
  teamLoading: boolean;
  onTabChange: (tab: Tab) => void;
  onCreateTeam: () => void;
  onInviteTeam: () => void;
  onOpenRestaurant?: (item: Restaurant) => void;
  onOpenNotifications?: () => void;
  onToggleApply?: () => void;
  unreadCount?: number;
}) {
  const { profile, loading: profileLoading } = useProfile();
  const { data: stats, loading: statsLoading } = useStats();
  const { restaurants, loading: restLoading } = useRestaurants();

  const hasTeam = !!team;

  const profileInfo = {
    name: profile?.name ?? '불러오는 중...',
    university: profile?.university ?? '',
    department: profile?.department ?? '',
    studentId: profile?.studentId ?? '',
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]" data-name="MainHome">

      {/* ── Status bar ── */}
      <div className="absolute h-[44px] left-0 overflow-clip top-0 w-[390px]">
        <div className="absolute bg-white h-[44px] left-0 top-0 w-[390px]" />
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-[normal] left-[20px] not-italic text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* ── Header ── */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-[#f3f4f6]">
        <span className="font-['Protest_Riot'] text-[22px] leading-[28px]">indeed</span>
        <button className="p-2 relative" onClick={onOpenNotifications}>
          <Bell size={24} />
          {unreadCount > 0 && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
          )}
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="absolute top-[110px] left-0 right-0 bottom-[90px] overflow-y-auto px-4 pt-4">

        {/* D-N 카운트다운 배너 */}
        <OpenEventBanner />

        {/* 팀 카드 */}
        {teamLoading || profileLoading ? (
          <Skeleton className="h-[180px] mb-4" />
        ) : hasTeam && team ? (
          <HasTeamStatusCard
            team={team}
            onInviteTeam={onInviteTeam}
            onToggleApply={onToggleApply ?? (() => {})}
          />
        ) : (
          <NoTeamStatusCard info={profileInfo} onCreateTeam={onCreateTeam} />
        )}

        {/* 통계 */}
        <StatsSection
          hasTeam={hasTeam}
          todayApplications={stats?.todayApplications ?? 0}
          maleWaiting={stats?.maleWaiting ?? 0}
          femaleWaiting={stats?.femaleWaiting ?? 0}
          todayMatches={stats?.todayMatches ?? 0}
          loading={statsLoading}
        />

        {/* 근처 갈만한 식당 */}
        <div className="mb-4">
          <div className="mb-3">
            <h2 className="font-bold text-[18px] text-[#0a0a0a]">근처 갈만한 식당</h2>
            <p className="text-[12px] text-[#6a7282] mt-0.5">매칭되면 가기 좋은 학교 근처 가게들이에요</p>
          </div>
          {restLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-[150px]" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {restaurants.map((item) => (
                <RestaurantListItem key={item.id} item={item} onClick={() => onOpenRestaurant?.(item)} />
              ))}
              {restaurants.length === 0 && (
                <div className="col-span-2 text-center py-8 text-[13px] text-[#99a1af]">
                  등록된 식당이 없어요
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <BottomNav active="home" onTabChange={onTabChange} />
    </div>
  );
}