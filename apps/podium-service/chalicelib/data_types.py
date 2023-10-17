from datetime import datetime
from typing import Optional, TypedDict
from dataclasses import dataclass


class ProjectAdd(TypedDict):
    vertical: str
    name: str
    teamMembers: Optional[list[str]]
    description: Optional[str]
    imageUrl: Optional[str]
    devpostUrl: Optional[str]
    videoUrl: Optional[str]


@dataclass
class Project:
    verticalId: str
    verticalName: str
    projectId: str
    name: str
    teamMembers: Optional[list[str]] = None
    description: Optional[str] = None
    imageUrl: Optional[str] = None
    devpostUrl: Optional[str] = None
    videoUrl: Optional[str] = None
    currentRank: Optional[int] = None

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)
        if not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)


@dataclass
class ProjectOutline:
    verticalId: str
    verticalName: str
    projectId: str
    projectName: str
    description: str
    videoUrl: str

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)
        if not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)


@dataclass
class Ranking:
    projectId: str
    projectName: str
    verticalId: str
    verticalName: str
    rank: int

    def __post_init__(self):
        if not isinstance(self.projectId, str):
            self.projectId = str(self.projectId)
        if not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)


@dataclass
class Vertical:
    verticalId: str
    name: str
    description: str

    def __post_init__(self):
        if not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)


@dataclass
class Comment:
    comment: str
    name: str
    profilePicUrl: str
    createdAt: str


@dataclass
class JudgeInternal:
    id: str
    verticalId: Optional[str]
    verticalName: Optional[str]

    def __post_init__(self):
        if self.verticalId is not None and not isinstance(self.verticalId, str):
            self.verticalId = str(self.verticalId)


@dataclass
class Judge(JudgeInternal):
    name: str
    email: str
