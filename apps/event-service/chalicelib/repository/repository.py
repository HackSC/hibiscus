from sqlalchemy import select, delete, update, func
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy_cockroachdb import run_transaction
from typing import Optional
from datetime import datetime, timedelta
from .. import data_types
from . import models
from .engine import engine


def get_event(event_id: str) -> data_types.Event:
    """
    Gets event details for the given event (user-facing)

    Raises an exception if the event does not exist
    """

    def get(session) -> data_types.Event:
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

    return run_transaction(sessionmaker(engine), get)


def get_event_admin(event_id: str) -> data_types.EventAdminGet:
    """
    Gets event details for the given event (admin-facing)

    Raises an exception if the event does not exist
    """

    def get(session) -> data_types.EventAdminGet:
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

    return run_transaction(sessionmaker(engine), get)


def get_events(
    page: int = None,
    page_size: int = None,
    date: Optional[datetime] = None,
    after: Optional[datetime] = None,
    name: Optional[str] = None,
    location: Optional[str] = None,
) -> list[data_types.Event]:
    """
    Gets list of events with pagination, optionally filtered by date, time, name, or location
    """

    def get(session) -> list[data_types.Event]:
        stmt = select(models.Event)

        if name is not None:
            sml_name = func.word_similarity(models.Event.name, name).label("sml_name")
            stmt = stmt.where(models.Event.name.op("%>")(name)).order_by(
                sml_name.desc()
            )

        if location is not None:
            sml_location = func.word_similarity(models.Event.location, location).label(
                "sml_location"
            )
            stmt = stmt.where(models.Event.location.op("%>")(location)).order_by(
                sml_location.desc()
            )

        if date is not None:
            stmt = stmt.where(models.Event.end_time >= date).where(
                models.Event.start_time <= date + timedelta(days=1)
            )

        if after is not None:
            stmt = stmt.where(models.Event.end_time >= after)

        stmt = stmt.order_by(models.Event.start_time.asc())

        if page_size >= 0:
            stmt = stmt.limit(page_size).offset((page - 1) * page_size)

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

    return run_transaction(sessionmaker(engine), get)


def add_event(event: data_types.EventAdmin) -> str:
    """
    Adds a new event

    Returns: event ID of the new event

    Raises an exception if the event failed to add
    """

    def add(session: Session) -> str:
        event_id = session.scalar(
            insert(models.Event)
            .values(
                name=event.eventName,
                start_time=event.startTime,
                end_time=event.endTime,
                location=event.location,
                description=event.description,
                bp_points=event.bpPoints,
                capacity=event.capacity,
                organizer_details=event.organizerDetails,
            )
            .returning(models.Event.event_id)
        )

        event_tags = [{"event_id": event_id, "event_tag": x} for x in event.eventTags]
        industry_tags = [
            {"event_id": event_id, "industry_tag": x} for x in event.industryTags
        ]
        contacts = [
            {
                "event_id": event_id,
                "name": x.name,
                "role": x.role,
                "phone": x.phone,
                "email": x.email,
            }
            for x in event.contactInfo
        ]

        session.execute(insert(models.EventTag), event_tags)
        session.execute(insert(models.IndustryTag), industry_tags)
        session.execute(insert(models.Contact), contacts)

        return str(event_id)

    return run_transaction(sessionmaker(engine), add)


def update_event(
    event_id: str,
    event_tags: Optional[list[str]],
    industry_tags: Optional[list[str]],
    **kwargs
) -> data_types.EventAdmin:
    """
    Update event details

    Parameters: fields to be updated
        Accepted parameters: name, description, start_time, end_time, location, bp_points, capacity, organizer_details
    """

    new_event = {key: value for key, value in kwargs.items() if value is not None}

    with Session(engine) as session:
        if new_event:
            res = session.execute(
                update(models.Event)
                .values(**new_event)
                .where(models.Event.event_id == event_id)
                .returning(models.Event)
            ).one_or_none()

            if res is None:
                raise Exception("Event does not exist")

            event = res.tuple()[0]
        else:
            event = session.scalars(
                select(models.Event).where(models.Event.event_id == event_id)
            ).one_or_none()

            if event is None:
                raise Exception("Event does not exist")

        if event_tags is not None:
            # Add event tags
            for event_tag in set(event_tags).difference(
                {x.event_tag for x in event.event_tags}
            ):
                tag = models.EventTag(event_id=event_id, event_tag=event_tag)
                session.add(tag)

            # Remove event tags
            for event_tag in {x.event_tag for x in event.event_tags}.difference(
                event_tags
            ):
                session.execute(
                    delete(models.EventTag)
                    .where(models.EventTag.event_id == event_id)
                    .where(models.EventTag.event_tag == event_tag)
                )

        if industry_tags is not None:
            # Add industry tags
            for industry_tag in set(industry_tags).difference(
                {x.industry_tag for x in event.industry_tags}
            ):
                tag = models.IndustryTag(event_id=event_id, industry_tag=industry_tag)
                session.add(tag)

            # Remove industry tags
            for industry_tag in {
                x.industry_tag for x in event.industry_tags
            }.difference(industry_tags):
                session.execute(
                    delete(models.IndustryTag)
                    .where(models.IndustryTag.event_id == event_id)
                    .where(models.IndustryTag.industry_tag == industry_tag)
                )

        session.commit()

        return data_types.EventAdmin(
            eventId=event.event_id,
            eventName=event.name,
            startTime=event.start_time,
            endTime=event.end_time,
            location=event.location,
            description=event.description,
            eventTags=[x.event_tag for x in event.event_tags],
            industryTags=[x.industry_tag for x in event.industry_tags],
            bpPoints=event.bp_points,
            capacity=event.capacity,
            organizerDetails=event.organizer_details,
            contactInfo=[
                data_types.Contact(
                    name=x.name, role=x.role, phone=x.phone, email=x.email
                )
                for x in event.contacts
            ],
        )


