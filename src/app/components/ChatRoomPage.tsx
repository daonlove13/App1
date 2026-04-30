import { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { ChatItem } from './ChatPage';
import { useMessages } from '../hooks/useData';
import { completeChat } from '../services/api';

interface Props {
  chat: ChatItem;
  onBack: () => void;
  onComplete?: () => void;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-[#f3f4f6] rounded-[12px] ${className}`} />;
}

export default function ChatRoomPage({ chat, onBack, onComplete }: Props) {
  const { messages, loading, send } = useMessages(chat.id);
  const [input, setInput] = useState('');
  const [completing, setCompleting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getTimeLabel = () => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    return `${h >= 12 ? '오후' : '오전'} ${h > 12 ? h - 12 : h}:${m}`;
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    try {
      await send({ text, sender: 'me', time: getTimeLabel() });
    } catch (e) {
      console.error('메시지 전송 오류:', e);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await completeChat(chat.id);
      onComplete?.();
      onBack();
    } catch (e) {
      console.error('약속 완료 오류:', e);
    } finally {
      setCompleting(false);
    }
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
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <p className="font-semibold text-[14px] text-[#0a0a0a] whitespace-nowrap">{chat.name}</p>
          <p className="text-[10px] text-[#6a7282]">약속 완료 전까지 유지</p>
        </div>
        <button className="text-[12px] font-medium text-black underline whitespace-nowrap">
          가게 →
        </button>
      </div>

      {/* Messages */}
      <div
        className="absolute top-[104px] left-0 right-0 overflow-y-auto px-4 py-4 flex flex-col gap-4"
        style={{ bottom: isActive ? '164px' : '130px' }}
      >
        {loading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[80px]" />
            <div className="flex flex-col items-start gap-1">
              <Skeleton className="h-[36px] w-[160px]" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-[36px] w-[140px]" />
            </div>
          </div>
        ) : (
          messages.map(msg => {
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
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Bottom bar */}
      <div
        className="absolute left-0 right-0 bg-white border-t border-[#e5e7eb] px-4 flex flex-col gap-[10px]"
        style={{ bottom: '34px', paddingTop: '11px', paddingBottom: '12px' }}
      >
        {isActive && (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="w-full bg-black text-white rounded-[14px] py-[12px] text-[14px] font-semibold disabled:opacity-50"
          >
            {completing ? '처리 중...' : '약속 완료'}
          </button>
        )}
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
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
