import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Icons from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/lessons`).then((r) => {
      setLessons(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 fade-in-up" data-testid="page-lessons">
      <div className="mb-10">
        <div className="text-xs tracking-[0.25em] text-cyan-300 uppercase mb-2">Curriculum</div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Cosmic <span className="text-gold">Lessons</span>
        </h1>
        <p className="text-slate-400 mt-2 max-w-2xl">
          Short, focused lessons that connect chess mastery to the poetry of the stars.
        </p>
      </div>

      {loading ? (
        <div className="text-slate-400" data-testid="lessons-loading">Loading lessons...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((l) => {
            const Icon = Icons[l.icon] || Icons.BookOpen;
            return (
              <Link
                to={`/lessons/${l.id}`}
                key={l.id}
                data-testid={`lesson-card-${l.id}`}
                className="glass rounded-xl p-6 hover-lift group block relative overflow-hidden"
              >
                <div
                  className="absolute -right-16 -top-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(0,229,255,0.6), transparent 70%)" }}
                />
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(0,229,255,0.1))",
                    border: "1px solid rgba(255,215,0,0.3)",
                  }}
                >
                  <Icon className="w-5 h-5 text-yellow-300" />
                </div>
                <div className="flex items-center gap-2 mb-2 text-[10px] tracking-[0.2em] uppercase text-slate-400">
                  <span>{l.level}</span>
                  <span>•</span>
                  <span>{l.duration}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {l.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{l.summary}</p>
                <div className="mt-4 text-cyan-300 text-xs tracking-[0.15em] uppercase inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read lesson →
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
