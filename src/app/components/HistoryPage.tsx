import { ChevronLeft, Heart } from 'lucide-react';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  onBack: () => void;
  onTabChange: (tab: Tab) => void;
}

interface MatchRecord {
  id: number;
  name: string;
  date: string;
  matchType: string;
  size: string;
  university: string;
  place: string;
  myMembers: string[];
  theirMembers: string[];
}

const records: MatchRecord[] = [
  {
    id: 1,
    name: '경영학과 이지원 팀',
    date: '2025년 4월 8일 (목)',
    matchType: '신입생 전용 매칭',
    size: '2:2',
    university: '충북대학교',
    place: '치킨앤비어 충대점',
    myMembers: ['나', '김'],
    theirMembers: ['이', '박'],
  },
  {
    id: 2,
    name: '사회학과 김다은 팀',
    date: '2025년 3월 21일 (금)',
    matchType: '자유 매칭',
    size: '2:2',
    university: '충북대학교',
    place: '이자카야 하나',
    myMembers: ['나', '최'],
    theirMembers: ['김', '이'],
  },
];

export default function HistoryPage({ onBack, onTabChange }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#e5e7eb] h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">과팅 이력</p>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[90px] overflow-y-auto px-4 pt-[18px]">

        {/* 통계 카드 3개 */}
        <div className="grid grid-cols-3 gap-[10px] mb-[20px]">
          {[
            { value: 2, label: '총 과팅' },
            { value: 2, label: '완료' },
            { value: 0, label: '패널티' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#f9fafb] rounded-[14px] py-[14px] flex flex-col items-center gap-[2px]">
              <span className="text-[24px] font-bold text-[#0a0a0a] leading-[32px]">{stat.value}</span>
              <span className="text-[11px] text-[#6a7282]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 완료된 과팅 라벨 */}
        <p className="text-[12px] text-[#6a7282] mb-[10px]">완료된 과팅</p>

        {/* 이력 카드 목록 */}
        <div className="flex flex-col gap-[10px] pb-4">
          {records.map(record => (
            <div key={record.id} className="border border-[#e5e7eb] rounded-[14px] px-[16px] py-[14px]">

              {/* 상단: 팀 이름 + 완료 배지 */}
              <div className="flex items-center justify-between mb-[8px]">
                <p className="font-semibold text-[14px] text-[#0a0a0a]">{record.name}</p>
                <div className="bg-[#f3f4f6] border border-[#d1d5dc] rounded-full px-[8px] py-[2px]">
                  <span className="text-[11px] text-[#0a0a0a]">완료</span>
                </div>
              </div>

              {/* 날짜/유형/사이즈 */}
              <p className="text-[12px] text-[#6a7282] leading-[19.5px]">
                {record.date} · {record.matchType}
              </p>
              <p className="text-[12px] text-[#6a7282] leading-[19.5px] mb-[6px]">
                {record.size} · {record.university}
              </p>

              {/* 방문 가게 */}
              <p className="text-[12px] font-medium text-black mb-[10px]">
                {record.place} 방문
              </p>

              {/* 멤버 아바타 */}
              <div className="flex items-center gap-0">
                {record.myMembers.map((m, i) => (
                  <div
                    key={`my-${i}`}
                    className="w-[26px] h-[26px] rounded-full bg-black border-2 border-white flex items-center justify-center"
                    style={{ marginLeft: i > 0 ? '-6px' : '0', zIndex: record.myMembers.length - i }}
                  >
                    <span className="text-white text-[10px] font-semibold">{m}</span>
                  </div>
                ))}
                <span className="text-[10px] text-[#d1d5dc] mx-[6px]">vs</span>
                {record.theirMembers.map((m, i) => (
                  <div
                    key={`their-${i}`}
                    className="w-[26px] h-[26px] rounded-full bg-[#6a7282] border-2 border-white flex items-center justify-center"
                    style={{ marginLeft: i > 0 ? '-6px' : '0', zIndex: record.theirMembers.length - i }}
                  >
                    <span className="text-white text-[10px] font-semibold">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-[34px] left-0 right-0 bg-white border-t border-[#f3f4f6] px-4 pt-[13px] h-[56px]">
        <div className="flex items-center justify-around">
          <button onClick={() => onTabChange('home')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-[4px] bg-[#d1d5dc] rounded-full" />
            <span className="text-[12px] text-[#99a1af]">홈</span>
          </button>
          <button onClick={() => onTabChange('matching')} className="flex flex-col items-center gap-1">
            <Heart size={22} className="text-[#99a1af]" />
            <span className="text-[12px] text-[#99a1af]">매칭</span>
          </button>
          <button onClick={() => onTabChange('chat')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-[#d1d5dc] rounded-full" />
            <span className="text-[12px] text-[#99a1af]">채팅</span>
          </button>
          <button onClick={() => onTabChange('my')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-[4px] bg-black rounded-full" />
            <span className="text-[12px] font-medium text-black">MY</span>
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
