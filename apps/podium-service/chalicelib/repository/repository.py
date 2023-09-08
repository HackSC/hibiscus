from typing import Optional
from io import StringIO
import csv
from sqlalchemy import select, update, delete
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy_cockroachdb import run_transaction
from . import models
from .engine import engine
from .. import data_types


# def add_vertical():
#     with Session(engine) as session:
#         vertical = models.Vertical(name="First", description="Hello world")
#         session.add(vertical)
#         session.commit()

#     return True


def add_project(
    vertical_id: str,
    name: str,
    team: Optional[list[str]] = None,
    description: Optional[str] = None,
    image_url: Optional[str] = None,
    devpost_url: Optional[str] = None,
) -> Optional[str]:
    """
    Adds a project to the specified vertical

    Params: as annotated

    Returns: project ID of new project, or None if failed to insert
    """

    def add(session: Session) -> str:
        project_id = session.scalar(
            insert(models.Project)
            .values(
                vertical_id=vertical_id,
                name=name,
                team=team,
                description=description,
                image_url=image_url,
                devpost_url=devpost_url,
            )
            .returning(models.Project.project_id)
        )
        return str(project_id)

    # Convert team from list to comma-separated string
    if team is not None:
        team = __list_to_csv(team)

    project_id = run_transaction(sessionmaker(engine), add)

    return project_id


def update_project(
    vertical_id: str, project_id: str, team: Optional[list[str]] = None, **kwargs
) -> None:
    """
    Updates the given project\n
    If an unknown project ID is provided, an exception will be raised

    Params:
    - vertical_id - Vertical ID
    - project_id - Project ID
    - team - Team members as a list of strings

    Additional params:
    - name: str
    - description: str
    - image_url: str
    - devpost_url: str
    """

    def up(session: Session):
        new_project = {key: value for key, value in kwargs.items() if value is not None}
        if team is not None:
            new_project["team"] = __list_to_csv(team)

        res = session.execute(
            update(models.Project)
            .where(models.Project.project_id == project_id)
            .where(models.Project.vertical_id == vertical_id)
            .values(**new_project)
            .returning(models.Project.project_id)
        )

        if res.first() is None:
            raise Exception("No project found")

    run_transaction(sessionmaker(engine), up)


def delete_project(vertical_id: str, project_id: str) -> None:
    """
    Deletes the given project.\n
    Raises an exception if the project does not exist.
    """

    def remove(session: Session):
        res = session.execute(
            delete(models.Project)
            .where(models.Project.project_id == project_id)
            .where(models.Project.vertical_id == vertical_id)
            .returning(models.Project.project_id)
        )

        if res.first() is None:
            raise Exception("No project found")

    run_transaction(sessionmaker(engine), remove)


def get_project(vertical_id: str, project_id: str) -> data_types.Project:
    """
    Gets the project with the corresponding project and vertical IDs\n
    The project will be in the form of our defined dataclass which is ready to be sent as JSON

    Params and return type as annotated

    Raises an exception if project does not exist
    """

    project = __get_raw_project(vertical_id, project_id)

    return project


def get_all_projects_in_vertical(vertical_id: str) -> list[data_types.ProjectOutline]:
    """
    Gets all the projects in a given vertical and returns a list of their IDs and names
    """

    def get(session: Session) -> list[data_types.ProjectOutline]:
        res = session.scalars(
            select(models.Project).where(models.Project.vertical_id == vertical_id)
        )

        return [
            data_types.ProjectOutline(
                projectId=x.project_id,
                projectName=x.name,
                verticalId=x.vertical_id,
                verticalName=x.vertical.name,
            )
            for x in res.all()
        ]

    return run_transaction(sessionmaker(engine), get)


def get_all_projects() -> list[data_types.ProjectOutline]:
    """
    Gets all the projects from all verticals
    """


