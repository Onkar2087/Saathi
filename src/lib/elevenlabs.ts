const API = "https://api.elevenlabs.io/v1";

export function elevenLabsConfigured() {
  return Boolean(process.env.ELEVENLABS_API_KEY && process.env.ELEVENLABS_VOICE_ID);
}

/** Calm, slightly slower speech — easier to follow for older listeners. Returns MP3 bytes. */
export async function textToSpeech(text: string): Promise<ArrayBuffer> {
  const res = await fetch(
    `${API}/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        model_id: process.env.ELEVENLABS_TTS_MODEL || "eleven_multilingual_v2",
        voice_settings: { stability: 0.6, similarity_boost: 0.75, speed: 0.85 },
      }),
    },
  );
  if (!res.ok) throw new Error(`ElevenLabs TTS ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

export async function speechToText(audio: Blob): Promise<string> {
  const form = new FormData();
  form.append("model_id", process.env.ELEVENLABS_STT_MODEL || "scribe_v1");
  form.append("file", audio, "question.webm");
  const res = await fetch(`${API}/speech-to-text`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY! },
    body: form,
  });
  if (!res.ok) throw new Error(`ElevenLabs STT ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as { text?: string };
  return json.text?.trim() ?? "";
}
