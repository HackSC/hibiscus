from flask import Flask, jsonify, request
import sqlite3 as sl


app = Flask(__name__)
conn = sl.connect("tasks.db")
curs = conn.cursor()

stmt_create_db = (
    "CREATE TABLE IF NOT EXISTS tasks('taskName' type UNIQUE, 'description');"
)
conn.execute(stmt_create_db)

initial_credentials = [
    ("laundry", "wash, dry, and fold clothes"),
    ("buy groceries", "kale, feta, tomato"),
]
stmt_initial_cred = (
    "INSERT OR IGNORE INTO tasks (`taskName`, `description`) VALUES (?, ?);"
)
conn.executemany(stmt_initial_cred, initial_credentials)
conn.commit()
conn.close()


def tasks() -> list:
    # connects DB
    conn = sl.connect("tasks.db")
    curs = conn.cursor()
    # gets all data in table
    curs.execute("SELECT * FROM userfoods;")
    data = curs.fetchall()
    return data


@app.route("/tasks", methods=["POST", "GET"])
def task(name: str, desc: str):
    try:
        if request.method == "POST":
            # connects db
            conn = sl.connect("tasks.db")
            # instantiates new user
            new_task = (name, desc)
            stmt_add_user = "INSERT OR IGNORE INTO credentials('taskName', 'description') VALUES (?, ?)"
            # adds user to food DB and credentials DB
            conn.execute(stmt_add_user, new_task)
            conn.commit()
            conn.close()
        return jsonify(meta={"message": "Success", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/tasks/description", methods=["PUT"])
def description(name: str, new_desc: str):
    try:
        conn = sl.connect("tasks.db")
        stmt_new_desc = "UPDATE tasks SET description = ? WHERE taskName = ?"
        conn.execute(stmt_new_desc, (new_desc, name))
        conn.commit()
        conn.close()
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/tasks/name", methods=["PUT"])
def name(old_name: str, new_name: str):
    try:
        conn = sl.connect("tasks.db")
        stmt_new_name = "UPDATE tasks SET taskName = ? WHERE taskName = ?"
        conn.execute(stmt_new_name, (new_name, old_name))
        conn.commit()
        conn.close()
        return jsonify(meta={"message": "Success", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/tasks/delete", methods=["DELETE"])
def delete(task_name: str):
    try:
        conn = sl.connect("tasks.db")
        curs = conn.cursor()
        stmt_delete = "DELETE FROM credentials WHERE taskName = ?"
        curs.execute(stmt_delete, (task_name,))
        conn.commit()
        conn.close()
        return jsonify(meta={"message": "Success!", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


if __name__ == "__main__":
    app.run(debug=True)
