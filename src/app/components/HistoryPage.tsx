import { ChevronLeft } from 'lucide-react';
import { useHistory, useProfile } from '../hooks/useData';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  onBack: () => void;
  onTabChange: (tab: Tab) => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

export default function HistoryPage({ onBack, onTabChange }: Props) {
  const { history, loading } = useHistory();
  const { profile } = useProfile();
  const penalties = profile?.penalties ?? 0;

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#e5e7eb] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">과팅 이력</p>
      </div>

      {/* Content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[0px] overflow-y-auto px-4 pt-[18px]">

        {/* 통계 카드 */}
        <div className="grid grid-cols-3 gap-[10px] mb-[20px]">
          {[
            { value: history.length, label: '총 과팅' },
            { value: history.length, label: '완료' },
            { value: penalties,      label: '패널티' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#f9fafb] rounded-[14px] py-[14px] flex flex-col items-center gap-[2px]">
              <span className="text-[24px] font-bold text-[#0a0a0a] leading-[32px]">{stat.value}</span>
              <span className="text-[11px] text-[#6a7282]">{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="text-[12px] text-[#6a7282] mb-[10px]">완료된 과팅</p>

        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[120px]" />
            <Skeleton className="h-[120px]" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 text-[13px] text-[#99a1af]">아직 과팅 이력이 없어요</div>
        ) : (
          <div className="flex flex-col gap-[10px] pb-8">
            {history.map(item => (
              <div key={item.id} className="border border-[#e5e7eb] rounded-[14px] px-[16px] py-[14px]">
                <div className="flex items-center justify-between mb-[8px]">
                  <p className="font-semibold text-[14px] text-[#0a0a0a]">{item.name}</p>
                  <div className="bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[8px] py-[2px]">
                    <span className="text-[11px] text-[#0a0a0a]">완료</span>
                  </div>
                </div>
                <p className="text-[12px] text-[#6a7282] leading-[19.5px]">{item.date}</p>
                <p className="text-[12px] font-medium text-black mt-[4px]">{item.place} 방문</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}