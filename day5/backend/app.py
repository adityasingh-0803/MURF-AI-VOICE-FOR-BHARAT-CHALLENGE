from datetime import datetime, timezone

from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import (
    init_db,
    get_connection
)

from models import (
    ExerciseRequest,
    ExerciseResponse
)

from tools.exercises import (
    get_next_exercise,
    TOOL_DESCRIPTION
)


app = FastAPI(

    title="ShikshaSaathi Tools API",

    description=
        "Day 5 Learning & Literacy tools",

    version="1.0.0"

)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


init_db()


@app.get("/")

def root():

    return {

        "project":
            "ShikshaSaathi",

        "day":
            5,

        "track":
            "Learning & Literacy",

        "status":
            "running"

    }


@app.get("/health")

def health():

    return {

        "status": "ok",

        "service":
            "ShikshaSaathi Day 5"

    }


@app.get("/tools")

def tools():

    return {

        "tools": [

            {

                "name":
                    "get_next_exercise",

                "description":
                    TOOL_DESCRIPTION

            }

        ]

    }


@app.post(
    "/tools/get-next-exercise",
    response_model=ExerciseResponse
)

def next_exercise(
    request: ExerciseRequest
):

    result = get_next_exercise(

        request.level,

        request.topic

    )


    connection = get_connection()


    connection.execute(

        """

        INSERT INTO tool_calls

        (
            user_id,
            topic,
            level,
            success,
            created_at
        )

        VALUES (?, ?, ?, ?, ?)

        """,

        (

            request.user_id,

            request.topic,

            request.level,

            int(result["success"]),

            datetime.now(
                timezone.utc
            ).isoformat()

        )

    )


    connection.commit()

    connection.close()


    return result


@app.post(
    "/tools/failure-demo"
)

def failure_demo():

    return {

        "success": False,

        "topic":
            "Algebra",

        "level":
            "Intermediate",

        "error":
            "Exercise service is temporarily unavailable."

    }
