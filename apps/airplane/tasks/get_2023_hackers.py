import os
from supabase.client import create_client
import boto3
import time


# This is your task's entrypoint. When your task is executed, this
# function will be called.
def main(params):
    api_url = os.getenv("NEXT_PUBLIC_HIBISCUS_SUPABASE_API_URL") or ""
    service_key = os.getenv("HIBISCUS_SUPABASE_SERVICE_KEY") or ""
    client = create_client(api_url, service_key)
    dynamo = boto3.resource(
        "dynamodb",
        region_name="us-west-1",
        aws_access_key_id=os.getenv("HIBISCUS_AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("HIBISCUS_AWS_SECRET_ACCESS_KEY"),
    )
    res = client.table("user_profiles").select("*").execute()
    hackers = res.data[:500]
    hackers = list(filter(lambda x: x["app_id"] is not None, hackers))
    # get resume data in batches of 10
    batch_size = 80
    for i in range(0, len(hackers), batch_size):
        if i >= len(hackers):
            break
        batch = hackers[i : i + batch_size]
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
        for j in range(i, i + batch_size):
            if j >= len(hackers):
                break
            for rep in responses:
                if rep["id"] == hackers[j]["app_id"]:
                    hackers[j]["application_json"] = rep["data"]
        time.sleep(1)
    with open("hackers.txt", "w") as f:
        f.write(str(hackers))
    return f"{len(hackers)} json files modified!"
