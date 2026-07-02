import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Crown, MessageSquare, Puzzle, Play } from "lucide-react";

const HERO_BG = "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg";

const features = [
  {
    icon: Play,
    title: "Play the Cosmos",
    desc: "Face our built-in stellar engine at three difficulty tiers — from casual sparring to gravitational calculation.",
    to: "/play",
    testid: "feature-play",
  },
  {
    icon: Puzzle,
    title: "Tactical Puzzles",
    desc: "Sharpen your vision with hand-crafted puzzles — forks, pins, skewers and back-rank galaxies.",
    to: "/puzzles",
    testid: "feature-puzzles",
  },
  {
    icon: Crown,
    title: "Cosmic Lessons",
    desc: "Learn openings, tactics, endgames and strategy through space-themed short lessons.",
    to: "/lessons",
    testid: "feature-lessons",
  },
  {
    icon: MessageSquare,
    title: "AI Chess Coach",
    desc: "Chat with ASTRA — an AI mentor who reads your board and guides your growth.",
    to: "/coach",
    testid: "feature-coach",
  },
];

export default function Home() {
  return (
    <div className="fade-in-up" data-testid="page-home">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
          }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,8,20,0.5) 0%, rgba(5,8,20,0.85) 60%, #050814 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40 text-center">
          <div
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
            data-testid="hero-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-xs tracking-[0.2em] text-slate-300 uppercase">
              Chess &amp; Cosmic Learning
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
            data-testid="hero-title"
          >
            <span className="text-silver">ASTRA</span>
            <span className="text-cyan-glow">APP</span>
          </h1>

          <p
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
            data-testid="hero-subtitle"
          >
            Master chess through the lens of the universe. Play against a stellar engine,
            solve tactical puzzles, take cosmic lessons and chat with your personal AI coach.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/play"
              className="btn-gold px-8 py-3 rounded-md inline-flex items-center gap-2"
              data-testid="hero-cta-play"
              style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em" }}
            >
              START PLAYING <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/coach"
              className="btn-cosmic px-8 py-3 rounded-md inline-flex items-center gap-2"
              data-testid="hero-cta-coach"
              style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.08em" }}
            >
              MEET YOUR COACH
              <MessageSquare className="w-4 h-4" />
            </Link>
          </div>

          {/* Floating chess pieces */}
          <div className="mt-16 flex justify-center gap-6 md:gap-10 text-5xl md:text-7xl opacity-90">
            <span className="piece-gold" style={{ animation: "float 6s ease-in-out infinite" }}>♞</span>
            <span className="piece-silver" style={{ animation: "float 7s ease-in-out infinite", animationDelay: "0.5s" }}>♜</span>
            <span className="piece-gold" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}>♚</span>
            <span className="piece-silver" style={{ animation: "float 6.5s ease-in-out infinite", animationDelay: "1.5s" }}>♛</span>
            <span className="piece-gold" style={{ animation: "float 5.5s ease-in-out infinite", animationDelay: "2s" }}>♝</span>
          </div>
          <style>{`@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }`}</style>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.25em] text-cyan-300 uppercase mb-3">Explore the constellation</div>
          <h2 className="text-3xl md:text-5xl font-semibold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Four ways to <span className="text-gold">ascend</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.title}
                to={f.to}
                data-testid={f.testid}
                className="glass rounded-xl p-6 hover-lift group"
              >
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(255,215,0,0.1))",
                    border: "1px solid rgba(0,229,255,0.3)",
                  }}
                >
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <h3
                  className="text-xl font-semibold mb-2 text-white"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                <div className="mt-4 text-cyan-300 text-xs tracking-[0.15em] uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Enter <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA strip */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass rounded-2xl p-10 md:p-14 relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40%, rgba(0,229,255,0.35), transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(255,215,0,0.2), transparent 50%)",
            }}
          />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-xs tracking-[0.25em] text-cyan-300 uppercase mb-3">
                Your first orbit
              </div>
              <h3
                className="text-3xl md:text-4xl font-semibold text-white mb-4"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                Ready to <span className="text-gold">launch</span>?
              </h3>
              <p className="text-slate-300 mb-6 max-w-lg">
                Start with a puzzle — three minutes, one tactic, and you'll leave sharper than you arrived.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/puzzles"
                  className="btn-cosmic px-6 py-3 rounded-md inline-flex items-center gap-2"
                  data-testid="cta-solve-puzzle"
                  style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
                >
                  <Zap className="w-4 h-4" /> SOLVE A PUZZLE
                </Link>
                <Link
                  to="/lessons"
                  className="btn-cosmic px-6 py-3 rounded-md inline-flex items-center gap-2"
                  data-testid="cta-browse-lessons"
                  style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
                >
                  <Crown className="w-4 h-4" /> BROWSE LESSONS
                </Link>
              </div>
            </div>
            <div className="flex justify-center text-8xl md:text-9xl">
              <span className="piece-gold">♚</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6" data-testid="site-footer">
          <span className="tracking-[0.2em] uppercase">AstraApp.com</span> &middot; Chess &amp; Cosmic Learning &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
