from flask import Flask, request, jsonify, make_response
import json
import os
from sqlalchemy import exc
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "database.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(100))
    completed = db.Column(db.Boolean)

    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    # def toJson(self):
    # return {"id": id, "name": name, "description": description}
    # return dict((col, getattr(self, str(col))) for col in self.__table__.columns)


@app.route("/")
def home():
    return "<h1>Hi</h1>"


@app.route("/api/todo/add", methods=["POST"])
def create_todo():
    try:
        data = request.get_json()
        name = data["name"]
        description = data["description"]
        new_todo = Todo(name=name, description=description, completed=False)
        db.session.add(new_todo)
        db.session.commit()
        return jsonify(
            meta={"message": "Success", "status": 200}, data=new_todo.to_dict()
        )
    except:
        return jsonify(meta={"message": "Success", "status": 400}, data=None)


@app.route("/api/todo/delete/<int:id>", methods=["POST"])
def delete_todo(id):
    try:
        todo = Todo.query.filter_by(id=id).first()
        db.session.delete(todo)
        db.session.commit()
        return jsonify(meta={"message": "Success", "status": 200}, data=todo.to_dict())
    except:
        return jsonify(meta={"message": "Success", "status": 400}, data=None)


@app.route("/api/todo/list", methods=["GET"])
def list_todos():
    try:
        todos = db.session.execute(db.select(Todo).order_by(Todo.id)).scalars()
        return jsonify(
            meta={"message": "Success", "status": 200},
            data=[t.to_dict() for t in todos],
        )
    except:
        return jsonify(meta={"message": "Failure", "status": 400}, data=None)


@app.route("/api/todo/update/<int:id>", methods=["POST"])
def update_todo(id):
    try:
        todo = Todo.query.filter_by(id=id).first()
        data = request.get_json()
        if "name" in data:
            todo.name = data["name"]
        if "description" in data:
            todo.description = data["description"]
        if "completed" in data:
            todo.completed = data["completed"]

        db.session.commit()

        return jsonify(meta={"message": "Success", "status": 200}, data=todo.to_dict())
    except:
        return jsonify(meta={"message": "Failure", "status": 400}, data=None)


if __name__ == "__main__":
    app.run(debug=True)
