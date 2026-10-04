"use client";

import { Glow, Keypad, Tap, applyKey, useScrollToHighlight, type MockProps } from "./shared";

const L = {
  title: { en: "Pay", hi: "पे" },
  scan: { en: "Scan QR", hi: "QR स्कैन करें" },
  contacts: { en: "Pay contacts", hi: "संपर्क को भेजें" },
  bills: { en: "Bills and recharge", hi: "बिल और रिचार्ज" },
  balance: { en: "Check balance", hi: "बैलेंस देखें" },
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
  // payment request
  requestBanner: { en: "Payment request: ₹4,999", hi: "पैसे की रिक्वेस्ट: ₹4,999" },
  requestFrom: { en: "QuickRefund Services is requesting", hi: "QuickRefund Services माँग रहा है" },
  requestNote: { en: "Note: Refund for your order", hi: "नोट: आपके ऑर्डर का रिफ़ंड" },
  approve: { en: "Pay ₹4,999", hi: "₹4,999 भुगतान करें" },
  decline: { en: "Decline", hi: "मना करें" },
  declined: { en: "Request declined", hi: "रिक्वेस्ट मना कर दी" },
  declinedNote: { en: "No money was paid.", hi: "कोई पैसा नहीं गया।" },
  // scanner
  scanHint: { en: "Point the camera at the QR code", hi: "कैमरा QR कोड की ओर करें" },
  // bills
  billTypes: { en: "What do you want to pay?", hi: "क्या भरना है?" },
  electricity: { en: "Electricity", hi: "बिजली" },
  mobile: { en: "Mobile recharge", hi: "मोबाइल रिचार्ज" },
  gas: { en: "Gas cylinder", hi: "गैस सिलेंडर" },
  water: { en: "Water", hi: "पानी" },
  saved: { en: "Saved connections", hi: "सेव किए कनेक्शन" },
  home: { en: "Home", hi: "घर" },
  shop: { en: "Old shop", hi: "पुरानी दुकान" },
  billFor: { en: "Bill for: Home", hi: "बिल: घर" },
  billAmount: { en: "Amount due", hi: "भरनी है रकम" },
  billDue: { en: "Due date: 10 October", hi: "आख़िरी तारीख: 10 अक्टूबर" },
};

const people = [
  { id: "contact-priya", name: "Priya (Daughter)", phone: "98xxx xxx21", color: "bg-pink-500" },
  { id: "contact-ramesh", name: "Ramesh Sabziwala", phone: "97xxx xxx40", color: "bg-green-600" },
  { id: "contact-doctor", name: "Dr. Mehta Clinic", phone: "99xxx xxx88", color: "bg-sky-600" },
  { id: "contact-sharma", name: "Sharma Ji (Neighbour)", phone: "96xxx xxx13", color: "bg-amber-500" },
];

/** A blocky, decorative QR-like pattern (not a real code). */
function FakeQr() {
  const cells = "1110111010110100101111011001110101101011100101110111".split("");
  return (
    <div className="grid grid-cols-7 gap-0.5 bg-white p-2">
      {cells.slice(0, 49).map((c, i) => (
        <span key={i} className={`h-4 w-4 ${c === "1" ? "bg-black" : "bg-white"}`} />
      ))}
    </div>
  );
}

