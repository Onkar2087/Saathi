/** Short, trustworthy facts Saathi can lean on. Seeded into Atlas with embeddings by scripts/seed.mts. */
export const helpNotes: { id: string; text: string }[] = [
  { id: "upi-pin", text: "A UPI PIN is a secret 4 or 6 digit number that approves a payment. You only type it when YOU are sending money. You never need a PIN to receive money. Never tell it to anyone, including bank staff." },
  { id: "otp", text: "An OTP is a one-time code sent by SMS. It works like a key for one action. Banks, police and companies will never ask you to read out an OTP. If someone asks, it is a scam." },
  { id: "receive-money", text: "To receive money you do nothing. If an app asks you to enter your PIN or scan a QR code to receive money, it is a trick." },
  { id: "wrong-payment", text: "If you paid the wrong person, don't panic. Call your bank's official number from the back of your card, or ask family. Do not search for helpline numbers on the internet; fake numbers exist." },
  { id: "blue-ticks", text: "In WhatsApp, one grey tick means sent, two grey ticks mean delivered, two blue ticks mean the person has read your message." },
  { id: "video-call", text: "To video call in WhatsApp, open the person's chat and tap the camera icon at the top right. Tap the red button to end the call. Ending a call is always safe." },
  { id: "voice-note", text: "To send a voice message in WhatsApp, press and hold the microphone button, speak, then let go. Slide left to cancel." },
  { id: "kyc", text: "Banks never ask you to update KYC through an SMS link. If worried, visit your branch in person." },
  { id: "new-number", text: "If a message says 'this is my new number, send money', call your family member on their old number first. This is a very common scam." },
  { id: "back-button", text: "The back arrow (usually at the top left, or the bottom of the phone) takes you to the previous screen. Pressing back is always safe and never deletes anything." },
  { id: "screen-share", text: "Never install apps like AnyDesk or TeamViewer because a caller asked. They let strangers control your phone." },
  { id: "links", text: "Do not tap links in messages from unknown numbers. Real banks and companies do not send prize or KYC links." },
  { id: "fake-police", text: "Police, CBI or customs never arrest anyone over a phone or video call and never ask for money to close a case. A 'digital arrest' does not exist. Hang up, do not pay, and call family or 112." },
  { id: "balance", text: "Checking your balance in a UPI app is safe. It needs your PIN, but no money moves." },
];
