import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, X, MapPin, Clock, Check, Users, CalendarCheck, Trash2, Plus, BookOpen, HelpCircle, Store, ChevronDown, ChevronUp } from 'lucide-react';
import type { ChatItem } from './ChatPage';
import { useMessages } from '../hooks/useData';

interface Props {
  chat: ChatItem;
  onBack: () => void;
  onComplete?: () => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

const QUICK_CONTENT = {
  '과팅 하기 전 필독 사항': [
    '✅ 상대방을 존중하는 언어를 사용해 주세요.',
    '✅ 개인 SNS·연락처는 약속 잡힌 후 공유하세요.',
    '✅ 채팅 내 욕설·비하 발언은 즉시 제재됩니다.',
    '✅ 약속 당일 일방적인 노쇼는 패널티가 부과됩니다.',
    '✅ 매칭 상대의 개인정보를 외부에 공유하지 마세요.',
    '✅ 불쾌한 상황이 생기면 즉시 신고 기능을 이용하세요.',
    '✅ 모든 대화는 커뮤니티 가이드라인을 따릅니다.',
    '✅ 즐겁고 건강한 만남 문화를 함께 만들어 주세요! 🎉',
  ],
  '질문 리스트 20개': [
    'Q1. 전공이 어떻게 돼요? 전공 선택한 이유가 있어요?',
    'Q2. 요즘 가장 자주 가는 카페나 식당이 어디예요?',
    'Q3. 주말에 주로 뭐 하면서 시간 보내요?',
    'Q4. 최근에 인상 깊게 본 영화나 드라마 있어요?',
    'Q5. 여행 가보고 싶은 곳이 있다면요?',
    'Q6. 술은 즐기는 편이에요? 좋아하는 술이 있어요?',
    'Q7. 운동 좋아해요? 어떤 운동 해요?',
    'Q8. MBTI가 뭐예요? 잘 맞는 것 같아요?',
    'Q9. 아이돌이나 밴드 중 좋아하는 팀 있어요?',
    'Q10. 학교 생활에서 가장 즐거운 순간이 언제예요?',
    'Q11. 고향이 어디예요? 청주 출신이에요?',
    'Q12. 반려동물 좋아해요? 키우고 있어요?',
    'Q13. 요즘 빠져있는 취미가 있어요?',
    'Q14. 선호하는 데이트 스타일이 있어요?',
    'Q15. 아침형이에요, 야행성이에요?',
    'Q16. 가장 좋아하는 계절이 뭐예요?',
    'Q17. 맵찔이예요, 매운 거 잘 먹어요?',
    'Q18. 해외여행 가봤어요? 어디가 제일 좋았어요?',
    'Q19. 이상형이 어떻게 돼요? 외모 vs 성격?',
    'Q20. 오늘 기대되는 거 한 가지만 말해볼까요? 😊',
  ],
  '제휴 가게 리스트': [
    '🍽️ 파스타노 — 충북대 후문 도보 2분, 크림 파스타 전문점',
    '🍺 맥주공장 — 조용한 분위기 수제맥주 펍, 2인 안주 추천',
    '☕ 카페 온도 — 루프탑 뷰 카페, 디저트 세트 10% 할인',
    '🍣 스시히로 — 합리적인 오마카세, 학생증 제시 시 할인',
    '🥗 그린볼 — 건강식 샐러드·포케 전문점, 첫 방문 음료 무료',
    '🎲 플레이존 — 보드게임 카페, indeed 매칭팀 1시간 무료',
    '🍦 소프트리 — 소프트아이스크림·마카롱, 커플 세트 할인',
    '🍖 고기한판 — 삼겹살·목살 무한리필, 단체 예약 시 음료 서비스',
  ],
} as const;

type QuickKey = keyof typeof QUICK_CONTENT;

const DEMO_MESSAGES = [
  {
    id: 1,
    sender: 'bot' as const,
    text: '매칭이 완료됐어요! 👋 충북대학교 컴퓨터공학과 팀과 경영학과 팀이 연결됐습니다. 서로 인사 나눠보세요! 좌측 + 버튼으로 약속 장소·시간을 정할 수 있어요.',
    time: '',
  },
  { id: 2, sender: 'other' as const, text: '안녕하세요! 경영학과 팀이에요 😊 잘 부탁드려요!', time: '오후 2:10' },
  { id: 3, sender: 'other' as const, text: '이번 주 목요일 저녁 어때요?', time: '오후 2:11' },
];

interface MeetingInfo { place: string; date: string; time: string; setter: string; }
const TOTAL = 6;

const PLUS_MENU = [
  { key: 'meeting'             as const, icon: MapPin,    label: '장소·시간 정하기',      sub: '약속 장소와 시간을 공유해요' },
  { key: '과팅 하기 전 필독 사항' as QuickKey, icon: BookOpen,  label: '과팅 하기 전 필독 사항', sub: '꼭 읽어보세요' },
  { key: '질문 리스트 20개'      as QuickKey, icon: HelpCircle, label: '질문 리스트 20개',       sub: '아이스브레이킹 질문 모음' },
  { key: '제휴 가게 리스트'      as QuickKey, icon: Store,     label: '제휴 가게 리스트',      sub: '할인 혜택이 있어요' },
];

export default function ChatRoomPage({ chat, onBack, onComplete }: Props) {
  const { messages: apiMessages, loading, send } = useMessages(chat.id);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const [showPlusMenu,     setShowPlusMenu]     = useState(false);
  const [savedMeeting,     setSavedMeeting]     = useState<MeetingInfo | null>(null);
  const [meetingExpanded,  setMeetingExpanded]  = useState(false);
  const [meetingCancelled, setMeetingCancelled] = useState(false);
  const [showMeetingSheet, setShowMeetingSheet] = useState(false);
  const [meetingForm,      setMeetingForm]      = useState({ place: '', date: '', time: '' });
  const [myCompleted,      setMyCompleted]      = useState(false);
  const [completedCount,   setCompletedCount]   = useState(0);
  const [activeSheet,      setActiveSheet]      = useState<QuickKey | null>(null);
  const [showCancelConfirm,setShowCancelConfirm]= useState(false);

  const isActive = chat.status === 'active';
  const isDemo   = chat.id === 9999;
  const messages = isDemo && apiMessages.length === 0 && !loading ? DEMO_MESSAGES : apiMessages;

  // 약속 바 높이: 없으면 0, 있으면 44
  const noticeBarH = savedMeeting ? 44 : 0;
  // 확장 패널 높이: 약 160
  const expandedPanelH = 160;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, savedMeeting]);

  const getTimeLabel = () => {
    const now = new Date(), h = now.getHours(), m = now.getMinutes().toString().padStart(2, '0');
    return `${h >= 12 ? '오후' : '오전'} ${h > 12 ? h - 12 : h}:${m}`;
  };

  const sendMessage = async () => {
    const text = input.trim(); if (!text) return; setInput('');
    try { await send({ text, sender: 'me', time: getTimeLabel() }); } catch (e) { console.error(e); }
  };

  const handleSaveMeeting = () => {
    if (!meetingForm.place || !meetingForm.date || !meetingForm.time) return;
    setSavedMeeting({ ...meetingForm, setter: '나' });
    setMeetingCancelled(false); setMyCompleted(false); setCompletedCount(0);
    setShowMeetingSheet(false); setMeetingExpanded(false);
  };

  const handleConfirmComplete = () => {
    if (myCompleted) return;
    const next = completedCount + 1; setMyCompleted(true); setCompletedCount(next);
    if (next >= TOTAL) { onComplete?.(); onBack(); }
  };

  const handleCancelMeeting = () => {
    setSavedMeeting(null); setMeetingCancelled(false);
    setMyCompleted(false); setCompletedCount(0);
    setShowCancelConfirm(false); setMeetingExpanded(false);
  };

  const formatDate = (d: string) => {
    if (!d) return '';
    const dt = new Date(d); return `${dt.getMonth() + 1}월 ${dt.getDate()}일`;
  };

  const msgTop    = 104 + noticeBarH;
  const msgBottom = 100; // bottom bar (~66px) + home indicator (34px)

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f0f0f0] h-[60px] flex items-center px-4 justify-between">
        <button onClick={onBack} className="flex items-center gap-[4px] text-[13px] text-[#9ca3af]">
          <ChevronLeft size={16} /> 뒤로
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="font-semibold text-[14px] text-[#0a0a0a] whitespace-nowrap">{chat.name}</p>
          <p className="text-[10px] text-[#c4c9d4]">충북대학교 학과 내 과팅</p>
        </div>
        <div className="w-[40px]" />
      </div>

      {/* ── 약속 공지 바 (카카오 공지 스타일) ───────────────────── */}
      {savedMeeting && (
        <>
          <button
            onClick={() => setMeetingExpanded(v => !v)}
            className="absolute left-0 right-0 z-[9] bg-[#f9f9f9] border-b border-[#efefef] flex items-center px-4 gap-[10px]"
            style={{ top: '104px', height: '44px' }}
          >
            {/* 아이콘 */}
            <div className="w-[24px] h-[24px] bg-black rounded-full flex items-center justify-center shrink-0">
              <CalendarCheck size={11} className="text-white" />
            </div>

            {/* 내용 */}
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-semibold text-[#0a0a0a] truncate">
                {savedMeeting.place}
              </p>
              <p className="text-[10px] text-[#9ca3af]">
                {formatDate(savedMeeting.date)} · {savedMeeting.time}
              </p>
            </div>

            {/* 완료 카운터 + 펼치기 */}
            <div className="flex items-center gap-[8px] shrink-0">
              {completedCount > 0 && (
                <span className="text-[10px] font-semibold text-[#0a0a0a] bg-[#efefef] rounded-full px-[7px] py-[2px]">
                  {completedCount}/{TOTAL}
                </span>
              )}
              {meetingExpanded
                ? <ChevronUp  size={14} className="text-[#c4c9d4]" />
                : <ChevronDown size={14} className="text-[#c4c9d4]" />
              }
            </div>
          </button>

          {/* 확장 패널 */}
          {meetingExpanded && (
            <>
              {/* 바깥 탭으로 닫기 */}
              <div
                className="absolute inset-0 z-[8]"
                onClick={() => setMeetingExpanded(false)}
              />
              <div
                className="absolute left-0 right-0 z-[10] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.10)]"
                style={{ top: '148px' }}
              >
                {/* 장소·시간 */}
                <div className="px-5 pt-4 pb-3 flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <MapPin size={14} className="text-[#9ca3af] shrink-0" />
                    <span className="text-[14px] font-semibold text-[#0a0a0a]">{savedMeeting.place}</span>
                  </div>
                  <div className="flex items-center gap-[10px]">
                    <Clock size={14} className="text-[#9ca3af] shrink-0" />
                    <span className="text-[14px] font-semibold text-[#0a0a0a]">
                      {formatDate(savedMeeting.date)} · {savedMeeting.time}
                    </span>
                  </div>
                </div>

                {/* 완료 진행바 */}
                <div className="px-5 pb-3">
                  <div className="flex items-center justify-between mb-[6px]">
                    <div className="flex items-center gap-1">
                      <Users size={11} className="text-[#c4c9d4]" />
                      <span className="text-[11px] text-[#c4c9d4]">참여 확인</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#0a0a0a]">{completedCount}/{TOTAL}명</span>
                  </div>
                  <div className="flex gap-[3px]">
                    {Array.from({ length: TOTAL }).map((_, i) => (
                      <div key={i} className={`flex-1 h-[3px] rounded-full transition-colors duration-300 ${i < completedCount ? 'bg-black' : 'bg-[#efefef]'}`} />
                    ))}
                  </div>
                </div>

                {/* 약속 완료 버튼 */}
                {isActive && (
                  <div className="px-5 pb-3">
                    <button
                      onClick={handleConfirmComplete}
                      disabled={myCompleted}
                      className={`w-full rounded-[12px] py-[11px] text-[13px] font-semibold transition-all ${
                        myCompleted ? 'bg-[#f3f4f6] text-[#c4c9d4]' : 'bg-black text-white'
                      }`}
                    >
                      {myCompleted ? `✓ 완료 확인함 · ${completedCount}/${TOTAL}명` : '약속 완료 확인하기'}
                    </button>
                  </div>
                )}

                {/* 수정 / 취소 */}
                {isActive && (
                  <div className="border-t border-[#f3f4f6] flex">
                    <button
                      onClick={() => { setMeetingExpanded(false); setShowMeetingSheet(true); }}
                      className="flex-1 py-[11px] text-[12px] text-[#9ca3af] border-r border-[#f3f4f6]"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => { setMeetingExpanded(false); setShowCancelConfirm(true); }}
                      className="flex-1 py-[11px] text-[12px] text-[#e24b4a] flex items-center justify-center gap-1"
                    >
                      <Trash2 size={11} /> 약속 취소
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Messages */}
      <div
        className="absolute left-0 right-0 overflow-y-auto px-4 py-4 flex flex-col gap-3"
        style={{ top: `${msgTop}px`, bottom: `${msgBottom}px` }}
      >
        {loading && !isDemo ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[72px]" />
            <Skeleton className="h-[36px] w-[160px]" />
            <div className="self-end"><Skeleton className="h-[36px] w-[140px]" /></div>
          </div>
        ) : (
          messages.map(msg => {
            if (msg.sender === 'bot') return (
              <div key={msg.id} className="bg-[#f7f7f7] rounded-[14px] px-4 py-3">
                <p className="text-[10px] font-semibold text-[#c4c9d4] mb-[5px] uppercase tracking-wide">안내</p>
                <p className="text-[12px] text-[#555] leading-[19px]">{msg.text}</p>
              </div>
            );
            if (msg.sender === 'other') return (
              <div key={msg.id} className="flex flex-col items-start gap-[3px]">
                <div className="bg-[#f3f4f6] rounded-[4px_14px_14px_14px] px-[12px] py-[9px] max-w-[230px]">
                  <p className="text-[13px] text-[#0a0a0a] leading-[20px]">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#c4c9d4]">{msg.time}</span>
              </div>
            );
            return (
              <div key={msg.id} className="flex flex-col items-end gap-[3px]">
                <div className="bg-[#0a0a0a] rounded-[14px_4px_14px_14px] px-[12px] py-[9px] max-w-[230px]">
                  <p className="text-[13px] text-white leading-[20px]">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#c4c9d4]">{msg.time}</span>
              </div>
            );
          })
        )}

        {meetingCancelled && (
          <div className="bg-[#fff8f8] rounded-[12px] px-4 py-3 flex items-start gap-2">
            <X size={13} className="text-[#e24b4a] mt-[1px] shrink-0" />
            <p className="text-[12px] text-[#e24b4a] leading-[18px]">약속이 취소됐어요. + 버튼으로 새로 정해보세요.</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Bottom bar */}
      <div
        className="absolute left-0 right-0 bg-white border-t border-[#f0f0f0] px-4 flex items-center gap-2"
        style={{ bottom: '34px', paddingTop: '10px', paddingBottom: '10px' }}
      >
        <button
          onClick={() => setShowPlusMenu(v => !v)}
          className={`w-[34px] h-[34px] rounded-full border flex items-center justify-center shrink-0 transition-colors ${
            showPlusMenu ? 'bg-black border-black' : 'border-[#e5e7eb] bg-white'
          }`}
        >
          <Plus size={16} className={showPlusMenu ? 'text-white' : 'text-[#0a0a0a]'} />
        </button>
        <div className="flex-1 bg-[#f7f7f7] rounded-full px-[14px] py-[9px] flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="메시지 입력..."
            className="flex-1 bg-transparent text-[13px] text-[#0a0a0a] placeholder-[#c4c9d4] outline-none"
          />
        </div>
        <button onClick={sendMessage} className="w-[34px] h-[34px] bg-black rounded-full flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>

      {/* + 메뉴 팝업 */}
      {showPlusMenu && (
        <>
          <div className="absolute inset-0 z-30" onClick={() => setShowPlusMenu(false)} />
          <div
            className="absolute left-4 right-4 z-40 bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.10)] overflow-hidden"
            style={{ bottom: '106px' }}
          >
            {PLUS_MENU.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setShowPlusMenu(false);
                    if (item.key === 'meeting') setShowMeetingSheet(true);
                    else setActiveSheet(item.key as QuickKey);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-[13px] text-left active:bg-[#f7f7f7] ${idx < PLUS_MENU.length - 1 ? 'border-b border-[#f3f4f6]' : ''}`}
                >
                  <div className="w-[32px] h-[32px] bg-[#f3f4f6] rounded-full flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-[#0a0a0a]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0a0a0a]">{item.label}</p>
                    <p className="text-[11px] text-[#c4c9d4]">{item.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* 장소·시간 바텀 시트 */}
      {showMeetingSheet && (
        <div className="absolute inset-0 z-50 flex items-end rounded-[40px] overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowMeetingSheet(false)} />
          <div className="relative bg-white rounded-t-[24px] w-full flex flex-col" style={{ maxHeight: '520px' }}>
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-[36px] h-[4px] bg-[#e5e7eb] rounded-full" />
            </div>
            <div className="flex items-center justify-between px-5 pt-3 pb-4 shrink-0">
              <p className="text-[16px] font-bold text-[#0a0a0a]">약속 장소·시간 설정</p>
              <button onClick={() => setShowMeetingSheet(false)}>
                <X size={18} className="text-[#9ca3af]" />
              </button>
            </div>
            <div className="overflow-y-auto px-5 pb-8 flex flex-col gap-4">
              <div>
                <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">만날 장소</label>
                <div className="flex items-center gap-2 bg-[#f7f7f7] rounded-[12px] px-4 py-[13px]">
                  <MapPin size={14} className="text-[#c4c9d4] shrink-0" />
                  <input type="text" value={meetingForm.place} onChange={e => setMeetingForm(p => ({ ...p, place: e.target.value }))}
                    placeholder="예: 충북대 학생회관 1층 로비"
                    className="flex-1 bg-transparent text-[13px] text-[#0a0a0a] placeholder-[#c4c9d4] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">날짜</label>
                <div className="bg-[#f7f7f7] rounded-[12px] px-4 py-[13px]">
                  <input type="date" value={meetingForm.date} onChange={e => setMeetingForm(p => ({ ...p, date: e.target.value }))}
                    className="w-full bg-transparent text-[13px] text-[#0a0a0a] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">시간</label>
                <div className="flex items-center gap-2 bg-[#f7f7f7] rounded-[12px] px-4 py-[13px]">
                  <Clock size={14} className="text-[#c4c9d4] shrink-0" />
                  <input type="time" value={meetingForm.time} onChange={e => setMeetingForm(p => ({ ...p, time: e.target.value }))}
                    className="flex-1 bg-transparent text-[13px] text-[#0a0a0a] outline-none" />
                </div>
              </div>
              <button
                onClick={handleSaveMeeting}
                disabled={!meetingForm.place || !meetingForm.date || !meetingForm.time}
                className="w-full bg-black text-white rounded-[14px] py-[14px] text-[14px] font-semibold disabled:opacity-30 mt-1"
              >
                채팅방에 공유하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 약속 취소 확인 모달 */}
      {showCancelConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-[40px] overflow-hidden px-6">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowCancelConfirm(false)} />
          <div className="relative bg-white rounded-[20px] w-full px-6 py-6 shadow-lg">
            <p className="text-[16px] font-bold text-[#0a0a0a] mb-2">약속을 취소할까요?</p>
            <p className="text-[13px] text-[#9ca3af] mb-6 leading-[20px]">
              취소하면 완료 카운트가 초기화되고, 새로 장소·시간을 정해야 해요.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelConfirm(false)}
                className="flex-1 bg-[#f3f4f6] rounded-[12px] py-[12px] text-[14px] font-semibold text-[#6a7282]">
                아니요
              </button>
              <button onClick={handleCancelMeeting}
                className="flex-1 bg-[#e24b4a] text-white rounded-[12px] py-[12px] text-[14px] font-semibold">
                취소할게요
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 빠른 답변 바텀 시트 */}
      {activeSheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end rounded-[40px] overflow-hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setActiveSheet(null)} />
          <div className="relative bg-white rounded-t-[24px] flex flex-col" style={{ maxHeight: '500px' }}>
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-[36px] h-[4px] bg-[#e5e7eb] rounded-full" />
            </div>
            <div className="flex items-center justify-between px-5 pt-2 pb-3 shrink-0">
              <p className="text-[15px] font-bold text-[#0a0a0a]">{activeSheet}</p>
              <button onClick={() => setActiveSheet(null)}><X size={18} className="text-[#9ca3af]" /></button>
            </div>
            <div className="overflow-y-auto px-5 pb-6 flex flex-col">
              {QUICK_CONTENT[activeSheet].map((item, i) => (
                <p key={i} className="text-[13px] text-[#333] leading-[20px] py-[11px] border-b border-[#f3f4f6] last:border-none">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
