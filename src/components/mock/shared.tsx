"use client";

import { useEffect, useRef } from "react";
import type { Lang } from "@/lib/i18n";

export type MockProps = {
  screen: string;
  highlight: string | null;
  onTap: (id: string) => void;
  fields: Record<string, string>;
  setField: (key: string, value: string) => void;
  lang: Lang;
};

/** Anything she can tap. The one Saathi wants her to tap glows and scrolls into view. */
export function Tap({
  id,
  highlight,
  onTap,
  className = "",
  label,
  children,
}: {
  id: string;
  highlight: string | null;
  onTap: (id: string) => void;
  className?: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      data-id={id}
      aria-label={label}
      onClick={() => onTap(id)}
      className={`${className} ${highlight === id ? "saathi-glow" : ""}`}
    >
      {children}
    </button>
  );
}

/** Wraps a non-button area (keypad, text box) so it can glow too. */
export function Glow({
  id,
  highlight,
  className = "",
  children,
}: {
  id: string;
  highlight: string | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-id={id} className={`${className} ${highlight === id ? "saathi-glow" : ""}`}>
      {children}
    </div>
  );
}

export function useScrollToHighlight(highlight: string | null) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!highlight) return;
    ref.current
      ?.querySelector(`[data-id="${highlight}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [highlight]);
  return ref;
}

export function Keypad({ onKey }: { onKey: (key: string) => void }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((k, i) =>
        k ? (
          <button
            key={i}
            type="button"
            onClick={() => onKey(k)}
            aria-label={k === "⌫" ? "Delete" : k}
            className="h-14 rounded-2xl bg-white text-3xl font-semibold text-slate-800 shadow-sm active:bg-slate-200"
          >
            {k}
          </button>
        ) : (
          <span key={i} />
        ),
      )}
    </div>
  );
}

export function applyKey(value: string, key: string, max: number) {
  if (key === "⌫") return value.slice(0, -1);
  return value.length >= max ? value : value + key;
}
