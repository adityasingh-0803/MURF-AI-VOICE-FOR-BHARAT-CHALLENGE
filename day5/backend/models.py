from pydantic import BaseModel


class ExerciseRequest(BaseModel):

    level: str = "Beginner"

    topic: str = "Algebra"

    user_id: str | None = None


class ExerciseResponse(BaseModel):

    success: bool

    topic: str

    level: str

    question: str | None = None

    answer: str | None = None

    source: str | None = None

    data_date: str | None = None

    error: str | None = None
