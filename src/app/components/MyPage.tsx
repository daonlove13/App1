import { ChevronRight } from 'lucide-react';
import BottomNav from './BottomNav';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  onTabChange: (tab: Tab) => void;
  onOpenHistory: () => void;
}

const historyItems = [
  { id: 1, name: '경영학과 이지원 팀', date: '2025.04.08', place: '치킨앤비어 충대점' },
  { id: 2, name: '사회학과 김다은 팀', date: '2025.03.21', place: '이자카야 하나' },
];

const menuItems = [
  { label: '알림 설정', danger: false },
  { label: '이용약관', danger: false },
  { label: '개인정보처리방침', danger: false },
  { label: '로그아웃', danger: true },
  { label: '회원 탈퇴', danger: true },
];

export default function MyPage({ onTabChange, onOpenHistory }: Props) {
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
        <div className="px-4 pt-[18px] pb-[18px] border-b border-[#f3f4f6] flex items-center gap-[14px]">
          <div className="w-[52px] h-[52px] rounded-full bg-black flex items-center justify-center shrink-0">
            <span className="text-white text-[20px] font-semibold">박</span>
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="font-bold text-[17px] text-[#0a0a0a] leading-[25px]">박성호</p>
            <p className="text-[12px] text-[#6a7282]">충북대 · 심리학과 · 24학번</p>
            <div className="mt-[2px] bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[8px] py-[2px] inline-flex w-fit">
              <span className="text-[11px] text-[#0a0a0a]">학교 인증 완료 ✓</span>
            </div>
          </div>
        </div>

        {/* 과팅 이력 */}
        <div className="px-4 pt-[14px] pb-[6px] flex items-center justify-between">
          <p className="text-[11px] text-[#6a7282]">과팅 이력</p>
          <button onClick={onOpenHistory} className="text-[11px] text-black font-medium flex items-center gap-0.5 underline">
            전체보기 →
          </button>
        </div>

        <div className="px-4 flex flex-col gap-[8px] pb-[16px]">
          {historyItems.map(item => (
            <div key={item.id} className="border border-[#e5e7eb] rounded-[14px] px-[15px] py-[13px] flex items-center justify-between">
              <div className="flex flex-col gap-[2px]">
                <p className="text-[13px] font-medium text-[#0a0a0a] leading-[19.5px]">{item.name}</p>
                <p className="text-[11px] text-[#6a7282]">{item.date} · {item.place}</p>
              </div>
              <div className="bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[10px] py-[2px]">
                <span className="text-[11px] text-[#0a0a0a]">완료</span>
              </div>
            </div>
          ))}
        </div>

        {/* 패널티 현황 */}
        <div className="px-4 pt-[8px] border-t border-[#f3f4f6]">
          <p className="text-[11px] text-[#6a7282] mb-[10px]">패널티 현황</p>
          <div className="flex items-center gap-[8px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-[14px] h-[14px] rounded-full bg-[#e5e7eb]" />
            ))}
            <p className="text-[11px] text-[#6a7282]">0 / 3 · 3회 누적 시 1주일 이용 정지</p>
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

      <BottomNav active="my" onTabChange={onTabChange} />
    </div>
  );
}
