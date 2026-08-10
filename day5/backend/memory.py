DEMO_LEARNER = {

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
            "Improve Mathematics"

    }

}


def get_learner(user_id):

    if user_id == DEMO_LEARNER["user_id"]:

        return DEMO_LEARNER

    return None
