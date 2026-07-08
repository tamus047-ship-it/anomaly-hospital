async function generate() {
  const text = document.getElementById("text").value;
  if (!text.trim()) return;

  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/CeAjv3teQ7WvtV4vyRFm/stream",
    {
      method: "POST",
      headers: {
        "xi-api-key": "sk_afab95bb135546a0abfeaee521436151c794f4c19d58f3d1",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_multilingual_v2",
        language: "en",
        voice_settings: {
          stability: 0.05,
          similarity_boost: 0.90,
          style: 0.85,
          use_speaker_boost: true
        }
      })
    }
  );

  const audioBlob = await response.blob();
  const audioURL = URL.createObjectURL(audioBlob);

  document.getElementById("audio").src = audioURL;
  addToHistory(text, audioURL);
}

function addToHistory(text, audioURL) {
  const historyDiv = document.getElementById("history");

  const item = document.createElement("div");
  item.className = "history-item";

  item.innerHTML = `
    <div style="flex:1;">
      <strong>Text:</strong><br>${text}
    </div>
    <div>
      <audio controls src="${audioURL}"></audio>
      <br>
      <a href="${audioURL}" download="banowy_voice.wav">Download</a>
    </div>
  `;

  historyDiv.prepend(item);
}
