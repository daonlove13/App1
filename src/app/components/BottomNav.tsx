import { Home, Heart, MessageCircle, User } from 'lucide-react';

type Tab = 'home' | 'matching' | 'chat' | 'my';

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }> }[] = [
  { id: 'home',     label: '홈',   Icon: Home },
  { id: 'matching', label: '매칭', Icon: Heart },
  { id: 'chat',     label: '채팅', Icon: MessageCircle },
  { id: 'my',       label: 'MY',  Icon: User },
];

export default function BottomNav({
  active,
  onTabChange,
}: {
  active: Tab;
  onTabChange: (tab: Tab) => void;
}) {
  return (
    <>
      {/* 플로팅 블랙 필 네비 */}
      <div className="absolute bottom-[34px] left-0 right-0 h-[56px] px-5 flex items-center">
        <div className="flex-1 bg-black rounded-[30px] h-[52px] flex items-center justify-around px-2">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="flex flex-col items-center gap-[3px] px-5 py-1"
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? 'text-white' : 'text-white/30'}
                />
                <span className={`text-[10px] ${isActive ? 'text-white font-semibold' : 'text-white/30'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </>
  );
}