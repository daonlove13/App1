import { Search, Bell, Heart } from 'lucide-react';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface ChatItem {
  id: number;
  name: string;
  initial: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'done';
  unread?: number;
  expireWarning?: string;
}

interface Props {
  onTabChange: (tab: Tab) => void;
  onOpenRoom: (chat: ChatItem) => void;
}

const activeChats: ChatItem[] = [
  {
    id: 1,
    name: '경영학과 이지원 팀',
    initial: '이',
    lastMessage: '좋아요! 충대 근처 어떠세요?',
    time: '오후 6:05',
    status: 'active',
    unread: 2,
    expireWarning: '23시간 후 자동 종료',
  },
];

const doneChats: ChatItem[] = [
  {
    id: 2,
    name: '사회학과 김다은 팀',
    initial: '김',
    lastMessage: '즐거운 시간이었어요 :)',
    time: '3월 21일',
    status: 'done',
  },
];

export default function ChatPage({ onTabChange, onOpenRoom }: Props) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 flex items-center justify-between border-b border-[#f3f4f6] h-[56px]">
        <h1 className="font-bold text-[20px] text-[#0a0a0a]">채팅</h1>
        <div className="flex items-center gap-1">
          <button className="p-2"><Search size={22} /></button>
          <button className="p-2 relative">
            <Bell size={22} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[90px] overflow-y-auto">

        {/* 진행 중인 과팅 */}
        <div className="px-4 pt-[14px] pb-[6px]">
          <p className="text-[11px] text-[#6a7282]">진행 중인 과팅</p>
        </div>

        {activeChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onOpenRoom(chat)}
            className="w-full relative px-4 py-[18px] flex items-center gap-[14px] border-b border-[#f9fafb] active:bg-[#f9fafb]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-[48px] h-[48px] rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-[16px] font-semibold">{chat.initial}</span>
              </div>
              {/* 온라인 dot */}
              <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-black border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-[3px]">
                <span className="font-semibold text-[14px] text-[#0a0a0a] truncate">{chat.name}</span>
                {chat.status === 'active' && (
                  <span className="shrink-0 bg-black text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">진행 중</span>
                )}
              </div>
              <p className="text-[13px] text-[#6a7282] truncate mb-[3px]">{chat.lastMessage}</p>
              {chat.expireWarning && (
                <p className="text-[11px] text-[#e24b4a]">{chat.expireWarning}</p>
              )}
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-[6px] shrink-0">
              <span className="text-[11px] text-[#99a1af]">{chat.time}</span>
              {chat.unread && chat.unread > 0 ? (
                <div className="w-[18px] h-[18px] bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-semibold">{chat.unread}</span>
                </div>
              ) : null}
            </div>
          </button>
        ))}

        {/* 완료된 과팅 */}
        <div className="px-4 pt-[14px] pb-[6px]">
          <p className="text-[11px] text-[#6a7282]">완료된 과팅</p>
        </div>

        {doneChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onOpenRoom(chat)}
            className="w-full relative px-4 py-[18px] flex items-center gap-[14px] border-b border-[#f9fafb] active:bg-[#f9fafb]"
          >
            {/* Avatar (완료는 흐리게) */}
            <div className="w-[48px] h-[48px] rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0">
              <span className="text-[#6a7282] text-[16px] font-semibold">{chat.initial}</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-[3px]">
                <span className="font-semibold text-[14px] text-[#0a0a0a] truncate">{chat.name}</span>
                <span className="shrink-0 bg-[#f3f4f6] text-[#6a7282] text-[10px] font-semibold px-2 py-[2px] rounded-full">완료</span>
              </div>
              <p className="text-[13px] text-[#6a7282] truncate">{chat.lastMessage}</p>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[11px] text-[#99a1af]">{chat.time}</span>
            </div>
          </button>
        ))}
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
            <div className="w-6 h-[4px] bg-black rounded-full" />
            <span className="text-[12px] font-medium text-black">채팅</span>
          </button>
          <button onClick={() => onTabChange('my')} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 border-2 border-[#d1d5dc] rounded-full" />
            <span className="text-[12px] text-[#99a1af]">MY</span>
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

export type { ChatItem };
