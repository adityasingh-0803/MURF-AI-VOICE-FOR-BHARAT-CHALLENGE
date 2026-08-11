from datetime import datetime, timezone


from fastapi import (
    FastAPI,
    Request
)


from fastapi.middleware.cors import (
    CORSMiddleware
)


from fastapi.responses import Response


from pydantic import BaseModel


from database import (
    init_db,
    get_connection
)


from memory import (
    get_learner
)


from tools.exercises import (
    get_next_exercise
)


from telephony.twilio_calls import (
    create_call,
    create_voice_response,
    handle_response,
    handle_exercise
)


app = FastAPI(

    title="ShikshaSaathi Day 6",

    version="1.0"

)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


init_db()


class CallRequest(BaseModel):

    phone_number: str

    user_id: str = "user_001"


@app.get("/")
def root():

    return {

        "project":
            "ShikshaSaathi",

        "day":
            6,

        "track":
            "Learning & Literacy",

        "status":
            "running"

    }


@app.get("/health")
def health():

    return {

        "status":
            "ok"

    }


@app.get(
    "/learner/{user_id}"
)
def learner(user_id):

    return get_learner(
        user_id
    )


@app.post(
    "/calls/outbound"
)
def outbound(
    request: CallRequest
):

    result = create_call(

        request.phone_number

    )


    connection = (
        get_connection()
    )


    connection.execute(

        """

        INSERT INTO calls

        (
            phone_number,
            status,
            purpose,
            created_at,
            twilio_sid
        )

        VALUES (?, ?, ?, ?, ?)

        """,

        (

            request.phone_number,

            (
                "initiated"
                if result.get("success")
                else "demo"
            ),

            "Daily practice",

            datetime.now(
                timezone.utc
            ).isoformat(),

            result.get(
                "call_sid"
            )

        )

    )


    connection.commit()

    connection.close()


    return result


@app.get("/calls")
def calls():

    connection = (
        get_connection()
    )


    rows = connection.execute(

        """

        SELECT *

        FROM calls

        ORDER BY id DESC

        LIMIT 20

        """

    ).fetchall()


    connection.close()


    return [
        dict(row)
        for row in rows
    ]


@app.post(
    "/twilio/voice"
)
async def twilio_voice():

    return Response(

        create_voice_response(),

        media_type=
            "application/xml"

    )


@app.post(
    "/twilio/gather"
)
async def twilio_gather(
    request: Request
):

    form = await request.form()


    speech = form.get(
        "SpeechResult",
        ""
    )


    twiml = handle_response(
        speech
    )


    return Response(

        twiml,

        media_type=
            "application/xml"

    )


@app.post(
    "/twilio/exercise"
)
async def twilio_exercise(
    request: Request
):

    form = await request.form()


    speech = form.get(
        "SpeechResult",
        ""
    )


    twiml = handle_exercise(
        speech
    )


    return Response(

        twiml,

        media_type=
            "application/xml"

    )


@app.post(
    "/twilio/status"
)
async def twilio_status(
    request: Request
):

    form = await request.form()


    call_sid = form.get(
        "CallSid"
    )

    status = form.get(
        "CallStatus"
    )


    connection = (
        get_connection()
    )


    connection.execute(

        """

        UPDATE calls

        SET status = ?

        WHERE twilio_sid = ?

        """,

        (
            status,
            call_sid
        )

    )


    connection.commit()

    connection.close()


    return {
        "ok": True
    }


@app.get(
    "/tools/exercise"
)
def exercise():

    return get_next_exercise(

        level="Intermediate",

        topic="Algebra"

    )
