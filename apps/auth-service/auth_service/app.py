from flask import Flask, jsonify, request
from supabase import create_client
from gotrue.errors import (
    AuthRetryableError,
    AuthApiError,
    AuthUnknownError,
    AuthInvalidCredentialsError,
)
import os
from functools import wraps

app = Flask(__name__)

url = os.getenv("SUPABASE_URL")
# key = os.getenv("SUPABASE_KEY")
key = os.getenv(
    "SUPABASE_SECRET_KEY"
)  # need secret key to bypass RLS and use admin functions like get_user(id)
supabase = create_client(url, key)

# Define roles
ROLES = ["SUPERADMIN", "TEAM_MEMBER", "SPONSOR", "VOLUNTEER", "HACKER", "APPLICANT"]


# Role Based Access Control
def roles_required(*roles):
    def wrapper(fn):
        @wraps(fn)
        def decorated_view(*args, **kwargs):
            auth_header = request.headers.get("Authorization", None)
            user_info = None
            if auth_header:
                try:
                    token = auth_header.split()[1]
                    payload = supabase.auth._decode_jwt(token)
                    user_id = payload.get("sub")
                    user_info = (
                        supabase.table("user_profiles")
                        .select("user_id, role, roles(name)")
                        .eq("user_id", user_id)
                        .single()
                        .execute()
                    )
                    user_role = user_info.data.get("roles").get("name")
                    if user_role in roles:
                        return fn(*args, **kwargs)
                except Exception as e:
                    app.logger.info("error decoding token", e)
                    pass
            return jsonify(message="Unauthorized"), 401

        return decorated_view

    return wrapper


@app.errorhandler(AuthRetryableError)
def handle_retryable_error(are: AuthRetryableError):
    return (
        jsonify(
            {
                "data": None,
                "meta": {
                    "status": are.status,
                    "message": "Something went wrong. Please try again.",
                },
            }
        ),
        are.status,
    )


@app.errorhandler(AuthApiError)
def ape_handler(ape: AuthApiError):
    return (
        jsonify(
            {
                "data": None,
                "meta": {
                    "status": ape.status,
                    "message": "Something went wrong with the API. Please try again.",
                },
            }
        ),
        ape.status,
    )


@app.errorhandler(AuthInvalidCredentialsError)
def aice_handler(aice: AuthInvalidCredentialsError):
    return (
        jsonify(
            {
                "data": None,
                "meta": {
                    "status": aice.status,
                    "message": "A phone number or email must be provided. Please try again.",
                },
            }
        ),
        aice.status,
    )


@app.errorhandler(AuthUnknownError)
def aue_handler():
    return (
        jsonify(
            {
                "data": None,
                "meta": {
                    "status": 520,
                    "message": "An unknown error occurred. Please try again.",
                },
            }
        ),
        520,
    )


@app.errorhandler(Exception)
def handler(e: Exception):
    return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.get("/health")
def health():
    return jsonify({"status": "ALIVE"})


@app.route("/v1/auth/sign_up", methods=["POST"])
def sign_up():
    data = request.get_json()
    res = supabase.auth.sign_up(
        {"email": data.get("email"), "password": data.get("password")}
    )
    return jsonify({"data": {"user_id": res.user.id}, "meta": {"status": 200}})


@app.route("/v1/auth/verify", methods=["POST"])
def verify():
    data = request.get_json()
    res = supabase.auth.verify_otp(
        {"email": data.get("email"), "token": data.get("token"), "type": "signup"}
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


@app.route("/v1/auth/sign_in", methods=["POST"])
def sign_in():
    data = request.get_json()
    res = supabase.auth.sign_in_with_password(
        {"email": data.get("email"), "password": data.get("password")}
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


@app.route("/v1/auth/refresh_access_token", methods=["POST"])
def refresh_session():
    data = request.get_json()
    res = supabase.auth._refresh_access_token(data.get("refresh_token"))
    return jsonify(
        {
            "data": {
                "access_token": res.session.access_token,
                "refresh_token": res.session.refresh_token,
            },
            "meta": {"status": 200},
        }
    )


@app.route("/v1/auth/reset_password", methods=["POST"])
def reset_password():
    data = request.get_json()
    supabase.auth.reset_password_email(
        data.get("email")
    )  # doesn't return anything, so just pray i guess 🤷‍♂️
    return jsonify({"data": None, "meta": {"status": 200}})


@app.route("/v1/auth/sign_out", methods=["POST"])
def sign_out():
    supabase.auth.sign_out()
    return jsonify({"data": None, "meta": {"status": 200}})


@app.route("/v1/auth/users/<string:user_id>/metadata", methods=["GET"])
@roles_required("TEAM_MEMBER", "SUPERADMIN")
def get_user(user_id):
    res = supabase.auth.admin.get_user_by_id(user_id)
    filtered_dict = {k: v for k, v in res.user.dict().items() if k != "identities"}
    return jsonify({"data": filtered_dict, "meta": {"status": 200}})
