from sqlalchemy import select, func
from sqlalchemy.orm import Session
from typing import Optional
from datetime import date, datetime
import data_types
from . import models
from .engine import engine


def get_event(event_id: int) -> data_types.Event:
    """
    Gets event details for the given event (user-facing)

    Raises an exception if the event does not exist
    """

    with Session(engine) as session:
        event = session.scalars(
            select(models.Event).where(models.Event.event_id == event_id)
        ).one_or_none()

        if event is None:
            raise Exception("Event not found")

        return data_types.Event(
            eventId=event.event_id,
            eventName=event.name,
            startTime=event.start_time,
            endTime=event.end_time,
            location=event.location,
            description=event.description,
            eventTags=[x.event_tag for x in event.event_tags],
            industryTags=[x.industry_tag for x in event.industry_tags],
            bpPoints=event.bp_points,
        )


def get_event_admin(event_id: int) -> data_types.EventAdminGet:
    """
    Gets event details for the given event (admin-facing)

    Raises an exception if the event does not exist
    """

    with Session(engine) as session:
        event = session.scalars(
            select(models.Event).where(models.Event.event_id == event_id)
        ).one_or_none()

        if event is None:
            raise Exception("Event not found")

        return data_types.EventAdminGet(
            eventId=event.event_id,
            eventName=event.name,
            startTime=event.start_time,
            endTime=event.end_time,
            location=event.location,
            description=event.description,
            eventTags=[x.event_tag for x in event.event_tags],
            industryTags=[x.industry_tag for x in event.industry_tags],
            bpPoints=event.bp_points,
            rsvps=len(event.pins),
            capacity=event.capacity,
            organizerDetails=event.organizer_details,
            contactInfo=[
                data_types.Contact(
                    name=x.name, role=x.role, phone=x.phone, email=x.email
                )
                for x in event.contacts
            ],
        )


def get_events(
    page: int = 1,
    page_size: int = 20,
    date: Optional[date] = None,
    after: Optional[datetime] = None,
    name: Optional[str] = None,
    location: Optional[str] = None,
) -> list[data_types.Event]:
    """
    Gets list of events with pagination, optionally filtered by date, time, name, or location
    """

    with Session(engine) as session:
        stmt = select(models.Event)

        if name is not None:
            sml_name = func.word_similarity(models.Event.name, name).label("sml_name")
            stmt = stmt.where(models.Event.name.op("%>")(name)).order_by(
                sml_name.desc()
            )

        events = session.scalars(stmt)

        return [
            data_types.Event(
                eventId=event.event_id,
                eventName=event.name,
                startTime=event.start_time,
                endTime=event.end_time,
                location=event.location,
                description=event.description,
                eventTags=[x.event_tag for x in event.event_tags],
                industryTags=[x.industry_tag for x in event.industry_tags],
                bpPoints=event.bp_points,
            )
            for event in events
        ]


def add_event(event: data_types.EventAdmin) -> int:
    """
    Adds a new event

    Returns: event ID of the new event

    Raises an exception if the event failed to add
    """

    with Session(engine) as session:
        eventModel = models.Event(
            name=event.eventName,
            start_time=event.startTime,
            end_time=event.endTime,
            location=event.location,
            description=event.description,
            bp_points=event.bpPoints,
            capacity=event.capacity,
            organizer_details=event.organizerDetails,
        )

        session.add(eventModel)
        session.flush()

        event_id = eventModel.event_id

        event_tags = [
            models.EventTag(event_id=event_id, event_tag=x) for x in event.eventTags
        ]
        industry_tags = [
            models.IndustryTag(event_id=event_id, industry_tag=x)
            for x in event.industryTags
        ]
        contacts = [
            models.Contact(
                event_id=event_id,
                name=x.name,
                role=x.role,
                phone=x.phone,
                email=x.email,
            )
            for x in event.contactInfo
        ]

        session.add_all(event_tags)
        session.add_all(industry_tags)
        session.add_all(contacts)

        session.commit()

        return event_id
