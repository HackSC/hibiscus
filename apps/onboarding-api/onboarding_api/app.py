from flask import Flask, jsonify, request, g, redirect, url_for
import sqlite3
import os

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_PATH = os.path.join(BASE_DIR, "tasks.db")
INIT_SCHEMA = os.path.join(BASE_DIR, "tasks_schema.sql")


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE_PATH)
    # queries return rows instead of unnamed tuples
    db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource(INIT_SCHEMA, mode="r") as f:
            db.cursor().executescript(f.read())
        db.commit()


@app.cli.command("initdb")
def initdb_command():
    init_db()
    print("Initialized the sqlite3 database")


def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv


def change_db(query, args=()):
    db = get_db()
    cur = db.execute(query, args)
    db.commit()
    db.close()
    return cur.lastrowid


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.route("/api/tasks/create", methods=["POST"])
def create_task():
    try:
        # get user input json
        data = request.get_json()
        name = data["name"]
        description = data["description"]
        id = change_db(
            "INSERT INTO tasks (name, description) VALUES (?, ?)", [name, description]
        )
    except Exception as e:
        return jsonify({"meta": {"status": 500, "message": str(e)}})
    return redirect(url_for("get_task", id=id))


@app.route("/api/tasks/get/<int:id>", methods=["GET"])
def get_task(id):
    try:
        task = query_db("SELECT * FROM tasks WHERE id = ?", [id], one=True)
        if task is None:
            return jsonify({"meta": {"status": 400, "message": "task does not exist"}})
        name = task["name"]
        description = task["description"]
    except Exception as e:
        return jsonify({"meta": {"status": 500, "message": str(e)}})
    return jsonify(
        {"data": {"description": description, "name": name}, "meta": {"status": 200}}
    )


@app.route("/api/tasks/get", methods=["GET"])
def get_all_tasks():
    try:
        tasks = []
        for task in query_db("SELECT * FROM tasks"):
            tasks.append(
                {
                    "id": task["id"],
                    "name": task["name"],
                    "description": task["description"],
                }
            )
    except Exception as e:
        return jsonify({"meta": {"status": 500, "message": str(e)}})
    return jsonify({"meta": {"status": 200}, "data": tasks})


@app.route("/api/tasks/delete/<int:id>", methods=["DELETE"])
def delete_task(id):
    try:
        _ = change_db("DELETE FROM tasks WHERE id = ?", [id])
    except Exception as e:
        return jsonify({"meta": {"status": 500, "message": str(e)}})
    return jsonify({"meta": {"status": 200}})


@app.route("/api/tasks/update/<int:id>", methods=["PUT"])
def update_task(id):
    try:
        # get updated data
        data = request.get_json()
        new_name = data["name"]
        new_desc = data["description"]
        _ = change_db(
            "UPDATE tasks SET name = ?, description = ? WHERE id = ?",
            [new_name, new_desc, id],
        )
    except Exception as e:
        return jsonify({"meta": {"status": 500, "message": str(e)}})
    return jsonify({"meta": {"status": 200}})


if __name__ == "__main__":
    app.run(debug=True)
