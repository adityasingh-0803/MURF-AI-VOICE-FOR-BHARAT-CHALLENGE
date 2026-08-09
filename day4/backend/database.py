import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "shikshasaathi.db"


def get_connection():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            language_preference TEXT,
            current_level TEXT,
            topics_covered TEXT,
            common_mistakes TEXT,
            learning_goal TEXT,
            last_interaction TEXT NOT NULL
        )
        """
    )

    connection.commit()
    connection.close()
