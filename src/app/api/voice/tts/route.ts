import { elevenLabsConfigured, textToSpeech } from "@/lib/elevenlabs";

export async function POST(req: Request) {
  // 501 tells the browser to fall back to its built-in voice.
  if (!elevenLabsConfigured()) return new Response(null, { status: 501 });
  const { text } = (await req.json()) as { text: string };
  if (!text?.trim()) return new Response(null, { status: 400 });
  try {
    const audio = await textToSpeech(text.slice(0, 1000));
    return new Response(audio, { headers: { "Content-Type": "audio/mpeg" } });
  } catch (err) {
    console.error("[tts]", err);
    return new Response(null, { status: 502 });
  }
}
