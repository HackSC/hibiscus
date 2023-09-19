from chalice import Chalice, BadRequestError
from dateutil.parser import isoparse
from chalicelib.repository import repository
import dataclasses


# class CustomJSONProvider(DefaultJSONProvider):
#     def default(self, o):
#         if isinstance(o, datetime.date) or isinstance(o, datetime.datetime):
#             return o.isoformat()
#         return super().default(o)


app = Chalice(app_name="event-service")
app.api.cors = True


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

        return dataclasses.asdict(event)
    except Exception as e:
        raise BadRequestError(f"Failed to get requested event: {e}")


@app.route("/events")
def get_events():
    body = app.current_request.json_body

    date = body.get("date")
    if date is not None:
        date = isoparse(date)

    after = body.get("after")
    if after is not None:
        after = isoparse(after)

    page = body.get("page", type=int)
    if page is None:
        page = 1

    page_size = body.get("pageSize", type=int)
    if page_size is None:
        page_size = 20

    events = repository.get_events(
        page=page,
        page_size=page_size,
        date=date,
        after=after,
        name=body.get("name"),
        location=body.get("location"),
    )
    return {"page": page, "events": [dataclasses.asdict(event) for event in events]}


@app.route("/events/pinned-events/{user_id}")
def get_pinned_events(user_id: str):
    # try:
    events = repository.get_pinned_events(user_id)
    return {"pinnedEvents": [dataclasses.asdict(event) for event in events]}


@app.route("/events/pinned-events/{user_id}", methods=["POST"])
def add_pinned_event(user_id: str):
    body = app.current_request.json_body

    # try:
    repository.add_pinned_event(user_id, body.get("pin_event"))
    return {"pinned_event": body.get("pin_event")}


@app.route("/events/pinned-events/{user_id}", methods=["DELETE"])
def remove_pinned_event(user_id: str):
    body = app.current_request.json_body

    # try:
    repository.remove_pinned_event(user_id, body.get("unpin_event"))
    return {"unpinned_event": body.get("unpin_event")}


# Admin endpoints
# @app.post("/events")
# def add_event():
#     body = request.json

#     try:
#         # Convert dict to object
#         contact_info = body.pop("contactInfo", None)
#         event = data_types.EventAdmin(
#             eventId=None,
#             **body,
#             contactInfo=[data_types.Contact(**x) for x in contact_info],
#         )

#         event_id = repository.add_event(event)
#         event.eventId = event_id
#         return jsonify(event), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to add event: {e}"}), 400


# @app.put("/events/<int:event_id>")
# def update_event(event_id: int):
#     body = request.json

#     try:
#         new_event = repository.update_event(
#             event_id,
#             name=body.get("eventName"),
#             description=body.get("description"),
#             start_time=body.get("startTime"),
#             end_time=body.get("endTime"),
#             location=body.get("location"),
#             bp_points=body.get("bpPoints"),
#             capacity=body.get("capacity"),
#             organizer_details=body.get("organizerDetails"),
#             event_tags=body.get("eventTags"),
#             industry_tags=body.get("industryTags"),
#         )
#         return jsonify(new_event), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to update event: {e}"}), 400


# @app.post("/events/<int:event_id>/event-tags")
# def add_event_tag(event_id: int):
#     body = request.json

#     try:
#         repository.add_event_tag(event_id, body.get("eventTag"))
#         return jsonify({"eventTag": body.get("eventTag")}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to add tag: {e}"}), 400


# @app.delete("/events/<int:event_id>/event-tags")
# def remove_event_tag(event_id: int):
#     body = request.json

#     try:
#         repository.remove_event_tag(event_id, body.get("eventTag"))
#         return jsonify({"eventTag": body.get("eventTag")}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to remove tag: {e}"}), 400


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


# @app.get("/events/<int:event_id>/pinned")
# def get_rsvps(event_id: int):
#     try:
#         rsvps = repository.get_rsvp_users(
#             event_id,
#             page=request.args.get("page"),
#             page_size=request.args.get("pageSize"),
#         )

#         return jsonify({"page": request.args.get("page"), "participants": rsvps}), 200
#     except Exception as e:
#         return jsonify({"error": f"Failed to get RSVPs: {e}"}), 400
