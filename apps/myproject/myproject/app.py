from flask import Flask, jsonify
import os


app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.get("/secret")
def secret():
    return jsonify({"message": os.getenv("TEST_VARIABLE")})
