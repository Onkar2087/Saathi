"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { scamCards, scamIntro as INTRO } from "@/lessons/scams";
import { t, ui } from "@/lib/i18n";
import { SCRIPTED, speak, stopSpeaking } from "@/lib/speech";
import { logProgress, useAppState } from "./AppState";
import { Shell } from "./Shell";

export function ScamQuiz() {
  const { lang, userId, markCompleted } = useAppState();
  const [index, setIndex] = useState(-1);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const shownAt = useRef(0);

  useEffect(() => () => stopSpeaking(), []);

  const card = scamCards[index];
  const finished = index >= scamCards.length;

  function show(i: number, prefix = "") {
    setIndex(i);
    setAnswer(null);
    shownAt.current = Date.now();
    if (i < scamCards.length) speak(`${prefix} ${scamCards[i].body[lang]}`.trim(), lang, SCRIPTED);
    else {
      markCompleted("spot-scam");
      logProgress({ userId, lessonId: "spot-scam", step: i, action: "done" });
    }
  }

  function choose(saysScam: boolean) {
    if (answer !== null) return;
    const right = saysScam === card.isScam;
    setAnswer(saysScam);
    if (right) setScore((s) => s + 1);
    logProgress({ userId, lessonId: "spot-scam", step: index, action: right ? "tap" : "wrong", ms: Date.now() - shownAt.current });
    speak(`${right ? t(ui.correct, lang) : t(ui.notQuite, lang)} ${t(card.why, lang)}`, lang, SCRIPTED);
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold text-slate-900">🛡️ {lang === "hi" ? "धोखा पहचानें" : "Spot the scam"}</h1>

        {index === -1 && (
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-white p-6 text-center shadow-sm">
            <p className="text-xl leading-snug text-slate-800">{t(INTRO, lang)}</p>
            <button
              type="button"
              onClick={() => show(0, t(INTRO, lang))}
              className="saathi-glow rounded-3xl bg-teal-600 px-10 py-5 text-3xl font-bold text-white"
            >
              ▶ {lang === "hi" ? "शुरू करें" : "Start"}
            </button>
          </div>
        )}

        {card && (
          <>
            <p className="text-base font-semibold text-teal-700">
              {index + 1} / {scamCards.length}
            </p>
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="mb-2 text-base font-semibold text-slate-500">✉️ {card.from}</p>
              <p className="text-xl leading-relaxed text-slate-900">{card.body[lang]}</p>
            </div>

            {answer === null ? (
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => choose(false)} className="rounded-3xl bg-green-600 py-6 text-2xl font-bold text-white">
                  ✅ {t(ui.safeBtn, lang)}
                </button>
                <button type="button" onClick={() => choose(true)} className="rounded-3xl bg-red-600 py-6 text-2xl font-bold text-white">
                  🚫 {t(ui.scamBtn, lang)}
                </button>
              </div>
            ) : (
              <div className={`rounded-3xl p-5 ${answer === card.isScam ? "bg-green-100" : "bg-amber-100"}`}>
                <p className="mb-2 text-2xl font-bold">{answer === card.isScam ? `🎉 ${t(ui.correct, lang)}` : `🙂 ${t(ui.notQuite, lang)}`}</p>
                <p className="text-xl leading-relaxed text-slate-900">{t(card.why, lang)}</p>
                <button type="button" onClick={() => show(index + 1)} className="mt-4 w-full rounded-2xl bg-teal-600 py-4 text-2xl font-bold text-white">
                  {t(ui.next, lang)} →
                </button>
              </div>
            )}
          </>
        )}

        {finished && (
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-6 text-center shadow-sm">
            <span className="text-7xl">🛡️</span>
            <p className="text-2xl font-bold text-slate-900">
              {t(ui.score, lang)} {score} / {scamCards.length}
            </p>
            <p className="text-xl text-slate-700">{t(ui.lessonDone, lang)}</p>
            <button type="button" onClick={() => { setScore(0); show(0); }} className="w-full rounded-3xl bg-teal-600 py-4 text-2xl font-bold text-white">
              ↺ {t(ui.againButton, lang)}
            </button>
            <Link href="/" className="w-full rounded-3xl bg-slate-100 py-4 text-2xl font-bold text-slate-700">
              🏠 {t(ui.home, lang)}
            </Link>
          </div>
        )}
      </div>
    </Shell>
  );
}
