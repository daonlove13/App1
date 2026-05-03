import { useState, useRef } from 'react';
import { Camera, CheckCircle, Upload, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { uploadStudentCard } from '../services/api';

/* ── 제휴 가게 미리보기 데이터 ─────────────────────────────────── */
const PREVIEW_RESTAURANTS = [
  { id: 1, name: '치킨앤비어 중대점', category: '치킨 · 맥주' },
  { id: 2, name: '혼마 파스타', category: '이탈리안' },
  { id: 3, name: '더 플레이스', category: '카페 · 브런치' },
  { id: 4, name: '소이연남', category: '한식 · 술집' },
  { id: 5, name: '비스트로 34', category: '양식' },
];

/* ── 밸런스 게임 데이터 ──────────────────────────────────────────── */
const BALANCE_QUESTIONS = [
  { q: '첫 만남 장소는?', a: '카페에서', b: '맛집에서' },
  { q: '과팅 인원 선택한다면?', a: '2:2 소규모', b: '3:3 왁자지껄' },
  { q: '자기소개 방식은?', a: '재미있게 웃으며', b: '진지하게 깊이' },
  { q: '첫인상에서 더 중요한 건?', a: '외모 (솔직하게)', b: '분위기 · 말투' },
  { q: '과팅 시작할 때 먼저?', a: '내가 먼저 말 걸기', b: '상대방이 먼저' },
];

/* ── 밸런스 게임 컴포넌트 ─────────────────────────────────────────── */
function BalanceGame() {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<'a' | 'b' | null>(null);
  const q = BALANCE_QUESTIONS[qIdx];

  const nextQuestion = () => {
    setSelected(null);
    setQIdx(i => (i + 1) % BALANCE_QUESTIONS.length);
  };

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <p className="font-bold text-[16px] text-[#0a0a0a]">밸런스 게임 ⚡️</p>
        <button onClick={nextQuestion} className="text-[12px] text-[#6a7282] font-medium">
          다음 문제 →
        </button>
      </div>
      <div className="border-2 border-[#e5e7eb] rounded-[20px] p-5">
        <p className="text-[15px] font-bold text-center text-[#0a0a0a] mb-4 leading-[22px]">{q.q}</p>
        <div className="grid grid-cols-2 gap-3">
          {(['a', 'b'] as const).map(side => (
            <button
              key={side}
              onClick={() => setSelected(side)}
              className={`py-[14px] px-2 rounded-[14px] text-[14px] font-semibold border-2 transition-all ${
                selected === side
                  ? 'bg-black text-white border-black'
                  : selected !== null
                  ? 'bg-[#f9fafb] text-[#c4c9d4] border-[#f3f4f6]'
                  : 'bg-white text-[#0a0a0a] border-[#e5e7eb] active:bg-[#f9fafb]'
              }`}
            >
              {q[side]}
            </button>
          ))}
        </div>
        {selected && (
          <p className="text-center text-[12px] text-[#6a7282] mt-3 leading-[18px]">
            승인 후 팀원들이랑도 해보세요! 😄
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Props ───────────────────────────────────────────────────────── */
interface Props {
  onDone: () => void;
  onBack?: () => void;
  defaultState?: 'idle' | 'uploaded' | 'pending';
}

/* ── 메인 컴포넌트 ───────────────────────────────────────────────── */
export default function StudentIdUploadPage({ onDone, onBack, defaultState = 'idle' }: Props) {
  const [state, setState] = useState<'idle' | 'uploading' | 'uploaded' | 'pending' | 'error'>(defaultState);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일만 업로드할 수 있어요.');
      setState('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('파일 크기는 10MB 이하여야 해요.');
      setState('error');
      return;
    }

    setState('uploading');
    setErrorMsg('');
    try {
      await uploadStudentCard(file);
      setState('uploaded');
      // 0.8초 후 pending으로 전환
      setTimeout(() => setState('pending'), 800);
    } catch (e) {
      console.error('Student card upload error:', e);
      setErrorMsg(String(e));
      setState('error');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
    // reset so same file can be re-selected
    e.target.value = '';
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const isUploadState = state === 'idle' || state === 'uploading' || state === 'uploaded' || state === 'error';

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* 숨긴 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">
          3:14
        </p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        {onBack && isUploadState && state !== 'uploading' && (
          <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
            <ChevronLeft size={18} />
            뒤로
          </button>
        )}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="font-['Protest_Riot'] text-[18px] leading-[26px]">indeed</span>
        </div>
      </div>

      {/* Content */}
      <div className="absolute top-[100px] left-0 right-0 bottom-[34px] flex flex-col overflow-hidden">
        {state !== 'pending' ? (
          /* ── 업로드 UI ─────────────────────────────────────── */
          <div className="flex flex-col flex-1 px-5 pt-6">
            <div className="mb-6">
              <p className="text-[12px] text-[#99a1af] mb-1">마지막 단계</p>
              <h2 className="text-[24px] font-bold text-[#0a0a0a] leading-[32px] mb-2">
                학생증을
                <br />
                인증해주세요
              </h2>
              <p className="text-[14px] text-[#6a7282] leading-[22px]">
                재학 중인 학교 학생증 사진을 올려주세요.
                <br />
                확인 후{' '}
                <span className="font-semibold text-black">30분 이내</span>{' '}
                승인돼요.
              </p>
            </div>

            {/* Upload Area */}
            <button
              onClick={state !== 'uploading' ? openFilePicker : undefined}
              className={`flex-1 max-h-[260px] border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center gap-4 transition-all active:scale-[0.98] ${
                state === 'uploaded'
                  ? 'border-black bg-[#f9fafb]'
                  : state === 'uploading'
                  ? 'border-[#99a1af] bg-[#f9fafb] cursor-not-allowed'
                  : state === 'error'
                  ? 'border-red-300 bg-red-50'
                  : 'border-[#d1d5dc] bg-[#f9fafb]'
              }`}
            >
              {state === 'uploading' && (
                <>
                  <Loader2 size={48} className="text-black animate-spin" strokeWidth={1.5} />
                  <p className="text-[15px] font-semibold text-black">업로드 중...</p>
                </>
              )}
              {state === 'uploaded' && (
                <>
                  <CheckCircle size={48} className="text-black" strokeWidth={1.5} />
                  <p className="text-[15px] font-semibold text-black">업로드 완료!</p>
                </>
              )}
              {state === 'error' && (
                <>
                  <AlertCircle size={48} className="text-red-400" strokeWidth={1.5} />
                  <div className="text-center px-4">
                    <p className="text-[14px] font-semibold text-red-500 mb-1">업로드 실패</p>
                    <p className="text-[12px] text-red-400 leading-[18px]">{errorMsg}</p>
                    <p className="text-[12px] text-[#99a1af] mt-1">다시 시도하려면 탭하세요</p>
                  </div>
                </>
              )}
              {state === 'idle' && (
                <>
                  <div className="w-[72px] h-[72px] bg-black rounded-full flex items-center justify-center">
                    <Camera size={32} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-semibold text-[#0a0a0a] mb-1">
                      사진 찍기 또는 불러오기
                    </p>
                    <p className="text-[13px] text-[#99a1af]">학생증이 잘 보이게 촬영해주세요</p>
                  </div>
                </>
              )}
            </button>

            {/* Tips */}
            <div className="bg-[#f9fafb] rounded-[14px] p-4 mt-4">
              <p className="text-[12px] text-[#6a7282] leading-[20px]">
                · 이름, 학번, 학교명이 모두 보여야 해요
                <br />
                · 모자이크나 가림 없이 선명하게 찍어주세요
                <br />
                · 제출 정보는 인증 목적으로만 사용돼요
              </p>
            </div>

            {/* CTA 버튼 */}
            <button
              onClick={state !== 'uploading' ? openFilePicker : undefined}
              disabled={state === 'uploading'}
              className={`mt-4 w-full rounded-[14px] py-[15px] text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors ${
                state === 'uploading'
                  ? 'bg-[#e5e7eb] text-[#99a1af] cursor-not-allowed'
                  : 'bg-black text-white'
              }`}
            >
              {state === 'uploading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  업로드 중...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  갤러리에서 선택
                </>
              )}
            </button>
          </div>
        ) : (
          /* ── 대기 화면 ──────────────────────────────────────── */
          <div className="flex-1 overflow-y-auto">
            {/* 상태 헤더 */}
            <div className="flex flex-col items-center pt-5 pb-4 px-5">
              <div className="w-[64px] h-[64px] bg-black rounded-full flex items-center justify-center mb-3">
                <span className="text-white font-['Protest_Riot'] text-[28px]">?</span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-[7px] h-[7px] rounded-full bg-black animate-pulse" />
                <span className="text-[11px] font-semibold text-[#6a7282] uppercase tracking-wide">
                  심사 중
                </span>
              </div>
              <h2 className="text-[22px] font-bold text-[#0a0a0a] mb-2">심사 중이에요</h2>
              <p className="text-[14px] text-[#6a7282] text-center leading-[22px]">
                보통{' '}
                <span className="font-semibold text-black">30분 이내</span>로 승인 알림이 와요.
                <br />
                앱을 종료해도 알림으로 알려드려요.
              </p>
            </div>

            {/* 실시간 대기 현황 */}
            <div className="px-5 mb-5">
              <div className="bg-[#1a1a1a] rounded-[20px] p-5">
                <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wide mb-3">
                  실시간 대기 현황
                </p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white/10 rounded-[14px] p-4 text-center">
                    <p className="text-white font-bold text-[30px] leading-none mb-1">12</p>
                    <p className="text-white/50 text-[11px]">남성 팀 대기 중</p>
                  </div>
                  <div className="bg-white/10 rounded-[14px] p-4 text-center">
                    <p className="text-white font-bold text-[30px] leading-none mb-1">8</p>
                    <p className="text-white/50 text-[11px]">여성 팀 대기 중</p>
                  </div>
                </div>
                <p className="text-white/40 text-[12px] text-center">
                  승인 완료 후 바로 매칭에 참여할 수 있어요!
                </p>
              </div>
            </div>

            {/* 밸런스 게임 */}
            <div className="px-5">
              <BalanceGame />
            </div>

            {/* 제휴 가게 미리보기 */}
            <div className="mb-5">
              <div className="px-5 mb-2">
                <p className="font-bold text-[16px] text-[#0a0a0a] mb-0.5">제휴 가게 미리보기</p>
                <p className="text-[12px] text-[#6a7282]">매칭되면 가기 좋은 학교 근처 가게들</p>
              </div>
              <div className="flex gap-3 px-5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {PREVIEW_RESTAURANTS.map(r => (
                  <div
                    key={r.id}
                    className="shrink-0 w-[140px] bg-[#f9fafb] rounded-[16px] overflow-hidden border border-[#f3f4f6]"
                  >
                    <div className="h-[80px] bg-[#f3f4f6] flex items-center justify-center">
                      <span className="text-[10px] text-[#d1d5dc]">사진 준비 중</span>
                    </div>
                    <div className="p-2.5">
                      <p className="font-semibold text-[12px] text-[#0a0a0a] leading-tight mb-0.5">
                        {r.name}
                      </p>
                      <p className="text-[10px] text-[#99a1af]">{r.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 pb-6">
              <button
                onClick={onDone}
                className="w-full bg-black text-white rounded-[14px] py-[15px] text-[15px] font-semibold"
              >
                홈에서 기다릴게요
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
