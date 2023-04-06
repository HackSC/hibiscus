from flask import Flask, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
db.init_app(app)
ma = Marshmallow(app)


class Meta:
    def __init__(self, status, message=None) -> None:
        status = status
        message = message


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)


class TaskSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Task

    id = ma.auto_field()
    name = ma.auto_field()
    description = ma.auto_field()


with app.app_context():
    db.create_all()

"""
GET ALL
POST name and desc
PUT name, desc, or both
DELETE
{
	meta: {
		message?: string, // any message if error or on any action
		status: number // your http status code e.g 200, 400, etc...
	},
	data?: any // your response data in any JSON format 
}
"""


@app.route("/", methods=["GET"])
def tasks_page():
    task_schema = TaskSchema(many=True)
    tasks = db.session.execute(db.select(Task)).scalars()
    return_data = task_schema.dump(tasks)
    return {"meta": {"message": "OK", "status": 200}, "data": return_data}


@app.route("/add", methods=["POST"])
def add_task():
    task_schema = TaskSchema()
    data = eval(request.data)
    new_task = Task(name=data["name"], description=data["description"])
    db.session.add(new_task)
    db.session.commit()
    return_data = task_schema.dump(new_task)
    return {"meta": {"message": "OK", "status": 201}, "data": return_data}


@app.route("/<int:id>", methods=["DELETE", "PUT"])
def specific_task_api(id):
    task_schema = TaskSchema()
    if request.method == "DELETE":
        try:
            deleted_task = db.one_or_404(db.select(Task).filter_by(id=id))
            db.session.delete(deleted_task)
            db.session.commit()
        except BaseException as e:
            return {"meta": {"message": str(e), "status": 404}}
        # successful
        return_data = task_schema.dump(deleted_task)
        return {"meta": {"message": "OK", "status": 201}, "data": return_data}
    else:
        data = eval(request.data)
        try:
            updated_task = db.one_or_404(db.select(Task).filter_by(id=id))
            if data.get("name"):
                updated_task.name = data["name"]
            if data.get("description"):
                updated_task.description = data["description"]

            db.session.add(updated_task)
            db.session.commit()
        except BaseException as e:
            return {"meta": {"message": str(e), "status": 404}}
        # successful
        return_data = task_schema.dump(updated_task)
        return {"meta": {"message": "OK", "status": 201}, "data": return_data}
