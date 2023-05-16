from flask import Flask, jsonify
from repository import repository

app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/test")
def test():
    success = repository.add_vertical()
    return jsonify({"success": success})
