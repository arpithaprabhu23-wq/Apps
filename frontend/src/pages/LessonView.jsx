import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Chess } from "chess.js";
import Chessboard from "@/components/Chessboard";
import * as Icons from "lucide-react";
import { ArrowLeft, MessageSquare } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function LessonView() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    axios.get(`${API}/lessons/${id}`).then((r) => setLesson(r.data));
  }, [id]);

  if (!lesson) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 text-slate-400" data-testid="lesson-loading">
        Loading lesson...
      </div>
    );
  }

  const Icon = Icons[lesson.icon] || Icons.BookOpen;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 fade-in-up" data-testid="page-lesson-view">
      <Link
        to="/lessons"
        className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-6 hover:text-cyan-200"
        data-testid="back-to-lessons"
      >
        <ArrowLeft className="w-4 h-4" /> All lessons
      </Link>

      <div className="mb-10">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(0,229,255,0.15))",
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        >
          <Icon className="w-7 h-7 text-yellow-300" />
        </div>
        <div className="flex items-center gap-2 mb-3 text-[10px] tracking-[0.2em] uppercase text-slate-400">
          <span>{lesson.level}</span><span>•</span><span>{lesson.duration}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          {lesson.title}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed">{lesson.summary}</p>
      </div>

      <div className="space-y-8">
        {lesson.sections.map((s, i) => (
          <div key={i} className="glass rounded-xl p-6 md:p-8" data-testid={`lesson-section-${i}`}>
            <h2
              className="text-2xl font-semibold text-white mb-4"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="text-cyan-glow">§{i + 1}</span> &nbsp; {s.heading}
            </h2>
            <p className="text-slate-300 leading-relaxed">{s.body}</p>
            {s.fen && (
              <div className="mt-6 flex justify-center">
                <Chessboard
                  game={new Chess(s.fen)}
                  onMove={() => {}}
                  orientation="w"
                  allowMoveFor={null}
                  disabled
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 glass rounded-xl p-6 text-center">
        <p className="text-slate-300 mb-4">Have questions about this lesson?</p>
        <Link
          to="/coach"
          className="btn-gold px-6 py-2.5 rounded-md inline-flex items-center gap-2"
          data-testid="lesson-to-coach"
          style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
        >
          <MessageSquare className="w-4 h-4" /> ASK ASTRA THE COACH
        </Link>
      </div>
    </div>
  );
}
