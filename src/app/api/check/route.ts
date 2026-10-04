import { mastra } from "@/mastra";
import { scanForRedFlags } from "@/lib/scamRules";
import type { Lang } from "@/lib/i18n";

const FALLBACK = {
  safe: {
    en: "I didn't find any warning signs. If it asks for money or a code later, ask your family first.",
    hi: "मुझे कोई खतरे की निशानी नहीं मिली। अगर बाद में पैसे या कोड माँगे, तो पहले परिवार से पूछिए।",
  },
  careful: {
    en: "Some things in this message look suspicious. Don't tap any link and don't share any code. Ask your family before doing anything.",
    hi: "इस मैसेज में कुछ बातें शक वाली हैं। कोई लिंक मत दबाइए और कोई कोड मत बताइए। कुछ भी करने से पहले परिवार से पूछिए।",
  },
  scam: {
    en: "This looks like a scam. Do not reply, do not tap the link, and never share your OTP or PIN.",
    hi: "यह धोखा लगता है। जवाब मत दीजिए, लिंक मत दबाइए, और अपना OTP या पिन कभी मत बताइए।",
  },
};

export async function POST(req: Request) {
  const { message, lang: rawLang } = (await req.json()) as { message: string; lang: Lang };
  const lang: Lang = rawLang === "hi" ? "hi" : "en";
  const text = message?.trim().slice(0, 2000);
  if (!text) return Response.json({ error: "empty" }, { status: 400 });

  const { verdict, flags } = scanForRedFlags(text);
  try {
    const result = await mastra.getAgent("scamAgent").generate(
      `Message she received:\n"""${text}"""\n\nRule scanner verdict: ${verdict}. Red flags: ${flags.join(", ") || "none"}.\nReply in ${lang === "hi" ? "simple Hindi (Devanagari script)" : "simple English"}.`,
      { abortSignal: AbortSignal.timeout(45_000) },
    );
    return Response.json({ verdict, flags, explanation: result.text.trim() || FALLBACK[verdict][lang] });
  } catch (err) {
    console.error("[check] model call failed:", err);
    return Response.json({ verdict, flags, explanation: FALLBACK[verdict][lang], offline: true });
  }
}
