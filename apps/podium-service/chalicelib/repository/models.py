from typing import Optional
from uuid import UUID
from sqlalchemy import ForeignKey, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Vertical(Base):
    __tablename__ = "verticals"

    vertical_id: Mapped[UUID] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]

    projects: Mapped[list["Project"]] = relationship(back_populates="vertical")


class Project(Base):
    __tablename__ = "projects"

    project_id: Mapped[UUID] = mapped_column(primary_key=True)
    vertical_id: Mapped[UUID] = mapped_column(ForeignKey("verticals.vertical_id"))
    name: Mapped[str]
    team: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    image_url: Mapped[Optional[str]]
    devpost_url: Mapped[Optional[str]]
    video_url: Mapped[Optional[str]]
    valid: Mapped[bool]

    vertical: Mapped["Vertical"] = relationship(back_populates="projects")


class Ranking(Base):
    __tablename__ = "ranking"

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.project_id"), primary_key=True
    )
    user_id: Mapped[str] = mapped_column(primary_key=True)
    rank: Mapped[int]

    project: Mapped["Project"] = relationship()


class Note(Base):
    __tablename__ = "notes"

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.project_id"), primary_key=True
    )
    user_id: Mapped[str] = mapped_column(primary_key=True)
    notes: Mapped[str]

    project: Mapped["Project"] = relationship()


class Comment(Base):
    __tablename__ = "comments"

    comment_id: Mapped[UUID] = mapped_column(primary_key=True)
    project_id: Mapped[UUID] = mapped_column(ForeignKey("projects.project_id"))
    user_id: Mapped[str]
    comment: Mapped[str]
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True))

    project: Mapped["Project"] = relationship()


class Judge(Base):
    __tablename__ = "judges"

    user_id: Mapped[str] = mapped_column(primary_key=True)
    vertical_id: Mapped[Optional[UUID]] = mapped_column(
        ForeignKey("verticals.vertical_id")
    )

    vertical: Mapped["Vertical"] = relationship()


class RankingFinal(Base):
    __tablename__ = "ranking_final"

    project_id: Mapped[UUID] = mapped_column(
        ForeignKey("projects.project_id"), primary_key=True
    )
    rank: Mapped[int]

    project: Mapped["Project"] = relationship()


class RankingLock(Base):
    __tablename__ = "ranking_locks"

    vertical_id: Mapped[UUID] = mapped_column(
        ForeignKey("verticals.vertical_id"), primary_key=True
    )

    vertical: Mapped["Vertical"] = relationship()
