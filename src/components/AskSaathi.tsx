"use client";

import { useEffect, useRef, useState } from "react";
import { t, ui, type Lang } from "@/lib/i18n";
import { speak, stopSpeaking, voiceStatus } from "@/lib/speech";

type Props = {
  lang: Lang;
  userId: string;
  lessonId?: string;
  stepIndex?: number;
  onClose: () => void;
  onAsked?: () => void;
};

type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
  stop: () => void;
};

export function AskSaathi({ lang, userId, lessonId, stepIndex, onClose, onAsked }: Props) {
  const [typed, setTyped] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"idle" | "listening" | "thinking">("idle");
  const [micError, setMicError] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const recognition = useRef<Recognition | null>(null);

  useEffect(() => () => stopSpeaking(), []);

  async function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    setQuestion(q);
    setAnswer("");
    setTyped("");
    setState("thinking");
    onAsked?.();
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, lang, userId, lessonId, stepIndex }),
      });
      const { answer } = (await res.json()) as { answer: string };
      setAnswer(answer);
      setState("idle");
      speak(answer, lang);
    } catch {
      setState("idle");
      setAnswer(t(ui.wrongTap, lang));
    }
  }

  async function startListening() {
    stopSpeaking();
    setMicError(false);
    if (await voiceStatus()) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks: Blob[] = [];
        const rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => chunks.push(e.data);
        rec.onstop = async () => {
          stream.getTracks().forEach((tr) => tr.stop());
          setState("thinking");
          const form = new FormData();
          form.append("audio", new Blob(chunks, { type: rec.mimeType }));
          const res = await fetch("/api/voice/stt", { method: "POST", body: form }).catch(() => null);
          const text = res?.ok ? ((await res.json()) as { text: string }).text : "";
          if (text) ask(text);
          else {
            setState("idle");
            setMicError(true);
          }
        };
        recorder.current = rec;
        rec.start();
        setState("listening");
        return;
      } catch {
      }
    }
    const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) {
      setMicError(true);
      return;
    }
    const r = new SR();
    r.lang = lang === "hi" ? "hi-IN" : "en-IN";
    r.interimResults = false;
    r.onresult = (e) => ask(e.results[0][0].transcript);
    r.onerror = () => setMicError(true);
    r.onend = () => setState((s) => (s === "listening" ? "idle" : s));
    recognition.current = r;
    r.start();
    setState("listening");
  }

  function stopListening() {
    if (recorder.current?.state === "recording") recorder.current.stop();
    recognition.current?.stop();
    recorder.current = null;
    recognition.current = null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" role="dialog" aria-modal="true">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">🙋 {t(ui.ask, lang)}</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 px-4 py-2 text-lg font-semibold text-slate-700">
            {t(ui.close, lang)}
          </button>
        </div>

        <p className="mb-4 text-lg text-slate-600">{t(ui.askHint, lang)}</p>

        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={state === "listening" ? stopListening : startListening}
            disabled={state === "thinking"}
            aria-label={state === "listening" ? "Stop" : "Speak"}
            className={`flex h-28 w-28 items-center justify-center rounded-full text-5xl text-white shadow-lg transition ${
              state === "listening" ? "animate-pulse bg-red-500" : "bg-teal-600 active:bg-teal-700"
            } disabled:opacity-50`}
          >
            {state === "listening" ? "■" : "🎤"}
          </button>
        </div>
        {state === "listening" && <p className="mb-3 text-center text-lg font-semibold text-red-600">{t(ui.listening, lang)}</p>}
        {micError && <p className="mb-3 text-center text-lg text-amber-700">{t(ui.micUnavailable, lang)}</p>}

        <form
          className="mb-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            ask(typed);
          }}
        >
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={t(ui.typeQuestion, lang)}
            className="min-w-0 flex-1 rounded-2xl border-2 border-slate-300 px-4 py-3 text-xl"
          />
          <button type="submit" className="rounded-2xl bg-teal-600 px-5 text-xl font-semibold text-white">
            {t(ui.send, lang)}
          </button>
        </form>

        {question && <p className="mb-2 rounded-2xl bg-slate-100 p-3 text-lg text-slate-700">“{question}”</p>}
        {state === "thinking" && <p className="animate-pulse text-xl text-teal-700">{t(ui.thinking, lang)}</p>}
        {answer && (
          <div className="rounded-2xl bg-teal-50 p-4">
            <p className="text-xl leading-relaxed text-slate-900">{answer}</p>
            <button type="button" onClick={() => speak(answer, lang)} className="mt-3 text-lg font-semibold text-teal-700">
              🔊 {t(ui.repeat, lang)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
