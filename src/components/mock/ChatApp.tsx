"use client";

import { useEffect, useState } from "react";
import { Glow, Tap, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  chats: { en: "Chats", hi: "चैट" },
  online: { en: "online", hi: "ऑनलाइन" },
  typeHere: { en: "Type a message", hi: "मैसेज लिखें" },
  incoming: { en: "Dadi, how are you? 😊", hi: "दादी, आप कैसी हो? 😊" },
  reply: { en: "Yay! Dadi sent a message! ❤️", hi: "वाह! दादी ने मैसेज भेजा! ❤️" },
  calling: { en: "Video call", hi: "वीडियो कॉल" },
};

const contacts = [
  { id: "chat-rohan", name: "Rohan", note: { en: "Grandson", hi: "पोता" }, last: { en: "See you Sunday!", hi: "रविवार को मिलते हैं!" }, color: "bg-sky-500", time: "10:24" },
  { id: "chat-priya", name: "Priya", note: { en: "Daughter", hi: "बेटी" }, last: { en: "Did you eat lunch?", hi: "खाना खाया?" }, color: "bg-pink-500", time: "09:02" },
  { id: "chat-family", name: "Family Group", note: { en: "", hi: "" }, last: { en: "Photo", hi: "फ़ोटो" }, color: "bg-amber-500", time: "Yesterday" },
  { id: "chat-sharma", name: "Sharma Ji", note: { en: "Neighbour", hi: "पड़ोसी" }, last: { en: "Good morning 🙏", hi: "सुप्रभात 🙏" }, color: "bg-emerald-600", time: "Mon" },
];

export function ChatApp({ screen, highlight, onTap, fields, setField, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);

  if (screen === "chats") {
    return (
      <div ref={ref} className="flex h-full flex-col bg-white">
        <header className="bg-[#0b6b5d] px-4 py-4 text-2xl font-bold text-white">{L.chats[lang]}</header>
        <ul className="flex-1 overflow-y-auto">
          {contacts.map((c) => (
            <li key={c.id}>
              <Tap
                id={c.id}
                highlight={highlight}
                onTap={onTap}
                className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left active:bg-slate-100"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-white ${c.color}`}>
                  {c.name[0]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xl font-semibold text-slate-900">
                    {c.name} {c.note[lang] && <span className="text-base font-normal text-slate-500">({c.note[lang]})</span>}
                  </span>
                  <span className="block truncate text-lg text-slate-500">{c.last[lang]}</span>
                </span>
                <span className="text-sm text-slate-400">{c.time}</span>
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "call") return <CallScreen highlight={highlight} onTap={onTap} lang={lang} />;

  // "chat" and "chat-sent"
  const sent = screen === "chat-sent";
  return (
    <div ref={ref} className="flex h-full flex-col bg-[#efe7dd]">
      <header className="flex items-center gap-2 bg-[#0b6b5d] px-2 py-3 text-white">
        <Tap id="back" highlight={highlight} onTap={onTap} label="Back" className="rounded-full p-2 text-3xl leading-none">
          ←
        </Tap>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-xl font-bold">R</span>
        <span className="flex-1">
          <span className="block text-xl font-semibold">Rohan</span>
          <span className="block text-sm opacity-80">{L.online[lang]}</span>
        </span>
        <Tap id="video-btn" highlight={highlight} onTap={onTap} label="Video call" className="rounded-full p-2 text-3xl leading-none">
          📹
        </Tap>
        <Tap id="call-btn" highlight={highlight} onTap={onTap} label="Voice call" className="rounded-full p-2 text-3xl leading-none">
          📞
        </Tap>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        <p className="max-w-[80%] self-start rounded-2xl rounded-tl-none bg-white px-4 py-3 text-xl shadow-sm">{L.incoming[lang]}</p>
        {sent && (
          <>
            <p className="max-w-[80%] self-end rounded-2xl rounded-tr-none bg-[#d9fdd3] px-4 py-3 text-xl shadow-sm">
              {fields.message}
              <span className="ml-2 align-bottom text-base text-sky-500">✓✓</span>
            </p>
            <p className="max-w-[80%] self-start rounded-2xl rounded-tl-none bg-white px-4 py-3 text-xl shadow-sm">{L.reply[lang]}</p>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 p-3">
        <Glow id="message" highlight={highlight} className="flex-1 rounded-full">
          <input
            value={sent ? "" : fields.message ?? ""}
            onChange={(e) => setField("message", e.target.value)}
            disabled={sent}
            placeholder={L.typeHere[lang]}
            className="w-full rounded-full bg-white px-5 py-4 text-xl outline-none"
          />
        </Glow>
        <Tap
          id="send"
          highlight={highlight}
          onTap={onTap}
          label="Send"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1fa855] text-3xl text-white"
        >
          ➤
        </Tap>
      </div>
    </div>
  );
}

function CallScreen({ highlight, onTap, lang }: Pick<MockProps, "highlight" | "onTap" | "lang">) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex h-full flex-col items-center justify-between bg-slate-800 py-10 text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-sky-500 text-7xl font-bold">R</div>
        <p className="text-3xl font-semibold">Rohan</p>
        <p className="mt-1 text-xl opacity-80">
          {L.calling[lang]} · {mm}:{ss}
        </p>
      </div>
      <div className="flex items-center gap-8">
        <Tap id="mute" highlight={highlight} onTap={onTap} label="Mute" className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-600 text-3xl">
          🎤
        </Tap>
        <Tap id="end-call" highlight={highlight} onTap={onTap} label="End call" className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-4xl">
          ✆
        </Tap>
        <Tap id="flip" highlight={highlight} onTap={onTap} label="Switch camera" className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-600 text-3xl">
          🔄
        </Tap>
      </div>
    </div>
  );
}
