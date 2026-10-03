"use client";

import Link from "next/link";
import { lessons } from "@/lessons";
import { t, ui } from "@/lib/i18n";
import { useAppState } from "./AppState";
import { Shell } from "./Shell";

export function Home() {
  const { lang, completed } = useAppState();
  const tiles = [
    ...lessons.map((l) => ({ href: `/learn/${l.id}`, id: l.id, emoji: l.emoji, title: t(l.title, lang) })),
    { href: "/scams", id: "spot-scam", emoji: "🛡️", title: lang === "hi" ? "धोखा पहचानें" : "Spot the scam" },
  ];

  return (
    <Shell showHome={false}>
      <main className="flex flex-1 flex-col gap-5 p-5">
        <header>
          <h1 className="text-4xl font-bold text-teal-800">🧡 {t(ui.appName, lang)}</h1>
          <p className="mt-2 text-xl leading-snug text-slate-700">{t(ui.tagline, lang)}</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl bg-white p-3 text-center shadow-sm active:bg-slate-100"
            >
              {completed.includes(tile.id) && (
                <span className="absolute right-3 top-3 rounded-full bg-green-600 px-2 text-lg text-white" aria-label="done">
                  ✓
                </span>
              )}
              <span className="text-6xl">{tile.emoji}</span>
              <span className="text-xl font-bold text-slate-800">{tile.title}</span>
            </Link>
          ))}
        </div>

        <Link href="/check" className="flex items-center justify-center gap-3 rounded-3xl bg-teal-600 p-5 text-2xl font-bold text-white shadow-sm">
          🔍 {t(ui.checkTitle, lang)}
        </Link>
      </main>
    </Shell>
  );
}
