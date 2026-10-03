"use client";

import { useEffect, useState } from "react";
import { t, ui } from "@/lib/i18n";
import { speak, stopSpeaking } from "@/lib/speech";
import { useAppState } from "./AppState";
import { Shell } from "./Shell";

type Result = { verdict: "safe" | "careful" | "scam"; explanation: string };

const STYLE = {
  safe: { box: "bg-green-100 text-green-900", icon: "✅", label: ui.safe },
  careful: { box: "bg-amber-100 text-amber-900", icon: "⚠️", label: ui.careful },
  scam: { box: "bg-red-100 text-red-900", icon: "🚫", label: ui.scam },
};

export function ScamChecker() {
  const { lang } = useAppState();
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  async function check() {
    if (!message.trim()) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, lang }),
      });
      const r = (await res.json()) as Result;
      setResult(r);
      speak(`${t(STYLE[r.verdict].label, lang)}. ${r.explanation}`, lang);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold text-slate-900">🔍 {t(ui.checkTitle, lang)}</h1>
        <p className="text-lg text-slate-700">{t(ui.checkHint, lang)}</p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="rounded-3xl border-2 border-slate-300 bg-white p-4 text-xl"
        />
        <button
          type="button"
          onClick={check}
          disabled={busy || !message.trim()}
          className="rounded-3xl bg-teal-600 py-5 text-2xl font-bold text-white disabled:opacity-50"
        >
          {busy ? t(ui.thinking, lang) : t(ui.checkButton, lang)}
        </button>

        {result && (
          <div className={`rounded-3xl p-5 ${STYLE[result.verdict].box}`} aria-live="polite">
            <p className="mb-2 text-2xl font-bold">
              {STYLE[result.verdict].icon} {t(STYLE[result.verdict].label, lang)}
            </p>
            <p className="text-xl leading-relaxed">{result.explanation}</p>
          </div>
        )}

        <p className="text-base text-slate-500">🔒 {t(ui.checkPrivacy, lang)}</p>
      </div>
    </Shell>
  );
}
