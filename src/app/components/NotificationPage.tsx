import { ChevronLeft, Heart, Users, MessageCircle, Bell } from 'lucide-react';

interface Noti {
  id: number;
  type: 'match' | 'team' | 'chat' | 'system';
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const ICON: Record<Noti['type'], React.ComponentType<{ size?: number; className?: string }>> = {
  match: Heart,
  team: Users,
  chat: MessageCircle,
  system: Bell,
};

const items: Noti[] = [
  { id: 1, type: 'match', title: '매칭 성사!', body: '경희대 경영학과 팀과 매칭되었어요.', time: '방금', unread: true },
  { id: 2, type: 'chat', title: '새 메시지', body: '안녕하세요! 이번 주말 어때요?', time: '5분 전', unread: true },
  { id: 3, type: 'team', title: '팀원 합류', body: '김민준님이 팀에 합류했어요.', time: '1시간 전', unread: false },
  { id: 4, type: 'system', title: '학생증 인증 완료', body: '이제 모든 기능을 사용할 수 있어요.', time: '어제', unread: false },
];

export default function NotificationPage({
  onBack,
  onOpenChat,
  onOpenMatching,
}: {
  onBack: () => void;
  onOpenChat?: () => void;
  onOpenMatching?: () => void;
}) {
  const handleClick = (type: Noti['type']) => {
    if (type === 'match') onOpenMatching?.();
    else if (type === 'chat') onOpenChat?.();
  };
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white" />
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 px-4 py-4 flex items-center gap-2 border-b border-[#f3f4f6]">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} /></button>
        <span className="font-bold text-[16px]">알림</span>
      </div>

      <div className="absolute top-[110px] left-0 right-0 bottom-0 overflow-y-auto">
        {items.map((n) => {
          const Icon = ICON[n.type];
          return (
            <button
              key={n.id}
              onClick={() => handleClick(n.type)}
              className={`w-full text-left flex items-start gap-3 px-4 py-4 border-b border-[#f3f4f6] active:bg-[#f3f4f6] ${n.unread ? 'bg-[#fafafa]' : 'bg-white'}`}
            >
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0">
                <Icon size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[14px]">{n.title}</span>
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
                <p className="text-[13px] text-[#6a7282] leading-[18px]">{n.body}</p>
                <p className="text-[11px] text-[#9ca3af] mt-1">{n.time}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
