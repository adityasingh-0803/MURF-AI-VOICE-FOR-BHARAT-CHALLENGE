import json

from pathlib import Path

from datetime import date


ROOT = Path(__file__).resolve().parents[2]

EXERCISE_FILE = (
    ROOT /
    "data" /
    "exercises.json"
)


TOOL_DESCRIPTION = """

Use get_next_exercise when the learner asks
for a practice question, exercise, quiz
question, or another learning problem.

Use the learner's current level and requested
topic when available.

Do not use this tool for general factual
questions.

If the tool fails, clearly tell the learner
that the exercise could not be loaded.

Never invent a tool result.

"""


def load_exercises():

    with open(
        EXERCISE_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


def get_next_exercise(
    level,
    topic
):

    try:

        exercises = load_exercises()

    except Exception:

        return {

            "success": False,

            "topic": topic,

            "level": level,

            "error":
                "Exercise source unavailable."

        }


    level = level.strip().lower()

    topic = topic.strip().lower()


    matches = [

        exercise

        for exercise in exercises

        if exercise["level"].lower()
        == level

        and

        exercise["topic"].lower()
        == topic

    ]


    if not matches:

        return {

            "success": False,

            "topic": topic,

            "level": level,

            "error":
                "No exercise available."

        }


    exercise = matches[0]


    return {

        "success": True,

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
