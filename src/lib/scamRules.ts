export type Verdict = "safe" | "careful" | "scam";

const RULES: { flag: string; re: RegExp; weight: number }[] = [
  { flag: "asks for an OTP or PIN", re: /\b(otp|one[- ]time password|pin|cvv|ओटीपी|पिन)\b/i, weight: 3 },
  { flag: "mentions KYC or account blocking", re: /\b(kyc|blocked?|suspend(ed)?|deactivat\w*|बंद|ब्लॉक)\b/i, weight: 2 },
  { flag: "has a link", re: /(https?:\/\/|www\.|bit\.ly|\.co\/|\.xyz|\.top)/i, weight: 2 },
  { flag: "promises a prize or lottery", re: /\b(lottery|won|winner|prize|reward|cashback|लॉटरी|इनाम|जीते)\b/i, weight: 2 },
  { flag: "creates urgency", re: /\b(urgent(ly)?|immediately|today|within \d+ ?(hours?|mins?)|turant|जल्दी|तुरंत|आज)\b/i, weight: 1 },
  { flag: "asks you to send money", re: /(send|transfer|pay)\b.{0,30}(₹|rs\.?|rupees|upi)|(₹|rs\.?)\s?\d[\d,]*.{0,30}(send|भेज)/i, weight: 2 },
  { flag: "claims to be a 'new number'", re: /new number|नया नंबर/i, weight: 2 },
  { flag: "asks to install an app or share screen", re: /\b(anydesk|teamviewer|quicksupport|screen ?share|install (this|the) app|apk)\b/i, weight: 3 },
];

/** Fast, offline red-flag check. Gemma explains; these rules make sure obvious tricks are never missed. */
export function scanForRedFlags(text: string) {
  const hits = RULES.filter((r) => r.re.test(text));
  const score = hits.reduce((s, r) => s + r.weight, 0);
  const verdict: Verdict = score >= 4 ? "scam" : score >= 2 ? "careful" : "safe";
  return { verdict, score, flags: hits.map((h) => h.flag) };
}
