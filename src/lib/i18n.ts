export type Lang = "en" | "hi";
export type Text = Record<Lang, string>;

export const LANGS: { id: Lang; label: string }[] = [
  { id: "en", label: "English" },
  { id: "hi", label: "हिंदी" },
];

export const ui = {
  appName: { en: "Saathi", hi: "साथी" },
  tagline: {
    en: "Practice your phone apps. Nothing here is real, so nothing can go wrong.",
    hi: "अपने फ़ोन के ऐप्स की प्रैक्टिस करें। यहाँ कुछ भी असली नहीं है, इसलिए कुछ गलत नहीं हो सकता।",
  },
  practiceBanner: {
    en: "Practice mode — nothing real happens",
    hi: "प्रैक्टिस मोड — कुछ भी असली नहीं होता",
  },
  home: { en: "Home", hi: "होम" },
  startOver: { en: "Start over", hi: "फिर से शुरू करें" },
  repeat: { en: "Say it again", hi: "फिर से बोलो" },
  ask: { en: "Ask Saathi", hi: "साथी से पूछें" },
  askHint: {
    en: "Tap the microphone and ask anything. Or type below.",
    hi: "माइक दबाएँ और कुछ भी पूछें। या नीचे लिखें।",
  },
  listening: { en: "Listening… tap again when done", hi: "सुन रहा हूँ… बोलने के बाद फिर दबाएँ" },
  thinking: { en: "Thinking…", hi: "सोच रहा हूँ…" },
  typeQuestion: { en: "Type your question", hi: "अपना सवाल लिखें" },
  send: { en: "Ask", hi: "पूछें" },
  close: { en: "Close", hi: "बंद करें" },
  wrongTap: {
    en: "That's okay, nothing happened. Look for the glowing button.",
    hi: "कोई बात नहीं, कुछ नहीं हुआ। चमकते हुए बटन को देखिए।",
  },
  wellDone: { en: "Well done!", hi: "बहुत बढ़िया!" },
  lessonDone: {
    en: "You did it! You can practice this as many times as you like.",
    hi: "आपने कर दिखाया! आप इसे जितनी बार चाहें प्रैक्टिस कर सकते हैं।",
  },
  againButton: { en: "Practice again", hi: "फिर से प्रैक्टिस करें" },
  checkTitle: { en: "Is this message safe?", hi: "क्या यह मैसेज सुरक्षित है?" },
  checkHint: {
    en: "Paste or type a message you received. Saathi will tell you if it looks like a trick.",
    hi: "आपको मिला मैसेज यहाँ लिखें या चिपकाएँ। साथी बताएगा कि यह धोखा तो नहीं।",
  },
  checkButton: { en: "Check it", hi: "जाँचें" },
  checkPrivacy: {
    en: "Your message is checked by Saathi's own AI. It is not sent to any big company.",
    hi: "आपका मैसेज साथी का अपना AI जाँचता है। इसे किसी बड़ी कंपनी को नहीं भेजा जाता।",
  },
  safe: { en: "Looks safe", hi: "सुरक्षित लगता है" },
  careful: { en: "Be careful", hi: "सावधान रहें" },
  scam: { en: "This looks like a scam", hi: "यह धोखा लगता है" },
  safeBtn: { en: "Safe", hi: "सुरक्षित" },
  scamBtn: { en: "Scam", hi: "धोखा" },
  next: { en: "Next", hi: "आगे" },
  correct: { en: "Correct!", hi: "सही!" },
  notQuite: { en: "Not quite — that's how we learn.", hi: "पूरा सही नहीं — ऐसे ही तो सीखते हैं।" },
  score: { en: "You spotted", hi: "आपने पहचाने" },
  comingSoon: {
    en: "More apps to practice, in more languages, are coming soon",
    hi: "जल्द ही और ऐप्स की प्रैक्टिस, और भी भाषाओं में आएगी",
  },
  micUnavailable: {
    en: "The microphone is not available. Please type instead.",
    hi: "माइक उपलब्ध नहीं है। कृपया लिखकर पूछें।",
  },
} satisfies Record<string, Text>;

export function t(text: Text, lang: Lang) {
  return text[lang] ?? text.en;
}
