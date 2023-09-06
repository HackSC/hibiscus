from typing import Optional
from dataclasses import dataclass


@dataclass
class Project:
    projectId: str
    name: str
    teamMembers: Optional[list[str]] = None
    description: Optional[str] = None
    imageUrl: Optional[str] = None
    devpostUrl: Optional[str] = None
    currentRank: Optional[int] = None

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)


@dataclass
class ProjectOutline:
    projectId: str
    projectName: str

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)


@dataclass
class Ranking:
    projectId: str
    projectName: str
    rank: int

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)


@dataclass
class Vertical:
    verticalId: str
    name: str
    description: str

    def __post_init__(self):
        if not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)
