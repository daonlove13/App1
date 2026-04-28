import { useState } from 'react';

// ── 화면 컴포넌트 ──────────────────────────────────────────────
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import StudentIdUploadPage from './components/StudentIdUploadPage';
import MainHome from './components/MainHome';
import MatchingPage from './components/MatchingPage';
import ChatPage, { type ChatItem } from './components/ChatPage';
import ChatRoomPage from './components/ChatRoomPage';
import MyPage from './components/MyPage';
import HistoryPage from './components/HistoryPage';
import CreateTeamPage from './components/CreateTeamPage';
import InviteLinkPage from './components/InviteLinkPage';
import MatchSuccessPage from './components/MatchSuccessPage';
import FlowView from './components/FlowView';

// ── 타입 ───────────────────────────────────────────────────────
type AppScreen = 'splash' | 'login' | 'studentIdUpload' | 'app';
type Tab = 'home' | 'matching' | 'chat' | 'my';
type SubPage =
  | 'none'
  | 'chatRoom'
  | 'history'
  | 'createTeam'
  | 'inviteLink'
  | 'matchSuccess';

// ── 앱 ────────────────────────────────────────────────────────
export default function App() {
  const [showFlow, setShowFlow] = useState(false);
  const [appScreen, setAppScreen] = useState<AppScreen>('app');
  const [hasTeam, setHasTeam] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [subPage, setSubPage] = useState<SubPage>('none');
  const [openChat, setOpenChat] = useState<ChatItem | null>(null);

  // 팀 생성 시 저장
  const [createdTeamName, setCreatedTeamName] = useState('');
  const [createdGender, setCreatedGender] = useState<'남성' | '여성'>('남성');
  const [createdSize, setCreatedSize] = useState<'2v2' | '3v3'>('3v3');

  const handleTabChange = (tab: Tab) => {
    setSubPage('none');
    setOpenChat(null);
    setActiveTab(tab);
  };

  const goTo = (page: SubPage) => setSubPage(page);
  const goBack = () => setSubPage('none');

  /* ── 플로우 뷰 ──────────────────────────────────── */
  if (showFlow) {
    return (
      <div className="size-full relative">
        <button
          onClick={() => setShowFlow(false)}
          className="fixed top-4 right-4 z-50 bg-black text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          ✕ 플로우 뷰 닫기
        </button>
        <FlowView />
      </div>
    );
  }

  /* ── 스플래시 / 로그인 / 학생증 ──────────────────── */
  if (appScreen === 'splash') {
    return (
      <div className="size-full flex items-center justify-center bg-black">
        <button
          onClick={() => setShowFlow(true)}
          className="fixed top-4 right-4 z-50 bg-white text-black text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          🗺 플로우 보기
        </button>
        <SplashScreen onDone={() => setAppScreen('login')} />
      </div>
    );
  }

  if (appScreen === 'login') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <button
          onClick={() => setShowFlow(true)}
          className="fixed top-4 right-4 z-50 bg-black text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          🗺 플로우 보기
        </button>
        <LoginScreen onLogin={() => setAppScreen('studentIdUpload')} />
      </div>
    );
  }

  if (appScreen === 'studentIdUpload') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <button
          onClick={() => setShowFlow(true)}
          className="fixed top-4 right-4 z-50 bg-black text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        >
          🗺 플로우 보기
        </button>
        <StudentIdUploadPage onDone={() => setAppScreen('app')} />
      </div>
    );
  }

  /* ── 메인 앱 ────────────────────────────────────── */
  const renderScreen = () => {
    switch (subPage) {
      case 'chatRoom':
        return openChat ? <ChatRoomPage chat={openChat} onBack={goBack} /> : null;
      case 'history':
        return <HistoryPage onBack={goBack} onTabChange={handleTabChange} />;
      case 'createTeam':
        return (
          <CreateTeamPage
            onBack={goBack}
            onDone={(name, gender, size) => {
              setCreatedTeamName(name);
              setCreatedGender(gender);
              setCreatedSize(size);
              setHasTeam(true);
              goTo('inviteLink');
            }}
          />
        );
      case 'inviteLink':
        return (
          <InviteLinkPage
            teamName={createdTeamName}
            gender={createdGender}
            size={createdSize}
            onBack={() => goTo('createTeam')}
            onDone={goBack}
          />
        );
      case 'matchSuccess':
        return (
          <MatchSuccessPage
            department="경영학과"
            onGoToChat={() => { goBack(); handleTabChange('chat'); }}
            onLater={goBack}
          />
        );
      default:
        break;
    }

    switch (activeTab) {
      case 'home':
        return (
          <MainHome
            hasTeam={hasTeam}
            onTabChange={handleTabChange}
            onCreateTeam={() => goTo('createTeam')}
            onInviteTeam={() => goTo('inviteLink')}
          />
        );
      case 'matching':
        return <MatchingPage onTabChange={handleTabChange} />;
      case 'chat':
        return (
          <ChatPage
            onTabChange={handleTabChange}
            onOpenRoom={(chat) => { setOpenChat(chat); goTo('chatRoom'); }}
          />
        );
      case 'my':
        return (
          <MyPage
            onTabChange={handleTabChange}
            onOpenHistory={() => goTo('history')}
          />
        );
    }
  };

  return (
    <div className="size-full flex flex-col items-center justify-center bg-gray-100 gap-4">
      {/* 개발용 컨트롤 패널 */}
      <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow flex-wrap justify-center">
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-gray-400">팀</span>
          <button
            onClick={() => setHasTeam(v => !v)}
            className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${hasTeam ? 'bg-black' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-[3px] w-[14px] h-[14px] bg-white rounded-full shadow transition-transform duration-200 ${hasTeam ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
          </button>
          <span className="text-[12px] text-gray-400">{hasTeam ? '있음' : '없음'}</span>
        </div>

        <div className="w-px h-4 bg-gray-200" />

        <button
          onClick={() => goTo('matchSuccess')}
          className="text-[12px] text-gray-500 hover:text-black transition-colors"
        >
          🎉 매칭 성사
        </button>

        <div className="w-px h-4 bg-gray-200" />

        <button
          onClick={() => setAppScreen('splash')}
          className="text-[12px] text-gray-500 hover:text-black transition-colors"
        >
          ↩ 처음부터
        </button>

        <div className="w-px h-4 bg-gray-200" />

        <button
          onClick={() => setShowFlow(true)}
          className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full hover:bg-gray-800 transition-colors"
        >
          🗺 플로우 보기
        </button>
      </div>

      {renderScreen()}
    </div>
  );
}
