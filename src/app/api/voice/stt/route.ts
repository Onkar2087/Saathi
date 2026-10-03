import { elevenLabsConfigured, speechToText } from "@/lib/elevenlabs";

export async function POST(req: Request) {
  if (!elevenLabsConfigured()) return new Response(null, { status: 501 });
  const form = await req.formData();
  const audio = form.get("audio");
  if (!(audio instanceof Blob) || audio.size === 0) return Response.json({ text: "" }, { status: 400 });
  if (audio.size > 10 * 1024 * 1024) return Response.json({ text: "" }, { status: 413 });
  try {
    return Response.json({ text: await speechToText(audio) });
  } catch (err) {
    console.error("[stt]", err);
    return Response.json({ text: "" }, { status: 502 });
  }
}
