import os
from sqlalchemy import Engine, create_engine


def __create_engine() -> Engine:
    return create_engine(
        f"postgresql+psycopg2://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_URL')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}",
        echo=True,
    )


engine = __create_engine()
