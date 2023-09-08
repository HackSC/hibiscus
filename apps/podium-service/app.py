from chalice import Chalice, BadRequestError, Response
from chalicelib.repository import repository
import dataclasses


app = Chalice(app_name="podium-service")
app.api.cors = True


@app.route("/health")
def health():
    return {"status": "ALIVE"}


# @app.get("/test")
# def test():
#     success = repository.add_vertical()
#     return jsonify({"success": success})


# Regular endpoints
@app.route("/projects/{vertical_id}/{project_id}")
def get_project(vertical_id: str, project_id: str):
    try:
        project = repository.get_project(vertical_id, project_id)
        return dataclasses.asdict(project)
    except Exception as e:
        raise BadRequestError(f"Failed to get requested project: {e}")


@app.route("/projects/{vertical_id}")
def get_all_projects_in_vertical(vertical_id: str):
    try:
        projects = repository.get_all_projects_in_vertical(vertical_id)

        return {"projects": [dataclasses.asdict(project) for project in projects]}
    except Exception as e:
        raise BadRequestError(f"Failed to get projects: {e}")


@app.route("/ranking/{vertical_id}/{user_id}", methods=["POST"])
def set_rankings(vertical_id: str, user_id: str):
    body = app.current_request.json_body

    try:
        repository.set_ranking(
            vertical_id=vertical_id,
            project_id=body.get("projectId"),
            user_id=user_id,
            rank_new=body.get("newRanking"),
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to set ranking: {e}")


@app.route("/ranking/{vertical_id}/{user_id}")
def get_rankings(vertical_id: str, user_id: str):
    try:
        rankings = repository.get_rankings(vertical_id, user_id)
        vertical = repository.get_vertical(vertical_id)

        return {
            "verticalName": vertical.name,
            "rankings": [dataclasses.asdict(ranking) for ranking in rankings],
        }
    except Exception as e:
        raise BadRequestError(f"Failed to get requested rankings: {e}")


@app.route("/notes/{vertical_id}/{project_id}/{user_id}", methods=["POST"])
def add_notes(vertical_id: str, project_id: str, user_id: str):
    body = app.current_request.json_body

    try:
        repository.add_notes(
            project_id=project_id, user_id=user_id, notes=body.get("notes")
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to add note: {e}")


@app.route("/notes/{vertical_id}/{project_id}/{user_id}")
def get_notes(vertical_id: str, project_id: str, user_id: str):
    try:
        notes = repository.get_notes(project_id, user_id)

        return {"notes": notes}
    except Exception as e:
        raise BadRequestError(f"Failed to get requested notes: {e}")


# Admin endpoints
@app.route("/projects/{vertical_id}", methods=["POST"])
def add_project(vertical_id: str):
    body = app.current_request.json_body

    try:
        project_id = repository.add_project(
            vertical_id=vertical_id,
            name=body.get("name"),
            team=body.get("teamMembers"),
            description=body.get("description"),
            image_url=body.get("imageUrl"),
            devpost_url=body.get("devpostUrl"),
        )

        if project_id is None:
            raise Exception("Unknown error occured")

        return {"projectId": project_id}
    except Exception as e:
        raise BadRequestError(f"Failed to add project: {e}")


@app.route("/projects/{vertical_id}/{project_id}", methods=["PUT"])
def edit_project(vertical_id: str, project_id: str):
    body = app.current_request.json_body

    try:
        repository.update_project(
            vertical_id,
            project_id,
            team=body.get("teamMembers"),
            name=body.get("name"),
            description=body.get("description"),
            image_url=body.get("imageUrl"),
            devpost_url=body.get("devpostUrl"),
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to edit project details: {e}")


@app.route("/projects/{vertical_id}/{project_id}", methods=["DELETE"])
def delete_project(vertical_id: str, project_id: str):
    try:
        repository.delete_project(vertical_id, project_id)
        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to delete project: {e}")


@app.route("/lock/{vertical_id}", methods=["POST"])
def lock_rankings(vertical_id: str):
    try:
        repository.lock_rankings(vertical_id)
        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to lock rankings: {e}")


@app.route("/ranking/{vertical_id}")
def get_overall_rankings(vertical_id: str):
    try:
        rankings = repository.get_overall_rankings(vertical_id)
        vertical = repository.get_vertical(vertical_id)

        return {
            "verticalName": vertical.name,
            "rankings": [dataclasses.asdict(ranking) for ranking in rankings],
        }
    except Exception as e:
        raise BadRequestError(f"Failed to get rankings: {e}")


@app.route("/ranking/{vertical_id}", methods=["POST"])
def set_overall_rankings(vertical_id: str):
    body = app.current_request.json_body

    try:
        repository.set_overall_ranking(
            vertical_id=vertical_id,
            project_id=body.get("projectId"),
            rank_new=body.get("newRanking"),
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to change project rank: {e}")


@app.route("/verticals")
def get_verticals():
    try:
        verticals = repository.get_verticals()
        return {"verticals": [dataclasses.asdict(vertical) for vertical in verticals]}
    except Exception as e:
        raise BadRequestError(f"Failed to get verticals: {e}")


@app.route("/verticals", methods=["POST"])
def add_vertical():
    body = app.current_request.json_body

    try:
        vertical_id = repository.add_vertical(
            name=body.get("name"),
            description=body.get("description"),
        )

        return {"verticalId": vertical_id}
    except Exception as e:
        raise BadRequestError(f"Failed to add new vertical: {e}")


@app.route("/verticals/{vertical_id}", methods=["PUT"])
def edit_vertical(vertical_id: str):
    body = app.current_request.json_body

    try:
        repository.update_vertical(
            vertical_id,
            name=body.get("name"),
            description=body.get("description"),
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to edit vertical: {e}")


@app.route("/projects/bulk", methods=["POST"])
def add_many_projects():
    return Response(
        '{"message": "Not implemented"}',
        status_code=501,
        headers={"Content-Type": "application/json"},
    )


@app.route("/judges", methods=["POST"])
def add_judge():
    return Response(
        '{"message": "Not implemented"}',
        status_code=501,
        headers={"Content-Type": "application/json"},
    )


@app.route("/judges/bulk", methods=["POST"])
def add_many_judges():
    return Response(
        '{"message": "Not implemented"}',
        status_code=501,
        headers={"Content-Type": "application/json"},
    )
