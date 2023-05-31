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
        events = repository.get_events(name=request.args.get("name"))
        return jsonify({"page": 1, "events": events})
    except Exception as e:
        return jsonify({"error": f"Failed to get events: {e}"}), 400


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
