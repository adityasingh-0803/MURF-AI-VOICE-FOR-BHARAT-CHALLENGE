import os

from dotenv import load_dotenv

from twilio.rest import Client

from twilio.twiml.voice_response import (
    VoiceResponse,
    Gather
)


load_dotenv()


OPENING = """

Namaste, this is ShikshaSaathi,
your learning assistant.

I'm calling for your daily practice
session that you previously opted into.

Is this a good time?

You can say stop at any time and
I won't make further practice calls.

"""


def configured():

    required = [

        "TWILIO_ACCOUNT_SID",

        "TWILIO_AUTH_TOKEN",

        "TWILIO_PHONE_NUMBER",

        "PUBLIC_BASE_URL"

    ]

    return all(
        os.getenv(key)
        for key in required
    )


def create_call(
    phone_number
):

    if not configured():

        return {

            "success": False,

            "demo": True,

            "message":
                "Twilio is not configured."

        }


    client = Client(

        os.getenv(
            "TWILIO_ACCOUNT_SID"
        ),

        os.getenv(
            "TWILIO_AUTH_TOKEN"
        )

    )


    call = client.calls.create(

        to=phone_number,

        from_=os.getenv(
            "TWILIO_PHONE_NUMBER"
        ),

        url=(
            os.getenv(
                "PUBLIC_BASE_URL"
            ).rstrip("/")
            +
            "/twilio/voice"
        ),

        status_callback=(
            os.getenv(
                "PUBLIC_BASE_URL"
            ).rstrip("/")
            +
            "/twilio/status"
        ),

        status_callback_event=[
            "initiated",
            "ringing",
            "answered",
            "completed"
        ]

    )


    return {

        "success": True,

        "demo": False,

        "call_sid":
            call.sid,

        "status":
            call.status

    }


def create_voice_response():

    response = VoiceResponse()


    gather = Gather(

        input="speech",

        action="/twilio/gather",

        method="POST",

        speech_timeout="auto",

        language="en-IN"

    )


    # Simple first version.
    # Replace this Say with <Play> of
    # a Murf-generated public audio URL
    # if you want Murf audio directly
    # inside the phone call.

    gather.say(

        OPENING,

        language="en-IN"

    )


    response.append(gather)


    response.say(

        "I did not hear a response. "
        "I will end the call now. "
        "Have a great day.",

        language="en-IN"

    )


    response.hangup()


    return str(response)


def handle_response(
    speech
):

    text = (
        speech or ""
    ).lower()


    stop_words = [

        "stop",

        "unsubscribe",

        "don't call",

        "do not call",

        "no more calls"

    ]


    if any(
        word in text
        for word in stop_words
    ):

        response = VoiceResponse()


        response.say(

            "Understood. "
            "I won't make further "
            "practice calls. "
            "Thank you and goodbye.",

            language="en-IN"

        )


        response.hangup()


        return str(response)


    response = VoiceResponse()


    exercise = Gather(

        input="speech",

        action="/twilio/exercise",

        method="POST",

        speech_timeout="auto",

        language="en-IN"

    )


    exercise.say(

        "Great. Let's practice Algebra. "
        "Solve this: 3x plus 7 equals 22. "
        "What is x? Take your time.",

        language="en-IN"

    )


    response.append(exercise)


    response.say(

        "I didn't hear your answer. "
        "We can try again tomorrow. "
        "Have a great day.",

        language="en-IN"

    )


    response.hangup()


    return str(response)


def handle_exercise(
    speech
):

    text = (
        speech or ""
    ).lower()


    response = VoiceResponse()


    if "5" in text:

        response.say(

            "Bilkul correct! "
            "The answer is 5. "
            "Great work. "
            "See you in the next practice call.",

            language="en-IN"

        )

    else:

        response.say(

            "Good attempt. "
            "The correct answer is 5 "
            "because 3 times 5 plus 7 "
            "equals 22. "
            "We'll practice again tomorrow.",

            language="en-IN"

        )


    response.hangup()


    return str(response)
