import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
  onDone: (teamName: string, gender: '남성' | '여성', size: '2v2' | '3v3') => void;
}

type Step = 1 | 2 | 3;

export default function CreateTeamPage({ onBack, onDone }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [teamName, setTeamName] = useState('');
  const [gender, setGender] = useState<'남성' | '여성' | null>(null);
  const [size, setSize] = useState<'2v2' | '3v3'>('3v3');

  const canNext =
    step === 1 ? teamName.trim().length > 0
    : step === 2 ? gender !== null
    : true;

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Header */}
      <div className="absolute top-[0px] left-0 right-0 bg-white z-10 border-b border-[#f3f4f6] h-[56px] flex items-center px-4">
        <button
          onClick={step === 1 ? onBack : () => setStep(s => (s - 1) as Step)}
          className="flex items-center gap-1 text-[13px] text-[#6a7282]"
        >
          <ChevronLeft size={16} />
          {step === 1 ? '뒤로' : '이전'}
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 font-bold text-[16px] text-[#0a0a0a]">팀 만들기</p>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="absolute top-[56px] left-0 right-0 px-4 pt-[20px]">
        <div className="flex items-center gap-[6px] mb-[28px]">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-[4px] flex-1 rounded-full transition-colors duration-200 ${s <= step ? 'bg-black' : 'bg-[#e5e7eb]'}`}
            />
          ))}
        </div>

        {/* Step 1 — 팀 이름 */}
        {step === 1 && (
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 1 · 팀 이름</p>
            <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">우리 팀 이름을<br />정해볼게요</h2>
            <p className="text-[13px] text-[#6a7282] mb-[28px]">상대 팀에게 보여지는 이름이에요.</p>

            <div className={`border-2 rounded-[14px] px-[16px] py-[14px] transition-colors ${teamName ? 'border-black' : 'border-[#e5e7eb]'}`}>
              <input
                autoFocus
                type="text"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder="예) 충북대 심리학과팀"
                className="w-full text-[15px] text-[#0a0a0a] placeholder-[#99a1af] outline-none bg-transparent"
                maxLength={20}
              />
            </div>
            <p className="text-[11px] text-[#99a1af] mt-[8px] text-right">{teamName.length}/20</p>

            <div className="bg-[#f9fafb] rounded-[12px] p-[14px] mt-[16px]">
              <p className="text-[12px] text-[#6a7282] leading-[19px]">
                · 팀 이름은 나중에 변경할 수 없어요.<br />
                · 부적절한 이름은 운영자에 의해 삭제될 수 있어요.
              </p>
            </div>
          </div>
        )}

        {/* Step 2 — 성별 선택 */}
        {step === 2 && (
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 2 · 성별</p>
            <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">팀원 성별을<br />선택해주세요</h2>
            <p className="text-[13px] text-[#6a7282] mb-[28px]">같은 성별 학생만 팀에 초대할 수 있어요.</p>

            <div className="grid grid-cols-2 gap-[12px]">
              {(['남성', '여성'] as const).map(g => {
                const selected = gender === g;
                return (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`rounded-[18px] py-[28px] border-2 transition-all flex flex-col items-center gap-2 ${
                      selected ? 'bg-black border-black' : 'bg-[#f9fafb] border-[#e5e7eb]'
                    }`}
                  >
                    <span className="text-[32px]">{g === '남성' ? '👨‍🎓' : '👩‍🎓'}</span>
                    <div>
                      <div className={`text-[20px] font-bold leading-[28px] ${selected ? 'text-white' : 'text-[#0a0a0a]'}`}>
                        {g}
                      </div>
                      <div className={`text-[12px] mt-[2px] ${selected ? 'text-white/60' : 'text-[#6a7282]'}`}>
                        {g === '남성' ? '남자만 초대' : '여자만 초대'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-[#f9fafb] rounded-[12px] p-[14px] mt-[20px]">
              <p className="text-[12px] text-[#6a7282] leading-[19px]">
                · 성별은 팀 생성 후 변경할 수 없어요.<br />
                · 상대 팀과 반드시 다른 성별로 매칭돼요.
              </p>
            </div>
          </div>
        )}

        {/* Step 3 — 인원 선택 */}
        {step === 3 && (
          <div>
            <p className="text-[12px] text-[#6a7282] mb-[4px]">STEP 3 · 인원 선택</p>
            <h2 className="font-bold text-[22px] text-[#0a0a0a] mb-[6px]">몇 명이서<br />과팅할까요?</h2>
            <p className="text-[13px] text-[#6a7282] mb-[28px]">팀 규모를 정하면 같은 규모 팀과만 매칭돼요.</p>

            <div className="grid grid-cols-2 gap-[12px]">
              {(['2v2', '3v3'] as const).map(s => {
                const selected = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-[18px] py-[22px] border-2 transition-all ${selected ? 'bg-black border-black' : 'bg-[#f9fafb] border-[#e5e7eb]'}`}
                  >
                    <div className={`text-[26px] font-bold leading-[32px] ${selected ? 'text-white' : 'text-[#0a0a0a]'}`}>
                      {s === '2v2' ? '2 : 2' : '3 : 3'}
                    </div>
                    <div className={`text-[12px] mt-[4px] ${selected ? 'text-white/60' : 'text-[#6a7282]'}`}>
                      {s === '2v2' ? '소규모 · 가볍게' : '기본 · 왁자지껄'}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 팀 요약 */}
            <div className="bg-black rounded-[18px] p-[18px] mt-[20px]">
              <p className="text-white/60 text-[11px] mb-[10px] tracking-[1px]">최종 확인</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-[17px] mb-[2px]">{teamName || '충북대 심리학과팀'}</p>
                  <p className="text-white/60 text-[12px]">
                    {gender} · {size === '2v2' ? '2:2 소규모' : '3:3 기본'}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="bg-white/15 text-white text-[11px] px-2 py-0.5 rounded-full">{gender}</span>
                  <span className="bg-white/15 text-white text-[11px] px-2 py-0.5 rounded-full">{size === '2v2' ? '2:2' : '3:3'}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f9fafb] rounded-[12px] p-[14px] mt-[14px]">
              <p className="text-[12px] text-[#6a7282] leading-[19px]">
                · 팀원이 모두 모여야 매칭 신청이 가능해요.<br />
                · 다음 단계에서 초대 링크를 공유할 수 있어요.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA 버튼 */}
      <div className="absolute bottom-[24px] left-0 right-0 px-4">
        <button
          onClick={() => {
            if (step < 3) setStep(s => (s + 1) as Step);
            else onDone(teamName, gender!, size);
          }}
          disabled={!canNext}
          className={`w-full rounded-[14px] py-[15px] text-[15px] font-semibold transition-colors ${
            canNext ? 'bg-black text-white' : 'bg-[#e5e7eb] text-[#99a1af]'
          }`}
        >
          {step === 3 ? '팀 만들기 완료' : '다음'}
        </button>
      </div>
    </div>
  );
}