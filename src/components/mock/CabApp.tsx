"use client";

import { Glow, Tap, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  title: { en: "Ride", hi: "राइड" },
  whereTo: { en: "Where to?", hi: "कहाँ जाना है?" },
  you: { en: "You are here", hi: "आप यहाँ हैं" },
  pickup: { en: "Pickup: Your home", hi: "यहाँ से: आपका घर" },
  choose: { en: "Choose a ride", hi: "सवारी चुनें" },
  book: { en: "Book", hi: "बुक करें" },
  booked: { en: "Your ride is booked", hi: "आपकी सवारी बुक हो गई" },
  arriving: { en: "Arriving in 4 min", hi: "4 मिनट में आ रहा है" },
  otp: { en: "Ride OTP", hi: "सवारी OTP" },
  otpNote: {
    en: "Tell this only to the driver, after you sit in the auto.",
    hi: "यह सिर्फ़ ड्राइवर को बताएँ, ऑटो में बैठने के बाद।",
  },
  share: { en: "Share ride with family", hi: "परिवार को बताएँ" },
  cancel: { en: "Cancel ride", hi: "सवारी रद्द करें" },
};

const places = [
  { id: "dest-temple", icon: "🛕", name: { en: "Shiv Mandir", hi: "शिव मंदिर" }, sub: "2.1 km" },
  { id: "dest-hospital", icon: "🏥", name: { en: "City Hospital", hi: "सिटी हॉस्पिटल" }, sub: "3.4 km" },
  { id: "dest-station", icon: "🚉", name: { en: "Railway Station", hi: "रेलवे स्टेशन" }, sub: "6.8 km" },
  { id: "dest-market", icon: "🛒", name: { en: "Sabzi Market", hi: "सब्ज़ी मंडी" }, sub: "1.2 km" },
];

const rides = [
  { id: "auto", icon: "🛺", name: { en: "Auto", hi: "ऑटो" }, price: 80, eta: "4 min" },
  { id: "mini", icon: "🚗", name: { en: "Mini car", hi: "छोटी कार" }, price: 140, eta: "6 min" },
  { id: "sedan", icon: "🚙", name: { en: "Big car", hi: "बड़ी कार" }, price: 210, eta: "9 min" },
];

function MapBox({ lang }: { lang: MockProps["lang"] }) {
  return (
    <div className="relative h-44 shrink-0 overflow-hidden bg-[#e4efe0]">
      <div className="absolute inset-x-0 top-16 h-6 bg-white/80" />
      <div className="absolute inset-y-0 left-24 w-6 bg-white/80" />
      <div className="absolute inset-y-0 right-16 w-4 bg-white/60" />
      <div className="absolute left-[5.5rem] top-[3.4rem] flex flex-col items-center">
        <span className="rounded-full bg-white px-2 py-0.5 text-sm font-semibold text-slate-700 shadow">{L.you[lang]}</span>
        <span className="mt-1 h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow" />
      </div>
    </div>
  );
}

export function CabApp({ screen, highlight, onTap, fields, setField, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);
  const header = (back: boolean) => (
    <header className="flex items-center gap-3 bg-slate-900 px-3 py-4 text-white">
      {back && (
        <Tap id="back" highlight={highlight} onTap={onTap} label="Back" className="rounded-full p-1 text-3xl leading-none">
          ←
        </Tap>
      )}
      <span className="text-2xl font-bold">{L.title[lang]}</span>
    </header>
  );

  if (screen === "cab-home") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(false)}
        <MapBox lang={lang} />
        <div className="p-4">
          <Tap
            id="where-to"
            highlight={highlight}
            onTap={onTap}
            className="flex w-full items-center gap-3 rounded-2xl bg-slate-100 px-5 py-4 text-left text-2xl font-semibold text-slate-700"
          >
            🔍 {L.whereTo[lang]}
          </Tap>
        </div>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {places.slice(0, 2).map((p) => (
            <Tap key={p.id} id={`home-${p.id}`} highlight={highlight} onTap={onTap} className="rounded-2xl border border-slate-200 p-3 text-left text-lg">
              {p.icon} {p.name[lang]}
            </Tap>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "cab-destination") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(true)}
        <p className="px-4 pt-4 text-lg text-slate-500">{L.pickup[lang]}</p>
        <p className="mx-4 my-3 rounded-2xl bg-slate-100 px-5 py-3 text-xl text-slate-400">🔍 {L.whereTo[lang]}</p>
        <ul>
          {places.map((p) => (
            <li key={p.id}>
              <Tap
                id={p.id}
                highlight={highlight}
                onTap={onTap}
                className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left active:bg-slate-100"
              >
                <span className="text-4xl">{p.icon}</span>
                <span className="flex-1 text-xl font-semibold text-slate-900">{p.name[lang]}</span>
                <span className="text-base text-slate-500">{p.sub}</span>
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "cab-choose") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(true)}
        <p className="px-4 pt-3 text-lg text-slate-600">🏥 {places[1].name[lang]} · 3.4 km</p>
        <p className="px-4 pb-2 pt-1 text-xl font-bold text-slate-900">{L.choose[lang]}</p>
        <Glow id="ride" highlight={highlight} className="mx-3 rounded-2xl">
          {rides.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setField("ride", r.id)}
              className={`mb-2 flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-3 text-left ${
                fields.ride === r.id ? "border-slate-900 bg-slate-100" : "border-slate-200"
              }`}
            >
              <span className="text-4xl">{r.icon}</span>
              <span className="flex-1">
                <span className="block text-xl font-semibold text-slate-900">{r.name[lang]}</span>
                <span className="block text-base text-slate-500">{r.eta}</span>
              </span>
              <span className="text-2xl font-bold text-slate-900">₹{r.price}</span>
            </button>
          ))}
        </Glow>
        <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="book-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-slate-900 py-4 text-2xl font-bold text-white">
            {L.book[lang]} {fields.ride ? rides.find((r) => r.id === fields.ride)?.name[lang] : ""}
          </Tap>
        </div>
      </div>
    );
  }

  // cab-booked
  return (
    <div ref={ref} className="flex min-h-full flex-col bg-white">
      {header(false)}
      <div className="flex flex-col gap-3 p-4">
        <p className="text-2xl font-bold text-green-700">✓ {L.booked[lang]}</p>
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold">R</span>
          <span className="flex-1">
            <span className="block text-xl font-semibold">Raju · 🛺 MH12 AB 1234</span>
            <span className="block text-base text-slate-500">{L.arriving[lang]}</span>
          </span>
        </div>
        <div className="rounded-2xl bg-amber-50 p-3">
          <p className="text-base text-amber-900">{L.otp[lang]}</p>
          <p className="text-3xl font-bold tracking-[0.3em] text-slate-900">4821</p>
          <p className="text-base text-amber-900">{L.otpNote[lang]}</p>
        </div>
        <Tap id="cancel-ride" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-slate-100 py-3 text-lg font-semibold text-slate-700">
          {L.cancel[lang]}
        </Tap>
      </div>
      <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <Tap id="share-ride" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white">
          📤 {L.share[lang]}
        </Tap>
      </div>
    </div>
  );
}
