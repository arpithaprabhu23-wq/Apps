import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Chess } from "chess.js";
import Chessboard from "@/components/Chessboard";
import { toast } from "sonner";
import { ArrowLeft, Lightbulb, RotateCcw, CheckCircle2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PuzzleSolver() {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState(null);
  const [game, setGame] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios.get(`${API}/puzzles/${id}`).then((r) => {
      setPuzzle(r.data);
      setGame(new Chess(r.data.fen));
      setLastMove(null);
      setSolved(false);
      setShowHint(false);
      setAttempts(0);
      setFailed(false);
    });
  }, [id]);

  const recordAttempt = useCallback((didSolve, moves) => {
    axios.post(`${API}/puzzles/attempt`, {
      puzzle_id: id,
      solved: didSolve,
      moves_taken: moves,
    }).catch(() => {});
  }, [id]);

  const handleMove = (move) => {
    setAttempts((a) => a + 1);
    setLastMove({ from: move.from, to: move.to });

    // solution stored as ["e2e4", ...] (uci)
    const expected = puzzle.solution[0];
    const userUci = `${move.from}${move.to}${move.promotion ? move.promotion : ""}`;

    if (userUci === expected || userUci.slice(0, 4) === expected.slice(0, 4)) {
      // correct
      const ng = new Chess(game.fen());
      setGame(ng);
      setSolved(true);
      toast.success("Stellar! You solved it.");
      recordAttempt(true, attempts + 1);
    } else {
      // wrong — undo the move
      toast.error("Not quite. Try again — the pattern is close.");
      const ng = new Chess(puzzle.fen); // reset to original
      setGame(ng);
      setLastMove(null);
      setFailed(true);
    }
  };

  const reset = () => {
    setGame(new Chess(puzzle.fen));
    setLastMove(null);
    setSolved(false);
    setShowHint(false);
    setFailed(false);
    setAttempts(0);
  };

  const hint = useMemo(() => {
    if (!puzzle) return "";
    const uci = puzzle.solution[0];
    return `The move starts from ${uci.slice(0, 2).toUpperCase()}`;
  }, [puzzle]);

  if (!puzzle || !game) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10 text-slate-400" data-testid="puzzle-loading">
        Loading puzzle...
      </div>
    );
  }

  const orientation = puzzle.player_color === "w" ? "w" : "b";

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 fade-in-up" data-testid="page-puzzle-solver">
      <Link
        to="/puzzles"
        className="inline-flex items-center gap-2 text-cyan-300 text-sm mb-6 hover:text-cyan-200"
        data-testid="back-to-puzzles"
      >
        <ArrowLeft className="w-4 h-4" /> All puzzles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex justify-center">
          <div>
            <Chessboard
              game={game}
              onMove={handleMove}
              orientation={orientation}
              allowMoveFor={puzzle.player_color}
              lastMove={lastMove}
              disabled={solved}
            />
            <div className="mt-4 text-center text-sm text-slate-300" style={{ fontFamily: "'Space Mono', monospace" }}>
              {solved
                ? <span className="inline-flex items-center gap-2 text-yellow-300"><CheckCircle2 className="w-4 h-4" /> Solved</span>
                : `${puzzle.player_color === "w" ? "White" : "Black"} to move`}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-xl p-6" data-testid="puzzle-info">
            <div className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-2">{puzzle.theme}</div>
            <h2 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              {puzzle.title}
            </h2>
            <div className="flex gap-2 mb-4 text-xs">
              <span className="px-2 py-1 rounded-md border border-white/10 text-slate-400">{puzzle.difficulty}</span>
              <span className="px-2 py-1 rounded-md border border-white/10 text-yellow-300" style={{ fontFamily: "'Space Mono', monospace" }}>
                {puzzle.rating}
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{puzzle.description}</p>
          </div>

          <div className="glass rounded-xl p-6 space-y-3">
            {!solved && (
              <button
                onClick={() => setShowHint(true)}
                data-testid="btn-hint"
                className="w-full btn-cosmic rounded-md py-2.5 inline-flex items-center justify-center gap-2 text-sm"
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
              >
                <Lightbulb className="w-4 h-4" /> {showHint ? "HINT SHOWN" : "GIVE ME A HINT"}
              </button>
            )}
            {showHint && !solved && (
              <div className="text-sm text-cyan-200 bg-cyan-500/5 border border-cyan-500/20 rounded-md p-3" data-testid="puzzle-hint">
                {hint}
              </div>
            )}
            {(solved || failed) && (
              <button
                onClick={reset}
                data-testid="btn-reset-puzzle"
                className="w-full btn-cosmic rounded-md py-2.5 inline-flex items-center justify-center gap-2 text-sm"
                style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
              >
                <RotateCcw className="w-4 h-4" /> RESET
              </button>
            )}
            {solved && (
              <div className="text-sm text-slate-300 bg-yellow-400/5 border border-yellow-400/20 rounded-md p-3" data-testid="puzzle-explanation">
                <div className="text-yellow-300 text-xs tracking-[0.2em] uppercase mb-1">Explanation</div>
                {puzzle.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
