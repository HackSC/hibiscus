from flask import Flask, jsonify
from supabase import create_client
from flask_cors import CORS
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


@app.get("/events")
def get_events():
    res = (
        client.table("events")
        .select("id,name,points,start,end,location,description")
        .execute()
    )
    return jsonify({"data": res.data, "meta": {"status": 200}})
