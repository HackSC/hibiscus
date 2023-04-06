from flask import Flask, request
from flask_restful import Resource
from config import db, init_db
from models import TaskModel
from flask_marshmallow import Marshmallow
from flask_restful import Api

app = Flask(__name__)
init_db(app)
ma = Marshmallow(app)
api = Api(app)


@app.before_first_request
def create_table():
    db.create_all()
    if db.session.query(TaskModel).count() < 2:
        task1 = TaskModel("Do laundry", "Take clothes out of washer")
        task2 = TaskModel("Make dinner", "Make chicken parm recipe for dinner tonight")
        db.session.add(task1)
        db.session.commit()
        db.session.add(task2)
        db.session.commit()


class TaskSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description")
        model = TaskModel


task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)


class TaskListResource(Resource):
    def get(self):
        tasks = TaskModel.query.all()
        return tasks_schema.dump(tasks)

    def post(self):
        new_task = TaskModel(
            name=request.json["name"], description=request.json["description"]
        )
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task)


api.add_resource(TaskListResource, "/tasks")


class TaskResource(Resource):
    def put(self, task_id):
        task = TaskModel.query.get_or_404(task_id)

        if "name" in request.json:
            task.name = request.json["name"]
        if "description" in request.json:
            task.name = request.json["description"]

        db.session.commit()
        return task_schema.dump(task)

    def delete(self, task_id):
        task = TaskModel.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
        return "", 204


api.add_resource(TaskResource, "/tasks/<int:task_id>")

if __name__ == "__main__":
    app.run(debug=True)
