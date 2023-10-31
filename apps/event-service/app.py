from chalice import Chalice, BadRequestError, Response, ChaliceViewError
from dateutil.parser import isoparse
from chalicelib import data_types
from chalicelib.repository import repository
import requests
import os

# class CustomJSONProvider(DefaultJSONProvider):
#     def default(self, o):
#         if isinstance(o, datetime.date) or isinstance(o, datetime.datetime):
#             return o.isoformat()
#         return super().default(o)


app = Chalice(app_name="event-service")
app.api.cors = True


# middleware
@app.middleware("all")
def check_auth(event, get_response):
    auth_service_url = os.getenv("AUTH_SERVICE_URL")
    master_token = os.getenv("MASTER_TOKEN")

    headers = app.current_request.headers
    access_token = headers.get("Authorization")

    if access_token is None:
        return Response(status_code=401, body={"Error": "No access token provided"})

    if not access_token.startswith("Bearer "):
        return Response(
            status_code=401, body={"Error": "Invalid authentication token format."}
        )

    # access_token is in the format "Bearer access_token"
    # splice it
    access_token = access_token[7:]

    # Check for master API token
    if access_token == master_token:
        return get_response(event)

    api_url = f"{auth_service_url}/verify-token/"
    api_url += access_token

    response = requests.get(api_url)

    # if valid access token
    if response.status_code == 200:
        try:
            data = response.json()
            role = data["role"]

            # if user is admin, allow access
            if role == "SUPERADMIN":
                return get_response(event)

            # else user is not admin
            else:
                # if event is a normal endpoint, allow access
                normal_eps = [
                    {"path": "/events/{event_id}", "method": "GET"},
                    {"path": "/events", "method": "GET"},
                ]

                # write code that gets the path from the event
                path = event.path

                if any(
                    d.get("path") == path and d.get("method") == event.method
                    for d in normal_eps
                ):
                    return get_response(event)

                elif "{user_id}" in path:
                    # check if user is allowed to access this endpoint
                    # if yes, allow access
                    # else, disallow access
                    user_id = event.uri_params.get("user_id")
                    if user_id == data["user_id"]:
                        return get_response(event)
                    else:
                        return Response(
                            {
                                "error": "Access denied. User ID from call does not match stored user ID"
                            },
                            status_code=403,
                        )

                # else, disallow access
                else:
                    return Response(
                        {"error": "Access denied. User cannot access Admin endpoints"},
                        status_code=403,
                    )

        except ValueError:
            raise ChaliceViewError("Invalid JSON response")

    # invalid access token
    else:
        return Response(status_code=401, body={"Error": "Invalid access token"})


@app.route("/health")
def health():
    return {"status": "ALIVE"}


@app.route("/events/{event_id}")
def get_event(event_id: str):
    # TODO: Check auth role
    is_admin = False

    try:
        if is_admin:
            event = repository.get_event_admin(event_id)
        else:
            event = repository.get_event(event_id)

        return data_types.event_to_dict(event)
    except Exception as e:
        raise BadRequestError(f"Failed to get requested event: {e}")


@app.route("/events")
def get_events():
    body = app.current_request.query_params

    try:
        if body is None:
            body = {}

        date = body.get("date")
        if date is not None:
            date = isoparse(date)

        after = body.get("after")
        if after is not None:
            after = isoparse(after)

        page = body.get("page")
        if page is None:
            page = 1
        else:
            page = int(page)

        page_size = body.get("pageSize")
        if page_size is None:
            page_size = 20
        else:
            page_size = int(page_size)

        events = repository.get_events(
            page=page,
            page_size=page_size,
            date=date,
            after=after,
            name=body.get("name"),
            location=body.get("location"),
        )
        return {
            "page": page,
            "events": [data_types.event_to_dict(event) for event in events],
        }
    except Exception as e:
        raise BadRequestError(f"Failed to get events: {e}")


@app.route("/events/pinned-events/{user_id}")
def get_pinned_events(user_id: str):
    try:
        events = repository.get_pinned_events(user_id)
        return {"pinnedEvents": [data_types.event_to_dict(event) for event in events]}
    except Exception as e:
        raise BadRequestError(f"Failed to get pinned event: {e}")


