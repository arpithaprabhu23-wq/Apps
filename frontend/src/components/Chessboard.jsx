import { useMemo, useState, useEffect } from "react";
import { Chess } from "chess.js";

const PIECE_UNICODE = {
  wK: "\u2654", wQ: "\u2655", wR: "\u2656", wB: "\u2657", wN: "\u2658", wP: "\u2659",
  bK: "\u265A", bQ: "\u265B", bR: "\u265C", bB: "\u265D", bN: "\u265E", bP: "\u265F",
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

/**
 * Chessboard component
 * Props:
 *  - game: Chess instance (controlled)
 *  - onMove(move): callback when a legal move is made { from, to, san, ... }
 *  - orientation: "w" or "b"
 *  - allowMoveFor: "w" | "b" | "both" | null   (who the human can move for)
 *  - lastMove: { from, to } to highlight
 *  - disabled: boolean
 */
export default function Chessboard({
  game,
  onMove,
  orientation = "w",
  allowMoveFor = "both",
  lastMove = null,
  disabled = false,
}) {
  const [selected, setSelected] = useState(null);
  const [legal, setLegal] = useState([]);

  useEffect(() => {
    setSelected(null);
    setLegal([]);
  }, [game?.fen()]);

  const board = useMemo(() => game.board(), [game]);

  const files = orientation === "w" ? FILES : [...FILES].reverse();
  const ranks = orientation === "w" ? RANKS : [...RANKS].reverse();

  const squareName = (file, rank) => `${file}${rank}`;

  const canMovePiece = (piece) => {
    if (disabled || !piece) return false;
    if (allowMoveFor === "both") return true;
    if (!allowMoveFor) return false;
    return piece.color === allowMoveFor;
  };

  const handleSquareClick = (sq) => {
    if (disabled) return;
    const piece = game.get(sq);

    if (selected) {
      if (sq === selected) {
        setSelected(null);
        setLegal([]);
        return;
      }
      // try move
      try {
        const move = game.move({ from: selected, to: sq, promotion: "q" });
        if (move) {
          setSelected(null);
          setLegal([]);
          onMove && onMove(move);
          return;
        }
      } catch (_e) { /* illegal */ }

      // if clicking own piece, reselect
      if (piece && canMovePiece(piece) && piece.color === game.turn()) {
        selectSquare(sq);
        return;
      }
      setSelected(null);
      setLegal([]);
      return;
    }

    if (piece && canMovePiece(piece) && piece.color === game.turn()) {
      selectSquare(sq);
    }
  };

  const selectSquare = (sq) => {
    const moves = game.moves({ square: sq, verbose: true });
    setSelected(sq);
    setLegal(moves);
  };

  return (
    <div className="board-frame pulse-glow inline-block" data-testid="chessboard">
      <div
        className="grid rounded-md overflow-hidden select-none"
        style={{
          gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
          width: "min(80vw, 560px)",
          aspectRatio: "1 / 1",
        }}
      >
        {ranks.map((rank) =>
          files.map((file) => {
            const sq = squareName(file, rank);
            const isLight = (FILES.indexOf(file) + rank) % 2 === 1;
            const piece = board[8 - rank]?.[FILES.indexOf(file)];
            const isSelected = selected === sq;
            const legalHere = legal.find((m) => m.to === sq);
            const isLegal = !!legalHere;
            const isCapture = legalHere && legalHere.captured;
            const isLast = lastMove && (lastMove.from === sq || lastMove.to === sq);

            const key = piece ? `${piece.color}${piece.type.toUpperCase()}` : null;
            const glyph = key ? PIECE_UNICODE[key] : "";
            const pieceClass = piece?.color === "w" ? "piece-gold" : "piece-silver";

            return (
              <button
                key={sq}
                onClick={() => handleSquareClick(sq)}
                data-testid={`sq-${sq}`}
                className={`relative flex items-center justify-center transition-colors ${
                  isLight ? "square-light" : "square-dark"
                } ${isSelected ? "square-selected" : ""} ${isLast ? "square-last-move" : ""} ${
                  isLegal && !isCapture ? "square-legal" : ""
                } ${isLegal && isCapture ? "square-legal-capture" : ""}`}
                style={{ fontSize: "clamp(1.6rem, 5vw, 2.6rem)", lineHeight: 1 }}
                aria-label={sq}
              >
                {glyph && (
                  <span className={pieceClass} data-piece={key}>
                    {glyph}
                  </span>
                )}
                {/* file/rank labels on edges */}
                {file === files[0] && (
                  <span
                    className="absolute top-0.5 left-1 text-[10px] font-mono"
                    style={{ color: "rgba(148,163,184,0.7)" }}
                  >
                    {rank}
                  </span>
                )}
                {rank === ranks[ranks.length - 1] && (
                  <span
                    className="absolute bottom-0.5 right-1 text-[10px] font-mono"
                    style={{ color: "rgba(148,163,184,0.7)" }}
                  >
                    {file}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export { Chess };
