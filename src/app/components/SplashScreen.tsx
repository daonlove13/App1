import { useEffect } from 'react';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="bg-black overflow-clip relative rounded-[40px] w-[390px] h-[844px] flex flex-col items-center justify-center">
      {/* 로고 */}
      <div className="flex flex-col items-center gap-4">
        <p className="font-['Protest_Riot'] text-white text-[72px] leading-none">
          indeed
        </p>
        <div className="text-center">
          <p className="text-white/50 text-[14px] leading-[22px]">같은 학교, 다른 학과</p>
          <p className="text-white/50 text-[14px]">과팅의 새로운 방법</p>
        </div>
      </div>
    </div>
  );
}
