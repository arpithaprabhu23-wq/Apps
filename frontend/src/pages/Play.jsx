import { useState, useMemo, useEffect } from "react";
import { Chess } from "chess.js";
import Chessboard from "@/components/Chessboard";
import { chooseMove } from "@/lib/chessEngine";
import { RotateCcw, Bot, User, Trophy, Skull } from "lucide-react";
import { toast } from "sonner";

const DIFFICULTIES = [
  { key: "easy", label: "Padawan", desc: "Random moves" },
  { key: "medium", label: "Navigator", desc: "Depth 2 search" },
  { key: "hard", label: "Starfleet", desc: "Depth 3 search" },
];

export default function Play() {
  const [game, setGame] = useState(() => new Chess());
  const [playerColor, setPlayerColor] = useState("w");
  const [difficulty, setDifficulty] = useState("medium");
  const [lastMove, setLastMove] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [history, setHistory] = useState([]);
  const [gameOver, setGameOver] = useState(null);

  const fen = game.fen();

  const status = useMemo(() => {
    if (game.isCheckmate()) return "Checkmate";
    if (game.isStalemate()) return "Stalemate";
    if (game.isDraw()) return "Draw";
    if (game.isCheck()) return "Check!";
    return game.turn() === "w" ? "White to move" : "Black to move";
  }, [fen, game]);

  const handleUserMove = (move) => {
    const newGame = new Chess(game.fen());
    setGame(newGame);
    setLastMove({ from: move.from, to: move.to });
    setHistory((h) => [...h, move.san]);
    checkGameEnd(newGame, playerColor);
  };

  const checkGameEnd = (g, me) => {
    if (g.isCheckmate()) {
      const loser = g.turn();
      const winner = loser === "w" ? "b" : "w";
      const won = winner === me;
      setGameOver(won ? "win" : "lose");
      toast[won ? "success" : "error"](won ? "Victory! A stellar checkmate." : "Defeated by the cosmos.");
    } else if (g.isDraw() || g.isStalemate() || g.isThreefoldRepetition()) {
      setGameOver("draw");
      toast.info("Drawn — a cosmic balance.");
    }
  };

  // AI move
  useEffect(() => {
    if (gameOver) return;
    if (game.turn() !== playerColor && !game.isGameOver()) {
      setThinking(true);
      const t = setTimeout(() => {
        const aiMove = chooseMove(game.fen(), difficulty);
        if (aiMove) {
          const ng = new Chess(game.fen());
          ng.move(aiMove.san);
          setGame(ng);
          setLastMove({ from: aiMove.from, to: aiMove.to });
          setHistory((h) => [...h, aiMove.san]);
          checkGameEnd(ng, playerColor);
        }
        setThinking(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [fen, playerColor, difficulty, gameOver]);

  const reset = () => {
    setGame(new Chess());
    setLastMove(null);
    setHistory([]);
    setGameOver(null);
  };

  const switchSide = () => {
    setPlayerColor((c) => (c === "w" ? "b" : "w"));
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 fade-in-up" data-testid="page-play">
      <div className="mb-8">
        <div className="text-xs tracking-[0.25em] text-cyan-300 uppercase mb-2">Free Play</div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Battle the <span className="text-gold">Stellar Engine</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex justify-center">
          <div>
            <Chessboard
              game={game}
              onMove={handleUserMove}
              orientation={playerColor}
              allowMoveFor={playerColor}
              lastMove={lastMove}
              disabled={thinking || !!gameOver}
            />
            <div
              className="mt-4 text-center text-sm text-slate-300"
              data-testid="play-status"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {gameOver ? (
                <span className="inline-flex items-center gap-2">
                  {gameOver === "win" ? <Trophy className="w-4 h-4 text-yellow-400" /> : gameOver === "lose" ? <Skull className="w-4 h-4 text-red-400" /> : null}
                  {gameOver === "win" ? "You won!" : gameOver === "lose" ? "You were defeated." : "Draw."}
                </span>
              ) : thinking ? (
                <span className="inline-flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-300 animate-pulse" /> Engine is calculating orbits...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-400" /> {status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-xl p-5" data-testid="play-controls">
            <div className="text-xs tracking-[0.2em] uppercase text-slate-400 mb-3">Difficulty</div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDifficulty(d.key)}
                  data-testid={`diff-${d.key}`}
                  className={`px-2 py-2 rounded-md text-xs border transition-all ${
                    difficulty === d.key
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                  }`}
                  style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.05em" }}
                >
                  <div className="font-semibold uppercase">{d.label}</div>
                  <div className="text-[10px] text-slate-500">{d.desc}</div>
                </button>
              ))}
            </div>

            <div className="text-xs tracking-[0.2em] uppercase text-slate-400 mb-3">Your side</div>
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => { setPlayerColor("w"); reset(); }}
                data-testid="side-white"
                className={`px-3 py-2 rounded-md text-sm border ${
                  playerColor === "w"
                    ? "border-yellow-400/60 bg-yellow-400/10 text-yellow-200"
                    : "border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                <span className="piece-gold text-lg mr-1">♔</span> White
              </button>
              <button
                onClick={() => { setPlayerColor("b"); reset(); }}
                data-testid="side-black"
                className={`px-3 py-2 rounded-md text-sm border ${
                  playerColor === "b"
                    ? "border-slate-300/60 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                <span className="piece-silver text-lg mr-1">♚</span> Black
              </button>
            </div>

            <button
              onClick={reset}
              data-testid="btn-new-game"
              className="w-full btn-cosmic rounded-md py-2.5 inline-flex items-center justify-center gap-2"
              style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em" }}
            >
              <RotateCcw className="w-4 h-4" /> NEW GAME
            </button>
          </div>

          <div className="glass rounded-xl p-5" data-testid="play-moves">
            <div className="text-xs tracking-[0.2em] uppercase text-slate-400 mb-3">Move Log</div>
            <div className="max-h-64 overflow-y-auto" style={{ fontFamily: "'Space Mono', monospace" }}>
              {history.length === 0 ? (
                <div className="text-slate-500 text-sm">No moves yet — the game awaits.</div>
              ) : (
                <ol className="text-sm text-slate-300 space-y-1">
                  {history.map((san, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-8 text-slate-500">{Math.floor(i / 2) + 1}{i % 2 === 0 ? "." : "..."}</span>
                      <span>{san}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
