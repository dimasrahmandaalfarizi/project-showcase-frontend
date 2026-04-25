import { Html } from "@react-three/drei";
import { useState } from "react";

const API_BASE_URL = 'http://localhost/project-showcase-api';

interface Props {
  projectId: number;
  visible: boolean;
  onExplain: (text: string) => void;
}

export default function DifficultyToggle({ projectId, visible, onExplain }: Props) {
  const [loading, setLoading] = useState(false);

  const fetchExplanation = async (difficulty: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/ai/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, difficulty })
      });
      const data = await response.json();
      if (data.explanation) {
        onExplain(data.explanation);
      }
    } catch (e) {
      console.error("AI Explanation Error:", e);
    }
    setLoading(false);
  };

  return (
    <Html 
      position={[-0.5, 0.9, 0.1]} 
      center 
      zIndexRange={[100, 0]}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transition: 'opacity 0.3s' }}
    >
      <div className="flex gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 font-sans text-xs text-white whitespace-nowrap shadow-xl">
         <span className="opacity-60 my-auto pr-1">AI Explain:</span>
         {['beginner', 'intermediate', 'expert'].map(level => (
           <button 
             key={level}
             onClick={(e) => { e.stopPropagation(); fetchExplanation(level); }}
             disabled={loading}
             className="px-2 py-0.5 rounded outline outline-1 outline-white/10 hover:bg-white/20 hover:outline-white/30 capitalize transition-all disabled:opacity-50"
           >
             {level}
           </button>
         ))}
         {loading && <span className="my-auto ml-1 animate-spin inline-block">⌛</span>}
      </div>
    </Html>
  );
}
