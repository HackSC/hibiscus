from config import db


class TaskModel(db.Model):
    id = db.Column("task_id", db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    description = db.Column(db.String(255))

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f"{self.name}:{self.task_id}"
