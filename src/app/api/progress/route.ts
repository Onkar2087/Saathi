import { getDb } from "@/lib/db";

type ProgressEvent = {
  userId: string;
  lessonId: string;
  step: number;
  action: "start" | "tap" | "wrong" | "hint" | "ask" | "done";
  ms?: number;
};

const ACTIONS = new Set(["start", "tap", "wrong", "hint", "ask", "done"]);

export async function POST(req: Request) {
  const e = (await req.json()) as ProgressEvent;
  if (!e.userId || !e.lessonId || !ACTIONS.has(e.action)) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const db = await getDb();
  if (!db) return Response.json({ ok: true, stored: false });
  await db.collection("progress_events").insertOne({
    userId: String(e.userId).slice(0, 64),
    lessonId: String(e.lessonId).slice(0, 64),
    step: Number(e.step) || 0,
    action: e.action,
    ms: Number(e.ms) || 0,
    ts: new Date(),
  });
  return Response.json({ ok: true, stored: true });
}
