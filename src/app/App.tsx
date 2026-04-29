import { useState } from 'react';

// ── 화면 컴포넌트 ──────────────────────────────────────────────
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
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
import RestaurantDetailPage, { type Restaurant } from './components/RestaurantDetailPage';
import NotificationPage from './components/NotificationPage';
import FlowView from './components/FlowView';
import DevBar from './_dev/DevBar';

// ── 타입 ───────────────────────────────────────────────────────
type AppScreen = 'splash' | 'onboarding' | 'login' | 'studentIdUpload' | 'app';
type Tab = 'home' | 'matching' | 'chat' | 'my';
type SubPage =
  | 'none'
  | 'chatRoom'
  | 'history'
  | 'createTeam'
  | 'inviteLink'
  | 'matchSuccess'
  | 'restaurant'
  | 'notifications';

// ── 앱 ────────────────────────────────────────────────────────
export default function App() {
  const [showFlow, setShowFlow] = useState(false);
  const [appScreen, setAppScreen] = useState<AppScreen>('app');
  const [hasTeam, setHasTeam] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [subPage, setSubPage] = useState<SubPage>('none');
  const [openChat, setOpenChat] = useState<ChatItem | null>(null);
  const [openRestaurant, setOpenRestaurant] = useState<Restaurant | null>(null);

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

  const reset = () => {
    setSubPage('none');
    setActiveTab('home');
    setAppScreen('splash');
  };

  const devBar = (
    <DevBar
      appScreen={appScreen}
      activeTab={activeTab}
      hasTeam={hasTeam}
      onToggleTeam={() => setHasTeam(v => !v)}
      onGoScreen={(s) => { setSubPage('none'); setAppScreen(s); }}
      onGoTab={(t) => { setSubPage('none'); setAppScreen('app'); setActiveTab(t); }}
      onGoSubPage={(s) => {
        setAppScreen('app');
        if (s === 'chatRoom') {
          setOpenChat({
            id: 1,
            name: '경희대 경영학과',
            initial: '경',
            lastMessage: '안녕하세요!',
            time: '12:30',
            status: 'active',
            unread: 0,
          });
        }
        if (s === 'restaurant') {
          setOpenRestaurant({
            id: 1,
            name: '치킨앤비어 중대점',
            location: '서울',
            district: '도봉구',
            teamCount: 3,
            seats: 20,
          });
        }
        setSubPage(s);
      }}
      onReset={reset}
      onShowFlow={() => setShowFlow(true)}
    />
  );

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

  /* ── 스플래시 / 온보딩 / 로그인 / 학생증 ──────────── */
  if (appScreen === 'splash') {
    return (
      <div className="size-full flex items-center justify-center bg-black">
        {devBar}
        <SplashScreen onDone={() => setAppScreen('onboarding')} />
      </div>
    );
  }

  if (appScreen === 'onboarding') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <OnboardingScreen onDone={() => setAppScreen('login')} />
      </div>
    );
  }

  if (appScreen === 'login') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <LoginScreen onLogin={() => setAppScreen('studentIdUpload')} />
      </div>
    );
  }

  if (appScreen === 'studentIdUpload') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <StudentIdUploadPage onDone={() => setAppScreen('app')} onBack={() => setAppScreen('login')} />
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
      case 'restaurant':
        return openRestaurant ? (
          <RestaurantDetailPage
            restaurant={openRestaurant}
            onBack={goBack}
            onApply={() => { goBack(); handleTabChange('matching'); }}
          />
        ) : null;
      case 'notifications':
        return (
          <NotificationPage
            onBack={goBack}
            onOpenChat={() => { goBack(); handleTabChange('chat'); }}
            onOpenMatching={() => { goBack(); handleTabChange('matching'); }}
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
            onOpenRestaurant={(r) => { setOpenRestaurant(r); goTo('restaurant'); }}
            onOpenNotifications={() => goTo('notifications')}
          />
        );
      case 'matching':
        return (
          <MatchingPage
            onTabChange={handleTabChange}
            onOpenNotifications={() => goTo('notifications')}
            onApply={() => goTo('matchSuccess')}
          />
        );
      case 'chat':
        return (
          <ChatPage
            onTabChange={handleTabChange}
            onOpenRoom={(chat) => { setOpenChat(chat); goTo('chatRoom'); }}
            onOpenNotifications={() => goTo('notifications')}
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
    <div className="size-full flex items-center justify-center bg-gray-100">
      {devBar}
      {renderScreen()}
    </div>
  );
}
