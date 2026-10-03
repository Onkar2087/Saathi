"use client";

import Link from "next/link";
import { t, ui, LANGS } from "@/lib/i18n";
import { useAppState } from "./AppState";

/** The always-visible frame: a calm "practice mode" banner and a way home. */
export function Shell({
  children,
  showHome = true,
  fit = false,
}: {
  children: React.ReactNode;
  showHome?: boolean;
  /** Lock to the screen height so the help buttons never scroll away */
  fit?: boolean;
}) {
  const { lang, setLang } = useAppState();
  return (
    <div className={`mx-auto flex w-full max-w-md flex-col bg-amber-50 ${fit ? "h-dvh" : "min-h-dvh"}`}>
      <div className="flex items-center gap-2 bg-green-700 px-4 py-2 text-white">
        <span className="flex-1 text-base font-semibold">🟢 {t(ui.practiceBanner, lang)}</span>
        {LANGS.filter((l) => l.id !== lang).map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            className="rounded-full bg-white/20 px-3 py-1 text-base font-semibold"
          >
            {l.label}
          </button>
        ))}
      </div>
      {showHome && (
        <Link href="/" className="mx-4 mt-3 self-start rounded-full bg-white px-4 py-2 text-lg font-semibold text-slate-700 shadow-sm">
          🏠 {t(ui.home, lang)}
        </Link>
      )}
      {children}
    </div>
  );
}
