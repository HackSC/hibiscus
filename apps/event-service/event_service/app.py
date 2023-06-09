from flask import Flask, jsonify, request
from flask.json.provider import DefaultJSONProvider
from flask_cors import CORS
import datetime
from repository import repository
import data_types


class CustomJSONProvider(DefaultJSONProvider):
    def default(self, o):
        if isinstance(o, datetime.date) or isinstance(o, datetime.datetime):
            return o.isoformat()
        return super().default(o)


app = Flask(__name__)
app.json = CustomJSONProvider(app)

CORS(app)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/events/<int:event_id>")
def get_event(event_id: int):
    # TODO: Check auth role
    is_admin = True

    try:
        if is_admin:
            event = repository.get_event_admin(event_id)
        else:
            event = repository.get_event(event_id)

        return jsonify(event), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get requested event: {e}"}), 400


@app.get("/events")
def get_events():
    try:
        date = request.args.get("date")
        if date is not None:
            date = datetime.datetime.fromisoformat(date)

        after = request.args.get("after")
        if after is not None:
            after = datetime.datetime.fromisoformat(after)

        events = repository.get_events(
            page=request.args.get("page"),
            page_size=request.args.get("pageSize"),
            date=date,
            after=after,
            name=request.args.get("name"),
            location=request.args.get("location"),
        )
        return jsonify({"page": 1, "events": events}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get events: {e}"}), 400


@app.get("/events/<user_id>/pinned-events")
def get_pinned_events(user_id: str):
    try:
        events = repository.get_pinned_events(user_id)
        return jsonify({"pinnedEvents": events}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get pinned events: {e}"}), 400


@app.post("/events/<user_id>/pinned-events")
def add_pinned_event(user_id: str):
    body = request.json

    try:
        repository.add_pinned_event(user_id, body.get("pin_event"))
        return jsonify({"pinned_event": body.get("pin_event")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to pin event: {e}"}), 400


@app.delete("/events/<user_id>/pinned-events")
def remove_pinned_event(user_id: str):
    body = request.json

    try:
        repository.remove_pinned_event(user_id, body.get("unpin_event"))
        return jsonify({"unpinned_event": body.get("unpin_event")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to unpin event: {e}"}), 400


# Admin endpoints
@app.post("/events")
def add_event():
    body = request.json

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
        return jsonify(event), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add event: {e}"}), 400


@app.put("/events/<int:event_id>")
def update_event(event_id: int):
    body = request.json

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
        )
        return jsonify(new_event), 200
    except Exception as e:
        return jsonify({"error": f"Failed to update event: {e}"}), 400


@app.post("/events/<int:event_id>/event-tags")
def add_event_tag(event_id: int):
    body = request.json

    try:
        repository.add_event_tag(event_id, body.get("eventTag"))
        return jsonify({"eventTag": body.get("eventTag")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add tag: {e}"}), 400


@app.delete("/events/<int:event_id>/event-tags")
def remove_event_tag(event_id: int):
    body = request.json

    try:
        repository.remove_event_tag(event_id, body.get("eventTag"))
        return jsonify({"eventTag": body.get("eventTag")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to remove tag: {e}"}), 400


@app.post("/events/<int:event_id>/industry-tags")
def add_industry_tag(event_id: int):
    body = request.json

    try:
        repository.add_industry_tag(event_id, body.get("industryTag"))
        return jsonify({"industryTag": body.get("industryTag")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add tag: {e}"}), 400


@app.delete("/events/<int:event_id>/industry-tags")
def remove_industry_tag(event_id: int):
    body = request.json

    try:
        repository.remove_industry_tag(event_id, body.get("industryTag"))
        return jsonify({"industryTag": body.get("industryTag")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to remove tag: {e}"}), 400


@app.post("/events/<int:event_id>/contacts")
def add_contact(event_id: int):
    body = request.json

    try:
        contact_id = repository.add_contact(event_id, **body)
        return jsonify({"contactId": contact_id}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to add contact: {e}"}), 400


@app.delete("/events/<int:event_id>/contacts")
def remove_contact(event_id: int):
    body = request.json

    try:
        repository.remove_contact(body.get("contactId"))
        return jsonify({"contactId": body.get("contactId")}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to remove contact: {e}"}), 400


@app.get("/events/<int:event_id>/pinned")
def get_rsvps(event_id: int):
    try:
        rsvps = repository.get_rsvp_users(
            event_id,
            page=request.args.get("page"),
            page_size=request.args.get("pageSize"),
        )

        return jsonify({"page": request.args.get("page"), "participants": rsvps}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to get RSVPs: {e}"}), 400