def get_pinned_events(user_id: str) -> list[data_types.Event]:
    """
    Returns a list of all pinned events for a user
    """

    def get(session: Session) -> list[data_types.Event]:
        events = session.scalars(
            select(models.EventPin).where(models.EventPin.user_id == user_id)
        )

        events = [
            data_types.Event(
                eventId=pin.event.event_id,
                eventName=pin.event.name,
                startTime=pin.event.start_time,
                endTime=pin.event.end_time,
                location=pin.event.location,
                description=pin.event.description,
                eventTags=[x.event_tag for x in pin.event.event_tags],
                industryTags=[x.industry_tag for x in pin.event.industry_tags],
                bpPoints=pin.event.bp_points,
            )
            for pin in events
        ]
        events.sort(key=lambda event: event.startTime)

        return events

    return run_transaction(sessionmaker(engine), get)


def add_pinned_event(user_id: str, event_id: str) -> None:
    """
    RSVP to an event

    Raises an exception if the user already has an RSVP to the event, or if the event does not exist
    """

    def add(session: Session):
        pin = models.EventPin(user_id=user_id, event_id=event_id)
        session.add(pin)

    run_transaction(sessionmaker(engine), add)


def remove_pinned_event(user_id: str, event_id: str) -> None:
    """
    Un-RSVP to an event

    Raises an exception if the user does not have an existing RSVP to the event
    """

    def remove(session: Session):
        res = session.execute(
            delete(models.EventPin)
            .where(models.EventPin.user_id == user_id)
            .where(models.EventPin.event_id == event_id)
            .returning(models.EventPin.event_id)
        )

        if res.first() is None:
            raise Exception("User does not have an RSVP to this event")

    run_transaction(sessionmaker(engine), remove)


def get_rsvp_users(event_id: str, page: int = None, page_size: int = None) -> list[str]:
    """
    Gets the list of users who has an RSVP to the event

    Currently only returns a list of user IDs, TODO: query auth service for user details
    """

    if page is None:
        page = 1

    if page_size is None:
        page_size = 20

    with Session(engine) as session:
        pins = session.scalars(
            select(models.EventPin)
            .join_from(
                models.Event,
                models.EventPin,
                models.Event.event_id == models.EventPin.event_id,
            )
            .where(models.Event.event_id == event_id)
            .order_by(models.EventPin.user_id)
            .limit(page_size)
            .offset((page - 1) * page_size)
        )

        return [pin.user_id for pin in pins]


def add_event_tag(event_id: str, event_tag: str) -> None:
    """
    Adds a new event tag to the specified event
    """

    with Session(engine) as session:
        tag = models.EventTag(event_id=event_id, event_tag=event_tag)
        session.add(tag)

        session.commit()


def remove_event_tag(event_id: str, event_tag: str) -> None:
    """
    Removes an event tag, or raises an exception if it does not exist
    """

    with Session(engine) as session:
        res = session.execute(
            delete(models.EventTag)
            .where(models.EventTag.event_id == event_id)
            .where(models.EventTag.event_tag == event_tag)
            .returning(models.EventTag.event_tag)
        )

        if res.first() is None:
            raise Exception("Tag does not exist")

        session.commit()


def add_industry_tag(event_id: str, industry_tag: str) -> None:
    """
    Adds a new industry tag to the specified event
    """

    with Session(engine) as session:
        tag = models.IndustryTag(event_id=event_id, industry_tag=industry_tag)
        session.add(tag)

        session.commit()


def remove_industry_tag(event_id: str, industry_tag: str) -> None:
    """
    Removes an industry tag, or raises an exception if it does not exist
    """

    with Session(engine) as session:
        res = session.execute(
            delete(models.IndustryTag)
            .where(models.IndustryTag.event_id == event_id)
            .where(models.IndustryTag.industry_tag == industry_tag)
            .returning(models.IndustryTag.industry_tag)
        )

        if res.first() is None:
            raise Exception("Tag does not exist")

        session.commit()


def add_contact(
    event_id: str,
    name: str,
    role: Optional[str],
    phone: Optional[str],
    email: Optional[str],
) -> str:
    """
    Adds a contact to the specified event

    Returns the contact ID of the new contact
    """

    with Session(engine) as session:
        contact = models.Contact(
            event_id=event_id, name=name, role=role, phone=phone, email=email
        )
        session.add(contact)
        session.flush()

        id = contact.contact_id

        session.commit()

        return str(id)


def remove_contact(contact_id: str) -> None:
    """
    Removes a specified contact
    """

    with Session(engine) as session:
        res = session.execute(
            delete(models.Contact)
            .where(models.Contact.contact_id == contact_id)
            .returning(models.Contact.contact_id)
        )

        if res.first() is None:
            raise Exception("Contact does not exist")

        session.commit()
