import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import type { ChatItem } from './ChatPage';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other' | 'bot';
  time: string;
}

interface Props {
  chat: ChatItem;
  onBack: () => void;
}

const initialMessages: Message[] = [
  {
    id: 0,
    text: '안녕하세요! 매칭이 완료됐어요. 채팅은 약속 잡는 용도로만 사용해요. 24시간 무응답 시 자동 종료되며 패널티가 부여돼요. 약속이 잡히면 팀장이 \'약속 완료\' 버튼을 눌러주세요. 과팅 당일과 다음날도 채팅방이 유지돼요.',
    sender: 'bot',
    time: '',
  },
  {
    id: 1,
    text: '안녕하세요! 반가워요 :)',
    sender: 'other',
    time: '오후 6:02',
  },
  {
    id: 2,
    text: '반가워요! 이번 주 토요일 어때요?',
    sender: 'me',
    time: '오후 6:03',
  },
  {
    id: 3,
    text: '좋아요! 충대 근처 어떠세요?',
    sender: 'other',
    time: '오후 6:05',
  },
];

export default function ChatRoomPage({ chat, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const label = `${h >= 12 ? '오후' : '오전'} ${h > 12 ? h - 12 : h}:${m}`;
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'me', time: label }]);
    setInput('');
  };

  const isActive = chat.status === 'active';

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] w-[390px] h-[844px]">

      {/* Status bar */}
      <div className="absolute h-[44px] left-0 top-0 w-[390px] bg-white">
        <p className="absolute font-['SF_Compact_Display:Semibold',sans-serif] leading-normal left-[20px] text-[16px] text-black top-[15px] tracking-[0.5px] whitespace-nowrap">3:14</p>
      </div>

      {/* Header */}
      <div className="absolute top-[44px] left-0 right-0 bg-white z-10 border-b border-[#e5e7eb] h-[60px] flex items-center px-4 justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6a7282]">
          <ChevronLeft size={16} />
          뒤로
        </button>

        {/* 중앙 팀 이름 */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <p className="font-semibold text-[14px] text-[#0a0a0a] whitespace-nowrap">{chat.name}</p>
          <p className="text-[10px] text-[#6a7282]">약속 완료 전까지 유지</p>
        </div>

        {/* 가게 버튼 */}
        <button className="text-[12px] font-medium text-black underline whitespace-nowrap">
          가게 →
        </button>
      </div>

      {/* Messages */}
      <div className="absolute top-[104px] left-0 right-0 overflow-y-auto px-4 py-4 flex flex-col gap-4"
        style={{ bottom: isActive ? '164px' : '130px' }}>

        {messages.map(msg => {
          if (msg.sender === 'bot') {
            return (
              <div key={msg.id} className="bg-[#f3f4f6] rounded-[14px] p-[14px]">
                <p className="text-[10px] font-semibold text-[#6a7282] mb-[8px]">안내 봇</p>
                <p className="text-[11px] text-[#4a5565] leading-[18px]">{msg.text}</p>
              </div>
            );
          }
          if (msg.sender === 'other') {
            return (
              <div key={msg.id} className="flex flex-col items-start gap-[4px]">
                <div className="bg-[#f3f4f6] rounded-bl-[14px] rounded-br-[14px] rounded-tl-[4px] rounded-tr-[14px] px-[12px] py-[8px] max-w-[240px]">
                  <p className="text-[13px] text-[#0a0a0a] leading-[19.5px]">{msg.text}</p>
                </div>
                <span className="text-[10px] text-[#99a1af]">{msg.time}</span>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex flex-col items-end gap-[4px]">
              <div className="bg-black rounded-bl-[14px] rounded-br-[14px] rounded-tl-[14px] rounded-tr-[4px] px-[12px] py-[8px] max-w-[240px]">
                <p className="text-[13px] text-white leading-[19.5px]">{msg.text}</p>
              </div>
              <span className="text-[10px] text-[#99a1af]">{msg.time}</span>
            </div>
          );
        })}

        {/* 제휴 가게 리스트 배너 */}
        <div className="bg-[#f9fafb] rounded-[10px] px-[14px] py-[10px] flex items-center justify-between border border-[#e5e7eb]">
          <span className="text-[12px] text-[#6a7282]">제휴 가게 리스트 보기</span>
          <span className="text-[12px] font-medium text-black">→</span>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Bottom bar */}
      <div
        className="absolute left-0 right-0 bg-white border-t border-[#e5e7eb] px-4 flex flex-col gap-[10px]"
        style={{ bottom: '34px', paddingTop: '11px', paddingBottom: isActive ? '12px' : '12px' }}
      >
        {/* 약속 완료 버튼 (진행 중일 때만) */}
        {isActive && (
          <button className="w-full bg-black text-white rounded-[14px] py-[12px] text-[14px] font-semibold">
            약속 완료
          </button>
        )}

        {/* 입력창 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#f9fafb] border border-[#e5e7eb] rounded-full px-[14px] py-[10px] flex items-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="메시지 입력..."
              className="flex-1 bg-transparent text-[13px] text-[#0a0a0a] placeholder-[#99a1af] outline-none"
            />
          </div>
          <button
            onClick={sendMessage}
            className="w-[38px] h-[38px] bg-black rounded-full flex items-center justify-center shrink-0"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-0 h-[34px] left-0 w-[390px] bg-white">
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[139px] h-[4px] bg-black rounded-full" />
      </div>
    </div>
  );
}
