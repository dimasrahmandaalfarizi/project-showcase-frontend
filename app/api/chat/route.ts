import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in Dimas Rahmanda's personal portfolio website.
Your role is to help visitors learn more about Dimas and his work.
Answer questions about Dimas in a friendly, concise, and professional manner.

Here is everything you need to know about Dimas:

Name: Dimas Rahmanda Al Farizi
Role: Fullstack & Backend Developer
University: UPN Veteran Jawa Timur
Interests: IoT, IT Solutions, Web Development, Mobile Development

Tech Stack:
- Frontend: React, Next.js, TypeScript, Three.js / React Three Fiber
- Backend: Node.js, PHP, NestJS
- Mobile: React Native
- Database: MySQL, Supabase (PostgreSQL)
- State Management: Zustand
- Tools: GSAP, Git

Projects:
1. Smart Locker App — IoT-based locker access system using React Native, Node.js, and QR authentication.
   GitHub: https://github.com/dimasrahmandaalfarizi/smart-parcel-locker-iot-app
2. Chess AI Helper — Web app integrating Stockfish engine for AI-driven chess analysis.
   Live: https://chess-ai-helper.vercel.app

Social:
- GitHub: https://github.com/dimasrahmandaalfarizi

If someone asks something unrelated to Dimas or software development, politely redirect them.
Keep answers short and conversational. Respond in the same language the user is using (Indonesian or English).`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Build conversation history for Gemini
    const contents = [];
    for (const msg of (history || [])) {
      if (msg.role === 'user') {
        contents.push({ role: 'user', parts: [{ text: msg.text }] });
      } else if (msg.role === 'ai') {
        contents.push({ role: 'model', parts: [{ text: msg.text }] });
      }
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Gemini error:', err);
      return NextResponse.json({ error: 'Gemini API error', detail: err }, { status: 502 });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Maaf, tidak bisa memproses sekarang.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
