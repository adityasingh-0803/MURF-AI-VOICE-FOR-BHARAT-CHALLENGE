LEARNER = {

    "user_id": "user_001",

    "name": "Aditya",

    "language_preference": "Hindi-English",

    "facts": {

        "current_level": "Intermediate",

        "topics_covered": [
            "Algebra",
            "Python"
        ],

        "common_mistakes": [
            "Algebraic equations"
        ],

        "learning_goal":
            "Improve Mathematics",

        "preferred_practice_time":
            "19:00"

    }

}


def get_learner(
    user_id="user_001"
):

    if user_id == LEARNER["user_id"]:

        return LEARNER

    return None
