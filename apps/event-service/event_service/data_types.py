from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class _EventBase:
    eventId: int
    eventName: str
    startTime: datetime
    endTime: datetime
    location: str
    eventTags: list[str]
    industryTags: list[str]
    bpPoints: int


@dataclass
class _EventOptionalBase:
    description: Optional[str] = None


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
