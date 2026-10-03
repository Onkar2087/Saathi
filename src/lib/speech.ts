"use client";

import type { Lang } from "./i18n";
import { textKey } from "./textKey";

let manifest: Set<string> | null = null;
let elevenLabs: boolean | null = null;
let current: HTMLAudioElement | null = null;
const liveCache = new Map<string, string>();

async function loadManifest() {
  if (manifest) return manifest;
  try {
    const res = await fetch("/audio/manifest.json");
    manifest = new Set(res.ok ? ((await res.json()) as string[]) : []);
  } catch {
    manifest = new Set();
  }
  return manifest;
}

export async function voiceStatus() {
  if (elevenLabs === null) {
    try {
      elevenLabs = ((await (await fetch("/api/voice/status")).json()) as { elevenlabs: boolean }).elevenlabs;
    } catch {
      elevenLabs = false;
    }
  }
  return elevenLabs;
}

export function stopSpeaking() {
  current?.pause();
  current = null;
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

function browserSpeak(text: string, lang: Lang) {
  return new Promise<void>((resolve) => {
    const synth = window.speechSynthesis;
    if (!synth) return resolve();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === "hi" ? "hi-IN" : "en-IN";
    u.rate = 0.85;
    u.onend = u.onerror = () => resolve();
    synth.speak(u);
  });
}

function play(src: string) {
  return new Promise<void>((resolve, reject) => {
    const audio = new Audio(src);
    current = audio;
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error("audio failed"));
    audio.play().catch(reject);
  });
}

/**
 * Speak a sentence: pre-generated ElevenLabs narration first (no live API call, no user data),
 * then live ElevenLabs, then the browser's own voice.
 */
export async function speak(text: string, lang: Lang) {
  stopSpeaking();
  const key = textKey(text);
  try {
    if ((await loadManifest()).has(key)) return await play(`/audio/${key}.mp3`);
    if (await voiceStatus()) {
      let url = liveCache.get(key);
      if (!url) {
        const res = await fetch("/api/voice/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(`tts ${res.status}`);
        url = URL.createObjectURL(await res.blob());
        liveCache.set(key, url);
      }
      return await play(url);
    }
  } catch {
    // fall through to the browser voice
  }
  return browserSpeak(text, lang);
}
