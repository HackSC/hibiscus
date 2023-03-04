import os
from supabase.client import create_client
import boto3
import time

def get_hacker_apps_in_batches(hackers: list, pull_batch_size: int):
    dynamo = boto3.resource(
        "dynamodb",
        region_name="us-west-1",
        aws_access_key_id=os.getenv("HIBISCUS_AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("HIBISCUS_AWS_SECRET_ACCESS_KEY"),
    )
    for i in range(0, len(hackers), pull_batch_size):
        if i >= len(hackers):
            break
        batch = hackers[i : i + pull_batch_size]
        app_id_objects = list(map(lambda x: {"id": x["app_id"]}, batch))
        response = dynamo.batch_get_item(
            RequestItems={
                "hacker-app-responses": {
                    "Keys": app_id_objects,
                    "ConsistentRead": True,
                },
            },
            ReturnConsumedCapacity="TOTAL",
        )
        responses = response["Responses"]["hacker-app-responses"]
        for j in range(i, i + pull_batch_size):
            if j >= len(hackers):
                break
            for rep in responses:
                if rep["id"] == hackers[j]["app_id"]:
                    hackers[j]["application_json"] = rep["data"]

# This is your task's entrypoint. When your task is executed, this
# function will be called.
def main(params):
    api_url = os.getenv("NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL") or ""
    service_key = os.getenv("HIBISCUS_SUPABASE_SERVICE_KEY") or ""
    client = create_client(api_url, service_key)
    res = client.table("user_profiles").select("*").execute()
    # split the total user profiles, do them in 300s
    agg_list_batch = 300
    pull_batch_size = 80
    agg_list = []
    for i in range(0, len(res.data), agg_list_batch):
        hackers = res.data[i:i+agg_list_batch]
        hackers = list(filter(lambda x: x["app_id"] is not None, hackers))
        # pull apps data from ext source in batches of 80s
        get_hacker_apps_in_batches(hackers, pull_batch_size)
        agg_list += hackers.copy()
    with open("hackers.json", "w") as f:
        f.write(str({'data': agg_list}))
    return f"{len(agg_list)} json files modified!"
