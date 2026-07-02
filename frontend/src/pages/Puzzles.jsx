import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Puzzle as PuzzleIcon, Star } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Puzzles() {
  const [puzzles, setPuzzles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/puzzles`).then((r) => {
      setPuzzles(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 fade-in-up" data-testid="page-puzzles">
      <div className="mb-10">
        <div className="text-xs tracking-[0.25em] text-cyan-300 uppercase mb-2">Tactical Training</div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Puzzles <span className="text-gold">Across the Stars</span>
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Sharpen your calculation. Find the best move — the one that bends the board to your will.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-400" data-testid="puzzles-loading">Loading puzzles from the void...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {puzzles.map((p) => (
            <Link
              to={`/puzzles/${p.id}`}
              key={p.id}
              data-testid={`puzzle-card-${p.id}`}
              className="glass rounded-xl p-6 hover-lift group block"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(255,215,0,0.1))",
                    border: "1px solid rgba(0,229,255,0.3)",
                  }}
                >
                  <PuzzleIcon className="w-5 h-5 text-cyan-300" />
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-md border border-white/10 text-slate-400"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {p.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {p.title}
              </h3>
              <div className="text-xs text-cyan-300/80 tracking-widest uppercase mb-3">{p.theme}</div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{p.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-300 text-xs">
                  <Star className="w-3 h-3 fill-yellow-300" />
                  <span style={{ fontFamily: "'Space Mono', monospace" }}>{p.rating}</span>
                </div>
                <span className="text-xs text-cyan-300 tracking-[0.15em] uppercase group-hover:translate-x-1 transition-transform">
                  Solve →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
