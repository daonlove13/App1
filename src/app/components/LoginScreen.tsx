import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import svgPaths from '../../imports/svg-ll91t992hz';

/* ── 공통 스텝 타입 ─────────────────────────────── */
type LoginStep = 'landing' | 'email' | 'password' | 'verify';

interface Props {
  onLogin: () => void;
}

/* ── 스타터 랜딩 화면 ────────────────────────────── */
function LandingView({ onEmailSignup, onLogin }: { onEmailSignup: () => void; onLogin: () => void }) {
  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <div className="absolute h-[34px] left-1/2 -translate-x-1/2 top-0 w-[207.16px]">
          <svg className="block size-full" fill="none" viewBox="0 0 173.16 34" preserveAspectRatio="none">
            <path d={svgPaths.p10628500} fill="black" />
          </svg>
        </div>
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[52px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* 로고 & 타이틀 */}
      <div className="absolute left-0 right-0 top-[210px] flex flex-col items-center">
        <p className="font-['Protest_Riot'] text-[148px] leading-none text-black">?</p>
        <p className="font-['Protest_Riot'] text-[60px] leading-none text-black -mt-[10px]">indeed</p>
      </div>

      {/* 슬로건 */}
      <div className="absolute left-0 right-0 top-[478px] text-center">
        <p className="text-[14px] text-[#6a7282] leading-[22px]">같은 학교, 다른 학과</p>
        <p className="text-[14px] text-[#6a7282]">과팅의 새로운 방법</p>
      </div>

      {/* 버튼 영역 */}
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
          시작하면 <span className="text-black">이용약관</span> 및 <span className="text-black">개인정보처리방침</span>에
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

/* ── 이메일 입력 화면 ────────────────────────────── */
function EmailView({ onBack, onNext }: { onBack: () => void; onNext: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
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
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-[4px] flex-1 rounded-full ${i === 1 ? 'bg-black' : 'bg-[#e5e7eb]'}`} />
          ))}
        </div>

        <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 1 · 이메일</p>
        <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">이메일을<br />입력해주세요</h2>
        <p className="text-[13px] text-[#6a7282] mb-[28px]">로그인과 알림 수신에 사용돼요. 재학 여부는 다음 단계에서 학생증으로 확인해요.</p>

        <div className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${isValid ? 'border-black' : 'border-[#e5e7eb]'}`}>
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
            · 본인 명의의 이메일을 사용해주세요.<br />
            · 이메일은 외부에 공개되지 않아요.
          </p>
        </div>
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={() => isValid && onNext(email)}
          disabled={!isValid}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors ${isValid ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'}`}
        >
          인증 메일 보내기
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 인증 코드 확인 화면 ──────────────────────────── */
function VerifyView({ email, onBack, onDone }: { email: string; onBack: () => void; onDone: () => void }) {
  const [code, setCode] = useState('');
  const isValid = code.length === 6;

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center px-4">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
      </div>

      <div className="absolute top-[110px] left-0 right-0 px-[30px]">
        <div className="flex gap-[6px] mb-[28px]">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-[4px] flex-1 rounded-full ${i <= 2 ? 'bg-black' : 'bg-[#e5e7eb]'}`} />
          ))}
        </div>

        <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 2 · 이메일 인증</p>
        <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">인증 코드를<br />입력해주세요</h2>
        <p className="text-[13px] text-[#6a7282] mb-[28px]">
          <span className="font-medium text-black">{email}</span>로<br />
          6자리 코드를 보냈어요.
        </p>

        {/* 코드 입력 */}
        <label className="relative block mb-[20px]">
          <div className="flex gap-[10px] justify-center">
            {[0,1,2,3,4,5].map(i => (
              <div
                key={i}
                className={`w-[44px] h-[52px] border-2 rounded-[12px] flex items-center justify-center text-[22px] font-bold transition-colors ${
                  code[i] ? 'border-black bg-[#f9fafb]' : i === code.length ? 'border-black' : 'border-[#e5e7eb]'
                }`}
              >
                {code[i] || ''}
              </div>
            ))}
          </div>
          <input
            autoFocus
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            inputMode="numeric"
            maxLength={6}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
          />
        </label>

        <button className="w-full text-center text-[12px] text-[#6a7282] py-2">
          코드를 받지 못했나요? <span className="text-black font-medium underline">재전송</span>
        </button>
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={() => isValid && onDone()}
          disabled={!isValid}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors ${isValid ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'}`}
        >
          확인
        </button>
      </div>

      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}

/* ── 비밀번호 로그인 화면 ──────────────────────────── */
function PasswordView({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">
      <div className="absolute h-[44px] top-0 left-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      <div className="absolute top-[44px] left-0 right-0 h-[56px] flex items-center px-4 border-b border-[#f3f4f6]">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">로그인</p>
      </div>

      <div className="absolute top-[116px] left-0 right-0 px-[30px]">
        <p className="font-bold text-[22px] text-[#0a0a0a] mb-[28px]">다시 만나서<br />반가워요 :)</p>

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
              className="flex-1 text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
            <button onClick={() => setShow(v => !v)} type="button">
              {show ? <EyeOff size={18} className="text-[#99a1af]" /> : <Eye size={18} className="text-[#99a1af]" />}
            </button>
          </div>
        </div>

        <button className="w-full text-center text-[12px] text-[#6a7282] py-3">
          비밀번호를 잊으셨나요? <span className="text-black font-medium underline">재설정</span>
        </button>
      </div>

      <div className="absolute bottom-[58px] left-[30px] right-[30px]">
        <button
          onClick={() => email && password && onDone()}
          disabled={!email || !password}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors ${email && password ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'}`}
        >
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
export default function LoginScreen({ onLogin }: Props) {
  const [step, setStep] = useState<LoginStep>('landing');
  const [email, setEmail] = useState('');

  if (step === 'email') {
    return <EmailView onBack={() => setStep('landing')} onNext={(e) => { setEmail(e); setStep('verify'); }} />;
  }
  if (step === 'verify') {
    return <VerifyView email={email} onBack={() => setStep('email')} onDone={onLogin} />;
  }
  if (step === 'password') {
    return <PasswordView onBack={() => setStep('landing')} onDone={onLogin} />;
  }
  return <LandingView onEmailSignup={() => setStep('email')} onLogin={() => setStep('password')} />;
}
