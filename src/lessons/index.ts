import type { Text } from "@/lib/i18n";

export type AppId = "chat" | "upi" | "cab" | "pharmacy";

export type Step = {
  /** Which mock-app screen to show */
  screen: string;
  /** The element she should tap next (gets the glowing ring) */
  target: string;
  /** Optional: a field that must be filled before the target counts */
  needs?: { field: string; equals?: string; reminder: Text };
  say: Text;
  /** Spoken after two wrong taps, in different words */
  hint: Text;
};

export type Lesson = {
  id: string;
  app: AppId;
  emoji: string;
  title: Text;
  intro: Text;
  steps: Step[];
  /** Screen to leave on after the last step */
  doneScreen: string;
};

export const lessons: Lesson[] = [
  {
    id: "send-message",
    app: "chat",
    emoji: "💬",
    title: { en: "Send a message", hi: "मैसेज भेजना" },
    intro: {
      en: "Let's send a message to your grandson Rohan. I'll show you every step.",
      hi: "चलिए आपके पोते रोहन को एक मैसेज भेजते हैं। मैं हर कदम दिखाऊँगा।",
    },
    steps: [
      {
        screen: "chats",
        target: "chat-rohan",
        say: {
          en: "This is your list of chats. Tap on Rohan's name to open his chat.",
          hi: "यह आपकी चैट की सूची है। रोहन के नाम पर दबाइए।",
        },
        hint: {
          en: "Rohan's name is at the top of the list, with a blue circle next to it. Tap anywhere on that row.",
          hi: "रोहन का नाम सबसे ऊपर है, नीले गोले के साथ। उस लाइन पर कहीं भी दबाइए।",
        },
      },
      {
        screen: "chat",
        target: "send",
        needs: {
          field: "message",
          reminder: {
            en: "First tap the white box at the bottom and type a message, like Hello.",
            hi: "पहले नीचे सफ़ेद डिब्बे को दबाइए और कुछ लिखिए, जैसे नमस्ते।",
          },
        },
        say: {
          en: "Tap the white box at the bottom and type a message, like Hello. Then tap the green arrow to send it.",
          hi: "नीचे सफ़ेद डिब्बे को दबाइए और कुछ लिखिए, जैसे नमस्ते। फिर भेजने के लिए हरे तीर को दबाइए।",
        },
        hint: {
          en: "The green circle with an arrow is at the bottom right. It only sends after you type something.",
          hi: "तीर वाला हरा गोला नीचे दाईं ओर है। कुछ लिखने के बाद ही यह भेजता है।",
        },
      },
      {
        screen: "chat-sent",
        target: "back",
        say: {
          en: "Your message is sent! Two blue ticks mean Rohan has read it. Tap the back arrow at the top left to go back.",
          hi: "आपका मैसेज चला गया! दो नीले टिक का मतलब है रोहन ने पढ़ लिया। वापस जाने के लिए ऊपर बाईं ओर तीर दबाइए।",
        },
        hint: {
          en: "The back arrow is in the green bar at the very top, on the left side.",
          hi: "वापस वाला तीर सबसे ऊपर हरी पट्टी में, बाईं ओर है।",
        },
      },
    ],
    doneScreen: "chats",
  },
  {
    id: "video-call",
    app: "chat",
    emoji: "📹",
    title: { en: "Make a video call", hi: "वीडियो कॉल करना" },
    intro: {
      en: "Let's video call Rohan so you can see his face. Don't worry, nobody will really be called.",
      hi: "चलिए रोहन को वीडियो कॉल करते हैं ताकि आप उसका चेहरा देख सकें। चिंता मत कीजिए, असल में किसी को कॉल नहीं जाएगा।",
    },
    steps: [
      {
        screen: "chats",
        target: "chat-rohan",
        say: {
          en: "First, open Rohan's chat by tapping his name.",
          hi: "पहले, रोहन के नाम पर दबाकर उसकी चैट खोलिए।",
        },
        hint: {
          en: "Rohan is the first name in the list.",
          hi: "रोहन सूची में पहला नाम है।",
        },
      },
      {
        screen: "chat",
        target: "video-btn",
        say: {
          en: "At the top right there is a small camera picture. Tap it to start a video call.",
          hi: "ऊपर दाईं ओर एक छोटा कैमरा बना है। वीडियो कॉल शुरू करने के लिए उसे दबाइए।",
        },
        hint: {
          en: "Look at the green bar at the top. The camera is next to the phone picture.",
          hi: "ऊपर की हरी पट्टी में देखिए। कैमरा फ़ोन के निशान के पास है।",
        },
      },
      {
        screen: "call",
        target: "end-call",
        say: {
          en: "Rohan picked up! You can see him, and he can see you. When you finish talking, tap the red button to end the call.",
          hi: "रोहन ने फ़ोन उठा लिया! आप उसे देख सकते हैं और वह आपको। बात खत्म होने पर लाल बटन दबाकर कॉल काटिए।",
        },
        hint: {
          en: "The red round button at the bottom ends the call. Ending a call is always safe.",
          hi: "नीचे का लाल गोल बटन कॉल काटता है। कॉल काटना हमेशा सुरक्षित है।",
        },
      },
    ],
    doneScreen: "chats",
  },
  {
    id: "upi-pay",
    app: "upi",
    emoji: "💸",
    title: { en: "Pay with UPI", hi: "UPI से पैसे भेजना" },
    intro: {
      en: "Let's pay 50 rupees to Ramesh the vegetable seller. This is pretend money, so take your time.",
      hi: "चलिए सब्ज़ीवाले रमेश को 50 रुपये भेजते हैं। यह नकली पैसा है, इसलिए आराम से कीजिए।",
    },
    steps: [
      {
        screen: "upi-home",
        target: "pay-contacts",
        say: {
          en: "This is your payment app. Tap 'Pay contacts' to send money to someone you know.",
          hi: "यह आपका पेमेंट ऐप है। किसी जान-पहचान वाले को पैसे भेजने के लिए 'संपर्क को भेजें' दबाइए।",
        },
        hint: {
          en: "It's the big button with a person picture on it.",
          hi: "यह वह बड़ा बटन है जिस पर व्यक्ति का चित्र बना है।",
        },
      },
      {
        screen: "upi-contacts",
        target: "contact-ramesh",
        say: {
          en: "Find Ramesh Sabziwala in the list and tap his name. Always check the name before paying.",
          hi: "सूची में रमेश सब्ज़ीवाला को ढूँढिए और उनके नाम पर दबाइए। पैसे भेजने से पहले नाम ज़रूर देखिए।",
        },
        hint: {
          en: "Ramesh has a green circle with the letter R.",
          hi: "रमेश के नाम के आगे हरे गोले में R लिखा है।",
        },
      },
      {
        screen: "upi-amount",
        target: "amount-next",
        needs: {
          field: "amount",
          equals: "50",
          reminder: {
            en: "Use the number buttons to type 5 and then 0, so it shows 50 rupees.",
            hi: "नंबर वाले बटन से पहले 5 और फिर 0 दबाइए, ताकि 50 रुपये दिखे।",
          },
        },
        say: {
          en: "Type 50 using the number buttons. Then tap the Pay button.",
          hi: "नंबर वाले बटन से 50 लिखिए। फिर 'भेजें' बटन दबाइए।",
        },
        hint: {
          en: "If you make a mistake, the arrow button on the keypad removes the last number.",
          hi: "गलती हो जाए तो कीपैड का तीर वाला बटन आखिरी नंबर मिटा देता है।",
        },
      },
      {
        screen: "upi-pin",
        target: "pin-ok",
        needs: {
          field: "pin",
          equals: "1234",
          reminder: {
            en: "For practice, the PIN is 1, 2, 3, 4. Press those four numbers.",
            hi: "प्रैक्टिस के लिए पिन है 1, 2, 3, 4। ये चार नंबर दबाइए।",
          },
        },
        say: {
          en: "Now type your secret UPI PIN. For practice it is 1 2 3 4. Never tell your real PIN to anyone.",
          hi: "अब अपना गुप्त UPI पिन लिखिए। प्रैक्टिस के लिए यह 1 2 3 4 है। अपना असली पिन कभी किसी को मत बताइए।",
        },
        hint: {
          en: "Press 1, then 2, then 3, then 4. Then tap the tick button.",
          hi: "1, फिर 2, फिर 3, फिर 4 दबाइए। फिर टिक वाला बटन दबाइए।",
        },
      },
      {
        screen: "upi-success",
        target: "done-btn",
        say: {
          en: "Payment done! The big green tick means Ramesh got his 50 rupees. Tap Done.",
          hi: "पैसे चले गए! बड़े हरे टिक का मतलब है रमेश को 50 रुपये मिल गए। 'हो गया' दबाइए।",
        },
        hint: {
          en: "The Done button is at the bottom of the screen.",
          hi: "'हो गया' बटन स्क्रीन के नीचे है।",
        },
      },
    ],
    doneScreen: "upi-home",
  },
  {
    id: "book-cab",
    app: "cab",
    emoji: "🚕",
    title: { en: "Book a cab", hi: "कैब बुक करना" },
    intro: {
      en: "Let's book an auto to City Hospital. No auto will really come, so take your time.",
      hi: "चलिए सिटी हॉस्पिटल के लिए ऑटो बुक करते हैं। कोई ऑटो असल में नहीं आएगा, इसलिए आराम से कीजिए।",
    },
    steps: [
      {
        screen: "cab-home",
        target: "where-to",
        say: {
          en: "The map shows where you are now. Tap the 'Where to?' box to choose where you want to go.",
          hi: "नक्शे में दिख रहा है कि आप अभी कहाँ हैं। कहाँ जाना है, यह चुनने के लिए 'कहाँ जाना है?' वाले डिब्बे को दबाइए।",
        },
        hint: {
          en: "The white 'Where to?' box is just below the map.",
          hi: "'कहाँ जाना है?' वाला सफ़ेद डिब्बा नक्शे के ठीक नीचे है।",
        },
      },
      {
        screen: "cab-destination",
        target: "dest-hospital",
        say: {
          en: "Here are some places. Tap City Hospital.",
          hi: "यहाँ कुछ जगहें हैं। सिटी हॉस्पिटल को दबाइए।",
        },
        hint: {
          en: "City Hospital has a red cross next to it.",
          hi: "सिटी हॉस्पिटल के आगे लाल क्रॉस का निशान है।",
        },
      },
      {
        screen: "cab-choose",
        target: "book-btn",
        needs: {
          field: "ride",
          equals: "auto",
          reminder: {
            en: "First tap Auto in the list, so it is selected.",
            hi: "पहले सूची में ऑटो को दबाइए, ताकि वह चुन लिया जाए।",
          },
        },
        say: {
          en: "These are the types of ride, with their prices. Tap Auto, it is the cheapest. Then tap the Book button.",
          hi: "ये सवारी के प्रकार हैं, उनके दाम के साथ। ऑटो दबाइए, यह सबसे सस्ता है। फिर 'बुक करें' बटन दबाइए।",
        },
        hint: {
          en: "Auto is at the top of the list, for 80 rupees. The Book button is at the bottom.",
          hi: "ऑटो सूची में सबसे ऊपर है, 80 रुपये का। 'बुक करें' बटन नीचे है।",
        },
      },
      {
        screen: "cab-booked",
        target: "share-ride",
        say: {
          en: "Your auto is booked! Raju is coming. The 4 numbers are your ride OTP. Tell them to the driver only after you sit in the auto. Now tap 'Share ride with family', so they know where you are.",
          hi: "आपका ऑटो बुक हो गया! राजू आ रहे हैं। ये 4 नंबर आपकी सवारी का OTP हैं। ऑटो में बैठने के बाद ही ड्राइवर को बताइए। अब 'परिवार को बताएँ' दबाइए, ताकि उन्हें पता रहे कि आप कहाँ हैं।",
        },
        hint: {
          en: "The 'Share ride with family' button is green, at the bottom.",
          hi: "'परिवार को बताएँ' बटन हरे रंग का है, नीचे की तरफ़।",
        },
      },
    ],
    doneScreen: "cab-booked",
  },
  {
    id: "order-medicine",
    app: "pharmacy",
    emoji: "💊",
    title: { en: "Order medicines", hi: "दवाइयाँ मँगाना" },
    intro: {
      en: "Let's order Paracetamol from a medicine app. Nothing will be delivered and no money will be paid.",
      hi: "चलिए दवाई वाले ऐप से पैरासिटामोल मँगाते हैं। कुछ भी डिलीवर नहीं होगा और कोई पैसा नहीं कटेगा।",
    },
    steps: [
      {
        screen: "med-home",
        target: "search",
        say: {
          en: "This is the medicine app. Tap the search box at the top to find your medicine.",
          hi: "यह दवाई वाला ऐप है। अपनी दवाई ढूँढने के लिए ऊपर खोज वाले डिब्बे को दबाइए।",
        },
        hint: {
          en: "The search box has a magnifying glass and is at the very top.",
          hi: "खोज वाले डिब्बे पर एक आवर्धक लेंस बना है, और यह सबसे ऊपर है।",
        },
      },
      {
        screen: "med-results",
        target: "add-paracetamol",
        say: {
          en: "Here is Paracetamol 500 mg. Always check the name and the strength match your prescription. Then tap Add.",
          hi: "यह रही पैरासिटामोल 500 mg। हमेशा देखिए कि नाम और ताकत आपके पर्चे से मिलते हैं। फिर 'जोड़ें' दबाइए।",
        },
        hint: {
          en: "Paracetamol 500 mg is the first medicine. The Add button is on its right.",
          hi: "पैरासिटामोल 500 mg पहली दवाई है। 'जोड़ें' बटन उसके दाईं ओर है।",
        },
      },
      {
        screen: "med-cart",
        target: "checkout",
        say: {
          en: "Your medicine is in the cart. Check the quantity and the price, then tap 'Continue'.",
          hi: "आपकी दवाई कार्ट में है। मात्रा और दाम देख लीजिए, फिर 'आगे बढ़ें' दबाइए।",
        },
        hint: {
          en: "The Continue button is at the bottom of the screen.",
          hi: "'आगे बढ़ें' बटन स्क्रीन के नीचे है।",
        },
      },
      {
        screen: "med-pay",
        target: "place-order",
        needs: {
          field: "pay",
          equals: "cod",
          reminder: {
            en: "First tap 'Cash on delivery', so it is selected.",
            hi: "पहले 'घर पर नकद भुगतान' दबाइए, ताकि वह चुन लिया जाए।",
          },
        },
        say: {
          en: "Choose 'Cash on delivery'. You pay only when the medicine reaches your door. Then tap 'Place order'.",
          hi: "'घर पर नकद भुगतान' चुनिए। पैसे तभी देने हैं जब दवाई आपके दरवाज़े पर पहुँचे। फिर 'ऑर्डर करें' दबाइए।",
        },
        hint: {
          en: "Cash on delivery has a picture of money. The Place order button is at the bottom.",
          hi: "'घर पर नकद भुगतान' के आगे पैसे का चित्र है। 'ऑर्डर करें' बटन नीचे है।",
        },
      },
      {
        screen: "med-placed",
        target: "done-btn",
        say: {
          en: "Order placed! It will come tomorrow. When it arrives, check the medicine name and the expiry date on the box. Tap Done.",
          hi: "ऑर्डर हो गया! यह कल आएगा। जब आए, तो डिब्बे पर दवाई का नाम और एक्सपायरी तारीख ज़रूर देखिए। 'हो गया' दबाइए।",
        },
        hint: {
          en: "The Done button is at the bottom of the screen.",
          hi: "'हो गया' बटन स्क्रीन के नीचे है।",
        },
      },
    ],
    doneScreen: "med-home",
  },
];

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}
