import os


class Settings:
    db_username: str = os.getenv("DB_USERNAME")
    db_password: str = os.getenv("DB_PASSWORD")
    db_url: str = os.getenv("DB_URL")
    db_port: str = os.getenv("DB_PORT")
    db_name: str = os.getenv("DB_NAME")
