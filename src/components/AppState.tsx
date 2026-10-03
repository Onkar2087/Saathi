"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  userId: string;
  completed: string[];
  markCompleted: (lessonId: string) => void;
};

const Ctx = createContext<AppState | null>(null);

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // private mode etc. — preferences just won't persist
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [userId, setUserId] = useState("guest");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    // Restore saved preferences after hydration (localStorage isn't available on the server).
    /* eslint-disable react-hooks/set-state-in-effect */
    const savedLang = read("saathi.lang");
    if (savedLang === "en" || savedLang === "hi") setLangState(savedLang);
    let id = read("saathi.user");
    if (!id) {
      id = crypto.randomUUID();
      write("saathi.user", id);
    }
    setUserId(id);
    try {
      setCompleted(JSON.parse(read("saathi.completed") || "[]"));
    } catch {
      setCompleted([]);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write("saathi.lang", l);
  }, []);

  const markCompleted = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      if (prev.includes(lessonId)) return prev;
      const next = [...prev, lessonId];
      write("saathi.completed", JSON.stringify(next));
      return next;
    });
  }, []);

  return <Ctx.Provider value={{ lang, setLang, userId, completed, markCompleted }}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be inside AppStateProvider");
  return ctx;
}

export function logProgress(e: { userId: string; lessonId: string; step: number; action: string; ms?: number }) {
  fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(e),
    keepalive: true,
  }).catch(() => {});
}