def set_ranking(vertical_id: str, project_id: str, user_id: str, rank_new: int) -> None:
    """
    - Change ranking of a project for a specific judge
    - Project is given the new ranking specified, and all projects below that are moved down
    - If the current project is already ranked and the project's new ranking is lower, all projects between the old and new ranking are moved up
    - If project's new ranking is higher, all projects between the old and new ranking are moved down
    """

    def set(session: Session):
        # Check if project exists
        project = session.scalars(
            select(models.Project)
            .where(models.Project.project_id == project_id)
            .where(models.Project.vertical_id == vertical_id)
        )

        if project.first() is None:
            raise Exception("Project not found")

        # Check if current ranking is valid
        if rank_new < 1:
            raise Exception("Invalid ranking")

        # Check previous ranking, if it exists
        rank_old = session.scalars(
            select(models.Ranking)
            .where(models.Ranking.project_id == project_id)
            .where(models.Ranking.user_id == user_id)
        ).one_or_none()

        if rank_old is None:
            # Check if ranking is valid
            if rank_new > 1:
                rank_last = session.scalars(
                    select(models.Ranking)
                    .where(models.Ranking.rank == rank_new - 1)
                    .where(models.Ranking.user_id == user_id)
                )

                if rank_last.first() is None:
                    raise Exception("Invalid ranking")

            # Set rank of project and move all projects below it dowm
            session.execute(
                update(models.Ranking)
                .where(models.Ranking.user_id == user_id)
                .where(models.Ranking.rank >= rank_new)
                .values(rank=models.Ranking.rank + 1)
            )

            ranking = models.Ranking(
                project_id=project_id, user_id=user_id, rank=rank_new
            )
            session.add(ranking)
        else:
            rank_old = rank_old.rank

            # Check if ranking is valid
            rank_last = session.scalars(
                select(models.Ranking)
                .where(models.Ranking.rank == rank_new)
                .where(models.Ranking.user_id == user_id)
            )

            if rank_last.first() is None:
                raise Exception("Invalid ranking")

            if rank_new < rank_old:
                # Set rank of project and move all projects between down
                session.execute(
                    update(models.Ranking)
                    .where(models.Ranking.user_id == user_id)
                    .where(models.Ranking.rank >= rank_new)
                    .where(models.Ranking.rank < rank_old)
                    .values(rank=models.Ranking.rank + 1)
                )

                session.execute(
                    update(models.Ranking)
                    .where(models.Ranking.user_id == user_id)
                    .where(models.Ranking.project_id == project_id)
                    .values(rank=rank_new)
                )
            elif rank_new > rank_old:
                # Set rank of project and move all projects between up
                session.execute(
                    update(models.Ranking)
                    .where(models.Ranking.user_id == user_id)
                    .where(models.Ranking.rank <= rank_new)
                    .where(models.Ranking.rank > rank_old)
                    .values(rank=models.Ranking.rank - 1)
                )

                session.execute(
                    update(models.Ranking)
                    .where(models.Ranking.user_id == user_id)
                    .where(models.Ranking.project_id == project_id)
                    .values(rank=rank_new)
                )

    run_transaction(sessionmaker(engine), set)


def get_rankings(vertical_id: str, user_id: str) -> list[models.Ranking]:
    """
    Get sorted list of ranked projects by a user in a vertical
    """

    def get(session: Session) -> list[data_types.Ranking]:
        rankings = session.execute(
            select(models.Ranking, models.Project)
            .join(models.Project)
            .where(models.Ranking.user_id == user_id)
            .where(models.Project.vertical_id == vertical_id)
            .order_by(models.Ranking.rank)
        )

        return [
            data_types.Ranking(
                projectId=x.Project.project_id,
                projectName=x.Project.name,
                rank=x.Ranking.rank,
            )
            for x in rankings.all()
        ]

    return run_transaction(sessionmaker(engine), get)


def get_vertical(vertical_id: str) -> data_types.Vertical:
    """
    Get vertical details given the vertical ID.\n
    Raises an exception if vertical does not exist
    """

    def get(session: Session) -> data_types.Vertical:
        vertical = session.scalars(
            select(models.Vertical).where(models.Vertical.vertical_id == vertical_id)
        ).one()

        return data_types.Vertical(
            verticalId=vertical.vertical_id,
            name=vertical.name,
            description=vertical.description,
        )

    return run_transaction(sessionmaker(engine), get)


def add_notes(project_id: str, user_id: str, notes: str) -> None:
    """
    Adds a new note by the user to the project, or replaces the existing note
    """

    def add(session: Session):
        session.execute(
            insert(models.Note)
            .values(project_id=project_id, user_id=user_id, notes=notes)
            .on_conflict_do_update(constraint="notes_pkey", set_={"notes": notes})
        )

    run_transaction(sessionmaker(engine), add)


def get_notes(project_id: str, user_id: str) -> Optional[str]:
    """
    Gets the note for a project by a user, or None if none exists
    """

    def get(session: Session) -> Optional[str]:
        notes = session.scalars(
            select(models.Note)
            .where(models.Note.project_id == project_id)
            .where(models.Note.user_id == user_id)
        ).one_or_none()

        if notes is None:
            return None
        else:
            return notes.notes

    return run_transaction(sessionmaker(engine), get)


