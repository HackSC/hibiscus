from sqlalchemy.orm import Session
from . import models
from .engine import engine


def add_vertical():
    with Session(engine) as session:
        vertical = models.Vertical(name="First", description="Hello world")
        session.add(vertical)
        session.commit()

    return True
