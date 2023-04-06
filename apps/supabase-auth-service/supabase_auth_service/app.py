from flask import Flask, jsonify, request
from supabase import create_client
import os

app = Flask(__name__)

url = os.getenv("SUPABASE_URL")
# key = os.getenv("SUPABASE_KEY")
key = os.getenv(
    "SUPABASE_SECRET_KEY"
)  # need secret key to bypass RLS and use admin functions like get_user(id)
supabase = create_client(url, key)


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.route("/auth/v1/sign_up", methods=["POST"])
def sign_up():
    try:
        data = request.get_json()
        res = supabase.auth.sign_up(
            {"email": data["email"], "password": data["password"]}
        )
        return jsonify({"data": {"user_id": res.user.id}, "meta": {"status": 200}})
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/verify", methods=["POST"])
def verify():
    try:
        data = request.get_json()
        res = supabase.auth.verify_otp(
            {"email": data["email"], "token": data["token"], "type": "signup"}
        )
        return jsonify(
            {
                "data": {
                    "access_token": res.session.access_token,
                    "refresh_token": res.session.refresh_token,
                },
                "meta": {"status": 200},
            }
        )
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/sign_in", methods=["POST"])
def sign_in():
    try:
        data = request.get_json()
        res = supabase.auth.sign_in_with_password(
            {"email": data["email"], "password": data["password"]}
        )
        return jsonify(
            {
                "data": {
                    "access_token": res.session.access_token,
                    "refresh_token": res.session.refresh_token,
                },
                "meta": {"status": 200},
            }
        )
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/refresh_access_token", methods=["POST"])
def refresh_session():
    try:
        data = request.get_json()
        res = supabase.auth._refresh_access_token(data["refresh_token"])
        return jsonify(
            {
                "data": {
                    "access_token": res.session.access_token,
                    "refresh_token": res.session.refresh_token,
                },
                "meta": {"status": 200},
            }
        )
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        supabase.auth.reset_password_email(
            data["email"]
        )  # doesn't return anything, so just pray i guess 🤷‍♂️
        return jsonify({"data": None, "meta": {"status": 200}})
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/sign_out", methods=["POST"])
def sign_out():
    try:
        supabase.auth.sign_out()
        return jsonify({"data": None, "meta": {"status": 200}})
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})


@app.route("/auth/v1/users/<string:user_id>/metadata", methods=["GET"])
def get_user(user_id):
    try:
        # Add check to see if user is admin
        # if user.isadmin:
        res = supabase.auth.admin.get_user_by_id(user_id)
        filtered_dict = {
            k: v for k, v in res.user.__dict__.items() if k != "identities"
        }
        return jsonify({"data": filtered_dict, "meta": {"status": 200}})
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}})
