# AstraAPP — Chess & Cosmic Learning

## Original Problem Statement
"make a chess website named as AstraAPP.com with this picture" — cosmic/space-themed chess logo provided.

## Architecture
- **Backend**: FastAPI + MongoDB (Motor). Endpoints under `/api`.
- **Frontend**: React 19 + React Router 7, TailwindCSS, Shadcn/UI, `chess.js` for chess logic, lucide-react icons.
- **AI**: Gemini 3 Flash via Emergent Universal LLM Key (streaming SSE).
- **Theme**: Deep cosmic navy (#050814) + metallic gold (#FFD700) + electric cyan (#00E5FF). Fonts: Rajdhani (headings) + Outfit (body) + Space Mono (numeric/log).

## Core Requirements
- Chess puzzles/tactics training with hints and explanations.
- Chess lessons with cosmic-themed narratives.
- Play vs built-in JS engine (3 difficulty tiers).
- AI Chess Coach chatbot (space-themed persona: ASTRA).
- Guest-only, no auth.

## What's Been Implemented (Feb 2026)
- Home landing page with hero, feature grid, CTA strip, floating chess pieces.
- Play page: chess board vs minimax engine (easy/medium/hard), side switcher, move log, game-over detection.
- Puzzles list + solver: 6 curated puzzles, hint system, explanation on solve, attempt tracking to MongoDB.
- Lessons list + reader: 6 lessons (Beginner→Advanced) with sectioned content and inline board diagrams.
- AI Coach chat: streaming Gemini 3 Flash, starter prompts, session-based multi-turn.
- Cosmic starfield background, glass-morphism cards, metallic gold/silver chess piece styling.

## User Personas
- **Casual learner**: wants short lessons + puzzles.
- **Improver**: plays vs engine and asks coach for feedback.
- **Beginner**: uses hero CTAs and starter prompts on coach.

## Backlog (Next Iterations)
- **P0** — User accounts (JWT or Google Auth) to save games, puzzle stats, coach chat history.
- **P1** — Rated puzzle streaks + leaderboard (cosmic ranks: Padawan → Starfleet).
- **P1** — More puzzles (import Lichess free DB).
- **P1** — Play vs stronger engine (bundle stockfish.wasm).
- **P2** — Multiplayer via WebSockets.
- **P2** — Custom cosmic-themed piece SVG set (replace Unicode).
- **P2** — Lesson progress tracking and cosmic "mastery constellations".

## Known Issues
- AI Coach requires balance on the user's Emergent Universal LLM Key. Currently the key returns "Budget exceeded". User must top up at Profile → Universal Key → Add Balance.
