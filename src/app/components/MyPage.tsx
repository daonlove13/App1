import { ChevronRight } from 'lucide-react';
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

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center justify-center">
        <h1 className="font-bold text-[16px] text-[#0a0a0a]">마이페이지</h1>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[0px] overflow-y-auto">

        {/* 프로필 */}
        {profileLoading ? (
          <div className="px-4 pt-[18px] pb-[18px] border-b border-[#f3f4f6] flex items-center gap-[14px]">
            <Skeleton className="w-[52px] h-[52px] rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-[20px] w-[80px]" />
              <Skeleton className="h-[16px] w-[140px]" />
            </div>
          </div>
        ) : (
          <div className="px-4 pt-[18px] pb-[18px] border-b border-[#f3f4f6] flex items-center gap-[14px]">
            <div className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center shrink-0">
              <span className="text-white text-[20px] font-semibold">{initial}</span>
            </div>
            <div className="flex flex-col gap-[4px]">
              <p className="font-bold text-[17px] text-[#0a0a0a] leading-[25px]">{profile?.name}</p>
              <p className="text-[12px] text-[#6a7282]">
                {profile?.university} · {profile?.department}
              </p>
              {profile?.verified && (
                <div className="mt-[2px] bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[8px] py-[2px] inline-flex w-fit">
                  <span className="text-[11px] text-[#0a0a0a]">학교 인증 완료 ✓</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 과팅 이력 */}
        <div className="px-4 pt-[14px] pb-[6px] flex items-center justify-between">
          <p className="text-[11px] text-[#6a7282]">과팅 이력</p>
          <button
            onClick={onOpenHistory}
            className="text-[11px] text-black font-medium flex items-center gap-0.5 underline"
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
              <div key={item.id} className="border border-[#e5e7eb] rounded-[14px] px-[15px] py-[13px] flex items-center justify-between">
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[13px] font-medium text-[#0a0a0a] leading-[19.5px]">{item.name}</p>
                  <p className="text-[11px] text-[#6a7282]">{item.date} · {item.place}</p>
                </div>
                <div className="bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[10px] py-[2px]">
                  <span className="text-[11px] text-[#0a0a0a]">완료</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 패널티 현황 */}
        <div className="px-4 pt-[8px] border-t border-[#f3f4f6]">
          <p className="text-[11px] text-[#6a7282] mb-[10px]">패널티 현황</p>
          <div className="flex items-center gap-[8px]">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-[14px] h-[14px] rounded-full ${
                  i < (profile?.penalties ?? 0) ? 'bg-black' : 'bg-[#e5e7eb]'
                }`}
              />
            ))}
            <p className="text-[11px] text-[#6a7282]">
              {profile?.penalties ?? 0} / 3 · 3회 누적 시 1주일 이용 정지
            </p>
          </div>
        </div>

        {/* 설정 메뉴 */}
        <div className="px-4 mt-[16px] border-t border-[#e5e7eb] pt-[4px]">
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
    </div>
  );
}
