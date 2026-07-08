from flask import Flask, request, send_file
import requests
import tempfile

app = Flask(__name__)

ELEVEN_API_KEY = "sk_afab95bb135546a0abfeaee521436151c794f4c19d58f3d1"
VOICE_ID = "CeAjv3teQ7WvtV4vyRFm"

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    text = data.get("text", "")

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/audio"

    payload = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.05,
            "similarity_boost": 0.90,
            "style": 0.85,
            "use_speaker_boost": True
        }
    }

    headers = {
        "xi-api-key": ELEVEN_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code != 200:
        return {"error": response.status_code}, 400

    temp = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
    temp.write(response.content)
    temp.flush()

    return send_file(temp.name, mimetype="audio/wav")
