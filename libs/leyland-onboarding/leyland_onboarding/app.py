import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from pymongo import MongoClient

# Load environment variables
load_dotenv()

# Set up Flask app
app = Flask(__name__)

# Set up MongoDB client
mongo_client = MongoClient(
    os.getenv(
        "mongodb+srv://leylandyang:korea4091@cluster0.ozpltjj.mongodb.net/?retryWrites=true&w=majority"
    )
)
db = mongo_client["hackscononboarding"]
tasks = db["todolist"]


# GET all tasks
@app.route("/tasks", methods=["GET"])
def get_all_tasks():
    all_tasks = list(tasks.find({}))
    response = {"meta": {"status": 200}, "data": all_tasks}
    return jsonify(response), 200


# POST a task
@app.route("/tasks", methods=["POST"])
def post_task():
    task_data = request.get_json()
    name = task_data.get("name")
    description = task_data.get("description")

    if name and description:
        new_task = {"name": name, "description": description}
        tasks.insert_one(new_task)
        response = {
            "meta": {"status": 201, "message": "Task created successfully"},
            "data": new_task,
        }
        return jsonify(response), 201
    else:
        response = {
            "meta": {
                "status": 400,
                "message": "Both name and description are required",
            },
        }
        return jsonify(response), 400


# PUT a task
@app.route("/tasks/<task_id>", methods=["PUT"])
def put_task(task_id):
    task_data = request.get_json()
    name = task_data.get("name")
    description = task_data.get("description")

    if name or description:
        update_data = {}
        if name:
            update_data["name"] = name
        if description:
            update_data["description"] = description

        tasks.update_one({"_id": task_id}, {"$set": update_data})
        response = {
            "meta": {"status": 200, "message": "Task updated successfully"},
            "data": {"_id": task_id, **update_data},
        }
        return jsonify(response), 200
    else:
        response = {
            "meta": {
                "status": 400,
                "message": "At least name or description is required",
            },
        }
        return jsonify(response), 400


# DELETE a task
@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    tasks.delete_one({"_id": task_id})
    response = {
        "meta": {"status": 200, "message": "Task deleted successfully"},
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)
