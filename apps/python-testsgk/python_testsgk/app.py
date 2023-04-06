from flask import Flask, jsonify, request
import sqlite3 as sl


app = Flask(__name__)
conn = sl.connect("tasks.db")
curs = conn.cursor()

stmtCreateDB = (
    "CREATE TABLE IF NOT EXISTS tasks('taskName' type UNIQUE, 'description');"
)
conn.execute(stmtCreateDB)

initialCredentials = [
    ("laundry", "wash, dry, and fold clothes"),
    ("buy groceries", "kale, feta, tomato"),
]
stmtInitialCred = (
    "INSERT OR IGNORE INTO tasks (`taskName`, `description`) VALUES (?, ?);"
)
conn.executemany(stmtInitialCred, initialCredentials)
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


@app.route("/tasks", methods=["GET"])
def tasksList():
    try:
        return jsonify(meta={"message": "Success", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/addTask", methods=["POST"])
def addTask(name: str, desc: str):
    try:
        # connects db
        conn = sl.connect("tasks.db")
        curs = conn.cursor()
        # instantiates new user
        newTask = (name, desc)
        stmtAddUser = (
            "INSERT OR IGNORE INTO credentials('taskName', 'description') VALUES (?, ?)"
        )
        # adds user to food DB and credentials DB
        conn.execute(stmtAddUser, newTask)
        conn.commit()
        conn.close()
        return jsonify(meta={"message": "Success", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/editDescription", methods=["POST"])
def editDesc(name: str, newDesc: str):
    try:
        conn = sl.connect("tasks.db")
        stmtNewDesc = "UPDATE tasks SET description = ? WHERE taskName = ?"
        conn.execute(stmtNewDesc, (newDesc, name))
        conn.commit()
        conn.close()
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/editName", methods=["POST"])
def editName(oldName: str, newName: str):
    try:
        conn = sl.connect("tasks.db")
        stmtNewName = "UPDATE tasks SET taskName = ? WHERE taskName = ?"
        conn.execute(stmtNewName, (newName, oldName))
        conn.commit()
        conn.close()
        return jsonify(meta={"message": "Success", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(err)}})


@app.route("/delete", methods=["POST"])
def delete(taskName: str):
    try:
        conn = sl.connect("tasks.db")
        curs = conn.cursor()
        stmtDelete = "DELETE FROM credentials WHERE taskName = ?"
        curs.execute(stmtDelete, (taskName,))
        conn.commit()
        conn.close()
        return jsonify(meta={"message": "Success!", "status": 200}, data=tasks())
    except Exception as err:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


if __name__ == "__main__":
    app.run(debug=True)
