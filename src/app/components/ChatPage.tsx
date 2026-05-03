import { Bell } from 'lucide-react';
import BottomNav from './BottomNav';
import { useChats } from '../hooks/useData';
import type { ChatItem } from '../services/api';

type Tab = 'home' | 'matching' | 'chat' | 'my';

interface Props {
  onTabChange: (tab: Tab) => void;
  onOpenRoom: (chat: ChatItem) => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

// ─── 데모 진행 중 채팅 ───────────────────────────────────────────
const DEMO_ACTIVE_CHAT: ChatItem = {
  id: 9999,
  name: '컴퓨터공학과 × 경영학과 3:3',
  initial: '컴',
  lastMessage: '안녕하세요! 과팅 진짜 기대돼요 😊',
  time: '방금',
  status: 'active',
  unread: 3,
};

export default function ChatPage({ onTabChange, onOpenRoom, onOpenNotifications, unreadCount = 0 }: Props) {
  const { chats, loading, markRead } = useChats();

  const handleOpen = async (chat: ChatItem) => {
    if (chat.unread && chat.unread > 0) {
      await markRead(chat.id);
    }
    onOpenRoom(chat);
  };

  // 데모 채팅을 항상 맨 앞에 표시
  const activeChats = [DEMO_ACTIVE_CHAT, ...chats.active.filter(c => c.id !== 9999)];

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 flex items-center justify-between border-b border-[#f3f4f6] h-[56px]">
        <h1 className="font-bold text-[20px] text-[#0a0a0a]">채팅</h1>
        <button className="p-2 relative" onClick={onOpenNotifications}>
          <Bell size={22} />
          {unreadCount > 0 && <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full" />}
        </button>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[90px] overflow-y-auto">

        {/* 진행 중인 과팅 */}
        <div className="px-4 pt-[14px] pb-[6px]">
          <p className="text-[11px] text-[#6a7282]">진행 중인 과팅</p>
        </div>

        {/* 데모 + API 진행 중 채팅 */}
        {activeChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => handleOpen(chat)}
            className="w-full relative px-4 py-[18px] flex items-center gap-[14px] border-b border-[#f9fafb] active:bg-[#f9fafb]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-[48px] h-[48px] rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-[16px] font-semibold">{chat.initial}</span>
              </div>
              <div className="absolute top-0 right-0 w-[10px] h-[10px] bg-black border-2 border-white rounded-full" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2 mb-[3px]">
                <span className="font-semibold text-[14px] text-[#0a0a0a] truncate">{chat.name}</span>
                <span className="shrink-0 bg-black text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">진행 중</span>
              </div>
              <p className="text-[13px] text-[#6a7282] truncate mb-[3px]">{chat.lastMessage}</p>
              {chat.expireWarning && (
                <p className="text-[11px] text-[#e24b4a]">{chat.expireWarning}</p>
              )}
            </div>

            {/* Right */}
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

        {loading && (
          <div className="px-4 flex flex-col gap-3 pt-1">
            <Skeleton className="h-[72px]" />
          </div>
        )}

        {/* 완료된 과팅 */}
        <div className="px-4 pt-[14px] pb-[6px]">
          <p className="text-[11px] text-[#6a7282]">완료된 과팅</p>
        </div>

        {loading ? (
          <div className="px-4 flex flex-col gap-3 pt-1">
            {[1].map(i => <Skeleton key={i} className="h-[72px]" />)}
          </div>
        ) : chats.done.length === 0 ? (
          <div className="px-4 py-6 text-center text-[13px] text-[#99a1af]">완료된 채팅이 없어요</div>
        ) : (
          chats.done.map(chat => (
            <button
              key={chat.id}
              onClick={() => onOpenRoom(chat)}
              className="w-full relative px-4 py-[18px] flex items-center gap-[14px] border-b border-[#f9fafb] active:bg-[#f9fafb]"
            >
              <div className="w-[48px] h-[48px] rounded-full bg-[#e5e7eb] flex items-center justify-center shrink-0">
                <span className="text-[#6a7282] text-[16px] font-semibold">{chat.initial}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2 mb-[3px]">
                  <span className="font-semibold text-[14px] text-[#0a0a0a] truncate">{chat.name}</span>
                  <span className="shrink-0 bg-[#f3f4f6] text-[#6a7282] text-[10px] font-semibold px-2 py-[2px] rounded-full">완료</span>
                </div>
                <p className="text-[13px] text-[#6a7282] truncate">{chat.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[11px] text-[#99a1af]">{chat.time}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <BottomNav active="chat" onTabChange={onTabChange} />
    </div>
  );
}

export type { ChatItem };