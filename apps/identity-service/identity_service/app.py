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
    participant_data = (
        supabase.table("participants").select("*").eq("id", pid).execute()
    )
    events_attended = []
    log_data = supabase.table("event_logs").select("*").eq("user_id", pid).execute()
    user_data = supabase.table("user_profiles").select("*").eq("id", pid).execute()
    user_name = user_data.data["first_name"] + " " + user_data.data["last_name"]
    for d in log_data.data:
        event_data = (
            supabase.table("events").select("*").eq("id", d["user_id"]).execute()
        )
        events_attended.append(event_data.data)

    return jsonify(
        {
            "participant_id": pid,
            "name": user_name,
            "school": participant_data.data["school"],
            "major": participant_data.data["major"],
            "year": participant_data.data["graduation_year"],
            "events_attended": events_attended,
        }
    )

    return jsonify(data.data)


@app.get("/participants/logs/<log_id>")
def get_log_id(log_id):
    log = supabase.table("event_log").select("*").eq("id", log_id).execute()

    user_id = log.data["user_id"]
    event_id = log.data["event_id"]

    event = supabase.table("events").select("*").eq("id", event_id).execute()

    event_name = event.data["name"]

    user = supabase.table("user_profiles").select("*").eq("id", user_id).execute()

    user_name = user.data["first_name"] + " " + user.data["last_name"]

    return jsonify(
        {
            "pid": user_id,
            "participant-name": user_name,
            "event-id": event_id,
            "event-name": event_name,
            "check-in-time": log.data["check_in_time"],
        }
    )


@app.post("/participants")
def add_participant():
    data = request.get_json()
    result = supabase.table("participants").insert(data).execute()
    return 201, "Created", jsonify({"participant-id": data["id"]})


@app.put("/participants/<pid>/wristband")
def update_participant(pid):
    data = request.get_json()
    wristband_id = data["wid"]
    data = (
        supabase.table("participants")
        .update({"wristband_id": wristband_id})
        .eq("id", pid)
        .execute()
    )
    return (
        200,
        "OK",
        jsonify(
            {"message": f"Wristband successfully assigned to participant with ID {pid}"}
        ),
    )


@app.post("/participants/events/checkin/<event_id>")
def check_in(event_id):
    input_data = request.get_json()
    pid = input_data["participant_id"]
    checkin_time = input_data["participant_id"]

    data = (
        supabase.table("event_log")
        .insert({"user_id": pid, "event_id": event_id, "check_in_time": checkin_time})
        .execute()
    )
    log_id = data.data["id"]
    return (
        200,
        "OK",
        jsonify(
            {
                "log-id": log_id,
                "message": f"Participant with ID {pid} checked in to event with log id {log_id} at {checkin_time}",
            }
        ),
    )
