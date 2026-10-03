import { mastra } from "@/mastra";
import { searchHelpNotes } from "@/lib/helpNotes";
import { getLesson } from "@/lessons";
import type { Lang } from "@/lib/i18n";

type AskBody = {
  question: string;
  lang: Lang;
  userId?: string;
  lessonId?: string;
  stepIndex?: number;
  screen?: string;
};

const FALLBACK = {
  en: "I'm having a little trouble thinking right now. Nothing is broken. Try the glowing button, or ask me again in a moment.",
  hi: "मुझे अभी सोचने में थोड़ी दिक्कत हो रही है। कुछ भी खराब नहीं हुआ है। चमकते बटन को दबाइए, या थोड़ी देर बाद फिर पूछिए।",
};

export async function POST(req: Request) {
  const body = (await req.json()) as AskBody;
  const question = body.question?.trim().slice(0, 500);
  const lang: Lang = body.lang === "hi" ? "hi" : "en";
  if (!question) return Response.json({ answer: FALLBACK[lang] }, { status: 400 });

  // Ground the answer in what's on her screen right now, plus trusted help notes.
  const lesson = body.lessonId ? getLesson(body.lessonId) : undefined;
  const step = lesson && body.stepIndex != null ? lesson.steps[body.stepIndex] : undefined;
  const notes = await searchHelpNotes(question);

  const context = [
    lesson && `She is practicing the lesson "${lesson.title.en}" in the ${lesson.app === "upi" ? "UPI payment" : "WhatsApp-style chat"} app.`,
    step && `Current screen: ${step.screen}. The next thing to do is: "${step.say.en}"`,
    notes.length && `Trusted notes:\n${notes.map((n) => `- ${n}`).join("\n")}`,
    `Reply in ${lang === "hi" ? "simple Hindi (Devanagari script)" : "simple English"}.`,
  ]
    .filter(Boolean)
    .join("\n");

  const userId = body.userId || "guest";
  const agent = mastra.getAgent("saathiAgent");
  try {
    const result = await agent.generate(
      [
        { role: "system", content: context },
        { role: "user", content: question },
      ],
      {
        maxSteps: 3,
        abortSignal: AbortSignal.timeout(45_000),
        ...(agent.hasOwnMemory() ? { memory: { thread: `ask-${userId}`, resource: userId } } : {}),
      },
    );
    return Response.json({ answer: result.text.trim() || FALLBACK[lang] });
  } catch (err) {
    console.error("[ask] model call failed:", err);
    return Response.json({ answer: FALLBACK[lang], offline: true });
  }
}
