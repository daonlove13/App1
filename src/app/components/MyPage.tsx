import { ChevronRight } from 'lucide-react';
import BottomNav from './BottomNav';
import { useProfile, useHistory } from '../hooks/useData';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  onTabChange: (tab: Tab) => void;
  onOpenHistory: () => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

const menuItems = [
  { label: '알림 설정', danger: false },
  { label: '이용약관', danger: false },
  { label: '개인정보처리방침', danger: false },
  { label: '로그아웃', danger: true },
  { label: '회원 탈퇴', danger: true },
];

export default function MyPage({ onTabChange, onOpenHistory }: Props) {
  const { profile, loading: profileLoading } = useProfile();
  const { history, loading: histLoading } = useHistory();

  const initial = profile?.name?.[0] ?? '?';
  const recentHistory = history.slice(0, 2);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center justify-center">
        <h1 className="font-bold text-[16px] text-[#0a0a0a]">마이페이지</h1>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[90px] overflow-y-auto">

        {/* 프로필 */}
        {profileLoading ? (
          <div className="px-4 pt-4 pb-4">
            <Skeleton className="h-[120px] rounded-[20px]" />
          </div>
        ) : (
          <div className="px-4 pt-4 pb-2">
            <div className="bg-black rounded-[20px] px-5 py-5">
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[52px] rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <span className="text-white text-[20px] font-semibold">{initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[18px] text-white leading-[26px]">{profile?.name}</p>
                  <p className="text-[12px] text-white/50 mt-[2px]">
                    {profile?.university} · {profile?.department}
                  </p>
                  <p className="text-[11px] text-white/40">{profile?.grade}</p>
                </div>
              </div>
              {profile?.verified && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-[16px] h-[16px] rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-[9px] text-white">✓</span>
                  </div>
                  <span className="text-[11px] text-white/50">학교 인증 완료</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 과팅 이력 */}
        <div className="px-4 pt-[16px] pb-[6px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-[14px] bg-black rounded-full" />
            <p className="text-[13px] font-semibold text-[#0a0a0a]">과팅 이력</p>
          </div>
          <button
            onClick={onOpenHistory}
            className="text-[11px] text-[#9ca3af] font-medium flex items-center gap-0.5"
          >
            전체보기 →
          </button>
        </div>

        <div className="px-4 flex flex-col gap-[8px] pb-[16px]">
          {histLoading ? (
            <>
              <Skeleton className="h-[60px]" />
              <Skeleton className="h-[60px]" />
            </>
          ) : recentHistory.length === 0 ? (
            <div className="text-center py-6 text-[13px] text-[#99a1af]">아직 과팅 이력이 없어요</div>
          ) : (
            recentHistory.map(item => (
              <div key={item.id} className="bg-[#f7f7f7] rounded-[14px] px-[15px] py-[13px] flex items-center justify-between">
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[13px] font-medium text-[#0a0a0a] leading-[19.5px]">{item.name}</p>
                  <p className="text-[11px] text-[#9ca3af]">{item.date} · {item.place}</p>
                </div>
                <div className="bg-black rounded-full px-[10px] py-[3px]">
                  <span className="text-[10px] text-white font-medium">완료</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 패널티 현황 */}
        <div className="px-4 pt-[12px] pb-[12px] mx-4 bg-[#f7f7f7] rounded-[14px] mb-4">
          <div className="flex items-center justify-between mb-[10px]">
            <p className="text-[12px] font-semibold text-[#0a0a0a]">패널티 현황</p>
            <p className="text-[11px] text-[#9ca3af]">3회 누적 시 1주일 정지</p>
          </div>
          <div className="flex items-center gap-[6px]">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`flex-1 h-[6px] rounded-full transition-colors ${
                  i < (profile?.penalties ?? 0) ? 'bg-black' : 'bg-[#e5e7eb]'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-[#9ca3af] mt-[8px]">{profile?.penalties ?? 0} / 3</p>
        </div>

        {/* 설정 메뉴 */}
        <div className="px-4 border-t border-[#f3f4f6] pt-[4px]">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className="w-full flex items-center justify-between py-[14px] border-b border-[#f9fafb]"
            >
              <span className={`text-[14px] ${item.danger ? 'text-[#e24b4a]' : 'text-[#1e2939]'}`}>
                {item.label}
              </span>
              {!item.danger && (
                <ChevronRight size={16} className="text-[#d1d5dc]" />
              )}
            </button>
          ))}
        </div>
      </div>

      <BottomNav active="my" onTabChange={onTabChange} />
    </div>
  );
}