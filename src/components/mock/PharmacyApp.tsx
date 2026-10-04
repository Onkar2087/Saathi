"use client";

import { Glow, Tap, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  title: { en: "MediCare", hi: "मेडीकेयर" },
  search: { en: "Search medicines", hi: "दवाई खोजें" },
  upload: { en: "Upload prescription", hi: "पर्चा भेजें" },
  categories: { en: "Shop by category", hi: "श्रेणी से खरीदें" },
  add: { en: "Add", hi: "जोड़ें" },
  cart: { en: "Your cart", hi: "आपकी कार्ट" },
  qty: { en: "Quantity", hi: "मात्रा" },
  strip: { en: "1 strip of 15 tablets", hi: "15 गोलियों की 1 पत्ती" },
  total: { en: "Total", hi: "कुल" },
  delivery: { en: "Delivery: free", hi: "डिलीवरी: मुफ़्त" },
  cont: { en: "Continue", hi: "आगे बढ़ें" },
  howPay: { en: "How do you want to pay?", hi: "भुगतान कैसे करना है?" },
  cod: { en: "Cash on delivery", hi: "घर पर नकद भुगतान" },
  codSub: { en: "Pay when the medicine reaches you", hi: "दवाई पहुँचने पर पैसे दें" },
  upi: { en: "Pay now with UPI", hi: "अभी UPI से भुगतान" },
  place: { en: "Place order", hi: "ऑर्डर करें" },
  placed: { en: "Order placed!", hi: "ऑर्डर हो गया!" },
  arrives: { en: "Arrives tomorrow, 10 AM – 1 PM", hi: "कल सुबह 10 से दोपहर 1 बजे तक आएगा" },
  check: {
    en: "When it arrives, check the medicine name and expiry date on the box.",
    hi: "जब आए, तो डिब्बे पर दवाई का नाम और एक्सपायरी तारीख देखें।",
  },
  done: { en: "Done", hi: "हो गया" },
};

const medicines = [
  { id: "add-paracetamol", name: "Paracetamol 500 mg", maker: "Cipla", price: 30 },
  { id: "add-paracetamol-650", name: "Paracetamol 650 mg", maker: "Micro Labs", price: 34 },
  { id: "add-crocin", name: "Crocin Advance 500 mg", maker: "GSK", price: 32 },
];

