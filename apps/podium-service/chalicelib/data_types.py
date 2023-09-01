from dataclasses import dataclass
from typing import Optional


@dataclass
class Project:
    projectId: int
    name: str
    teamMembers: Optional[list[str]] = None
    description: Optional[str] = None
    imageUrl: Optional[str] = None
    devpostUrl: Optional[str] = None
    currentRank: Optional[int] = None


@dataclass
class ProjectOutline:
    projectId: int
    projectName: str


@dataclass
class Ranking:
    projectId: int
    projectName: str
    rank: int


@dataclass
class Vertical:
    verticalId: int
    name: str
    description: str
