import os
from flask import Flask, jsonify
from dotenv import load_dotenv, find_dotenv
from supabase import create_client

load_dotenv()
find_dotenv()

app = Flask(__name__)

supabase_api_url = os.getenv("NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL")
supabase_service_key = os.getenv("HIBISCUS_SUPABASE_SERVICE_KEY")
supabase = create_client(supabase_api_url, supabase_service_key)


# TODO: configure CORs
def get_user_pin_event(user_id: str, event_id: int):
    res = supabase.table("pinned_events").select("id").eq(
        "user_id", user_id).eq("event_id", event_id).execute()
    return res


@app.get("/events")
def get_events():
    res = supabase.table("events").select(
        "name,description,start,end,id").execute()
    return res.data


@app.get("/events/<user_id>/pins")
def get_pinned_events(user_id: str):
    res = supabase.table("pinned_events").select(
        "events(name, description, start, end)").eq("user_id",
                                                    user_id).execute()
    return res.data


@app.post("/events/<user_id>/pins/<event_id>")
def pin_event(user_id: str, event_id: int):
    # current exist pin
    existing_record = get_user_pin_event(user_id, event_id)
    print(existing_record)
    if len(existing_record.data) > 0:
        return jsonify({"error": "Event already pinned for user!"}), 400
    res = supabase.table("pinned_events").insert({
        "user_id": user_id,
        "event_id": event_id
    }).execute()
    return res.data


@app.delete("/events/<user_id>/pins/<event_id>")
def remove_pin(user_id: str, event_id: int):
    res = supabase.table("pinned_events").delete().eq("user_id", user_id).eq(
        "event_id", event_id).execute()
    return res.data


# feat: when event gets pinned and it's near, then it should notify the user via DM