from flask import Flask, jsonify, request
from repository import repository


app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/test")
def test():
    success = repository.add_vertical()
    return jsonify({"success": success})


# Regular endpoints
@app.get("/projects/<int:vertical_id>/<int:project_id>")
def get_project(vertical_id: int, project_id: int):
    try:
        project = repository.get_project(vertical_id, project_id)
        return jsonify(project), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get requested project: {e}"}), 400


@app.get("/projects/<int:vertical_id>")
def get_all_projects(vertical_id: int):
    try:
        projects = repository.get_all_projects(vertical_id)

        return jsonify({"projects": projects}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get requested projects: {e}"}), 400


@app.post("/ranking/<int:vertical_id>/<user_id>")
def set_rankings(vertical_id: int, user_id: str):
    body = request.json

    try:
        repository.set_ranking(
            vertical_id=vertical_id,
            project_id=body.get("projectId"),
            user_id=user_id,
            rank_new=body.get("newRanking"),
        )

        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to change project rank: {e}"}), 400


@app.get("/ranking/<int:vertical_id>/<user_id>")
def get_rankings(vertical_id: int, user_id: str):
    try:
        rankings = repository.get_rankings(vertical_id, user_id)
        vertical = repository.get_vertical(vertical_id)

        return jsonify({"verticalName": vertical.name, "rankings": rankings}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get requested rankings: {e}"}), 400


@app.post("/notes/<int:vertical_id>/<int:project_id>/<user_id>")
def add_notes(vertical_id: int, project_id: int, user_id: str):
    try:
        body = request.json
        repository.add_notes(
            project_id=project_id, user_id=user_id, notes=body.get("notes")
        )

        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add notes: {e}"}), 400


@app.get("/notes/<int:vertical_id>/<int:project_id>/<user_id>")
def get_notes(vertical_id: int, project_id: int, user_id: str):
    try:
        notes = repository.get_notes(project_id, user_id)

        return jsonify({"notes": notes}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get notes: {e}"}), 400


# Admin endpoints
@app.post("/projects/<int:vertical_id>")
def add_project(vertical_id: int):
    body = request.json

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

        return jsonify({"projectId": project_id}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add new project: {e}"}), 400


@app.put("/projects/<int:vertical_id>/<int:project_id>")
def edit_project(vertical_id: int, project_id: int):
    body = request.json

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

        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to edit project: {e}"}), 400


@app.delete("/projects/<int:vertical_id>/<int:project_id>")
def delete_project(vertical_id: int, project_id: int):
    try:
        repository.delete_project(vertical_id, project_id)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to delete project: {e}"}), 400


@app.post("/lock/<int:vertical_id>")
def lock_rankings(vertical_id: int):
    try:
        repository.lock_rankings(vertical_id)
        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to lock rankings: {e}"}), 400


@app.get("/ranking/<int:vertical_id>")
def get_overall_rankings(vertical_id: int):
    try:
        rankings = repository.get_overall_rankings(vertical_id)
        vertical = repository.get_vertical(vertical_id)

        return jsonify({"verticalName": vertical.name, "rankings": rankings}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get requested rankings: {e}"}), 400


@app.post("/ranking/<int:vertical_id>")
def set_overall_rankings(vertical_id: int):
    body = request.json

    try:
        repository.set_overall_ranking(
            vertical_id=vertical_id,
            project_id=body.get("projectId"),
            rank_new=body.get("newRanking"),
        )

        return jsonify({"message": "Success"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to change project rank: {e}"}), 400


@app.post("/projects/bulk")
def add_many_projects():
    return jsonify({"message": "Not implemented"}), 501


@app.post("/judges")
def add_judge():
    return jsonify({"message": "Not implemented"}), 501


@app.post("/judges/bulk")
def add_many_judges():
    return jsonify({"message": "Not implemented"}), 501
