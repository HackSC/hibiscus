import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from supabase import create_client, Client

load_dotenv()
url = os.getenv("HIBISCUS_LOCAL_SUPABASE_API_URL")
key = os.getenv("HIBISCUS_LOCAL_SUPABASE_ANON_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)


@app.get("/participants")
def get_participants():
    concat_set = set()
    events = request.args.getlist("events", None)
    if events != None:
        events = list(events)
        for event in events:
            event_filter = supabase.table("participants").select("*").eq("event")

    school = request.args.get("school", None)
    if school != None:
        school_filter = (
            supabase.table("participants").select("*").eq("school", school).execute()
        )
        for user in school_filter.data:
            concat_set.add(user)

    major = request.args.get("major", None)
    if major != None:
        major_filter = (
            supabase.table("participants").select("*").eq("major", major).execute()
        )
        for user in major_filter.data:
            concat_set.add(user)

    data = supabase.table("participants").select("*").execute()
    return jsonify(data.data)


@app.get("/participants/<pid>")
def get_participant(pid):
    data = supabase.table("participants").select("*").eq("id", pid).execute()
    return jsonify(data.data)


@app.post("/participants")
def add_participant():
    data = request.json
    result = supabase.table("participants").insert(data).execute()
    return jsonify(result.data)


@app.put("/participants")
def update_participant():
    data = request.json
    wristband_id = data.get("wristband_id")
    pid = data.get("id")
    data = (
        supabase.table("participants")
        .update({"wristband_id": wristband_id})
        .eq("id", pid)
        .execute()
    )
    return data.data


@app.post("/events/checkin/<event_id>")
def check_in(event_id):
    data = request.json
    pid = data.get("wristband_id")
    log = (
        supabase.table("event_log")
        .select("*")
        .eq("user_id", pid)
        .eq("event_id", event_id)
        .execute()
    )
    if len(log.data) > 0:
        return jsonify(
            {"message": "Already checked in", "code": "400", "hint": "", "details": ""}
        )

    supabase.table("event_log").insert({"user_id": pid, "event_id": event_id}).execute()

    return data.data


@app.get("/events/checkin/<event_id>")
def get_event_logs(event_id):
    logs = supabase.table("event_log").select("*").eq("event_id", event_id).execute()
    return jsonify(logs.data)
