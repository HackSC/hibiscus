from pydantic import BaseSettings


class Settings(BaseSettings):
    db_username: str = ""
    db_password: str = ""
    db_url: str = ""
    db_port: str = ""
    db_name: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False
