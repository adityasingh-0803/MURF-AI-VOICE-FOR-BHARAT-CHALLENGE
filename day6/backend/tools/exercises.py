import json

from pathlib import Path

from datetime import date


ROOT = Path(__file__).resolve().parents[2]

FILE = ROOT / "data" / "exercises.json"


def get_next_exercise(

    level="Intermediate",

    topic="Algebra"

):

    try:

        with open(
            FILE,
            "r",
            encoding="utf-8"
        ) as file:

            exercises = json.load(file)

    except Exception:

        return {

            "success": False,

            "error":
                "Exercise source unavailable."

        }


    for exercise in exercises:

        if (

            exercise["level"].lower()
            == level.lower()

            and

            exercise["topic"].lower()
            == topic.lower()

        ):

            return {

                "success": True,

                "id":
                    exercise["id"],

                "topic":
                    exercise["topic"],

                "level":
                    exercise["level"],

                "question":
                    exercise["question"],

                "answer":
                    exercise["answer"],

                "source":
                    "ShikshaSaathi Exercise Bank",

                "data_date":
                    date.today().isoformat()

            }


    return {

        "success": False,

        "error":
            "No exercise available."

    }
