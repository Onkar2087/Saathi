import { elevenLabsConfigured } from "@/lib/elevenlabs";

export async function GET() {
  return Response.json({ elevenlabs: elevenLabsConfigured() });
}
