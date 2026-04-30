import { useState, useEffect } from 'react';

// ── 화면 컴포넌트 ──────────────────────────────────────────────
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginScreen from './components/LoginScreen';
import StudentIdUploadPage from './components/StudentIdUploadPage';
import ProfileSetupPage from './components/ProfileSetupPage';
import ApprovalCompletePage from './components/ApprovalCompletePage';
import MainHome from './components/MainHome';
import MatchingPage from './components/MatchingPage';
import ChatPage from './components/ChatPage';
import type { ChatItem } from './components/ChatPage';
import ChatRoomPage from './components/ChatRoomPage';
import MyPage from './components/MyPage';
import HistoryPage from './components/HistoryPage';
import CreateTeamPage from './components/CreateTeamPage';
import InviteLinkPage from './components/InviteLinkPage';
import MatchSuccessPage from './components/MatchSuccessPage';
import RestaurantDetailPage from './components/RestaurantDetailPage';
import type { Restaurant } from './components/RestaurantDetailPage';
import NotificationPage from './components/NotificationPage';
import FlowView from './components/FlowView';
import DevBar from './_dev/DevBar';

// ── 데이터 훅 ────────────────────────────────────────────────────
import { useTeam, useNotifications } from './hooks/useData';
import type { Team } from './services/api';

// ── 타입 ───────────────────────────────────────────────────────
type AppScreen = 'splash' | 'onboarding' | 'login' | 'profileSetup' | 'studentIdUpload' | 'approvalComplete' | 'app';
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
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [subPage, setSubPage] = useState<SubPage>('none');
  const [openChat, setOpenChat] = useState<ChatItem | null>(null);
  const [openRestaurant, setOpenRestaurant] = useState<Restaurant | null>(null);

  // ── 실제 팀 데이터 (Supabase) ──────────────────────────────────
  const { team, loading: teamLoading, create: createTeamApi, update: updateTeamApi, toggleApply } = useTeam();
  const { unreadCount } = useNotifications();

  // 팀 생성 시 임시 저장 (inviteLink 화면에 넘기기 위해)
  const [pendingTeamName, setPendingTeamName] = useState('');
  const [pendingGender, setPendingGender] = useState<'남성' | '여성'>('남성');
  const [pendingSize, setPendingSize] = useState<'2v2' | '3v3'>('3v3');

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
      hasTeam={!!team}
      onToggleTeam={() => {}} // 실제 데이터 연결 후 토글 불필요
      onGoScreen={(s) => { setSubPage('none'); setAppScreen(s); }}
      onGoTab={(t) => { setSubPage('none'); setAppScreen('app'); setActiveTab(t); }}
      onGoSubPage={(s) => {
        setAppScreen('app');
        if (s === 'chatRoom') {
          setOpenChat({
            id: 1,
            name: '경영학과 이지원 팀',
            initial: '이',
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
        <LoginScreen onLogin={() => setAppScreen('profileSetup')} />
      </div>
    );
  }

  if (appScreen === 'profileSetup') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <ProfileSetupPage
          onBack={() => setAppScreen('login')}
          onDone={() => setAppScreen('studentIdUpload')}
        />
      </div>
    );
  }

  if (appScreen === 'studentIdUpload') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <StudentIdUploadPage onDone={() => setAppScreen('app')} onBack={() => setAppScreen('profileSetup')} />
      </div>
    );
  }

  if (appScreen === 'approvalComplete') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <ApprovalCompletePage onDone={() => { setAppScreen('app'); goTo('createTeam'); }} />
      </div>
    );
  }

  /* ── 메인 앱 ────────────────────────────────────── */
  const renderScreen = () => {
    switch (subPage) {
      case 'chatRoom':
        return openChat ? (
          <ChatRoomPage
            chat={openChat}
            onBack={goBack}
            onComplete={() => { /* 채팅 완료 후 처리 */ }}
          />
        ) : null;
      case 'history':
        return <HistoryPage onBack={goBack} onTabChange={handleTabChange} />;
      case 'createTeam':
        return (
          <CreateTeamPage
            onBack={goBack}
            onDone={async (name, gender, size) => {
              // Supabase에 팀 생성
              try {
                await createTeamApi({
                  teamName: name,
                  gender,
                  size,
                  members: [{ id: 'u1', name: '홍길동', role: '팀장', initial: '나' }],
                  maxMembers: size === '2v2' ? 2 : 3,
                  applied: false,
                });
              } catch (e) {
                console.error('팀 생성 오류:', e);
              }
              setPendingTeamName(name);
              setPendingGender(gender);
              setPendingSize(size);
              goTo('inviteLink');
            }}
          />
        );
      case 'inviteLink':
        return (
          <InviteLinkPage
            teamName={pendingTeamName || team?.teamName || ''}
            gender={pendingGender || team?.gender || '남성'}
            size={pendingSize || team?.size || '3v3'}
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
            team={team}
            teamLoading={teamLoading}
            onTabChange={handleTabChange}
            onCreateTeam={() => goTo('createTeam')}
            onInviteTeam={() => goTo('inviteLink')}
            onOpenRestaurant={(r) => { setOpenRestaurant(r); goTo('restaurant'); }}
            onOpenNotifications={() => goTo('notifications')}
            onToggleApply={async () => {
              try { await toggleApply(); }
              catch (e) { console.error('과팅 신청 오류:', e); }
            }}
            unreadCount={unreadCount}
          />
        );
      case 'matching':
        return (
          <MatchingPage
            team={team}
            onTabChange={handleTabChange}
            onOpenNotifications={() => goTo('notifications')}
            onApply={() => goTo('matchSuccess')}
            onUpdateTeam={async (updated) => {
              try { await updateTeamApi(updated); }
              catch (e) { console.error('팀 업데이트 오류:', e); }
            }}
            unreadCount={unreadCount}
          />
        );
      case 'chat':
        return (
          <ChatPage
            onTabChange={handleTabChange}
            onOpenRoom={(chat) => { setOpenChat(chat); goTo('chatRoom'); }}
            onOpenNotifications={() => goTo('notifications')}
            unreadCount={unreadCount}
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