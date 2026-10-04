import type { Text } from "@/lib/i18n";

export const scamIntro = {
  en: "I will show you some messages. For each one, tell me: is it safe, or is it a scam?",
  hi: "मैं आपको कुछ मैसेज दिखाऊँगा। हर एक के लिए बताइए: यह सुरक्षित है या धोखा?",
};

export type ScamCard = {
  from: string;
  body: Text;
  isScam: boolean;
  why: Text;
};

export const scamCards: ScamCard[] = [
  {
    from: "VK-SBIBNK",
    body: {
      en: "Dear customer, your KYC has expired. Your account will be BLOCKED today. Update now: http://sbi-kyc-update.co/verify",
      hi: "प्रिय ग्राहक, आपका KYC खत्म हो गया है। आज आपका खाता बंद हो जाएगा। अभी अपडेट करें: http://sbi-kyc-update.co/verify",
    },
    isScam: true,
    why: {
      en: "Banks never send links to update KYC, and they never rush you. The scary word 'BLOCKED' and the strange link are tricks.",
      hi: "बैंक कभी KYC के लिए लिंक नहीं भेजते और जल्दी नहीं मचाते। डराने वाला शब्द 'बंद' और अजीब लिंक धोखे की निशानी हैं।",
    },
  },
  {
    from: "Rohan",
    body: {
      en: "Dadi, I will come home on Sunday for lunch. Please make aloo paratha! ❤️",
      hi: "दादी, मैं रविवार को खाने पर घर आऊँगा। आलू पराठा बनाना! ❤️",
    },
    isScam: false,
    why: {
      en: "This is from someone you know, and it doesn't ask for money, a code, or a link. It's safe.",
      hi: "यह किसी जान-पहचान वाले का है, और इसमें पैसे, कोड या लिंक नहीं माँगा गया। यह सुरक्षित है।",
    },
  },
  {
    from: "+91 98xxx 21x07",
    body: {
      en: "Hi Mom, this is my new number. My phone broke. Please send ₹15,000 urgently to this UPI, I will explain later.",
      hi: "हाय माँ, यह मेरा नया नंबर है। मेरा फ़ोन टूट गया। इस UPI पर जल्दी ₹15,000 भेज दो, बाद में बताऊँगा।",
    },
    isScam: true,
    why: {
      en: "A 'new number' asking for money urgently is a very common trick. Always call your child on their old number first.",
      hi: "'नया नंबर' बताकर जल्दी पैसे माँगना बहुत आम धोखा है। हमेशा पहले बच्चे को उसके पुराने नंबर पर फ़ोन कीजिए।",
    },
  },
  {
    from: "AX-APOLLO",
    body: {
      en: "Your medicine order #4821 has been delivered. Thank you for shopping with us.",
      hi: "आपका दवाई का ऑर्डर #4821 पहुँचा दिया गया है। हमारे साथ खरीदारी के लिए धन्यवाद।",
    },
    isScam: false,
    why: {
      en: "It's just information. It doesn't ask you to do anything, pay, or share a code.",
      hi: "यह सिर्फ़ जानकारी है। इसमें कुछ करने, पैसे देने या कोड बताने को नहीं कहा गया।",
    },
  },
  {
    from: "+91 70xxx 55x12",
    body: {
      en: "Congratulations! You won ₹25 lakh in the KBC lottery. Share the OTP sent to your phone to claim your prize.",
      hi: "बधाई हो! आपने KBC लॉटरी में ₹25 लाख जीते हैं। इनाम पाने के लिए अपने फ़ोन पर आया OTP बताइए।",
    },
    isScam: true,
    why: {
      en: "You can't win a lottery you never entered. And an OTP is like your house key — never share it with anyone.",
      hi: "जिस लॉटरी में आपने हिस्सा ही नहीं लिया, उसे आप जीत नहीं सकते। और OTP आपके घर की चाबी जैसा है — इसे किसी को मत बताइए।",
    },
  },
  {
    from: "+91 93xxx 40x18",
    body: {
      en: "This is Inspector Sharma from Cyber Crime. A parcel with drugs was sent in your name. You are under DIGITAL ARREST. Stay on this video call and pay ₹50,000 as a deposit, or police will come to your house.",
      hi: "मैं साइबर क्राइम से इंस्पेक्टर शर्मा बोल रहा हूँ। आपके नाम से ड्रग्स वाला पार्सल भेजा गया है। आप डिजिटल अरेस्ट में हैं। इस वीडियो कॉल पर रहिए और ₹50,000 जमा कीजिए, वरना पुलिस आपके घर आएगी।",
    },
    isScam: true,
    why: {
      en: "Real police never arrest anyone on a video call and never ask for money on the phone. There is no such thing as a 'digital arrest'. Hang up and call your family or 112.",
      hi: "असली पुलिस कभी वीडियो कॉल पर गिरफ़्तार नहीं करती और फ़ोन पर पैसे नहीं माँगती। 'डिजिटल अरेस्ट' जैसी कोई चीज़ नहीं होती। फ़ोन काटिए और परिवार को या 112 पर कॉल कीजिए।",
    },
  },
  {
    from: "+91 80xxx 12x55",
    body: {
      en: "Hello, I am calling from your bank's customer care. Someone is using your card. To stop it, install AnyDesk from the Play Store and tell me the code on your screen.",
      hi: "नमस्ते, मैं आपके बैंक के कस्टमर केयर से बोल रहा हूँ। कोई आपका कार्ड इस्तेमाल कर रहा है। रोकने के लिए Play Store से AnyDesk डाउनलोड कीजिए और स्क्रीन पर आया कोड बताइए।",
    },
    isScam: true,
    why: {
      en: "AnyDesk lets a stranger control your phone. Real bank staff never ask you to install an app. Only call the helpline printed on the back of your card, not a number from Google.",
      hi: "AnyDesk से कोई अनजान आपका फ़ोन चला सकता है। असली बैंक वाले कभी ऐप डाउनलोड करने को नहीं कहते। सिर्फ़ अपने कार्ड के पीछे लिखे नंबर पर फ़ोन कीजिए, Google पर मिले नंबर पर नहीं।",
    },
  },
  {
    from: "+91 90xxx 66x31",
    body: {
      en: "Hi Aunty, I sent my 6-digit WhatsApp code to your number by mistake. Please forward it to me, it is urgent!",
      hi: "नमस्ते आंटी, मैंने गलती से अपना 6 अंकों का WhatsApp कोड आपके नंबर पर भेज दिया। कृपया मुझे वह फ़ॉरवर्ड कर दीजिए, बहुत ज़रूरी है!",
    },
    isScam: true,
    why: {
      en: "That code is for YOUR WhatsApp. If you send it, they take over your account and message your family asking for money. Never forward any code.",
      hi: "वह कोड आपके WhatsApp का है। अगर आपने भेज दिया, तो वे आपका अकाउंट ले लेंगे और आपके परिवार से पैसे माँगेंगे। कोई भी कोड कभी फ़ॉरवर्ड मत कीजिए।",
    },
  },
  {
    from: "+91 70xxx 98x02",
    body: {
      en: "Dear consumer, your electricity will be disconnected tonight at 9:30 PM because your last bill was not updated. Call our officer immediately on 98xxx xxx77.",
      hi: "प्रिय उपभोक्ता, आपका पिछला बिल अपडेट नहीं हुआ है, इसलिए आज रात 9:30 बजे आपकी बिजली काट दी जाएगी। तुरंत हमारे अधिकारी को 98xxx xxx77 पर फ़ोन करें।",
    },
    isScam: true,
    why: {
      en: "The electricity office does not send threats from a personal mobile number. Check your bill inside your payment app, or call the number printed on your paper bill.",
      hi: "बिजली विभाग किसी निजी मोबाइल नंबर से धमकी नहीं भेजता। अपना बिल पेमेंट ऐप के अंदर देखिए, या अपने काग़ज़ वाले बिल पर लिखे नंबर पर फ़ोन कीजिए।",
    },
  },
];
