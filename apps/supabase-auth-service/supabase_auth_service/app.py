from flask import Flask, jsonify, request
from supabase import create_client
from gotrue.errors import (
    AuthRetryableError,
    AuthApiError,
    AuthUnknownError,
    AuthInvalidCredentialsError,
)
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


@app.route("/v1/auth/sign_up", methods=["POST"])
def sign_up():
    try:
        data = request.get_json()
        res = supabase.auth.sign_up(
            {"email": data.get("email"), "password": data.get("password")}
        )
        return jsonify({"data": {"user_id": res.user.id}, "meta": {"status": 200}})
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/verify", methods=["POST"])
def verify():
    try:
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
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/sign_in", methods=["POST"])
def sign_in():
    try:
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
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/refresh_access_token", methods=["POST"])
def refresh_session():
    try:
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
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        supabase.auth.reset_password_email(
            data.get("email")
        )  # doesn't return anything, so just pray i guess 🤷‍♂️
        return jsonify({"data": None, "meta": {"status": 200}})
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/sign_out", methods=["POST"])
def sign_out():
    try:
        supabase.auth.sign_out()
        return jsonify({"data": None, "meta": {"status": 200}})
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400


@app.route("/v1/auth/users/<string:user_id>/metadata", methods=["GET"])
def get_user(user_id):
    try:
        # Add check to see if user is admin
        # if user.isadmin:
        res = supabase.auth.admin.get_user_by_id(user_id)
        filtered_dict = {k: v for k, v in res.user.dict().items() if k != "identities"}
        return jsonify({"data": filtered_dict, "meta": {"status": 200}})
    except AuthRetryableError as are:
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
    except AuthApiError as ape:
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
    except AuthInvalidCredentialsError as aice:
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
    except AuthUnknownError as aue:  # 520 = server returned unknown error
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
    except Exception as e:
        return jsonify({"data": None, "meta": {"status": 400, "message": str(e)}}), 400
