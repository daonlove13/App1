import { useState, useRef } from 'react';
import { Camera, CheckCircle, Upload, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { uploadStudentCard } from '../services/api';

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

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
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
      <div className="absolute top-[56px] left-0 right-0 bottom-[34px] flex flex-col overflow-hidden">
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
    </div>
  );
}