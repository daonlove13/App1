import { useEffect } from 'react';
import Splash from '../../imports/Splash';

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="w-[390px] h-[844px] relative">
      <Splash />
    </div>
  );
}
