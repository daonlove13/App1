import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from './services/supabaseClient';

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
import type { ChatItem } from './services/api';
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
import InstallGuide from './components/InstallGuide';

// ── 데이터 훅 ────────────────────────────────────────────────────
import { useTeam, useNotifications } from './hooks/useData';
import type { Team } from './services/api';

// ── 타입 ───────────────────────────────────────────────────────
type AppScreen =
  | 'loading'
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'profileSetup'
  | 'studentIdUpload'
  | 'studentIdPending'
  | 'approvalComplete'
  | 'app';

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
  const [appScreen, setAppScreen] = useState<AppScreen>('loading');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [subPage, setSubPage] = useState<SubPage>('none');
  const [openChat, setOpenChat] = useState<ChatItem | null>(null);
  const [openRestaurant, setOpenRestaurant] = useState<Restaurant | null>(null);

  // PWA 설치 가이드 — standalone 아닐 때만 표시, OAuth 콜백이면 스킵
  const [showInstallGuide, setShowInstallGuide] = useState(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isOAuthCallback = window.location.hash.includes('access_token');
    return !isStandalone && !isOAuthCallback;
  });

  // ── 실제 팀 데이터 (Supabase) ──────────────────────────────────
  const { team, loading: teamLoading, create: createTeamApi, update: updateTeamApi, toggleApply } = useTeam();
  const { unreadCount } = useNotifications();

  const [pendingTeamName, setPendingTeamName] = useState('');
  const [pendingGender, setPendingGender] = useState<'남성' | '여성'>('남성');
  const [pendingSize, setPendingSize] = useState<'2v2' | '3v3'>('3v3');

  // ── 세션 체크: 앱 시작 시 인증 + verified 상태 확인 ──────────────
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        // OAuth 콜백 URL의 hash fragment 처리 (Supabase가 #access_token=... 형태로 전달)
        if (window.location.hash && window.location.hash.includes('access_token')) {
          await supabase.auth.getSession();
        }
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // 비로그인 → splash부터 시작
          if (mounted) setAppScreen('splash');
          return;
        }

        // 로그인 상태 → 유저 레코드 확인
        const { data: userData } = await supabase
          .from('users')
          .select('verified, student_card_url, name')
          .eq('id', session.user.id)
          .maybeSingle();

        if (!mounted) return;

        if (!userData || !userData.name) {
          // 유저 레코드 없음 (회원가입 후 프로필 미작성) → 프로필 설정
          setAppScreen('profileSetup');
          return;
        }

        if (userData.verified) {
          // 승인 완료 → 메인 앱
          setAppScreen('app');
        } else if (userData.student_card_url) {
          // 학생증 제출 완료, 아직 미승인 → 대기 화면
          setAppScreen('studentIdPending');
        } else {
          // 학생증 미제출 → 업로드 화면
          setAppScreen('studentIdUpload');
        }
      } catch (e) {
        console.error('Session check error:', e);
        if (mounted) setAppScreen('splash');
      }
    }

    checkSession();

    // Auth 상태 변경 리스너
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' && mounted) {
        setAppScreen('splash');
        setSubPage('none');
        setActiveTab('home');
      }
      // OAuth 로그인 후 콜백 처리
      if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session && mounted) {
        checkSession();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

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
      onToggleTeam={() => {}}
      onGoScreen={(s) => { setSubPage('none'); setAppScreen(s as AppScreen); }}
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

  /* ── PWA 설치 가이드 (최초 1회) ────────────────── */
  if (showInstallGuide) {
    return (
      <div className="size-full">
        <InstallGuide
          onSkip={() => {
              setShowInstallGuide(false);
          }}
        />
      </div>
    );
  }

  /* ── 로딩 화면 ─────────────────────────────────── */
  if (appScreen === 'loading') {
    return (
      <div className="size-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <p className="font-['Protest_Riot'] text-[48px] leading-none text-black">indeed</p>
          <Loader2 size={24} className="text-black animate-spin" />
        </div>
      </div>
    );
  }

  /* ── 스플래시 / 온보딩 / 로그인 ──────────────────── */
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
        <LoginScreen
          onSignup={() => setAppScreen('profileSetup')}
          onLogin={(verified, hasCard) => {
            if (verified) {
              setAppScreen('app');
            } else if (hasCard) {
              setAppScreen('studentIdPending');
            } else {
              setAppScreen('studentIdUpload');
            }
          }}
        />
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
        <StudentIdUploadPage
          defaultState="idle"
          onDone={() => setAppScreen('studentIdPending')}
          onBack={() => setAppScreen('profileSetup')}
        />
      </div>
    );
  }

  // 학생증 제출 완료 → 심사 대기 화면 (홈 접근 불가)
  if (appScreen === 'studentIdPending') {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        {devBar}
        <StudentIdUploadPage
          defaultState="pending"
          onDone={() => setAppScreen('app')}
        />
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

  /* ── verified=false 상태에서 app 접근 시도 시 차단 ──── */
  // (이 로직은 위의 loading 단계에서 이미 처리되므로
  //  앱 런타임 중 추가 게이팅은 useProfile로 확인)

  /* ── 메인 앱 ────────────────────────────────────── */
  const renderScreen = () => {
    switch (subPage) {
      case 'chatRoom':
        return openChat ? (
          <ChatRoomPage
            chat={openChat}
            onBack={goBack}
            onComplete={() => {}}
          />
        ) : null;
      case 'history':
        return <HistoryPage onBack={goBack} onTabChange={handleTabChange} />;
      case 'createTeam':
        return (
          <CreateTeamPage
            onBack={goBack}
            onDone={async (name, gender, size) => {
              try {
                await createTeamApi({
                  teamName: name,
                  gender,
                  size,
                  members: [],
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