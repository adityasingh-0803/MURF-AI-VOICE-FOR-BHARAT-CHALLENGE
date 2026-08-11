from pathlib import Path
import sqlite3


ROOT = Path(__file__).resolve().parents[1]

DB_PATH = ROOT / "data" / "shikshasaathi.db"

DB_PATH.parent.mkdir(
    parents=True,
    exist_ok=True
)


def get_connection():

    connection = sqlite3.connect(DB_PATH)

    connection.row_factory = sqlite3.Row

    return connection


def init_db():

    connection = get_connection()

    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS calls (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            phone_number TEXT NOT NULL,

            status TEXT NOT NULL,

            purpose TEXT NOT NULL,

            created_at TEXT NOT NULL,

            twilio_sid TEXT

        )
        """
    )

    connection.commit()

    connection.close()