export function PharmacyApp({ screen, highlight, onTap, fields, setField, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);
  const header = (back: boolean) => (
    <header className="flex items-center gap-3 bg-emerald-700 px-3 py-4 text-white">
      {back && (
        <Tap id="back" highlight={highlight} onTap={onTap} label="Back" className="rounded-full p-1 text-3xl leading-none">
          ←
        </Tap>
      )}
      <span className="text-2xl font-bold">💊 {L.title[lang]}</span>
    </header>
  );

  if (screen === "med-home") {
    const cats = [
      { id: "cat-diabetes", icon: "🩸", label: { en: "Diabetes", hi: "शुगर" } },
      { id: "cat-heart", icon: "❤️", label: { en: "Heart & BP", hi: "दिल और BP" } },
      { id: "cat-pain", icon: "🤕", label: { en: "Pain relief", hi: "दर्द की दवा" } },
      { id: "cat-vitamins", icon: "🍊", label: { en: "Vitamins", hi: "विटामिन" } },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(false)}
        <div className="p-4">
          <Tap
            id="search"
            highlight={highlight}
            onTap={onTap}
            className="flex w-full items-center gap-3 rounded-2xl bg-white px-5 py-4 text-left text-xl text-slate-500 shadow-sm"
          >
            🔍 {L.search[lang]}
          </Tap>
        </div>
        <div className="px-4">
          <Tap id="upload" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-emerald-50 py-3 text-lg font-semibold text-emerald-800">
            📄 {L.upload[lang]}
          </Tap>
        </div>
        <p className="px-4 pb-2 pt-4 text-lg font-bold text-slate-800">{L.categories[lang]}</p>
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {cats.map((c) => (
            <Tap key={c.id} id={c.id} highlight={highlight} onTap={onTap} className="rounded-2xl bg-white p-3 text-lg font-semibold text-slate-800 shadow-sm">
              {c.icon} {c.label[lang]}
            </Tap>
          ))}
        </div>
      </div>
    );
  }

  if (screen === "med-results") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(true)}
        <p className="mx-4 my-3 rounded-2xl bg-slate-100 px-5 py-3 text-xl text-slate-800">🔍 Paracetamol</p>
        <ul>
          {medicines.map((m) => (
            <li key={m.id} className="flex items-center gap-3 border-b border-slate-100 px-4 py-4">
              <span className="text-3xl">💊</span>
              <span className="flex-1">
                <span className="block text-xl font-semibold text-slate-900">{m.name}</span>
                <span className="block text-base text-slate-500">
                  {m.maker} · ₹{m.price}
                </span>
              </span>
              <Tap id={m.id} highlight={highlight} onTap={onTap} className="rounded-xl bg-emerald-600 px-4 py-2 text-lg font-bold text-white">
                {L.add[lang]}
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "med-cart") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <p className="px-4 pt-4 text-xl font-bold text-slate-900">{L.cart[lang]}</p>
        <div className="m-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xl font-semibold">💊 Paracetamol 500 mg</p>
          <p className="text-base text-slate-500">{L.strip[lang]}</p>
          <p className="mt-2 text-lg">
            {L.qty[lang]}: <b>1</b> · ₹30
          </p>
        </div>
        <div className="mx-4 rounded-2xl bg-white p-4 text-lg shadow-sm">
          <p className="text-slate-600">{L.delivery[lang]}</p>
          <p className="text-2xl font-bold">
            {L.total[lang]}: ₹30
          </p>
        </div>
        <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="checkout" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-emerald-700 py-4 text-2xl font-bold text-white">
            {L.cont[lang]}
          </Tap>
        </div>
      </div>
    );
  }

  if (screen === "med-pay") {
    const options = [
      { id: "cod", icon: "💵", label: L.cod, sub: L.codSub },
      { id: "upi", icon: "📱", label: L.upi, sub: null },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <p className="px-4 pb-2 pt-4 text-xl font-bold text-slate-900">{L.howPay[lang]}</p>
        <Glow id="pay" highlight={highlight} className="mx-3 rounded-2xl">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setField("pay", o.id)}
              className={`mb-2 flex w-full items-center gap-4 rounded-2xl border-2 bg-white px-4 py-4 text-left ${
                fields.pay === o.id ? "border-emerald-700" : "border-slate-200"
              }`}
            >
              <span className="text-4xl">{o.icon}</span>
              <span className="flex-1">
                <span className="block text-xl font-semibold text-slate-900">{o.label[lang]}</span>
                {o.sub && <span className="block text-base text-slate-500">{o.sub[lang]}</span>}
              </span>
              <span className={`h-6 w-6 rounded-full border-2 ${fields.pay === o.id ? "border-emerald-700 bg-emerald-700" : "border-slate-400"}`} />
            </button>
          ))}
        </Glow>
        <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="place-order" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-emerald-700 py-4 text-2xl font-bold text-white">
            {L.place[lang]} · ₹30
          </Tap>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex min-h-full flex-col bg-emerald-600 text-center text-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-5">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-5xl text-emerald-600">✓</span>
        <p className="text-3xl font-bold">{L.placed[lang]}</p>
        <p className="text-xl">{L.arrives[lang]}</p>
        <p className="rounded-2xl bg-white/15 p-3 text-lg">📦 {L.check[lang]}</p>
      </div>
      <div className="sticky bottom-0 bg-emerald-600 p-3">
        <Tap id="done-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-white py-4 text-2xl font-bold text-emerald-700">
          {L.done[lang]}
        </Tap>
      </div>
    </div>
  );
}
