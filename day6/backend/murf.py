import os

from dotenv import load_dotenv

from murf import Murf


load_dotenv()


client = Murf(
    api_key=os.getenv("MURF_API_KEY")
)


VOICE_ID = os.getenv(
    "MURF_VOICE_ID",
    "Anisha"
)


LOCALE = os.getenv(
    "MURF_LOCALE",
    "en-IN"
)


def generate_speech(text):

    response = client.text_to_speech.generate(

        text=text,

        voice_id=VOICE_ID,

        locale=LOCALE,

        format="MP3",

        channel_type="MONO",

        sample_rate=44100

    )

    return response.audio_file
