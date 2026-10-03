"use client";

import { Glow, Keypad, Tap, applyKey, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  title: { en: "Pay", hi: "पे" },
  scan: { en: "Scan QR", hi: "QR स्कैन करें" },
  contacts: { en: "Pay contacts", hi: "संपर्क को भेजें" },
  balance: { en: "Check balance", hi: "बैलेंस देखें" },
  history: { en: "History", hi: "पुराने भुगतान" },
  choose: { en: "Who do you want to pay?", hi: "किसे पैसे भेजने हैं?" },
  search: { en: "Search name or number", hi: "नाम या नंबर खोजें" },
  paying: { en: "Paying", hi: "भेज रहे हैं" },
  verified: { en: "✓ Name verified by bank", hi: "✓ बैंक ने नाम जाँचा है" },
  pay: { en: "Pay", hi: "भेजें" },
  enterPin: { en: "Enter UPI PIN", hi: "UPI पिन डालें" },
  pinNote: {
    en: "Only type your PIN when YOU are sending money. You never need a PIN to receive money.",
    hi: "पिन सिर्फ़ तब डालें जब आप पैसे भेज रहे हों। पैसे लेने के लिए कभी पिन नहीं लगता।",
  },
  paid: { en: "paid to", hi: "भेजे गए" },
  done: { en: "Done", hi: "हो गया" },
};

const people = [
  { id: "contact-priya", name: "Priya (Daughter)", phone: "98xxx xxx21", color: "bg-pink-500" },
  { id: "contact-ramesh", name: "Ramesh Sabziwala", phone: "97xxx xxx40", color: "bg-green-600" },
  { id: "contact-doctor", name: "Dr. Mehta Clinic", phone: "99xxx xxx88", color: "bg-sky-600" },
  { id: "contact-electric", name: "Electricity Bill", phone: "MSEDCL", color: "bg-amber-500" },
];

export function UpiApp({ screen, highlight, onTap, fields, setField, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);
  const header = (back: boolean) => (
    <header className="flex items-center gap-3 bg-indigo-700 px-3 py-4 text-white">
      {back && (
        <Tap id="back" highlight={highlight} onTap={onTap} label="Back" className="rounded-full p-1 text-3xl leading-none">
          ←
        </Tap>
      )}
      <span className="text-2xl font-bold">{L.title[lang]}</span>
    </header>
  );

  if (screen === "upi-home") {
    const tiles = [
      { id: "scan-qr", icon: "📷", label: L.scan },
      { id: "pay-contacts", icon: "👤", label: L.contacts },
      { id: "check-balance", icon: "🏦", label: L.balance },
      { id: "history", icon: "🧾", label: L.history },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(false)}
        <div className="grid grid-cols-2 gap-4 p-4">
          {tiles.map((t) => (
            <Tap
              key={t.id}
              id={t.id}
              highlight={highlight}
              onTap={onTap}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl bg-white p-3 text-center shadow-sm active:bg-slate-100"
            >
              <span className="text-5xl">{t.icon}</span>
              <span className="text-xl font-semibold text-slate-800">{t.label[lang]}</span>
            </Tap>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "upi-contacts") {
    return (
      <div ref={ref} className="flex h-full flex-col bg-white">
        {header(true)}
        <p className="px-4 pt-4 text-xl font-semibold text-slate-700">{L.choose[lang]}</p>
        <div className="mx-4 my-3 rounded-full bg-slate-100 px-5 py-3 text-lg text-slate-400">🔍 {L.search[lang]}</div>
        <ul className="flex-1 overflow-y-auto">
          {people.map((p) => (
            <li key={p.id}>
              <Tap
                id={p.id}
                highlight={highlight}
                onTap={onTap}
                className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left active:bg-slate-100"
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold text-white ${p.color}`}>
                  {p.name[0]}
                </span>
                <span>
                  <span className="block text-xl font-semibold text-slate-900">{p.name}</span>
                  <span className="block text-lg text-slate-500">{p.phone}</span>
                </span>
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "upi-amount") {
    const amount = fields.amount ?? "";
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">R</span>
          <span>
            <span className="block text-base text-slate-500">{L.paying[lang]}</span>
            <span className="block text-xl font-bold text-slate-900">Ramesh Sabziwala</span>
            <span className="block text-sm text-green-700">{L.verified[lang]}</span>
          </span>
        </div>
        {/* Amount and Pay sit above the keypad so the button never scrolls out of sight */}
        <div className="flex items-center gap-3 px-4 pb-3">
          <p className="flex-1 text-center text-4xl font-bold text-slate-900">₹{amount || "0"}</p>
          <Tap id="amount-next" highlight={highlight} onTap={onTap} className="rounded-2xl bg-indigo-700 px-6 py-3 text-2xl font-bold text-white">
            {L.pay[lang]}
          </Tap>
        </div>
        <Glow id="amount" highlight={highlight} className="mx-4 mb-4 rounded-3xl p-2">
          <Keypad onKey={(k) => setField("amount", applyKey(amount, k, 5).replace(/^0+/, ""))} />
        </Glow>
      </div>
    );
  }

  if (screen === "upi-pin") {
    const pin = fields.pin ?? "";
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <p className="pt-3 text-center text-2xl font-bold text-slate-900">{L.enterPin[lang]}</p>
        <p className="text-center text-lg text-slate-600">₹{fields.amount} → Ramesh Sabziwala</p>
        <div className="flex items-center justify-center gap-6 py-3">
          <div className="flex gap-4">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-6 w-6 rounded-full border-2 border-slate-700 ${i < pin.length ? "bg-slate-700" : ""}`} />
            ))}
          </div>
          <Tap
            id="pin-ok"
            highlight={highlight}
            onTap={onTap}
            label="Confirm PIN"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-3xl text-white"
          >
            ✓
          </Tap>
        </div>
        <Glow id="pin" highlight={highlight} className="mx-4 rounded-3xl p-2">
          <Keypad onKey={(k) => setField("pin", applyKey(pin, k, 4))} />
        </Glow>
        <p className="m-4 rounded-2xl bg-amber-100 p-3 text-base text-amber-900">⚠️ {L.pinNote[lang]}</p>
      </div>
    );
  }

  // upi-success
  return (
    <div ref={ref} className="flex min-h-full flex-col items-center justify-center gap-4 bg-green-600 p-6 text-center text-white">
      <span className="flex h-32 w-32 items-center justify-center rounded-full bg-white text-7xl text-green-600">✓</span>
      <p className="text-5xl font-bold">₹{fields.amount}</p>
      <p className="text-2xl">
        {L.paid[lang]} Ramesh Sabziwala
      </p>
      <Tap id="done-btn" highlight={highlight} onTap={onTap} className="mt-6 w-full rounded-2xl bg-white py-4 text-2xl font-bold text-green-700">
        {L.done[lang]}
      </Tap>
    </div>
  );
}
