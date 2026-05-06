import { useEffect, useState } from 'react';

type Platform = 'ios' | 'android' | 'desktop' | 'unknown';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Windows|Macintosh|Linux/.test(ua)) return 'desktop';
  return 'unknown';
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true)
  );
}

interface Props {
  onSkip: () => void;
}

export default function InstallGuide({ onSkip }: Props) {
  const [platform, setPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    if (isInStandaloneMode()) {
      onSkip();
    }
  }, [onSkip]);

  const iosSteps = [
    { icon: '↑', title: '하단 공유 버튼 탭', desc: 'Safari 하단 가운데 □↑ 버튼을 누르세요' },
    { icon: '+', title: '"홈 화면에 추가" 선택', desc: '스크롤을 내려 "홈 화면에 추가"를 탭하세요' },
    { icon: '✓', title: '"추가" 탭', desc: '오른쪽 상단 "추가"를 탭하면 아이콘이 생겨요' },
  ];

  const androidSteps = [
    { icon: '⋮', title: '우측 상단 메뉴 탭', desc: 'Chrome 우측 상단 점 세 개(⋮) 버튼을 누르세요' },
    { icon: '+', title: '"홈 화면에 추가" 선택', desc: '"홈 화면에 추가" 또는 "앱 설치"를 탭하세요' },
    { icon: '✓', title: '"추가" 탭', desc: '확인 버튼을 탭하면 홈 화면에 아이콘이 생겨요' },
  ];

  const steps = platform === 'ios' ? iosSteps : androidSteps;

  if (platform === 'desktop') {
    return (
      <div className="size-full flex flex-col items-center justify-center bg-black px-8 text-white">
        <p className="font-['Protest_Riot'] text-[48px] mb-2">INDEED</p>
        <p className="text-gray-400 text-sm mb-8">충북대 학과별 과팅 매칭</p>
        <p className="text-gray-300 text-center text-sm mb-6">
          모바일에서 접속하면<br />홈 화면에 앱으로 설치할 수 있어요
        </p>
        <button onClick={onSkip} className="text-gray-500 text-xs underline mt-4">
          데스크탑에서 계속하기
        </button>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-black text-white">
      {/* 헤더 */}
      <div className="flex flex-col items-center pt-16 pb-8 px-6">
        <div className="w-20 h-20 rounded-2xl bg-black border border-white/20 flex items-center justify-center mb-4">
          <span className="text-white font-bold text-sm tracking-widest">INDEED</span>
        </div>
        <p className="font-['Protest_Riot'] text-[36px]">INDEED</p>
        <p className="text-gray-400 text-sm mt-1">충북대 학과별 과팅 매칭</p>
      </div>

      {/* 설치 안내 */}
      <div className="flex-1 px-6">
        <p className="text-center text-white font-semibold text-lg mb-6">
          앱으로 설치하고 시작하세요 📱
        </p>

        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-lg">{s.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{`${i + 1}. ${s.title}`}</p>
                <p className="text-gray-400 text-xs mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 */}
      <div className="px-6 pb-12 pt-6 space-y-3">
        <p className="text-center text-gray-500 text-xs">
          설치 후 홈 화면의 <span className="text-white font-semibold">INDEED</span> 아이콘을 눌러 시작하세요
        </p>
        <button
          onClick={onSkip}
          className="w-full py-3 rounded-full border border-white/20 text-gray-400 text-sm"
        >
          브라우저에서 계속하기
        </button>
      </div>
    </div>
  );
}
