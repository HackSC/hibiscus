from sqlalchemy import Engine, create_engine
from ..config import Settings


def __create_engine() -> Engine:
    env = Settings()

    return create_engine(
        f"cockroachdb://{env.db_username}:{env.db_password}@{env.db_url}:{env.db_port}/{env.db_name}",
        echo=True,
    )


engine = __create_engine()
