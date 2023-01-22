import os
from supabase.client import create_client


# This is your task's entrypoint. When your task is executed, this
# function will be called.
def main(params):
    api_url = os.getenv("NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL") or ""
    service_key = os.getenv("HIBISCUS_SUPABASE_SERVICE_KEY") or ""
    client = create_client(api_url, service_key)
    res = client.table("user_profiles").select("*").execute()
    data = res.data
    return data
