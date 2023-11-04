import os


class Settings:
    db_username: str = os.getenv("DB_USERNAME")
    db_password: str = os.getenv("DB_PASSWORD")
    db_url: str = os.getenv("DB_URL")
    db_port: str = os.getenv("DB_PORT")
    db_name: str = os.getenv("DB_NAME")

    supabase_url: str = os.getenv("SUPABASE_URL")
    supabase_key: str = os.getenv("SUPABASE_KEY")

    auth_service_url: str = os.getenv("AUTH_SERVICE_URL")
    master_token: str = os.getenv("MASTER_TOKEN")
