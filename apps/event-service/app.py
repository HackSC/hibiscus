import os
from flask import Flask
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

app = Flask(__name__)

supabase_api_url = os.getenv("NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL")
supabase_service_key = os.getenv("HIBISCUS_SUPABASE_SERVICE_KEY")
supabase = create_client(supabase_api_url, supabase_service_key)

@app.get("/events")
def get_events():
    pass

@app.get("/events/<user_id>/pins")
def get_pinned_events(user_id: str):
    pass

@app.put("/events/<user_id>/pin")
def pin_event(user_id: str):
    pass

@app.delete("/events/<user_id>/pin")
def remove_pin(user_id: str):
    pass

# feat: when event gets pinned and it's near, then it should notify the user via DM