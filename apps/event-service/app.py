import os
from datetime import datetime, timedelta
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
  
@app.get("/events/<user_id>/<day>")
def get_sorted_events_by_day(user_id: str, day: int):
  day_begin = datetime(2023,2,3) + timedelta(int(day) - 1)
  day_end = day_begin + timedelta(1)
  
  # fetch pinned events
  pinned_events = get_pinned_events(user_id)
    
  # filter pinned events by day
  pinned_events = list(filter(lambda event: day_begin.isoformat('T','auto') < event["events"]["start"] < day_end.isoformat('T','auto'), pinned_events))
  
  # sort pinned events by start time
  pinned_events.sort(key = lambda x: datetime.strptime(x["events"]["start"], "%Y-%m-%dT%H:%M:%S%z"))

  # gather id of all pinned events 
  pinned_events_id = set()
  for e in pinned_events:
    pinned_events_id.add(e["events"]["id"])
  
  # fetch all events sorted by day
  all_events = get_events_by_day(day)
  
  # find all non-pinned events
  non_pinned_events = []
  for event in all_events:
    if event["id"] not in pinned_events_id:
      non_pinned_events.append(event)
    
  return pinned_events + non_pinned_events 
  
@app.get("/events/<day>")
def get_events_by_day(day: int):
  day_begin = datetime(2023,2,3) + timedelta(int(day) - 1)
  day_end = day_begin + timedelta(1)
      
  res = supabase.table("events").select("name,description,start,end,id").gt('start', day_begin.isoformat('T','auto')).lt('start', day_end.isoformat('T','auto')).order('start').execute()                   
  
  return res.data

@app.get("/events/<user_id>/pins")
def get_pinned_events(user_id: str):
    res = supabase.table("pinned_events").select(
        "events(id, name, description, start, end)").eq("user_id",
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