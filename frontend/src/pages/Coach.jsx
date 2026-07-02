import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Bot, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STARTER_PROMPTS = [
  "How should I start my chess journey?",
  "Explain the Italian Game opening",
  "What's the difference between a pin and a skewer?",
  "Give me a tactic to practice today",
];

function makeSessionId() {
  return `coach-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Coach() {
  const [sessionId] = useState(() => makeSessionId());
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome, traveller. I am ASTRA — your celestial chess coach. Ask me anything: an opening, a middlegame plan, a tactic, or paste a FEN and I'll analyse the position.\n\n⭐ Star tip: Start with a question you're genuinely curious about — curiosity is the best engine of learning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content }, { role: "assistant", content: "" }]);
    setSending(true);

    try {
      const res = await fetch(`${API}/coach/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: content }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Request failed: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (e) {
      toast.error("The cosmos went quiet. Please try again.");
      setMessages((m) => {
        const copy = [...m];
        if (copy[copy.length - 1].role === "assistant" && copy[copy.length - 1].content === "") {
          copy[copy.length - 1] = { role: "assistant", content: "Signal lost. Try again in a moment." };
        }
        return copy;
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 fade-in-up" data-testid="page-coach">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-xs tracking-[0.25em] uppercase text-slate-300">AI Coach</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Meet <span className="text-gold">ASTRA</span>
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
          Your celestial chess mentor. Powered by Gemini 3 Flash.
        </p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        {/* Chat window */}
        <div
          ref={scrollRef}
          className="p-6 h-[520px] overflow-y-auto space-y-4"
          data-testid="coach-messages"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.25), rgba(255,215,0,0.1))",
                    border: "1px solid rgba(0,229,255,0.4)",
                  }}
                >
                  <Bot className="w-4 h-4 text-cyan-200" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-yellow-400/10 border border-yellow-400/30 text-yellow-50"
                    : "bg-white/5 border border-cyan-400/25 text-slate-200"
                }`}
                data-testid={`msg-${m.role}-${i}`}
              >
                {m.content || (m.role === "assistant" && sending && <TypingDots />)}
              </div>
              {m.role === "user" && (
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.25), rgba(0,229,255,0.1))",
                    border: "1px solid rgba(255,215,0,0.4)",
                  }}
                >
                  <UserIcon className="w-4 h-4 text-yellow-200" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Starter prompts */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2" data-testid="coach-starters">
            {STARTER_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                data-testid={`starter-${p.slice(0, 12).replace(/\s+/g, "-")}`}
                className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-200 transition-all"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="border-t border-white/10 p-4 flex gap-3 items-center"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about openings, tactics, endgames, or paste a FEN..."
            data-testid="coach-input"
            className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            data-testid="coach-send"
            className="btn-gold rounded-md px-5 py-3 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}
          >
            <Send className="w-4 h-4" />
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 items-center text-cyan-300">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" style={{ animationDelay: "0.15s" }} />
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" style={{ animationDelay: "0.3s" }} />
    </span>
  );
}