export function UpiApp({ screen, highlight, onTap, fields, setField, lang }: MockProps) {
  const ref = useScrollToHighlight(highlight);
  const payee = fields.payee || "Ramesh Sabziwala";
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
  const bottomButton = (id: string, label: string, className = "bg-indigo-700 text-white") => (
    <div className="sticky bottom-0 mt-auto bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      <Tap id={id} highlight={highlight} onTap={onTap} className={`w-full rounded-2xl py-4 text-2xl font-bold ${className}`}>
        {label}
      </Tap>
    </div>
  );

  if (screen === "upi-home" || screen === "upi-home-request") {
    const tiles = [
      { id: "scan-qr", icon: "📷", label: L.scan },
      { id: "pay-contacts", icon: "👤", label: L.contacts },
      { id: "bills", icon: "⚡", label: L.bills },
      { id: "check-balance", icon: "🏦", label: L.balance },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(false)}
        {screen === "upi-home-request" && (
          <div className="px-4 pt-4">
            <Tap
              id="request-banner"
              highlight={highlight}
              onTap={onTap}
              className="flex w-full items-center gap-3 rounded-2xl bg-orange-100 p-4 text-left text-orange-900"
            >
              <span className="text-3xl">🔔</span>
              <span className="text-xl font-bold">{L.requestBanner[lang]}</span>
            </Tap>
          </div>
        )}
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

  if (screen === "upi-request") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <div className="flex flex-col items-center gap-2 p-5 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-400 text-3xl font-bold text-white">Q</span>
          <p className="text-lg text-slate-600">{L.requestFrom[lang]}</p>
          <p className="text-5xl font-bold text-slate-900">₹4,999</p>
          <p className="rounded-xl bg-white px-4 py-2 text-lg text-slate-700 shadow-sm">{L.requestNote[lang]}</p>
          <p className="text-base text-slate-500">quickrefund.help@okpay</p>
        </div>
        <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-white/95 p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <Tap id="approve-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-indigo-700 py-4 text-2xl font-bold text-white">
            {L.approve[lang]}
          </Tap>
          <Tap id="decline-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl border-2 border-slate-300 bg-white py-4 text-2xl font-bold text-slate-800">
            {L.decline[lang]}
          </Tap>
        </div>
      </div>
    );
  }

  if (screen === "upi-request-declined") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(false)}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-200 text-5xl">🚫</span>
          <p className="text-3xl font-bold text-slate-900">{L.declined[lang]}</p>
          <p className="text-xl text-slate-600">{L.declinedNote[lang]}</p>
        </div>
        {bottomButton("done-btn", L.done[lang])}
      </div>
    );
  }

  if (screen === "upi-scanner") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-900 text-white">
        {header(true)}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-4">
          <p className="text-xl">{L.scanHint[lang]}</p>
          <div className="rounded-2xl border-4 border-dashed border-white/70 p-2">
            <Tap id="qr-shop" highlight={highlight} onTap={onTap} label="Shop QR code" className="flex flex-col items-center gap-2 rounded-xl bg-white p-2 text-slate-900">
              <FakeQr />
              <span className="text-base font-semibold">Sharma General Store</span>
            </Tap>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "upi-bills") {
    const types = [
      { id: "bill-electricity", icon: "💡", label: L.electricity },
      { id: "bill-mobile", icon: "📱", label: L.mobile },
      { id: "bill-gas", icon: "🔥", label: L.gas },
      { id: "bill-water", icon: "🚰", label: L.water },
    ];
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(true)}
        <p className="px-4 pt-4 text-xl font-semibold text-slate-700">{L.billTypes[lang]}</p>
        <ul className="pt-2">
          {types.map((b) => (
            <li key={b.id}>
              <Tap id={b.id} highlight={highlight} onTap={onTap} className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left active:bg-slate-100">
                <span className="text-4xl">{b.icon}</span>
                <span className="text-xl font-semibold text-slate-900">{b.label[lang]}</span>
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "upi-biller") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-white">
        {header(true)}
        <p className="px-4 pt-4 text-xl font-semibold text-slate-700">💡 {L.saved[lang]}</p>
        <ul className="pt-2">
          {[
            { id: "biller-home", label: L.home, sub: "MSEDCL · ••••4521" },
            { id: "biller-shop", label: L.shop, sub: "MSEDCL · ••••0937" },
          ].map((b) => (
            <li key={b.id}>
              <Tap id={b.id} highlight={highlight} onTap={onTap} className="flex w-full items-center gap-4 border-b border-slate-100 px-4 py-4 text-left active:bg-slate-100">
                <span className="text-4xl">🏠</span>
                <span>
                  <span className="block text-xl font-semibold text-slate-900">{b.label[lang]}</span>
                  <span className="block text-base text-slate-500">{b.sub}</span>
                </span>
              </Tap>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (screen === "upi-bill-fetched") {
    return (
      <div ref={ref} className="flex min-h-full flex-col bg-slate-50">
        {header(true)}
        <div className="m-4 flex flex-col gap-2 rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-lg text-slate-600">💡 MSEDCL · {L.billFor[lang]}</p>
          <p className="text-base text-slate-500">{L.billAmount[lang]}</p>
          <p className="text-5xl font-bold text-slate-900">₹1,240</p>
          <p className="text-lg text-red-700">{L.billDue[lang]}</p>
        </div>
        {bottomButton("bill-pay", `${L.pay[lang]} ₹1,240`)}
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
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">{payee[0]}</span>
          <span>
            <span className="block text-base text-slate-500">{L.paying[lang]}</span>
            <span className="block text-xl font-bold text-slate-900">{payee}</span>
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
        <p className="text-center text-lg text-slate-600">
          ₹{fields.amount} → {payee}
        </p>
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
    <div ref={ref} className="flex min-h-full flex-col bg-green-600 text-center text-white">
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-6xl text-green-600">✓</span>
        <p className="text-5xl font-bold">₹{fields.amount}</p>
        <p className="text-2xl">
          {L.paid[lang]} {payee}
        </p>
      </div>
      <div className="sticky bottom-0 bg-green-600 p-3">
        <Tap id="done-btn" highlight={highlight} onTap={onTap} className="w-full rounded-2xl bg-white py-4 text-2xl font-bold text-green-700">
          {L.done[lang]}
        </Tap>
      </div>
    </div>
  );
}
