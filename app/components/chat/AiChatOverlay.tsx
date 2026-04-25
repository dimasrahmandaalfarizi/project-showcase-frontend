'use client';
import { useState } from 'react';

export default function AiChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className="mb-4 w-80 h-96 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-4 flex flex-col shadow-2xl text-white pointer-events-auto">
          <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
            <h3 className="font-semibold text-lg font-sans">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto text-sm space-y-3 font-sans">
            <div className="bg-white/10 p-2 rounded-lg self-start inline-block">Hi! Let me know if you need help exploring the projects.</div>
          </div>
          <div className="mt-2 flex gap-2 font-sans">
            <input 
              type="text" 
              placeholder="Ask something..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 outline-none text-white text-sm"
            />
            <button className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm transition-colors text-white font-medium">
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
