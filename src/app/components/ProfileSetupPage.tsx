import { useState } from 'react';
import { ChevronLeft, ChevronDown, Loader2 } from 'lucide-react';
import { createUserProfile } from '../services/api';

const DEPARTMENTS = [
  '경영학과', '경제학과', '회계학과', '무역학과', '마케팅학과', '금융학과',
  '사회학과', '심리학과', '사회복지학과', '정치외교학과', '행정학과', '법학과',
  '국어국문학과', '영어영문학과', '일어일문학과', '중어중문학과', '독어독문학과',
  '역사학과', '철학과', '신문방송학과', '미디어커뮤니케이션학과',
  '컴퓨터공학과', '소프트웨어학과', '정보통신공학과', '전자공학과',
  '전기공학과', '기계공학과', '화학공학과', '건축학과', '토목환경공학과',
  '산업공학과', '재료공학과', '수학과', '물리학과', '화학과', '생명과학과',
  '환경학과', '간호학과', '의학과', '약학과', '치의학과', '한의학과',
  '식품영양학과', '체육학과', '스포츠학과', '음악학과', '미술학과',
  '디자인학과', '패션학과', '영화학과', '연극학과', '교육학과',
  '유아교육학과', '특수교육학과', '관광학과', '호텔경영학과', '항공서비스학과',
].sort();

const formatPhone = (val: string) => {
  const digits = val.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

interface Props {
  onBack: () => void;
  onDone: () => void;
}

export default function ProfileSetupPage({ onBack, onDone }: Props) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gender, setGender] = useState<'남' | '여' | ''>('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isNameValid = name.trim().length >= 2;
  const isDeptValid = department !== '';
  const isStudentIdValid = studentId.replace(/\D/g, '').length >= 8;
  const isGenderValid = gender !== '';
  const isPhoneValid = phone.replace(/\D/g, '').length === 11;

  const isAllValid = isNameValid && isDeptValid && isStudentIdValid && isGenderValid && isPhoneValid;

  const handleDone = async () => {
    if (!isAllValid) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await createUserProfile({
        name: name.trim(),
        department,
        gender: gender === '남' ? '남성' : '여성',
        studentId,
        phone,
      });
      onDone();
    } catch (e) {
      setErrorMsg(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Back button */}
      <div className="absolute top-[0px] left-0 right-0 h-[56px] flex items-center px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] text-[#6a7282]"
        >
          <ChevronLeft size={16} />
          뒤로
        </button>
      </div>

      {/* Scrollable content */}
      <div className="absolute top-[56px] left-0 right-0 bottom-[100px] overflow-y-auto px-[30px] pt-2">
        <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px] leading-[30px] mt-[8px]">
          기본 정보를<br />입력해주세요
        </h2>
        <p className="text-[13px] text-[#6a7282] mb-[24px] leading-[20px]">
          매칭과 팀 구성에 사용돼요. 외부에 공개되지 않아요.
        </p>

        {/* 이름 */}
        <div className="mb-[14px]">
          <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">
            이름
          </label>
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${
              isNameValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="실명을 입력해주세요"
              className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* 학과 */}
        <div className="mb-[14px]">
          <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">
            학과
          </label>
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] flex items-center transition-colors ${
              isDeptValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="flex-1 text-[15px] outline-none bg-transparent appearance-none"
              style={{ color: department ? '#0a0a0a' : '#99a1af' }}
            >
              <option value="">학과를 선택해주세요</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d} style={{ color: '#0a0a0a' }}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="text-[#99a1af] shrink-0 ml-2" />
          </div>
        </div>

        {/* 학번 */}
        <div className="mb-[14px]">
          <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">
            학번
          </label>
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${
              isStudentIdValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <input
              type="text"
              inputMode="numeric"
              value={studentId}
              onChange={e =>
                setStudentId(e.target.value.replace(/\D/g, '').slice(0, 10))
              }
              placeholder="예) 2024123456"
              className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
          </div>
          {studentId.length > 0 && !isStudentIdValid && (
            <p className="text-[11px] text-[#e24b4a] mt-[6px]">
              학번은 8자리 이상 숫자로 입력해주세요
            </p>
          )}
        </div>

        {/* 성별 */}
        <div className="mb-[14px]">
          <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">
            성별
          </label>
          <div className="flex gap-[10px]">
            {(['남', '여'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 py-[14px] rounded-[14px] text-[15px] font-semibold border-2 transition-colors ${
                  gender === g
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-[#6a7282] border-[#e5e7eb]'
                }`}
              >
                {g === '남' ? '남성' : '여성'}
              </button>
            ))}
          </div>
        </div>

        {/* 전화번호 */}
        <div className="mb-[20px]">
          <label className="text-[12px] font-semibold text-[#0a0a0a] mb-[8px] block">
            전화번호
          </label>
          <div
            className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${
              isPhoneValid ? 'border-black' : 'border-[#e5e7eb]'
            }`}
          >
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(formatPhone(e.target.value))}
              placeholder="010-0000-0000"
              className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Info box */}
        <div className="bg-[#f9fafb] rounded-[12px] p-[14px] mb-4">
          <p className="text-[12px] text-[#6a7282] leading-[19px]">
            · 입력한 정보는 학생증 인증 확인에 사용돼요.<br />
            · 이름과 성별은 팀 매칭 상대에게만 공개돼요.<br />
            · 전화번호는 고객 지원 목적으로만 사용돼요.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 mb-4">
            <p className="text-[12px] text-red-600 leading-[18px]">{errorMsg}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="absolute bottom-[24px] left-[30px] right-[30px]">
        <button
          onClick={handleDone}
          disabled={!isAllValid || loading}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors flex items-center justify-center gap-2 ${
            isAllValid && !loading
              ? 'bg-black text-white'
              : 'bg-[#e5e7eb] text-[#99a1af]'
          }`}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          다음 · 학생증 인증
        </button>
      </div>
    </div>
  );
}