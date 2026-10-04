export type Verdict = "safe" | "careful" | "scam";

const RULES: { flag: string; re: RegExp; weight: number }[] = [
  { flag: "asks for an OTP or PIN", re: /\b(otp|one[- ]time password|pin|cvv)\b|ओटीपी|पिन/i, weight: 3 },
  { flag: "mentions KYC or account blocking", re: /\b(kyc|blocked?|suspend(ed)?|deactivat\w*)\b|खाता बंद|ब्लॉक/i, weight: 2 },
  { flag: "has a link", re: /(https?:\/\/|www\.|bit\.ly|\.co\/|\.xyz|\.top)/i, weight: 2 },
  { flag: "promises a prize or lottery", re: /\b(lottery|won|winner|prize|reward|cashback)\b|लॉटरी|इनाम|जीते/i, weight: 2 },
  {
    flag: "creates urgency",
    re: /\b(urgent(ly)?|immediately|today|tonight|within \d+ ?(hours?|mins?)|turant)\b|जल्दी|तुरंत|आज ही|आज रात|वरना|ज़रूरी|जरूरी/i,
    weight: 1,
  },
  {
    flag: "asks you to send money",
    re: /\b(send|transfer|pay)\b.{0,30}(₹|rs\.?|rupees|upi)|(₹|rs\.?)\s?\d[\d,]*.{0,30}(send|deposit|भेज|जमा)/i,
    weight: 2,
  },
  { flag: "claims to be a 'new number'", re: /new number|नया नंबर/i, weight: 2 },
  {
    flag: "threatens arrest or claims to be police/CBI/customs",
    re: /\b(digital arrest|arrest(ed)?|police|cbi|customs|narcotics|cyber ?crime)\b|गिरफ़्तार|गिरफ्तार|अरेस्ट|पुलिस|साइबर क्राइम/i,
    weight: 3,
  },
  {
    flag: "asks to install an app or share screen",
    re: /\b(anydesk|teamviewer|quicksupport|screen ?share|install (this|the) app|apk)\b|एनीडेस्क/i,
    weight: 3,
  },
  {
    flag: "asks you to forward or read out a code",
    re: /\b(code|verification code)\b.{0,60}\b(send|forward|share|tell)\b|\b(send|forward|share|tell)\b.{0,60}\bcode\b|कोड.{0,60}(भेज|बता|फ़ॉरवर्ड|फॉरवर्ड)/i,
    weight: 3,
  },
  {
    flag: "threatens to cut your electricity or gas",
    re: /\byour (electricity|power|gas|connection)\b.{0,40}\b(disconnect\w*|cut)\b|आपकी (बिजली|गैस).{0,40}(कट|काट)/i,
    weight: 3,
  },
  {
    flag: "says it's from customer care or the bank",
    re: /\b(customer care|bank's customer|bank officer)\b|कस्टमर केयर/i,
    weight: 1,
  },
];

export function scanForRedFlags(text: string) {
  const hits = RULES.filter((r) => r.re.test(text));
  const score = hits.reduce((s, r) => s + r.weight, 0);
  const verdict: Verdict = score >= 4 ? "scam" : score >= 2 ? "careful" : "safe";
  return { verdict, score, flags: hits.map((h) => h.flag) };
}
