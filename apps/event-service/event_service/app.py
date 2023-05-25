from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/events/<int:event_id>")
def get_events(event_id: int):
    return jsonify({"data": res.data, "meta": {"status": 200}})
