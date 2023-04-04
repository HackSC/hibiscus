from flask import Flask, jsonify
from flask import Flask, jsonify, request
from supabase import create_client
import os

app = Flask(__name__)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase = create_client(url, key)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.route("/auth/v1/sign_up", methods=["POST"])
def sign_up():
    data = request.get_json()
    session = supabase.auth.sign_up(
        {"email": data["email"], "password": data["password"]}
    )
    return jsonify({"data": {"user_id": session.user.id}, "meta": {"status": 200}})
