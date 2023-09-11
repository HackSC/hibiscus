from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client
import os

app = Flask(__name__)

CORS(app)

client = create_client(
    supabase_url=os.getenv("SUPABASE_URL"),
    supabase_key=os.getenv("SUPABASE_SERVICE_KEY"),
)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/leaderboard")
def leaderboard():
    page_number = int(
        request.args.get("page_num") if request.args.get("page_num") is not None else 0
    )
    page_size = int(
        request.args.get("page_size")
        if request.args.get("page_size") is not None
        else 10
    )
    res = (
        client.table("leaderboard")
        .select("user_profiles(user_id,first_name,last_name),event_points,bonus_points")
        .execute()
    )
    lst = [*res.data]
    for i in range(len(lst)):
        el = lst[i]
        lst[i] = {
            "id": el["user_profiles"]["user_id"],
            "name": el["user_profiles"]["first_name"]
            + " "
            + el["user_profiles"]["last_name"],
            "points": el["event_points"] + el["bonus_points"],
        }
    lst.sort(key=lambda x: -x["points"])
    lst = lst[page_number * page_size : (page_number + 1) * page_size]
    return jsonify({"data": lst})
