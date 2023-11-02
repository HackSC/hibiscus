from dataclasses import dataclass, asdict
from datetime import datetime
from typing import Optional


@dataclass
class _EventBase:
    eventId: str
    eventName: str
    startTime: datetime
    endTime: datetime
    location: str
    bpPoints: int

    def __post_init__(self):
        if not isinstance(self.eventId, str):
            self.eventId = str(self.eventId)


@dataclass
class _EventOptionalBase:
    description: Optional[str] = None
    eventTags: Optional[list[str]] = None
    industryTags: Optional[list[str]] = None


@dataclass
class _EventAdminBase(_EventBase):
    contactInfo: list["Contact"]


@dataclass
class _EventAdminOptionalBase(_EventOptionalBase):
    capacity: Optional[int] = None
    organizerDetails: Optional[str] = None


@dataclass
class _EventAdminGetBase(_EventAdminBase):
    rsvps: int


@dataclass
class Event(_EventOptionalBase, _EventBase):
    pass


@dataclass
class EventAdmin(_EventAdminOptionalBase, _EventAdminBase):
    """
    Contains admin-only fields
    """

    pass


@dataclass
class EventAdminGet(_EventAdminOptionalBase, _EventAdminGetBase):
    """
    Contains admin-only fields that are only returned from getting event details
    """

    pass


@dataclass
class Contact:
    name: str
    role: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None


def event_to_dict(event: _EventBase) -> dict:
    d = asdict(event)

    if not isinstance(event.startTime, str):
        d["startTime"] = event.startTime.isoformat()

    if not isinstance(event.endTime, str):
        d["endTime"] = event.endTime.isoformat()

    return d
