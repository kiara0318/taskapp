from flask import Flask, redirect, request
import os, requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "dev")

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")  # This is backend callback URL
EXPO_REDIRECT_URI = os.getenv("EXPO_REDIRECT_URI")  # taskapp://redirect

SPOTIFY_SCOPE = "user-read-private user-read-email"

@app.route("/login")
def login():
    auth_url = (
        "https://accounts.spotify.com/authorize?"
        f"response_type=code&client_id={CLIENT_ID}"
        f"&scope={SPOTIFY_SCOPE}"
        f"&redirect_uri={REDIRECT_URI}"
    )
    return redirect(auth_url)

@app.route("/callback")
def callback():
    code = request.args.get("code")
    if not code:
        return "Error: no code returned from Spotify", 400

    token_url = "https://accounts.spotify.com/api/token"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }

    res = requests.post(token_url, data=data)
    if res.status_code != 200:
        return f"Error fetching token: {res.text}", 500

    token_json = res.json()
    access_token = token_json.get("access_token")
    refresh_token = token_json.get("refresh_token")

    # Redirect to Expo app with tokens in URL
    return redirect(
        f"{EXPO_REDIRECT_URI}?access_token={access_token}&refresh_token={refresh_token}"
    )

if __name__ == "__main__":
    app.run(debug=True)