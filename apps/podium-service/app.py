from chalice import Chalice, BadRequestError, Response, ChaliceViewError
from chalicelib.config import Settings
from chalicelib.repository import repository
import dataclasses
import requests


app = Chalice(app_name="podium-service")
app.api.cors = True


# middleware
@app.middleware("all")
def check_auth(event, get_response):
    env = Settings()

    headers = app.current_request.headers
    access_token = headers.get("Authorization")

    if access_token is None:
        return Response(status_code=401, body={"Error": "No access token provided"})

    if not access_token.startswith("Bearer "):
        return Response(
            status_code=401, body={"Error": "Invalid authentication token format."}
        )

    # access_token is in the format "Bearer access_token"
    # splice it
    access_token = access_token[7:]

    # Check for master API token
    if access_token == env.master_token:
        return get_response(event)

    api_url = f"{env.auth_service_url}/verify-token/"
    api_url += access_token

    response = requests.get(api_url)

    # if valid access token
    if response.status_code == 200:
        try:
            data = response.json()
            role = data["role"]

            # if user is admin, allow access
            if role == "SUPERADMIN":
                return get_response(event)

            # elif user is judge
            elif role == "JUDGE":
                # if event is a judge endpoint, allow access
                judge_eps = [
                    {"path": "/projects/{vertical_id}/{project_id}", "method": "GET"},
                    {"path": "/projects/{vertical_id}", "method": "GET"},
                    {"path": "/projects", "method": "GET"},
                    {"path": "/comments/{project_id}", "method": "GET"},
                    {"path": "/judges/{judge_id}", "method": "GET"},
                ]

                # write code that gets the path from the event
                path = event.path

                if any(
                    d.get("path") == path and d.get("method") == event.method
                    for d in judge_eps
                ):
                    return get_response(event)

                elif "{user_id}" in path:
                    # check if judge is allowed to access this endpoint
                    # if yes, allow access
                    # else, disallow access
                    user_id = event.uri_params.get("user_id")
                    if user_id == data["user_id"]:
                        return get_response(event)
                    else:
                        return Response(
                            {
                                "error": "Access denied. Judge ID from call does not match stored judge ID"
                            },
                            status_code=403,
                        )

                # else, disallow access
                else:
                    return Response(
                        {"error": "Access denied. Judge cannot access Admin endpoints"},
                        status_code=403,
                    )

            # else, is a HACKER
            else:
                return Response(
                    {"error": "Access denied. Cannot access endpoints"},
                    status_code=403,
                )

        except ValueError:
            raise ChaliceViewError("Invalid JSON response")

    # invalid access token
    else:
        return Response(status_code=401, body={"Error": "Invalid access token"})


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


@app.route("/projects")
def get_all_projects():
    try:
        projects = repository.get_all_projects()

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


@app.route("/ranking/{vertical_id}/{user_id}", methods=["DELETE"])
def unrank_project(vertical_id: str, user_id: str):
    body = app.current_request.json_body

    try:
        repository.unrank_project(body.get("projectId"), user_id)
        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to get unrank project: {e}")


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


@app.route("/comments/{project_id}/user/{user_id}", methods=["POST"])
def add_comment(project_id: str, user_id: str):
    body = app.current_request.json_body

    try:
        if body.get("comment") is None:
            raise Exception("Property 'comment' not found in request body")

        repository.add_comment(
            project_id=project_id, user_id=user_id, comment=body.get("comment")
        )

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to add comment: {e}")


@app.route("/comments/id/{comment_id}/user/{user_id}", methods=["PUT"])
def edit_comment(comment_id: str):
    body = app.current_request.json_body

    try:
        if body.get("comment") is None:
            raise Exception("Property 'comment' not found in request body")

        repository.edit_comment(comment_id=comment_id, comment=body.get("comment"))

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to edit comment: {e}")


@app.route("/comments/{project_id}")
def get_comments(project_id: str):
    try:
        comments = repository.get_comments(project_id)

        return {"comments": [dataclasses.asdict(comment) for comment in comments]}
    except Exception as e:
        raise BadRequestError(f"Failed to get comments: {e}")


@app.route("/judges/{judge_id}")
def get_judge_details(judge_id: str):
    try:
        judge = repository.get_judge_details(judge_id)

        return dataclasses.asdict(judge)
    except Exception as e:
        raise BadRequestError(f"Failed to get judge: {e}")


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
            video_url=body.get("videoUrl"),
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
            vertical_new=body.get("verticalNew"),
            name=body.get("name"),
            description=body.get("description"),
            image_url=body.get("imageUrl"),
            devpost_url=body.get("devpostUrl"),
            video_url=body.get("videoUrl"),
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


@app.route("/lock/{vertical_id}", methods=["DELETE"])
def unlock_rankings(vertical_id: str):
    try:
        repository.unlock_rankings(vertical_id)
        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to unlock rankings: {e}")


@app.route("/lock/{vertical_id}")
def is_locked(vertical_id: str):
    try:
        locked = repository.is_locked(vertical_id)
        return {"locked": locked}
    except Exception as e:
        raise BadRequestError(f"Failed to check for lock: {e}")


@app.route("/ranking")
def get_all_overall_rankings():
    try:
        verticals = repository.get_verticals()
        return {
            "rankings": [
                {
                    "verticalId": vertical.verticalId,
                    "verticalName": vertical.name,
                    "rankings": [
                        dataclasses.asdict(ranking)
                        for ranking in repository.get_overall_rankings(
                            vertical.verticalId
                        )
                    ],
                }
                for vertical in verticals
            ]
        }
    except Exception as e:
        raise BadRequestError(f"Failed to get rankings: {e}")


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


@app.route("/judges")
def get_judges():
    try:
        judges = repository.get_judges()

        return {"judges": [dataclasses.asdict(judge) for judge in judges]}
    except Exception as e:
        raise BadRequestError(f"Failed to get judges: {e}")


@app.route("/judges/{judge_id}", methods=["POST"])
def set_judge_vertical(judge_id: str):
    body = app.current_request.json_body

    try:
        if body.get("verticalId") is None:
            raise Exception("Property 'verticalId' not found in request body")

        repository.set_judge_vertical(judge_id, body.get("verticalId"))

        return {"message": "Success"}
    except Exception as e:
        raise BadRequestError(f"Failed to assign judge vertical: {e}")


@app.route("/add_projects", methods=["POST"])
def add_projects():
    body = app.current_request.json_body
    projects = body.get("data")

    try:
        project_ids = repository.add_projects(projects)
        return {"projects": project_ids}
    except Exception as e:
        raise BadRequestError(f"Failed to add projects: {e}")
