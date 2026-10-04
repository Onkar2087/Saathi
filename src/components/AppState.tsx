"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Lang } from "@/lib/i18n";

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  userId: string;
  completed: string[];
  markCompleted: (lessonId: string) => void;
};

const Ctx = createContext<AppState | null>(null);

const listeners = new Set<() => void>();
const memory = new Map<string, string>();

function read(key: string) {
  try {
    return localStorage.getItem(key) ?? memory.get(key) ?? null;
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string) {
  memory.set(key, value);
  try {
    localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
  listeners.forEach((notify) => notify());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function savedLang(): Lang {
  return read("saathi.lang") === "hi" ? "hi" : "en";
}

function savedUserId() {
  let id = read("saathi.user");
  if (!id) {
    id = crypto.randomUUID();
    write("saathi.user", id);
  }
  return id;
}

function savedCompleted() {
  return read("saathi.completed") ?? "[]";
}

function parseList(raw: string): string[] {
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, savedLang, () => "en" as Lang);
  const userId = useSyncExternalStore(subscribe, savedUserId, () => "guest");
  const completedRaw = useSyncExternalStore(subscribe, savedCompleted, () => "[]");
  const completed = useMemo(() => parseList(completedRaw), [completedRaw]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => write("saathi.lang", l), []);

  const markCompleted = useCallback((lessonId: string) => {
    const current = parseList(savedCompleted());
    if (!current.includes(lessonId)) write("saathi.completed", JSON.stringify([...current, lessonId]));
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
