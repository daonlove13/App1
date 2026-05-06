import { Component } from 'react';
import Splash from '../../imports/Splash';
import Login from '../../imports/Login';
import OnboardingScreen from './OnboardingScreen';
import ProfileSetupPage from './ProfileSetupPage';
import StudentIdUploadPage from './StudentIdUploadPage';
import ApprovalCompletePage from './ApprovalCompletePage';
import MainHome from './MainHome';
import MatchingPage from './MatchingPage';
import ChatPage from './ChatPage';
import type { ChatItem } from './ChatPage';
import ChatRoomPage from './ChatRoomPage';
import MyPage from './MyPage';
import HistoryPage from './HistoryPage';
import CreateTeamPage from './CreateTeamPage';
import InviteLinkPage from './InviteLinkPage';
import MatchSuccessPage from './MatchSuccessPage';
import RestaurantDetailPage from './RestaurantDetailPage';
import NotificationPage from './NotificationPage';
import BrowseTeamsPage from './BrowseTeamsPage';
import ReceivedRequestsPage from './ReceivedRequestsPage';
import TeamProfilePage from './TeamProfilePage';
import type { RequestTeam } from './ReceivedRequestsPage';
import type { Team } from '../services/api';

type Tab = 'home' | 'matching' | 'chat' | 'my';

const noop = () => {};
const noopTab = (_: Tab) => {};
const noopDone = (_a: string, _b: '남성' | '여성', _c: '2v2' | '3v3') => {};
const noopTeam = (_: Team) => {};

const dummyChat: ChatItem = {
  id: 1,
  name: '경희대 경영학과',
  initial: '경',
  lastMessage: '안녕하세요! 이번 주말 어때요?',
  time: '12:30',
  status: 'active',
  unread: 2,
};

const dummyTeam: Team = {
  id: 'dummy-team-1',
  teamName: '충북대 심리학과팀',
  gender: '남성',
  size: '3v3',
  members: [
    { id: 'u1', name: '홍길동', role: '팀장', initial: '홍' },
    { id: 'u2', name: '김철수', role: '팀원', initial: '김' },
  ],
  maxMembers: 3,
  applied: false,
  createdAt: new Date().toISOString(),
};

const dummyTeamApplied: Team = { ...dummyTeam, applied: true };

const dummyRequestTeam: RequestTeam = {
  id: 1,
  name: '연세대 경영학과팀',
  university: '연세대',
  department: '경영학과',
  size: '2:2',
  initial: '연',
  receivedAt: '방금 전',
  matchType: '신입생 전용',
};

/* ── 스케일 상수 ─────────────────────────────────────────────── */
const SCALE = 0.295;
const PW = 390;
const PH = 844;
const CW = Math.round(PW * SCALE);
const CH = Math.round(PH * SCALE);

/* ── 에러 바운더리 ────────────────────────────────────────────── */
interface EBState { hasError: boolean }
class ScreenErrorBoundary extends Component<{ children: React.ReactNode }, EBState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="size-full flex items-center justify-center bg-gray-50">
          <p className="text-[11px] text-gray-400 text-center px-4">렌더 오류</p>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── 화면 카드 ───────────────────────────────────────────────── */
interface ScreenCardProps {
  label: string;
  sublabel?: string;
  tag?: string;
  tagColor?: string;
  children: React.ReactNode;
}

function ScreenCard({ label, sublabel, tag, tagColor = 'bg-gray-400', children }: ScreenCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      {tag && (
        <span className={`text-[9px] text-white font-bold px-2 py-0.5 rounded-full ${tagColor}`}>
          {tag}
        </span>
      )}
      <div
        className="relative overflow-hidden rounded-[13px] shadow-md border border-gray-200 bg-white"
        style={{ width: CW, height: CH }}
      >
        <div
          style={{
            width: PW,
            height: PH,
            transform: `scale(${SCALE})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <ScreenErrorBoundary>{children}</ScreenErrorBoundary>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[11px] text-gray-700 font-semibold leading-tight">{label}</p>
        {sublabel && <p className="text-[10px] text-gray-400 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}

/* ── 화살표 ─────────────────────────────────────────────────── */
function Arrow({ label, vertical = false }: { label?: string; vertical?: boolean }) {
  if (vertical) {
    return (
      <div className="flex flex-col items-center gap-1 shrink-0 py-1">
        {label && <span className="text-[9px] text-gray-400 whitespace-nowrap">{label}</span>}
        <div className="flex flex-col items-center">
          <div className="w-px h-6 bg-gray-300" />
          <div
            style={{
              width: 0, height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '6px solid #d1d5db',
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-1 shrink-0 self-center mb-5">
      {label && <span className="text-[9px] text-gray-400 whitespace-nowrap">{label}</span>}
      <div className="flex items-center">
        <div className="w-7 h-px bg-gray-300" />
        <div
          style={{
            width: 0, height: 0,
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderLeft: '7px solid #d1d5db',
          }}
        />
      </div>
    </div>
  );
}

/* ── 섹션 헤더 ──────────────────────────────────────────────── */
function SectionHeader({ num, title, color = 'bg-gray-800' }: { num: string; title: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 mb-5 self-start">
      <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center`}>
        <span className="text-white text-[10px] font-bold">{num}</span>
      </div>
      <span className="text-[13px] font-bold text-gray-800">{title}</span>
    </div>
  );
}

