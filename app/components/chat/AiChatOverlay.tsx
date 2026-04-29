'use client';
import { useState, useRef, useEffect } from 'react';
import { API_BASE_URL } from '@constants';

export default function AiChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! Let me know if you need help exploring the projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || "Maaf, terjadi kesalahan saat memproses jawaban." }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'ai', text: "Maaf, sistem AI sedang gangguan. Coba lagi nanti." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 h-96 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-4 flex flex-col shadow-2xl text-white pointer-events-auto">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
            <h3 className="font-semibold text-lg font-sans">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
          </div>
          
          <div className="flex-1 overflow-y-auto text-sm space-y-3 font-sans pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-lg inline-block max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 self-end float-right clear-both' : 'bg-white/10 self-start float-left clear-both'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white/10 p-2 rounded-lg self-start float-left clear-both inline-block opacity-50">
                Mengetik...
              </div>
            )}
            <div ref={messagesEndRef} className="clear-both" />
          </div>

          <div className="mt-2 flex gap-2 font-sans pt-2 border-t border-white/10">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask something..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 outline-none text-white text-sm focus:border-white/30 transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 px-3 py-1.5 rounded-lg text-sm transition-colors text-white font-medium"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-all"
      >
        <span className="text-white text-2xl">✨</span>
      </button>
    </div>
  );
}