def lock_rankings(vertical_id: str) -> None:
    """
    Freezes the overall rankings at the current position for further manual adjustments
    """

    def do(session: Session):
        # Register lock
        lock = models.RankingLock(vertical_id=vertical_id)
        session.add(lock)

        # Set overall ranks
        rankings = __get_overall_rankings(vertical_id, session)
        session.execute(
            insert(models.RankingFinal),
            [
                {"project_id": x.project_id, "rank": i + 1}
                for i, x in enumerate(rankings)
            ],
        )

    run_transaction(sessionmaker(engine), do)


def get_overall_rankings(vertical_id: str) -> list[data_types.Ranking]:
    """
    Gets the sorted overall rankings of the given vertical\n
    Overall rankings are calculated as follows:
    - Rank 1: 10 pts
    - Rank 2: 5 pts
    - Rank 3: 2 pts
    - Rank 4: 1 pt
    - Rank 5: 1 pt

    Points from all judges are tallied up to detemine the final ranking
    """

    def get(session: Session) -> list[data_types.Ranking]:
        lock = session.scalars(
            select(models.RankingLock).where(
                models.RankingLock.vertical_id == vertical_id
            )
        ).one_or_none()

        if lock is not None:
            rankings = session.execute(
                select(models.RankingFinal, models.Project)
                .join(models.Project)
                .where(models.Project.vertical_id == vertical_id)
                .order_by(models.RankingFinal.rank)
            )

            return [
                data_types.Ranking(
                    projectId=x.Project.project_id,
                    projectName=x.Project.name,
                    rank=x.RankingFinal.rank,
                )
                for x in rankings
            ]

        # Else vertical ranking has not yet been locked
        rankings = __get_overall_rankings(vertical_id, session)
        return [
            data_types.Ranking(
                projectId=x.project_id,
                projectName=x.name,
                rank=i + 1,
            )
            for i, x in enumerate(rankings)
        ]

    return run_transaction(sessionmaker(engine), get)


def set_overall_ranking(vertical_id: str, project_id: str, rank_new: int) -> None:
    """
    Change overall ranking of a project, works the same as set_ranking
    """

    def set(session: Session):
        # Check if ranking is locked
        lock = session.scalars(
            select(models.RankingLock).where(
                models.RankingLock.vertical_id == vertical_id
            )
        ).one_or_none()

        if lock is None:
            raise Exception("Rankings not yet locked")

        # Check if project exists
        project = session.scalars(
            select(models.Project)
            .where(models.Project.project_id == project_id)
            .where(models.Project.vertical_id == vertical_id)
        )

        if project.first() is None:
            raise Exception("Project not found")

        # Check if current ranking is valid
        if rank_new < 1:
            raise Exception("Invalid ranking")

        # Check previous ranking, if it exists
        rank_old = session.scalars(
            select(models.RankingFinal).where(
                models.RankingFinal.project_id == project_id
            )
        ).one_or_none()

        if rank_old is None:
            # Check if ranking is valid
            if rank_new > 1:
                rank_last = session.scalars(
                    select(models.RankingFinal)
                    .join(models.Project)
                    .where(models.RankingFinal.rank == rank_new - 1)
                    .where(models.Project.vertical_id == vertical_id)
                )

                if rank_last.first() is None:
                    raise Exception("Invalid ranking")

            # Set rank of project and move all projects below it dowm
            session.execute(
                update(models.RankingFinal)
                .where(models.Project.vertical_id == vertical_id)
                .where(models.RankingFinal.rank >= rank_new)
                .values(rank=models.RankingFinal.rank + 1)
            )

            ranking = models.RankingFinal(project_id=project_id, rank=rank_new)
            session.add(ranking)
        else:
            rank_old = rank_old.rank

            # Check if ranking is valid
            rank_last = session.scalars(
                select(models.RankingFinal)
                .where(models.RankingFinal.rank == rank_new)
                .where(models.Project.vertical_id == vertical_id)
            )

            if rank_last.first() is None:
                raise Exception("Invalid ranking")

            if rank_new < rank_old:
                # Set rank of project and move all projects between down
                session.execute(
                    update(models.RankingFinal)
                    .where(models.Project.vertical_id == vertical_id)
                    .where(models.RankingFinal.rank >= rank_new)
                    .where(models.RankingFinal.rank < rank_old)
                    .values(rank=models.RankingFinal.rank + 1)
                )

                session.execute(
                    update(models.RankingFinal)
                    .where(models.Project.vertical_id == vertical_id)
                    .where(models.RankingFinal.project_id == project_id)
                    .values(rank=rank_new)
                )
            elif rank_new > rank_old:
                # Set rank of project and move all projects between up
                session.execute(
                    update(models.RankingFinal)
                    .where(models.Project.vertical_id == vertical_id)
                    .where(models.RankingFinal.rank <= rank_new)
                    .where(models.RankingFinal.rank > rank_old)
                    .values(rank=models.RankingFinal.rank - 1)
                )

                session.execute(
                    update(models.RankingFinal)
                    .where(models.Project.vertical_id == vertical_id)
                    .where(models.RankingFinal.project_id == project_id)
                    .values(rank=rank_new)
                )

    run_transaction(sessionmaker(engine), set)


