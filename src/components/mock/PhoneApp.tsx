"use client";

import { Tap, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  title: { en: "Phone", hi: "फ़ोन" },
  recents: { en: "Recent calls", hi: "हाल की कॉल" },
  spam: { en: "Suspected spam", hi: "संदिग्ध स्पैम" },
  missed: { en: "Missed · 10:42 AM", hi: "छूटी कॉल · सुबह 10:42" },
  incoming: { en: "Incoming · Yesterday", hi: "आई कॉल · कल" },
  outgoing: { en: "Outgoing · Monday", hi: "की गई कॉल · सोमवार" },
  unknown: { en: "Unknown number", hi: "अनजान नंबर" },
  callBack: { en: "Call back", hi: "वापस कॉल करें" },
  message: { en: "Message", hi: "मैसेज" },
  block: { en: "Block and report spam", hi: "ब्लॉक और स्पैम रिपोर्ट करें" },
  blocked: { en: "Number blocked", hi: "नंबर ब्लॉक हो गया" },
  blockedNote: { en: "This number can't call or message you any more.", hi: "यह नंबर अब आपको कॉल या मैसेज नहीं कर सकता।" },
  helpline: {
    en: "Cheated, or shared your details? Call the National Cyber Fraud Helpline at once. You can also report at cybercrime.gov.in",
    hi: "धोखा हुआ, या जानकारी दे दी? तुरंत राष्ट्रीय साइबर धोखाधड़ी हेल्पलाइन पर फ़ोन करें। आप cybercrime.gov.in पर भी शिकायत कर सकते हैं",
  },
  call1930: { en: "Call 1930", hi: "1930 पर कॉल करें" },
  helplineName: { en: "Cyber Fraud Helpline", hi: "साइबर धोखाधड़ी हेल्पलाइन" },
  calling: { en: "Calling…", hi: "कॉल हो रही है…" },
};

const SCAM_NUMBER = "+91 93xxx 40x18";

export function PhoneApp({ screen, highlight, onTap, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);
  const header = (back: boolean) => (
    <header className="flex items-center gap-3 bg-blue-700 px-3 py-4 text-white">
      {back && (
        <Tap id="back" highlight={highlight} onTap={onTap} label="Back" className="rounded-full p-1 text-3xl leading-none">
          ←
        </Tap>
      )}
      <span className="text-2xl font-bold">📞 {L.title[lang]}</span>
    </header>
  );

  if (screen === "phone-recents") {
    const calls = [
      { id: "recent-rohan", name: "Rohan", sub: L.incoming, color: "bg-sky-500" },
      { id: "recent-priya", name: "Priya", sub: L.outgoing, color: "bg-pink-500" },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(false)}
        <p className="px-4 pb-2 pt-4 text-xl font-bold text-slate-800">{L.recents[lang]}</p>
        <div className="flex items-center border-b border-slate-100">
          <Tap id="recent-scam" highlight={highlight} onTap={onTap} className="flex flex-1 items-center gap-4 px-4 py-4 text-left">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">⚠️</span>
            <span>
              <span className="block text-xl font-semibold text-red-700">{SCAM_NUMBER}</span>
              <span className="block text-base text-red-600">
                {L.spam[lang]} · {L.missed[lang]}
              </span>
            </span>
          </Tap>
          <Tap id="callback-scam" highlight={highlight} onTap={onTap} label={L.callBack[lang]} className="px-4 py-4 text-3xl">
            📞
          </Tap>
        </div>
        {calls.map((c) => (
          <div key={c.id} className="flex items-center border-b border-slate-100">
            <Tap id={c.id} highlight={highlight} onTap={onTap} className="flex flex-1 items-center gap-4 px-4 py-4 text-left">
              <span className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white ${c.color}`}>{c.name[0]}</span>
              <span>
                <span className="block text-xl font-semibold text-slate-900">{c.name}</span>
                <span className="block text-base text-slate-500">{c.sub[lang]}</span>
              </span>
            </Tap>
            <Tap id={`callback-${c.id}`} highlight={highlight} onTap={onTap} label={L.callBack[lang]} className="px-4 py-4 text-3xl">
              📞
            </Tap>
          </div>
        ))}
      </div>
    );
  }

  if (screen === "phone-detail") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">⚠️</span>
          <p className="text-2xl font-bold text-slate-900">{SCAM_NUMBER}</p>
          <p className="text-lg text-red-600">
            {L.unknown[lang]} · {L.spam[lang]}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          <Tap id="call-back" highlight={highlight} onTap={onTap} className="rounded-2xl bg-white py-4 text-lg font-semibold text-slate-700 shadow-sm">
            📞 {L.callBack[lang]}
          </Tap>
          <Tap id="message-back" highlight={highlight} onTap={onTap} className="rounded-2xl bg-white py-4 text-lg font-semibold text-slate-700 shadow-sm">
            💬 {L.message[lang]}
          </Tap>
        </div>
        <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="block-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-red-600 py-4 text-xl font-bold text-white">
            🚫 {L.block[lang]}
          </Tap>
        </div>
      </div>
    );
  }

  if (screen === "phone-blocked") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <div className="flex flex-col items-center gap-2 p-5 text-center">
          <span className="text-5xl">🚫</span>
          <p className="text-2xl font-bold text-slate-900">{L.blocked[lang]}</p>
          <p className="text-lg text-slate-600">{L.blockedNote[lang]}</p>
        </div>
        <p className="mx-4 rounded-2xl bg-amber-100 p-4 text-lg text-amber-900">🛡️ {L.helpline[lang]}</p>
        <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="call-1930" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-green-600 py-4 text-2xl font-bold text-white">
            📞 {L.call1930[lang]}
          </Tap>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex min-h-full flex-col bg-slate-800 text-white">
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <p className="text-6xl font-bold">1930</p>
        <p className="mt-2 text-2xl">{L.helplineName[lang]}</p>
        <p className="mt-1 text-xl opacity-80">{L.calling[lang]}</p>
      </div>
      <div className="sticky bottom-0 flex justify-center bg-slate-800 py-4">
        <Tap id="end-call" highlight={highlight} onTap={onTap} label="End call" className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-4xl">
          ✆
        </Tap>
      </div>
    </div>
  );
}
