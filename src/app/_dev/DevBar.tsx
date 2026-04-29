/**
 * 개발용 컨트롤 바.
 * 백엔드/실데이터 연동이 끝나면 이 폴더(_dev)와 App.tsx의 DevBar 관련 코드만 지우면 돼요.
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type AppScreenKey = 'splash' | 'onboarding' | 'login' | 'studentIdUpload' | 'app';
export type TabKey = 'home' | 'matching' | 'chat' | 'my';
export type SubPageKey =
  | 'matchSuccess'
  | 'createTeam'
  | 'inviteLink'
  | 'history'
  | 'notifications'
  | 'restaurant'
  | 'chatRoom';

interface Props {
  appScreen: AppScreenKey;
  activeTab: TabKey;
  hasTeam: boolean;
  onToggleTeam: () => void;
  onGoScreen: (s: AppScreenKey) => void;
  onGoTab: (t: TabKey) => void;
  onGoSubPage: (s: SubPageKey) => void;
  onReset: () => void;
  onShowFlow: () => void;
}

const SCREENS: { key: AppScreenKey; label: string }[] = [
  { key: 'splash', label: '스플래시' },
  { key: 'onboarding', label: '온보딩' },
  { key: 'login', label: '로그인' },
  { key: 'studentIdUpload', label: '학생증' },
  { key: 'app', label: '앱(홈)' },
];

const TABS: { key: TabKey; label: string }[] = [
  { key: 'home', label: '홈' },
  { key: 'matching', label: '매칭' },
  { key: 'chat', label: '채팅' },
  { key: 'my', label: 'MY' },
];

const SUBPAGES: { key: SubPageKey; label: string }[] = [
  { key: 'matchSuccess', label: '🎉 매칭성사' },
  { key: 'createTeam', label: '팀 생성' },
  { key: 'inviteLink', label: '초대 링크' },
  { key: 'history', label: '이력' },
  { key: 'notifications', label: '알림' },
  { key: 'restaurant', label: '식당 상세' },
  { key: 'chatRoom', label: '채팅방' },
];

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-2.5 py-[5px] rounded-full transition-colors ${
        active
          ? 'bg-black text-white font-semibold'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider w-12 shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export default function DevBar({
  appScreen,
  activeTab,
  hasTeam,
  onToggleTeam,
  onGoScreen,
  onGoTab,
  onGoSubPage,
  onReset,
  onShowFlow,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-[640px]">
      {/* 컴팩트 헤더 */}
      <div className="flex items-center gap-3 px-4 py-2">
        <span className="text-[10px] font-bold text-white bg-black px-2 py-0.5 rounded-full tracking-wider">DEV</span>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">팀</span>
          <button
            onClick={onToggleTeam}
            className={`relative w-9 h-[18px] rounded-full transition-colors ${hasTeam ? 'bg-black' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-[2px] w-[14px] h-[14px] bg-white rounded-full shadow transition-transform ${hasTeam ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
          </button>
          <span className="text-[11px] text-gray-500 w-7">{hasTeam ? '있음' : '없음'}</span>
        </div>

        <div className="w-px h-4 bg-gray-200" />

        <button onClick={onReset} className="text-[11px] text-gray-500 hover:text-black">↩ 처음</button>
        <button onClick={onShowFlow} className="text-[11px] text-gray-500 hover:text-black">🗺 플로우</button>

        <div className="w-px h-4 bg-gray-200" />

        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-black"
        >
          {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {open ? '접기' : '더보기'}
        </button>
      </div>

      {/* 확장 패널 */}
      {open && (
        <div className="border-t border-gray-100 px-4 py-3 flex flex-col gap-2.5">
          <Row label="화면">
            {SCREENS.map(s => (
              <Pill key={s.key} active={appScreen === s.key} onClick={() => onGoScreen(s.key)}>
                {s.label}
              </Pill>
            ))}
          </Row>

          <Row label="탭">
            {TABS.map(t => (
              <Pill
                key={t.key}
                active={appScreen === 'app' && activeTab === t.key}
                onClick={() => onGoTab(t.key)}
              >
                {t.label}
              </Pill>
            ))}
          </Row>

          <Row label="서브">
            {SUBPAGES.map(s => (
              <Pill key={s.key} onClick={() => onGoSubPage(s.key)}>
                {s.label}
              </Pill>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}