@app.route("/events/pinned-events/{user_id}", methods=["POST"])
def add_pinned_event(user_id: str):
    body = app.current_request.json_body

    try:
        repository.add_pinned_event(user_id, body.get("pin_event"))
        return {"pinned_event": body.get("pin_event")}
    except Exception as e:
        raise BadRequestError(f"Failed to pin event: {e}")


@app.route("/events/pinned-events/{user_id}", methods=["DELETE"])
def remove_pinned_event(user_id: str):
    body = app.current_request.json_body

    try:
        repository.remove_pinned_event(user_id, body.get("unpin_event"))
        return {"unpinned_event": body.get("unpin_event")}
    except Exception as e:
        raise BadRequestError(f"Failed to remove pinned event: {e}")


# Admin endpoints
@app.route("/events", methods=["POST"])
def add_event():
    body = app.current_request.json_body

    try:
        # Convert dict to object
        contact_info = body.pop("contactInfo", None)
        event = data_types.EventAdmin(
            eventId=None,
            **body,
            contactInfo=[data_types.Contact(**x) for x in contact_info],
        )

        event_id = repository.add_event(event)
        event.eventId = event_id
        return data_types.event_to_dict(event)
    except Exception as e:
        raise BadRequestError(f"Failed to add event: {e}")


@app.route("/events/{event_id}", methods=["PUT"])
def update_event(event_id: str):
    body = app.current_request.json_body

    try:
        new_event = repository.update_event(
            event_id,
            name=body.get("eventName"),
            description=body.get("description"),
            start_time=body.get("startTime"),
            end_time=body.get("endTime"),
            location=body.get("location"),
            bp_points=body.get("bpPoints"),
            capacity=body.get("capacity"),
            organizer_details=body.get("organizerDetails"),
            event_tags=body.get("eventTags"),
            industry_tags=body.get("industryTags"),
        )
        return data_types.event_to_dict(new_event)
    except Exception as e:
        raise BadRequestError(f"Failed to update event: {e}")


@app.route("/events/{event_id}/event-tags", methods=["POST"])
def add_event_tag(event_id: str):
    body = app.current_request.json_body

    try:
        repository.add_event_tag(event_id, body.get("eventTag"))
        return {"eventTag": body.get("eventTag")}
    except Exception as e:
        raise BadRequestError(f"Failed to add tag: {e}")


@app.route("/events/{event_id}/event-tags", methods=["DELETE"])
def remove_event_tag(event_id: str):
    body = app.current_request.json_body

    try:
        repository.remove_event_tag(event_id, body.get("eventTag"))
        return {"eventTag": body.get("eventTag")}
    except Exception as e:
        raise BadRequestError(f"Failed to remove tag: {e}")


# @app.post("/events/<int:event_id>/industry-tags")
# def add_industry_tag(event_id: int):
#     body = request.json

#     try:
#         repository.add_industry_tag(event_id, body.get("industryTag"))
#         return jsonify({"industryTag": body.get("industryTag")}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to add tag: {e}"}), 400


# @app.delete("/events/<int:event_id>/industry-tags")
# def remove_industry_tag(event_id: int):
#     body = request.json

#     try:
#         repository.remove_industry_tag(event_id, body.get("industryTag"))
#         return jsonify({"industryTag": body.get("industryTag")}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to remove tag: {e}"}), 400


# @app.post("/events/<int:event_id>/contacts")
# def add_contact(event_id: int):
#     body = request.json

#     try:
#         contact_id = repository.add_contact(event_id, **body)
#         return jsonify({"contactId": contact_id}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to add contact: {e}"}), 400


# @app.delete("/events/<int:event_id>/contacts")
# def remove_contact(event_id: int):
#     body = request.json

#     try:
#         repository.remove_contact(body.get("contactId"))
#         return jsonify({"contactId": body.get("contactId")}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to remove contact: {e}"}), 400


@app.route("/events/{event_id}/pinned")
def get_rsvps(event_id: str):
    try:
        rsvps = repository.get_rsvp_users(event_id)

        return {"participants": rsvps}
    except Exception as e:
        raise BadRequestError(f"Failed to get RSVPs: {e}")
