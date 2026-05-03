import { Home, Heart, MessageCircle, User } from 'lucide-react';

type Tab = 'home' | 'matching' | 'chat' | 'my';

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }> }[] = [
  { id: 'home', label: '홈', Icon: Home },
  { id: 'matching', label: '매칭', Icon: Heart },
  { id: 'chat', label: '채팅', Icon: MessageCircle },
  { id: 'my', label: 'MY', Icon: User },
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
      <div className="absolute bottom-[34px] left-0 right-0 bg-white border-t border-[#f3f4f6] px-4 pt-[10px] h-[56px]">
        <div className="flex items-center justify-around">
          {TABS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className="flex flex-col items-center gap-1"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={isActive ? 'text-black' : 'text-[#99a1af]'}
                />
                <span className={`text-[12px] ${isActive ? 'font-medium text-[#0a0a0a]' : 'text-[#99a1af]'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </>
  );
}
