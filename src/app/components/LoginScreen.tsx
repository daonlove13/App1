import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { authSignUp, authSignIn } from '../services/api';
import { supabase } from '../services/supabaseClient';
import StatusBar from '../../imports/StatusBar/StatusBar';

type LoginStep = 'landing' | 'signupEmail' | 'signupPassword' | 'login';

interface Props {
  onSignup: () => void;
  onLogin: (verified: boolean, hasCard: boolean) => void;
}

/* ── 공통 에러 박스 ────────────────────────────────── */
function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 mt-3">
      <p className="text-[12px] text-red-600 leading-[18px]">{msg}</p>
    </div>
  );
}

/* ── 스타터 랜딩 화면 ────────────────────────────── */
function LandingView({
  onEmailSignup,
  onLogin,
}: {
  onEmailSignup: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      {/* 로고 */}
      <div className="absolute left-0 right-0 top-[270px] flex flex-col items-center">
        <p className="font-['Protest_Riot'] text-[96px] leading-none text-black">indeed</p>
      </div>

      {/* 슬로건 */}
      <div className="absolute left-0 right-0 top-[478px] text-center">
        <p className="text-[14px] text-[#6a7282] leading-[22px]">같은 학교, 다른 학과</p>
        <p className="text-[14px] text-[#6a7282]">과팅의 새로운 방법</p>
      </div>

      {/* 버튼 */}
      <div className="absolute left-[35px] right-[35px] top-[568px] flex flex-col gap-[10px]">
        <button
          onClick={onEmailSignup}
          className="bg-black h-[56px] rounded-[15px] flex items-center justify-center"
        >
          <span className="text-white text-[17px] font-semibold">이메일로 시작하기</span>
        </button>
        <button
          onClick={onLogin}
          className="bg-white h-[56px] rounded-[15px] border border-[#e5e7eb] flex items-center justify-center"
        >
          <span className="text-[#1e2939] text-[17px] font-medium">로그인</span>
        </button>
      </div>

      {/* 약관 */}
      <div className="absolute left-0 right-0 bottom-[60px] text-center">
        <p className="text-[11px] text-[#99a1af] leading-[18px]">
          시작하면 <span className="text-black">이용약관</span> 및{' '}
          <span className="text-black">개인정보처리방침</span>에
        </p>
        <p className="text-[11px] text-[#99a1af]">동의하는 것으로 간주돼요</p>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 회원가입 Step 1: 이메일 입력 ──────────────────── */
function SignupEmailView({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (email: string) => void;
}) {
  const [email, setEmail] = useState('');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
      </div>

      <div className="absolute top-[110px] left-0 right-0 px-[30px]">
        {/* 스텝 바 */}
        <div className="flex gap-[6px] mb-[28px]">
          {[1, 2].map(i => (
            <div key={i} className={`h-[4px] flex-1 rounded-full ${i === 1 ? 'bg-black' : 'bg-[#e5e7eb]'}`} />
          ))}
        </div>

        <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 1 · 이메일</p>
        <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">
          이메일을
          <br />
          입력해주세요
        </h2>
        <p className="text-[13px] text-[#6a7282] mb-[28px]">
          로그인에 사용될 이메일을 입력해주세요. 재학 여부는 다음 단계에서 학생증으로 확인해요.
        </p>

        <div
          className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${
            isValid ? 'border-black' : 'border-[#e5e7eb]'
          }`}
        >
          <input
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="예) hong@gmail.com"
            className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
          />
        </div>

        {email.length > 0 && !isValid && (
          <p className="text-[11px] text-[#e24b4a] mt-[8px]">올바른 이메일 형식을 입력해주세요</p>
        )}

        <div className="bg-[#f9fafb] rounded-[12px] p-[14px] mt-[20px]">
          <p className="text-[12px] text-[#6a7282] leading-[19px]">
            · 본인 명의의 이메일을 사용해주세요.
            <br />
            · 이메일은 외부에 공개되지 않아요.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={() => isValid && onNext(email)}
          disabled={!isValid}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors ${
            isValid ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'
          }`}
        >
          다음 단계
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 회원가입 Step 2: 비밀번호 설정 ────────────────── */
function SignupPasswordView({
  email,
  onBack,
  onDone,
}: {
  email: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isPasswordValid = password.length >= 8;
  const isConfirmValid = password === confirm && confirm.length > 0;
  const isAllValid = isPasswordValid && isConfirmValid;

  const handleSignup = async () => {
    if (!isAllValid) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await authSignUp(email, password);
      onDone();
    } catch (e) {
      setErrorMsg(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
      </div>

      <div className="absolute top-[110px] left-0 right-0 px-[30px]">
        {/* 스텝 바 */}
        <div className="flex gap-[6px] mb-[28px]">
          {[1, 2].map(i => (
            <div key={i} className="h-[4px] flex-1 rounded-full bg-black" />
          ))}
        </div>

        <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 2 · 비밀번호</p>
        <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">
          비밀번호를
          <br />
          설정해주세요
        </h2>
        <p className="text-[13px] text-[#6a7282] mb-[28px]">
          <span className="font-medium text-black">{email}</span>
          <br />
          8자 이상의 비밀번호를 입력해주세요.
        </p>

        <div className="flex flex-col gap-[12px]">
          {/* 비밀번호 */}
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] flex items-center gap-2 transition-colors ${
              password.length > 0 && isPasswordValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호 (8자 이상)"
              className="flex-1 text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
            <button onClick={() => setShow(v => !v)} type="button">
              {show ? (
                <EyeOff size={18} className="text-[#99a1af]" />
              ) : (
                <Eye size={18} className="text-[#99a1af]" />
              )}
            </button>
          </div>
          {password.length > 0 && !isPasswordValid && (
            <p className="text-[11px] text-[#e24b4a] -mt-2">8자 이상 입력해주세요</p>
          )}

          {/* 비밀번호 확인 */}
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${
              confirm.length > 0 && isConfirmValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="비밀번호 확인"
              className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
          </div>
          {confirm.length > 0 && !isConfirmValid && (
            <p className="text-[11px] text-[#e24b4a] -mt-2">비밀번호가 일치하지 않아요</p>
          )}
        </div>

        {errorMsg && <ErrorBox msg={errorMsg} />}
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={handleSignup}
          disabled={!isAllValid || loading}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 ${
            isAllValid && !loading ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'
          }`}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          회원가입 완료
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 로그인 화면 ──────────────────────────────────── */
function LoginView({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: (verified: boolean, hasCard: boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = email.length > 0 && password.length > 0;

  const handleLogin = async () => {
    if (!isValid) return;
    setLoading(true);
    setErrorMsg('');
    try {
      const { session } = await authSignIn(email, password);
      if (!session) throw new Error('로그인에 실패했어요. 다시 시도해주세요.');

      // 유저 verified 상태 조회
      const { data: userData } = await supabase
        .from('users')
        .select('verified, student_card_url')
        .eq('id', session.user.id)
        .maybeSingle();

      const verified = userData?.verified ?? false;
      const hasCard = !!userData?.student_card_url;

      onDone(verified, hasCard);
    } catch (e) {
      setErrorMsg(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] overflow-clip">
        <StatusBar />
      </div>

      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center px-4 border-b border-[#f3f4f6]">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">로그인</p>
      </div>

      <div className="absolute top-[116px] left-0 right-0 px-[30px]">
        <p className="font-bold text-[22px] text-[#0a0a0a] mb-[28px]">
          다시 만나서
          <br />
          반가워요 :)
        </p>

        <div className="flex flex-col gap-[12px]">
          <div className="border-2 border-[#e5e7eb] rounded-[14px] px-[16px] py-[14px] focus-within:border-black transition-colors">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일"
              className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
          </div>
          <div className="border-2 border-[#e5e7eb] rounded-[14px] px-[16px] py-[14px] flex items-center gap-2 focus-within:border-black transition-colors">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="flex-1 text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
            <button onClick={() => setShow(v => !v)} type="button">
              {show ? <EyeOff size={18} className="text-[#99a1af]" /> : <Eye size={18} className="text-[#99a1af]" />}
            </button>
          </div>
        </div>

        {errorMsg && <ErrorBox msg={errorMsg} />}
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={handleLogin}
          disabled={!isValid || loading}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 ${
            isValid && !loading ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'
          }`}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          로그인
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 메인 LoginScreen ──────────────────────────────── */
export default function LoginScreen({ onSignup, onLogin }: Props) {
  const [step, setStep] = useState<LoginStep>('landing');
  const [signupEmail, setSignupEmail] = useState('');

  if (step === 'signupEmail') {
    return (
      <SignupEmailView
        onBack={() => setStep('landing')}
        onNext={email => {
          setSignupEmail(email);
          setStep('signupPassword');
        }}
      />
    );
  }

  if (step === 'signupPassword') {
    return (
      <SignupPasswordView
        email={signupEmail}
        onBack={() => setStep('signupEmail')}
        onDone={onSignup}
      />
    );
  }

  if (step === 'login') {
    return (
      <LoginView
        onBack={() => setStep('landing')}
        onDone={(verified, hasCard) => onLogin(verified, hasCard)}
      />
    );
  }

  return (
    <LandingView
      onEmailSignup={() => setStep('signupEmail')}
      onLogin={() => setStep('login')}
    />
  );
}