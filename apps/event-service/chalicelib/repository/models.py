from uuid import UUID
from typing import Optional
from sqlalchemy import ForeignKey, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Event(Base):
    __tablename__ = "events"

    event_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    start_time: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True))
    end_time: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True))
    location: Mapped[str]
    description: Mapped[Optional[str]]
    bp_points: Mapped[int]
    capacity: Mapped[Optional[int]]
    organizer_details: Mapped[Optional[str]]

    event_tags: Mapped[list["EventTag"]] = relationship(back_populates="event")
    industry_tags: Mapped[list["IndustryTag"]] = relationship(back_populates="event")
    contacts: Mapped[list["Contact"]] = relationship(back_populates="event")
    pins: Mapped[list["EventPin"]] = relationship(back_populates="event")


class EventTag(Base):
    __tablename__ = "event_tags"

    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.event_id"), primary_key=True
    )
    event_tag: Mapped[str] = mapped_column(primary_key=True)

    event: Mapped["Event"] = relationship(back_populates="event_tags")


class IndustryTag(Base):
    __tablename__ = "industry_tags"

    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.event_id"), primary_key=True
    )
    industry_tag: Mapped[str] = mapped_column(primary_key=True)

    event: Mapped["Event"] = relationship(back_populates="industry_tags")


class Contact(Base):
    __tablename__ = "contacts"

    contact_id: Mapped[int] = mapped_column(primary_key=True)
    event_id: Mapped[int] = mapped_column(ForeignKey("events.event_id"))
    name: Mapped[str]
    role: Mapped[Optional[str]]
    phone: Mapped[Optional[str]]
    email: Mapped[Optional[str]]

    event: Mapped["Event"] = relationship(back_populates="contacts")


class EventPin(Base):
    __tablename__ = "pinned_events"

    user_id: Mapped[UUID] = mapped_column(primary_key=True)
    event_id: Mapped[int] = mapped_column(
        ForeignKey("events.event_id"), primary_key=True
    )

    event: Mapped["Event"] = relationship(back_populates="pins")
