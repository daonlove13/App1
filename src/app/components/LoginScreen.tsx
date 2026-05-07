import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface Props {
  onSignup: () => void;
  onLogin: (verified: boolean, hasCard: boolean) => void;
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 mt-3">
      <p className="text-[12px] text-red-600 leading-[18px]">{msg}</p>
    </div>
  );
}

/* ── 카카오 아이콘 ── */
function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C5.582 2 2 4.925 2 8.5c0 2.26 1.418 4.25 3.563 5.438L4.75 17l3.938-2.563C9.115 14.813 9.553 14.875 10 14.875c4.418 0 8-2.925 8-6.375C18 4.925 14.418 2 10 2z" fill="#3C1E1E"/>
    </svg>
  );
}

/* ── 구글 아이콘 ── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
      <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.759-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
      <path d="M4.405 11.9A6.01 6.01 0 014.09 10c0-.663.114-1.305.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
      <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginScreen({ onSignup, onLogin }: Props) {
  const [loading, setLoading] = useState<'google' | 'kakao' | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGoogle = async () => {
    setLoading('google');
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (e) {
      setErrorMsg('구글 로그인에 실패했어요. 다시 시도해주세요.');
      setLoading(null);
    }
  };

  const handleKakao = async () => {
    setLoading('kakao');
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/`,
          scopes: 'profile_nickname profile_image',
        },
      });
      if (error) throw error;
    } catch (e) {
      setErrorMsg('카카오 로그인에 실패했어요. 다시 시도해주세요.');
      setLoading(null);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* 로고 */}
      <div className="absolute left-0 right-0 top-[200px] flex flex-col items-center">
        <p className="font-['Protest_Riot'] text-[96px] leading-none text-black">indeed</p>
      </div>

      {/* 슬로건 */}
      <div className="absolute left-0 right-0 top-[390px] text-center">
        <p className="text-[14px] text-[#6a7282] leading-[22px]">같은 학교, 다른 학과</p>
        <p className="text-[14px] text-[#6a7282]">과팅의 새로운 방법</p>
      </div>

      {/* 소셜 로그인 버튼 */}
      <div className="absolute left-[35px] right-[35px] top-[490px] flex flex-col gap-[12px]">
        {/* 카카오 */}
        <button
          onClick={handleKakao}
          disabled={!!loading}
          className="h-[56px] rounded-[15px] flex items-center justify-center gap-[10px] transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#FEE500' }}
        >
          {loading === 'kakao' ? (
            <Loader2 size={20} className="animate-spin text-[#3C1E1E]" />
          ) : (
            <KakaoIcon />
          )}
          <span className="text-[#3C1E1E] text-[17px] font-semibold">카카오로 시작하기</span>
        </button>

        {/* 구글 */}
        <button
          onClick={handleGoogle}
          disabled={!!loading}
          className="bg-white h-[56px] rounded-[15px] border border-[#e5e7eb] flex items-center justify-center gap-[10px] transition-opacity disabled:opacity-60"
        >
          {loading === 'google' ? (
            <Loader2 size={20} className="animate-spin text-[#6a7282]" />
          ) : (
            <GoogleIcon />
          )}
          <span className="text-[#1e2939] text-[17px] font-medium">Google로 시작하기</span>
        </button>
      </div>

      {errorMsg && (
        <div className="absolute left-[35px] right-[35px] top-[620px]">
          <ErrorBox msg={errorMsg} />
        </div>
      )}

      {/* 약관 */}
      <div className="absolute left-0 right-0 bottom-[24px] text-center">
        <p className="text-[11px] text-[#99a1af] leading-[18px]">
          시작하면 <span className="text-black">이용약관</span> 및{' '}
          <span className="text-black">개인정보처리방침</span>에
        </p>
        <p className="text-[11px] text-[#99a1af]">동의하는 것으로 간주돼요</p>
      </div>
    </div>
  );
}
