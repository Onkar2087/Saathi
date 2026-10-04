"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getLesson } from "@/lessons";
import { t, ui } from "@/lib/i18n";
import { SCRIPTED, speak, stopSpeaking } from "@/lib/speech";
import { logProgress, useAppState } from "./AppState";
import { AskSaathi } from "./AskSaathi";
import { Shell } from "./Shell";
import { CabApp } from "./mock/CabApp";
import { ChatApp } from "./mock/ChatApp";
import { PharmacyApp } from "./mock/PharmacyApp";
import { UpiApp } from "./mock/UpiApp";

const APPS = { chat: ChatApp, upi: UpiApp, cab: CabApp, pharmacy: PharmacyApp };

export function LessonPlayer({ lessonId }: { lessonId: string }) {
  const lesson = getLesson(lessonId)!;
  const { lang, userId, markCompleted } = useAppState();
  const [phase, setPhase] = useState<"intro" | "step" | "done">("intro");
  const [index, setIndex] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState(0);
  const [caption, setCaption] = useState(t(lesson.intro, lang));
  const [asking, setAsking] = useState(false);
  const stepShownAt = useRef(0);

  const step = lesson.steps[index];
  const needsUnmet =
    step?.needs &&
    (step.needs.equals != null
      ? (fields[step.needs.field] ?? "") !== step.needs.equals
      : !(fields[step.needs.field] ?? "").trim());
  const highlight = phase === "step" ? (needsUnmet ? step.needs!.field : step.target) : null;
  const App = APPS[lesson.app];
  const screen = phase === "done" ? lesson.doneScreen : step.screen;

  useEffect(() => () => stopSpeaking(), []);

  // Keep the caption in the chosen language if she switches mid-lesson.
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setCaption(phase === "intro" ? t(lesson.intro, lang) : phase === "done" ? t(ui.lessonDone, lang) : t(step.say, lang));
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  function say(text: string) {
    setCaption(text);
    speak(text, lang, SCRIPTED);
  }

  function log(action: string, step = index) {
    logProgress({ userId, lessonId, step, action, ms: Date.now() - stepShownAt.current });
  }

  function start() {
    setPhase("step");
    setIndex(0);
    setFields({});
    setWrong(0);
    stepShownAt.current = Date.now();
    log("start", 0);
    const first = t(lesson.steps[0].say, lang);
    setCaption(first);
    speak(`${t(lesson.intro, lang)} ${first}`, lang, SCRIPTED);
  }

  function onTap(id: string) {
    if (phase !== "step") return;
    if (id !== step.target) {
      const n = wrong + 1;
      setWrong(n);
      log("wrong");
      say(n >= 2 ? t(step.hint, lang) : t(ui.wrongTap, lang));
      return;
    }
    if (needsUnmet) {
      setWrong((w) => w + 1);
      log("hint");
      say(t(step.needs!.reminder, lang));
      return;
    }
    log("tap");
    setWrong(0);
    stepShownAt.current = Date.now();
    if (index + 1 < lesson.steps.length) {
      setIndex(index + 1);
      say(t(lesson.steps[index + 1].say, lang));
    } else {
      setPhase("done");
      markCompleted(lesson.id);
      log("done");
      say(`${t(ui.wellDone, lang)} ${t(ui.lessonDone, lang)}`);
    }
  }

  return (
    <Shell showHome={false} fit>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full bg-white px-4 py-2 text-lg font-semibold text-slate-700 shadow-sm">
            🏠 {t(ui.home, lang)}
          </Link>
          <h1 className="text-xl font-bold text-slate-900">
            {lesson.emoji} {t(lesson.title, lang)}
          </h1>
        </div>

        <div className="flex items-start gap-3 rounded-3xl bg-white p-3 shadow-sm" aria-live="polite">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600 text-2xl">🧡</span>
          <div className="flex-1">
            {phase === "step" && (
              <p className="text-base font-semibold text-teal-700">
                {index + 1} / {lesson.steps.length}
              </p>
            )}
            <p className="text-lg leading-snug text-slate-900">{caption}</p>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2rem] border-8 border-slate-800 bg-white shadow-xl">
          <div className="absolute inset-0 overflow-y-auto">
            <App
              screen={screen}
              highlight={highlight}
              onTap={onTap}
              fields={fields}
              setField={(k, v) => setFields((f) => ({ ...f, [k]: v }))}
              lang={lang}
            />
          </div>

          {phase === "intro" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-white/90 p-6 text-center">
              <span className="text-7xl">{lesson.emoji}</span>
              <button type="button" onClick={start} className="saathi-glow rounded-3xl bg-teal-600 px-10 py-5 text-3xl font-bold text-white">
                ▶ {lang === "hi" ? "शुरू करें" : "Start"}
              </button>
            </div>
          )}

          {phase === "done" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-white/95 p-6 text-center">
              <span className="text-7xl">🎉</span>
              <p className="text-3xl font-bold text-teal-700">{t(ui.wellDone, lang)}</p>
              <button type="button" onClick={start} className="w-full rounded-3xl bg-teal-600 py-4 text-2xl font-bold text-white">
                ↺ {t(ui.againButton, lang)}
              </button>
              <Link href="/" className="w-full rounded-3xl bg-slate-100 py-4 text-2xl font-bold text-slate-700">
                🏠 {t(ui.home, lang)}
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={() => speak(caption, lang, SCRIPTED)} className="rounded-2xl bg-white py-3 text-lg font-semibold text-slate-800 shadow-sm">
            🔊<br />
            {t(ui.repeat, lang)}
          </button>
          <button type="button" onClick={() => setAsking(true)} className="rounded-2xl bg-teal-600 py-3 text-lg font-semibold text-white shadow-sm">
            🙋<br />
            {t(ui.ask, lang)}
          </button>
          <button type="button" onClick={start} className="rounded-2xl bg-white py-3 text-lg font-semibold text-slate-800 shadow-sm">
            ↺<br />
            {t(ui.startOver, lang)}
          </button>
        </div>
      </div>

      {asking && (
        <AskSaathi
          lang={lang}
          userId={userId}
          lessonId={lesson.id}
          stepIndex={phase === "step" ? index : undefined}
          onAsked={() => log("ask")}
          onClose={() => setAsking(false)}
        />
      )}
    </Shell>
  );
}
