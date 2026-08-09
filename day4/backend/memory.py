import json
from datetime import datetime, timezone

from database import get_connection


def lookup_user(user_id: str):
    """
    Day 4 memory function:
    Find a learner using their unique user ID.
    """

    connection = get_connection()

    row = connection.execute(
        """
        SELECT *
        FROM users
        WHERE user_id = ?
        """,
        (user_id,)
    ).fetchone()

    connection.close()

    if row is None:
        return None

    return {
        "user_id": row["user_id"],
        "name": row["name"],
        "language_preference": row["language_preference"],
        "facts": {
            "current_level": row["current_level"],
            "topics_covered": json.loads(row["topics_covered"] or "[]"),
            "common_mistakes": row["common_mistakes"],
            "learning_goal": row["learning_goal"]
        },
        "last_interaction": row["last_interaction"]
    }


def save_user_memory(
    user_id: str,
    name: str,
    language_preference: str,
    facts: dict
):
    """
    Day 4 memory function:
    Save or update learner information after consent.
    """

    connection = get_connection()

    timestamp = datetime.now(
        timezone.utc
    ).isoformat()

    current_level = facts.get(
        "current_level",
        ""
    )

    topics_covered = facts.get(
        "topics_covered",
        []
    )

    common_mistakes = facts.get(
        "common_mistakes",
        ""
    )

    learning_goal = facts.get(
        "learning_goal",
        ""
    )

    connection.execute(
        """
        INSERT INTO users (
            user_id,
            name,
            language_preference,
            current_level,
            topics_covered,
            common_mistakes,
            learning_goal,
            last_interaction
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)

        ON CONFLICT(user_id)
        DO UPDATE SET
            name = excluded.name,
            language_preference = excluded.language_preference,
            current_level = excluded.current_level,
            topics_covered = excluded.topics_covered,
            common_mistakes = excluded.common_mistakes,
            learning_goal = excluded.learning_goal,
            last_interaction = excluded.last_interaction
        """,
        (
            user_id,
            name,
            language_preference,
            current_level,
            json.dumps(topics_covered),
            common_mistakes,
            learning_goal,
            timestamp
        )
    )

    connection.commit()
    connection.close()

    return lookup_user(user_id)


def delete_user_memory(user_id: str):

    connection = get_connection()

    cursor = connection.execute(
        """
        DELETE FROM users
        WHERE user_id = ?
        """,
        (user_id,)
    )

    connection.commit()

    deleted = cursor.rowcount > 0

    connection.close()

    return deleted
