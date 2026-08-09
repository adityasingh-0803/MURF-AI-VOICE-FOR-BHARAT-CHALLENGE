from typing import Dict, Optional

from pydantic import BaseModel, Field


class UserMemory(BaseModel):
    user_id: str
    name: str
    language_preference: str = "English"
    facts: Dict[str, str] = Field(default_factory=dict)


class MemoryResponse(BaseModel):
    found: bool
    user: Optional[dict] = None


class DeleteResponse(BaseModel):
    success: bool
    message: str
