from flask import Flask, jsonify
import os
from number_module.lib import is_odd


app = Flask(__name__)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE", "is_odd": is_odd(4)})


@app.get("/secret")
def secret():
    return jsonify({"message": os.getenv("TEST_VARIABLE")})
