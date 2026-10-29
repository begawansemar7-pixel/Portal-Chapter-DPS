import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Minus, 
  Bot, 
  User, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface ChatTurn {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  source?: string;
}

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      id: 'init-1',
      role: 'model',
      text: 'Halo! Saya **TANIA & JARVIS Virtual Assistant** untuk Chapter Digital Product and Solution (DPS) Telkom Indonesia.\n\nAda yang dapat saya bantu seputar alokasi talent, standar PRD, roadmap produk, atau tata kelola delivery hari ini?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'Gemini 3.8 Flash · Telkom DPS',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    'Target SLA validasi demand?',
    'Jelaskan 4 pilar kompetensi DPS',
    'Update capaian IndiBiz Merchant POS',
    'Cara alokasikan talent baru',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userTurn: ChatTurn = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update conversation state
    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn Gemini API
      const historyPayload = nextMessages.slice(0, -1).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/ai/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      const botTurn: ChatTurn = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'Maaf, saya sedang memproses permintaan Anda.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'Gemini 3.8 Flash',
      };

      setMessages((prev) => [...prev, botTurn]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallbackTurn: ChatTurn = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: 'Maaf, sambungan sementara terganggu. Anda dapat melihat informasi operasional pada modul Executive Command atau menghubungi PIC Chapter DPS.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Rules Engine Fallback',
      };
      setMessages((prev) => [...prev, fallbackTurn]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'model',
        text: 'Percakapan telah diatur ulang. Ada pertanyaan lain seputar operasional Chapter DPS yang dapat saya bantu?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'Gemini 3.8 Flash',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans selection:bg-red-600 selection:text-white">
      
      {/* Expanded Chat Window */}
      {isOpen ? (
        <div 
          className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-[360px] sm:w-[420px] h-[550px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          role="dialog"
          aria-label="TANIA-JARVIS Virtual Assistant Chat"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 px-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                AI
              </div>
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>TANIA & JARVIS Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Gemini 3.8 Flash · Chapter DPS
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Atur ulang percakapan"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Tutup chat"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/60 text-xs">
            {messages.map((turn) => {
              const isUser = turn.role === 'user';
              return (
                <div
                  key={turn.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                      isUser
                        ? 'bg-red-600 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-800 shadow-xs rounded-tl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-line text-[11px] sm:text-xs">
                      {turn.text}
                    </div>

                    <div
                      className={`mt-1.5 flex items-center justify-between text-[9px] font-mono ${
                        isUser ? 'text-red-200' : 'text-slate-400'
                      }`}
                    >
                      <span>{turn.source || (isUser ? 'Anda' : 'TANIA-JARVIS')}</span>
                      <span>{turn.timestamp}</span>
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-xs">
                      U
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
                  AI
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-xs shadow-xs text-xs flex items-center gap-1.5 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-slate-400 font-mono ml-1">Mengetik jawaban...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Strip */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <span className="text-slate-400 shrink-0 font-medium pl-1">Saran:</span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Tanyakan apa saja seputar Chapter DPS..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-600 transition-colors"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              title="Kirim pesan"
              className="p-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl shadow-xs transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Bubble Button (Closed State) */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-xl hover:shadow-red-900/40 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
          aria-label="Buka Chatbot TANIA & JARVIS"
        >
          {/* Subtle Outer Pulsing Wave */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-20 animate-ping pointer-events-none"></span>

          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 transition-transform group-hover:rotate-6" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1" />
          </div>

          {/* Hover Tooltip / Floating Pill Label */}
          <div className="absolute right-16 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap flex items-center gap-1.5 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>TANIA & JARVIS AI</span>
          </div>
        </button>
      )}

    </div>
  );
};
