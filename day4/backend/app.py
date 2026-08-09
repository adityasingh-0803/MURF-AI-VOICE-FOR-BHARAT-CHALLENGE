from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import initialize_database
from memory import (
    lookup_user,
    save_user_memory,
    delete_user_memory
)
from models import (
    UserMemory,
    MemoryResponse,
    DeleteResponse
)


@asynccontextmanager
async def lifespan(app: FastAPI):

    initialize_database()

    yield


app = FastAPI(
    title="ShikshaSaathi Memory API",
    description="Persistent learner memory for the VoiceForBharat Learning & Literacy agent.",
    version="1.0.0",
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():

    return {
        "name": "ShikshaSaathi Memory API",
        "status": "running",
        "track": "Learning & Literacy"
    }


@app.get(
    "/api/memory/{user_id}",
    response_model=MemoryResponse
)
def get_memory(user_id: str):

    user = lookup_user(user_id)

    if user is None:

        return {
            "found": False,
            "user": None
        }

    return {
        "found": True,
        "user": user
    }


@app.post(
    "/api/memory",
    response_model=dict
)
def save_memory(memory: UserMemory):

    if not memory.user_id.strip():

        raise HTTPException(
            status_code=400,
            detail="user_id is required"
        )

    if not memory.name.strip():

        raise HTTPException(
            status_code=400,
            detail="name is required"
        )

    user = save_user_memory(
        user_id=memory.user_id,
        name=memory.name,
        language_preference=memory.language_preference,
        facts=memory.facts
    )

    return {
        "success": True,
        "message": "Learner memory saved.",
        "user": user
    }


@app.delete(
    "/api/memory/{user_id}",
    response_model=DeleteResponse
)
def delete_memory(user_id: str):

    deleted = delete_user_memory(
        user_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="User memory not found."
        )

    return {
        "success": True,
        "message": "Learner memory deleted."
    }


@app.get("/api/health")
def health():

    return {
        "status": "healthy"
    }