/* ── 구분선 ─────────────────────────────────────────────────── */
function Divider() {
  return <div className="w-full h-px bg-gray-200 my-2" />;
}

/* ── 메인 플로우 뷰 ─────────────────────────────────────────── */
export default function FlowView() {
  return (
    <div className="min-h-screen bg-[#f1f3f5] overflow-auto">
      {/* 상단 타이틀바 */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-[20px] font-['Protest_Riot']">?indeed</span>
          <span className="text-[12px] text-gray-400 border-l border-gray-200 pl-3">워크플로우 맵</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-gray-400">스크린 {Math.round(SCALE * 100)}% 축소</span>
        </div>
      </div>

      <div className="p-8 flex flex-col gap-10">

        {/* ── ① 온보딩 플로우 ── */}
        <section>
          <SectionHeader num="1" title="온보딩 · 회원가입 플로우" color="bg-black" />

          {/* Row 1: 스플래시 → 온보딩 → 로그인 → 개인정보 */}
          <div className="flex items-start gap-3 flex-wrap mb-6">
            <ScreenCard label="스플래시" sublabel="2초 후 자동 전환" tag="앱 시작" tagColor="bg-gray-500">
              <Splash />
            </ScreenCard>
            <Arrow label="자동" />
            <ScreenCard label="온보딩 소개" sublabel="3슬라이드 / 건너뛰기" tag="기존" tagColor="bg-gray-400">
              <OnboardingScreen onDone={noop} />
            </ScreenCard>
            <Arrow label="시작하기 →" />
            <ScreenCard label="로그인 / 이메일 가입" sublabel="개인 이메일 인증" tag="기존" tagColor="bg-gray-400">
              <Login />
            </ScreenCard>
            <Arrow label="인증 완료 →" />
            <ScreenCard
              label="개인정보 입력"
              sublabel="이름·학과·학번·성별·전화"
              tag="신규 ✦"
              tagColor="bg-blue-500"
            >
              <ProfileSetupPage onBack={noop} onDone={noop} />
            </ScreenCard>
          </div>

          {/* Row 2: 학생증 업로드 → 심사 중 → 승인 완료 → 홈 */}
          <div className="flex items-start gap-3 flex-wrap pl-4">
            <div className="flex items-center self-center mb-5 shrink-0">
              <div className="h-px w-6 bg-gray-300" />
              <div
                style={{
                  width: 0, height: 0,
                  borderTop: '5px solid transparent',
                  borderBottom: '5px solid transparent',
                  borderLeft: '7px solid #d1d5db',
                }}
              />
            </div>
            <ScreenCard
              label="학생증 업로드"
              sublabel="사진 선택 or 촬영"
              tag="수정됨 ✦"
              tagColor="bg-purple-500"
            >
              <StudentIdUploadPage onDone={noop} />
            </ScreenCard>
            <Arrow label="업로드 →" />
            <ScreenCard
              label="심사 중 (대기 화면)"
              sublabel="30분 이내 · 밸런스게임 · 대기현황"
              tag="개선됨 ✦"
              tagColor="bg-purple-500"
            >
              <StudentIdUploadPage onDone={noop} defaultState="pending" />
            </ScreenCard>
            <Arrow label="승인 완료 →" />
            <ScreenCard
              label="학생증 승인 완료"
              sublabel='"승인됐어요!" 팀 만들기 유도'
              tag="신규 ✦"
              tagColor="bg-blue-500"
            >
              <ApprovalCompletePage onDone={noop} />
            </ScreenCard>
            <Arrow label="홈으로 →" />
            <ScreenCard label="홈 (첫 진입)" sublabel="팀 없는 상태 · D-N 배너" tag="수정됨 ✦" tagColor="bg-purple-500">
              <MainHome
                team={null}
                teamLoading={false}
                onTabChange={noopTab}
                onCreateTeam={noop}
                onInviteTeam={noop}
              />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ② 팀 만들기 ── */}
        <section>
          <SectionHeader num="2" title="팀 만들기 플로우" color="bg-gray-700" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="홈 (팀 없음)" sublabel="팀 만들기 유도" tag="팀 없음" tagColor="bg-orange-400">
              <MainHome
                team={null}
                teamLoading={false}
                onTabChange={noopTab}
                onCreateTeam={noop}
                onInviteTeam={noop}
              />
            </ScreenCard>
            <Arrow label="팀 만들기 →" />
            <ScreenCard label="팀 만들기" sublabel="이름 · 성별 · 인원" tag="기존" tagColor="bg-gray-400">
              <CreateTeamPage onBack={noop} onDone={noopDone} />
            </ScreenCard>
            <Arrow label="완료 →" />
            <ScreenCard label="팀원 초대 링크" sublabel="링크 복사 · 카톡 공유" tag="기존" tagColor="bg-gray-400">
              <InviteLinkPage onBack={noop} onDone={noop} />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ③ 과팅 신청 ── */}
        <section>
          <SectionHeader num="3" title="과팅 신청 플로우" color="bg-gray-700" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="홈 (팀 있음)" sublabel="신청 전" tag="팀 있음" tagColor="bg-green-500">
              <MainHome
                team={dummyTeam}
                teamLoading={false}
                onTabChange={noopTab}
                onCreateTeam={noop}
                onInviteTeam={noop}
              />
            </ScreenCard>
            <Arrow label="과팅 신청하기 →" />
            <ScreenCard label="홈 (대기 중)" sublabel="신청 후 상태" tag="팀 있음" tagColor="bg-green-500">
              <MainHome
                team={dummyTeamApplied}
                teamLoading={false}
                onTabChange={noopTab}
                onCreateTeam={noop}
                onInviteTeam={noop}
              />
            </ScreenCard>
            <Arrow label="매칭 성사 →" />
            <ScreenCard label="매칭 성사 알림" sublabel="채팅 입장 유도" tag="기존" tagColor="bg-gray-400">
              <MatchSuccessPage department="경영학과" onGoToChat={noop} onLater={noop} />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ④ 하단 탭 ── */}
        <section>
          <SectionHeader num="4" title="하단 탭 네비게이션" color="bg-gray-600" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="매칭 설정" sublabel="2:2 / 3:3 선택">
              <MatchingPage
                team={null}
                onTabChange={noopTab}
                onApply={noop}
                onUpdateTeam={noopTeam}
              />
            </ScreenCard>
            <Arrow />
            <ScreenCard label="채팅 목록">
              <ChatPage onTabChange={noopTab} onOpenRoom={noop} />
            </ScreenCard>
            <Arrow label="채팅방 →" />
            <ScreenCard label="채팅방">
              <ChatRoomPage chat={dummyChat} onBack={noop} />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ⑤ 홈 헤더 액션 ── */}
        <section>
          <SectionHeader num="5" title="홈 헤더 액션 (알림·식당)" color="bg-gray-600" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="홈 (팀 있음)" sublabel="헤더 아이콘 진입점">
              <MainHome
                team={dummyTeam}
                teamLoading={false}
                onTabChange={noopTab}
                onCreateTeam={noop}
                onInviteTeam={noop}
              />
            </ScreenCard>
            <Arrow label="🔔 알림 →" />
            <ScreenCard label="알림 목록" sublabel="매칭·채팅·시스템" tag="기존" tagColor="bg-gray-400">
              <NotificationPage onBack={noop} />
            </ScreenCard>
            <Arrow label="식당 카드 →" />
            <ScreenCard label="식당 상세" sublabel="대기 팀·매칭 신청" tag="기존" tagColor="bg-gray-400">
              <RestaurantDetailPage
                restaurant={{ id: 1, name: '치킨앤비어 중대점', location: '서울', district: '도봉구', teamCount: 3, seats: 20 }}
                onBack={noop}
                onApply={noop}
              />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ⑥ MY 탭 ── */}
        <section>
          <SectionHeader num="6" title="MY 탭" color="bg-gray-600" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="MY">
              <MyPage onTabChange={noopTab} onOpenHistory={noop} />
            </ScreenCard>
            <Arrow label="과팅 이력 →" />
            <ScreenCard label="과팅 이력 상세">
              <HistoryPage onBack={noop} onTabChange={noopTab} />
            </ScreenCard>
          </div>
        </section>

        <Divider />

        {/* ── ⑦ 팀 탐색 플로우 ── */}
        <section>
          <SectionHeader num="7" title="팀 탐색 · 받은 신청 플로우" color="bg-gray-600" />
          <div className="flex items-start gap-3 flex-wrap">
            <ScreenCard label="과팅 신청 (탐색)" sublabel="필터 · 신청하기">
              <BrowseTeamsPage onBack={noop} onApply={noop} />
            </ScreenCard>
            <Arrow label="받은 신청 →" />
            <ScreenCard label="받은 신청 목록" sublabel="24시간 내 수락">
              <ReceivedRequestsPage onBack={noop} onViewTeam={noop} />
            </ScreenCard>
            <Arrow label="팀 프로필 →" />
            <ScreenCard label="팀 프로필" sublabel="수락 / 거절">
              <TeamProfilePage
                team={dummyRequestTeam}
                onBack={noop}
                onAccept={noop}
                onReject={noop}
              />
            </ScreenCard>
          </div>
        </section>

        {/* ── 범례 ── */}
        <div className="border border-gray-200 rounded-[14px] bg-white p-5 inline-flex flex-col gap-2.5 self-start">
          <p className="text-[11px] font-bold text-gray-700 mb-1">범례</p>
          {[
            { color: 'bg-blue-500', label: '신규 추가된 화면' },
            { color: 'bg-purple-500', label: '수정 / 개선된 화면' },
            { color: 'bg-orange-400', label: '팀 없는 상태' },
            { color: 'bg-green-500', label: '팀 있는 상태' },
            { color: 'bg-gray-400', label: '기존 유지 화면' },
            { color: 'bg-gray-500', label: '공통 / 온보딩' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full shrink-0 ${color}`} />
              <span className="text-[10px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}