def add_vertical(name: str, description: Optional[str] = None) -> str:
    """
    Adds a new vertical

    Returns the vertical ID of the new vertical

    Raises an exception if failed to add
    """

    def add(session: Session) -> str:
        vertical_id = session.scalar(
            insert(models.Vertical)
            .values(name=name, description=description)
            .returning(models.Vertical.vertical_id)
        )
        return str(vertical_id)

    vertical_id = run_transaction(sessionmaker(engine), add)

    return vertical_id


def update_vertical(vertical_id: str, **kwargs) -> None:
    """
    Updates the given vertical\n
    If an unknown vertical ID is provided, an exception will be raised

    Params:
    - vertical_id - Vertical ID

    Additional params:
    - name: str
    - description: str
    """

    def up(session: Session):
        new_vertical = {
            key: value for key, value in kwargs.items() if value is not None
        }

        res = session.execute(
            update(models.Vertical)
            .where(models.Vertical.vertical_id == vertical_id)
            .values(**new_vertical)
            .returning(models.Vertical.vertical_id)
        )

        if res.first() is None:
            raise Exception("No project found")

    run_transaction(sessionmaker(engine), up)


def __get_raw_project(vertical_id: str, project_id: str) -> data_types.Project:
    """
    Gets the project with the corresponding project and vertical IDs
    The project will be in the form of our SQLAlchemy model

    Params and return type as annotated

    Raises an exception if project does not exist
    """

    def get(session: Session) -> data_types.Project:
        project = session.scalars(
            select(models.Project)
            .where(models.Project.project_id == project_id)
            .where(models.Project.vertical_id == vertical_id)
        ).one()

        team = None
        if project.team is not None:
            reader = csv.reader([project.team], quoting=csv.QUOTE_NONNUMERIC)
            for row in reader:
                team = row

        project = data_types.Project(
            projectId=project.project_id,
            name=project.name,
            teamMembers=team,
            description=project.description,
            imageUrl=project.image_url,
            verticalId=project.vertical_id,
            verticalName=project.vertical.name,
            # currentRank=1
        )
        return project

    project = run_transaction(sessionmaker(engine), get)

    return project


def get_verticals() -> list[models.Vertical]:
    def get(session: Session):
        res = session.scalars(select(models.Vertical))
        return [
            data_types.Vertical(
                verticalId=vertical.vertical_id,
                name=vertical.name,
                description=vertical.description,
            )
            for vertical in res
        ]

    verticals = run_transaction(sessionmaker(engine), get)
    return verticals


def __get_overall_rankings(vertical_id: str, session: Session) -> list[models.Project]:
    """
    Gets the overall rankings of the ranked projects in a vertical

    Returns a list of project IDs, with the first element being the highest-ranked project
    """

    # Points for each rank, up to rank 5
    scores = {1: 10, 2: 5, 3: 2, 4: 1, 5: 1}

    rankings = session.execute(
        select(models.Ranking, models.Project)
        .join(models.Project)
        .where(models.Project.vertical_id == vertical_id)
    )

    projects = {}
    rankings_overall = {}

    for row in rankings:
        ranking, project = row.tuple()

        if project.project_id not in projects:
            projects[project.project_id] = project

        old_score = rankings_overall.setdefault(ranking.project_id, 0)
        if ranking.rank in scores:
            rankings_overall[ranking.project_id] = old_score + scores[ranking.rank]

    rankings_overall = sorted(rankings_overall, key=rankings_overall.get, reverse=True)
    return [projects[x] for x in rankings_overall]


def __list_to_csv(list: list[str]) -> str:
    """
    Converts any list of strings to comma-separated values
    Puts quotes around all strings
    """
    with StringIO() as stringio:
        writer = csv.writer(stringio, quoting=csv.QUOTE_NONNUMERIC)
        writer.writerow(list)
        string = stringio.getvalue()

        return string
