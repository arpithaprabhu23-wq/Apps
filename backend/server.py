from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

from chess_data import PUZZLES, LESSONS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

app = FastAPI(title="AstraAPP - Chess & Cosmic Learning")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class ChatRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str
    fen: Optional[str] = None
    context: Optional[str] = None  # e.g. "puzzle", "play", "lesson"


class PuzzleAttempt(BaseModel):
    puzzle_id: str
    solved: bool
    moves_taken: int
    session_id: Optional[str] = None


# ---------- Data endpoints ----------
@api_router.get("/")
async def root():
    return {"message": "AstraAPP — Chess & Cosmic Learning API"}


@api_router.get("/puzzles")
async def get_puzzles():
    return [{k: v for k, v in p.items() if k != "solution"} for p in PUZZLES]


@api_router.get("/puzzles/{puzzle_id}")
async def get_puzzle(puzzle_id: str):
    puzzle = next((p for p in PUZZLES if p["id"] == puzzle_id), None)
    if not puzzle:
        raise HTTPException(status_code=404, detail="Puzzle not found")
    return puzzle


@api_router.get("/lessons")
async def get_lessons():
    return [
        {k: v for k, v in lesson.items() if k != "sections"} for lesson in LESSONS
    ]


@api_router.get("/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    lesson = next((les for les in LESSONS if les["id"] == lesson_id), None)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson


@api_router.post("/puzzles/attempt")
async def record_puzzle_attempt(attempt: PuzzleAttempt):
    doc = attempt.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["timestamp"] = datetime.now(timezone.utc).isoformat()
    await db.puzzle_attempts.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


# ---------- AI Coach ----------
COACH_SYSTEM_PROMPT = """You are ASTRA, a cosmic-themed AI chess coach for AstraAPP.
Your persona: an enthusiastic celestial mentor who blends chess wisdom with poetic space metaphors
(constellations, orbits, gravity, nebulae). Keep language warm, concise, and pedagogical.

Rules:
- If the user shares a FEN board position, analyse it briefly: material balance, key threats, best plan.
- Give concrete, actionable moves using standard algebraic notation (e.g. Nf3, exd5, O-O).
- Prefer 2-4 short paragraphs. Use bullet points for candidate moves when useful.
- Sprinkle light cosmic imagery (e.g. "your knight orbits the king like a distant moon") — don't overdo it.
- Never invent illegal moves. If unsure, say so and ask a clarifying question.
- End every response with one crisp tactical or strategic tip prefixed with "⭐ Star tip:".
"""


@api_router.post("/coach/chat")
async def coach_chat(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    user_text = req.message
    if req.fen:
        user_text = f"[Current board FEN: {req.fen}]\n\n{user_text}"
    if req.context:
        user_text = f"[Context: {req.context}]\n{user_text}"

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=req.session_id,
        system_message=COACH_SYSTEM_PROMPT,
    ).with_model("gemini", "gemini-3-flash-preview")

    async def event_generator():
        try:
            async for ev in chat.stream_message(UserMessage(text=user_text)):
                if isinstance(ev, TextDelta):
                    yield ev.content
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.exception("coach chat error")
            yield f"\n[Cosmic interference detected: {str(e)}]"

    return StreamingResponse(
        event_generator(),
        media_type="text/plain",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
