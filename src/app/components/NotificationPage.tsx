import { ChevronLeft, Heart, Users, MessageCircle, Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useData';
import type { Notification } from '../services/api';

type NotiType = Notification['type'];

const ICON: Record<NotiType | 'info', React.ComponentType<{ size?: number; className?: string }>> = {
  match: Heart,
  chat:  MessageCircle,
  info:  Bell,
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

export default function NotificationPage({
  onBack,
  onOpenChat,
  onOpenMatching,
}: {
  onBack: () => void;
  onOpenChat?: () => void;
  onOpenMatching?: () => void;
}) {
  const { notifications, loading, readAll } = useNotifications();

  const handleClick = (n: Notification) => {
    if (n.type === 'match') onOpenMatching?.();
    else if (n.type === 'chat') onOpenChat?.();
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white" />
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center justify-between border-b border-[#f3f4f6]">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
          <span className="font-bold text-[16px]">알림</span>
        </div>
        <button
          onClick={readAll}
          className="text-[12px] text-[#6a7282] underline"
        >
          모두 읽음
        </button>
      </div>

      <div className="absolute top-[110px] left-0 right-0 bottom-0 overflow-y-auto">
        {loading ? (
          <div className="px-4 pt-4 flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton className="h-[16px] w-[120px]" />
                  <Skeleton className="h-[14px] w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12 text-[13px] text-[#99a1af]">알림이 없어요</div>
        ) : (
          notifications.map((n) => {
            const Icon = ICON[n.type] ?? Bell;
            return (
              <button
                key={n.id}
                onClick={() => handleClick(n)}
                className={`w-full text-left flex items-start gap-3 px-4 py-4 border-b border-[#f3f4f6] active:bg-[#f3f4f6] ${!n.read ? 'bg-[#fafafa]' : 'bg-white'}`}
              >
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-[14px]">{n.title}</span>
                    {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                  <p className="text-[13px] text-[#6a7282] leading-[18px]">{n.body}</p>
                  <p className="text-[11px] text-[#9ca3af] mt-1">{n.time}</p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
