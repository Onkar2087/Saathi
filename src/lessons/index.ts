import type { Text } from "@/lib/i18n";

export type AppId = "chat" | "upi" | "cab" | "pharmacy" | "phone";

export type Category = "family" | "money" | "daily" | "safety";

export type Step = {
  screen: string;
  target: string;
  needs?: { field: string; equals?: string; reminder: Text };
  say: Text;
  hint: Text;
  traps?: Record<string, Text>;
};

export type Lesson = {
  id: string;
  app: AppId;
  category: Category;
  emoji: string;
  title: Text;
  intro: Text;
  steps: Step[];
  doneScreen: string;
  initialFields?: Record<string, string>;
};

export const lessons: Lesson[] = [
  {
    id: "send-message",
    category: "family",
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
    category: "family",
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
    category: "money",
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
    category: "daily",
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
    category: "daily",
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
  {
    id: "answer-call",
    category: "family",
    app: "chat",
    emoji: "📲",
    title: { en: "Answer a video call", hi: "वीडियो कॉल उठाना" },
    intro: {
      en: "Rohan is calling you on video! Let's answer it together.",
      hi: "रोहन आपको वीडियो कॉल कर रहा है! चलिए साथ में उठाते हैं।",
    },
    steps: [
      {
        screen: "incoming-call",
        target: "accept-call",
        say: {
          en: "When someone calls, the whole screen changes. The green button answers the call. The red button cuts it. Tap the green button.",
          hi: "जब कोई कॉल करता है, तो पूरी स्क्रीन बदल जाती है। हरा बटन कॉल उठाता है। लाल बटन कॉल काटता है। हरा बटन दबाइए।",
        },
        hint: {
          en: "The green round button with a phone is at the bottom right. On some phones you slide it up instead.",
          hi: "फ़ोन के निशान वाला हरा गोल बटन नीचे दाईं ओर है। कुछ फ़ोन में इसे ऊपर की ओर खिसकाना होता है।",
        },
        traps: {
          "decline-call": {
            en: "That's the red button. It would cut the call. Nothing happened here, so try the green one.",
            hi: "यह लाल बटन है, यह कॉल काट देता। यहाँ कुछ नहीं हुआ, इसलिए हरा बटन दबाइए।",
          },
        },
      },
      {
        screen: "call",
        target: "end-call",
        say: {
          en: "You answered! Now you can see Rohan. Hold the phone in front of your face so he can see you too. When you finish talking, tap the red button.",
          hi: "आपने कॉल उठा ली! अब आप रोहन को देख सकते हैं। फ़ोन को अपने चेहरे के सामने रखिए ताकि वह भी आपको देख सके। बात खत्म होने पर लाल बटन दबाइए।",
        },
        hint: {
          en: "The red round button in the middle at the bottom ends the call.",
          hi: "नीचे बीच में लाल गोल बटन कॉल खत्म करता है।",
        },
      },
    ],
    doneScreen: "chats",
  },
  {
    id: "voice-note",
    category: "family",
    app: "chat",
    emoji: "🎙️",
    title: { en: "Send a voice message", hi: "आवाज़ वाला मैसेज भेजना" },
    intro: {
      en: "Typing is hard on a small phone. Let's send Rohan a voice message instead. You just talk!",
      hi: "छोटे फ़ोन पर लिखना मुश्किल होता है। चलिए रोहन को आवाज़ वाला मैसेज भेजते हैं। बस बोलना है!",
    },
    steps: [
      {
        screen: "chats",
        target: "chat-rohan",
        say: { en: "Open Rohan's chat by tapping his name.", hi: "रोहन के नाम पर दबाकर उसकी चैट खोलिए।" },
        hint: { en: "Rohan is the first name in the list.", hi: "रोहन सूची में पहला नाम है।" },
      },
      {
        screen: "chat",
        target: "mic-btn",
        say: {
          en: "At the bottom right there is a green microphone. In the real app you press and HOLD it while you talk, then let go to send. Here, just tap it once.",
          hi: "नीचे दाईं ओर हरा माइक है। असली ऐप में बोलते समय इसे दबाकर रखना होता है, और छोड़ने पर मैसेज चला जाता है। यहाँ बस एक बार दबाइए।",
        },
        hint: {
          en: "The microphone is in the green circle, next to the white box.",
          hi: "माइक सफ़ेद डिब्बे के पास हरे गोले में है।",
        },
      },
      {
        screen: "chat-recording",
        target: "send-voice",
        say: {
          en: "It is recording now. Say something to Rohan, like 'Have you eaten?'. Then tap the green arrow to send.",
          hi: "अब रिकॉर्ड हो रहा है। रोहन से कुछ कहिए, जैसे 'खाना खाया?'। फिर भेजने के लिए हरा तीर दबाइए।",
        },
        hint: {
          en: "The green arrow is on the right. The bin on the left throws the recording away.",
          hi: "हरा तीर दाईं ओर है। बाईं ओर का कूड़ेदान रिकॉर्डिंग मिटा देता है।",
        },
      },
      {
        screen: "chat-voice-sent",
        target: "back",
        say: {
          en: "Sent! Rohan can now listen to your voice. Tap the back arrow at the top left to go back.",
          hi: "चला गया! अब रोहन आपकी आवाज़ सुन सकता है। वापस जाने के लिए ऊपर बाईं ओर तीर दबाइए।",
        },
        hint: { en: "The back arrow is at the top left.", hi: "वापस वाला तीर ऊपर बाईं ओर है।" },
      },
    ],
    doneScreen: "chats",
  },
  {
    id: "payment-request",
    category: "money",
    app: "upi",
    emoji: "⚠️",
    title: { en: "A payment request trick", hi: "पैसे माँगने वाला धोखा" },
    intro: {
      en: "This is the most common UPI trick. A stranger sends a request that looks like you are getting money. Let's see how to spot it.",
      hi: "यह UPI का सबसे आम धोखा है। कोई अनजान व्यक्ति ऐसी रिक्वेस्ट भेजता है जो पैसे मिलने जैसी लगती है। चलिए देखते हैं इसे कैसे पहचानें।",
    },
    initialFields: { payee: "QuickRefund Services", amount: "4999" },
    steps: [
      {
        screen: "upi-home-request",
        target: "request-banner",
        say: {
          en: "A message has appeared in your payment app. Someone is asking about 4,999 rupees. Tap it to read it.",
          hi: "आपके पेमेंट ऐप में एक संदेश आया है। कोई 4,999 रुपये की बात कर रहा है। पढ़ने के लिए उसे दबाइए।",
        },
        hint: {
          en: "The orange box at the top is the message.",
          hi: "ऊपर का नारंगी डिब्बा ही संदेश है।",
        },
      },
      {
        screen: "upi-request",
        target: "decline-btn",
        say: {
          en: "It says 'refund for your order'. But look at the button: it says PAY. If you enter your PIN, money goes OUT of your account. You never need a PIN to receive money. Tap Decline.",
          hi: "इसमें लिखा है 'आपके ऑर्डर का रिफ़ंड'। लेकिन बटन देखिए: उस पर लिखा है 'भुगतान करें'। अगर आपने पिन डाला, तो पैसे आपके खाते से जाएँगे। पैसे पाने के लिए कभी पिन नहीं लगता। 'मना करें' दबाइए।",
        },
        hint: {
          en: "Decline is the white button. Never tap Pay on a request from someone you don't know.",
          hi: "'मना करें' सफ़ेद बटन है। अनजान व्यक्ति की रिक्वेस्ट पर कभी 'भुगतान करें' मत दबाइए।",
        },
        traps: {
          "approve-btn": {
            en: "Stop! That button would SEND 4,999 rupees to a stranger. Luckily this is practice, so nothing happened. Tap Decline instead.",
            hi: "रुकिए! यह बटन किसी अनजान को 4,999 रुपये भेज देता। अच्छा है कि यह प्रैक्टिस है, कुछ नहीं हुआ। 'मना करें' दबाइए।",
          },
        },
      },
      {
        screen: "upi-request-declined",
        target: "done-btn",
        say: {
          en: "Well done, you declined it and nothing was paid. Remember: PIN means money going out. Tap Done.",
          hi: "बहुत बढ़िया, आपने मना कर दिया और कोई पैसा नहीं गया। याद रखिए: पिन का मतलब है पैसे जाना। 'हो गया' दबाइए।",
        },
        hint: { en: "The Done button is at the bottom.", hi: "'हो गया' बटन नीचे है।" },
      },
    ],
    doneScreen: "upi-home",
  },
  {
    id: "scan-qr",
    category: "money",
    app: "upi",
    emoji: "📷",
    title: { en: "Scan a QR code to pay", hi: "QR कोड स्कैन करके पैसे देना" },
    intro: {
      en: "At the shop you can pay by scanning their QR code. Let's pay 120 rupees at Sharma General Store.",
      hi: "दुकान पर आप उनका QR कोड स्कैन करके पैसे दे सकते हैं। चलिए शर्मा जनरल स्टोर पर 120 रुपये देते हैं।",
    },
    initialFields: { payee: "Sharma General Store" },
    steps: [
      {
        screen: "upi-home",
        target: "scan-qr",
        say: {
          en: "Tap 'Scan QR'. The camera will open.",
          hi: "'QR स्कैन करें' दबाइए। कैमरा खुल जाएगा।",
        },
        hint: { en: "It's the button with a camera picture.", hi: "यह कैमरे के चित्र वाला बटन है।" },
      },
      {
        screen: "upi-scanner",
        target: "qr-shop",
        say: {
          en: "Point the camera at the shop's QR code so it fits in the square. Here, just tap the QR code.",
          hi: "कैमरे को दुकान के QR कोड की ओर कीजिए ताकि वह चौकोर में आ जाए। यहाँ बस QR कोड को दबाइए।",
        },
        hint: { en: "The QR code is the black and white square in the middle.", hi: "QR कोड बीच में काला-सफ़ेद चौकोर है।" },
      },
      {
        screen: "upi-amount",
        target: "amount-next",
        needs: {
          field: "amount",
          equals: "120",
          reminder: {
            en: "Type 1, then 2, then 0, so it shows 120 rupees.",
            hi: "1, फिर 2, फिर 0 दबाइए, ताकि 120 रुपये दिखे।",
          },
        },
        say: {
          en: "First check the name: Sharma General Store. If the name is not the shop's name, stop. Now type 120 and tap Pay.",
          hi: "पहले नाम देखिए: शर्मा जनरल स्टोर। अगर नाम दुकान का नहीं है, तो रुक जाइए। अब 120 लिखिए और 'भेजें' दबाइए।",
        },
        hint: {
          en: "The number buttons are below. The Pay button is next to the amount.",
          hi: "नंबर वाले बटन नीचे हैं। 'भेजें' बटन रकम के पास है।",
        },
      },
      {
        screen: "upi-pin",
        target: "pin-ok",
        needs: {
          field: "pin",
          equals: "1234",
          reminder: { en: "For practice, the PIN is 1, 2, 3, 4.", hi: "प्रैक्टिस के लिए पिन है 1, 2, 3, 4।" },
        },
        say: {
          en: "Now your PIN. For practice it is 1 2 3 4. Cover the screen with your hand when you type it at a shop.",
          hi: "अब अपना पिन। प्रैक्टिस के लिए यह 1 2 3 4 है। दुकान पर पिन डालते समय स्क्रीन को हाथ से ढक लीजिए।",
        },
        hint: { en: "Press 1, 2, 3, 4, then the tick.", hi: "1, 2, 3, 4 दबाइए, फिर टिक।" },
      },
      {
        screen: "upi-success",
        target: "done-btn",
        say: {
          en: "Paid! Show this green screen to the shopkeeper so they know the money came. Tap Done.",
          hi: "पैसे चले गए! यह हरी स्क्रीन दुकानदार को दिखाइए, ताकि उन्हें पता चले पैसे आ गए। 'हो गया' दबाइए।",
        },
        hint: { en: "The Done button is at the bottom.", hi: "'हो गया' बटन नीचे है।" },
      },
    ],
    doneScreen: "upi-home",
  },
  {
    id: "pay-bill",
    category: "money",
    app: "upi",
    emoji: "⚡",
    title: { en: "Pay the electricity bill", hi: "बिजली का बिल भरना" },
    intro: {
      en: "Let's pay this month's electricity bill from the payment app, without going to the office.",
      hi: "चलिए इस महीने का बिजली का बिल पेमेंट ऐप से भरते हैं, ऑफ़िस जाए बिना।",
    },
    initialFields: { payee: "MSEDCL Electricity", amount: "1240" },
    steps: [
      {
        screen: "upi-home",
        target: "bills",
        say: { en: "Tap 'Bills and recharge'.", hi: "'बिल और रिचार्ज' दबाइए।" },
        hint: { en: "It's the button with a lightning picture.", hi: "यह बिजली के निशान वाला बटन है।" },
      },
      {
        screen: "upi-bills",
        target: "bill-electricity",
        say: { en: "Tap Electricity.", hi: "'बिजली' दबाइए।" },
        hint: { en: "Electricity has a light bulb next to it.", hi: "'बिजली' के आगे बल्ब का चित्र है।" },
      },
      {
        screen: "upi-biller",
        target: "biller-home",
        say: {
          en: "Your home connection is already saved. Tap 'Home'.",
          hi: "आपके घर का कनेक्शन पहले से सेव है। 'घर' दबाइए।",
        },
        hint: { en: "'Home' is the first item in the list.", hi: "'घर' सूची में पहला है।" },
      },
      {
        screen: "upi-bill-fetched",
        target: "bill-pay",
        say: {
          en: "The app found your bill: 1,240 rupees, due on the 10th. Check it matches your paper bill, then tap Pay.",
          hi: "ऐप ने आपका बिल ढूँढ लिया: 1,240 रुपये, 10 तारीख तक भरना है। अपने काग़ज़ वाले बिल से मिलाइए, फिर 'भेजें' दबाइए।",
        },
        hint: { en: "The Pay button is at the bottom.", hi: "'भेजें' बटन नीचे है।" },
      },
      {
        screen: "upi-pin",
        target: "pin-ok",
        needs: {
          field: "pin",
          equals: "1234",
          reminder: { en: "For practice, the PIN is 1, 2, 3, 4.", hi: "प्रैक्टिस के लिए पिन है 1, 2, 3, 4।" },
        },
        say: { en: "Type your PIN. For practice it is 1 2 3 4.", hi: "अपना पिन लिखिए। प्रैक्टिस के लिए यह 1 2 3 4 है।" },
        hint: { en: "Press 1, 2, 3, 4, then the tick.", hi: "1, 2, 3, 4 दबाइए, फिर टिक।" },
      },
      {
        screen: "upi-success",
        target: "done-btn",
        say: {
          en: "Bill paid! Only pay bills inside the app like this. Never through a link or a phone number in an SMS. Tap Done.",
          hi: "बिल भर गया! बिल हमेशा ऐसे ही ऐप के अंदर से भरिए। कभी SMS में आए लिंक या फ़ोन नंबर से नहीं। 'हो गया' दबाइए।",
        },
        hint: { en: "The Done button is at the bottom.", hi: "'हो गया' बटन नीचे है।" },
      },
    ],
    doneScreen: "upi-home",
  },
  {
    id: "report-scam",
    category: "safety",
    app: "phone",
    emoji: "🚨",
    title: { en: "Block and report a scam", hi: "धोखेबाज़ को ब्लॉक और रिपोर्ट करना" },
    intro: {
      en: "A fake police officer called you. Let's block that number, and learn the one number to call if you are ever cheated: 1930.",
      hi: "एक नकली पुलिस वाले ने आपको फ़ोन किया था। चलिए उस नंबर को ब्लॉक करते हैं, और वह एक नंबर सीखते हैं जिस पर धोखा होने पर फ़ोन करना है: 1930।",
    },
    steps: [
      {
        screen: "phone-recents",
        target: "recent-scam",
        say: {
          en: "These are your recent calls. The unknown number in red is the fake police call. Tap it.",
          hi: "ये आपकी हाल की कॉल हैं। लाल रंग वाला अनजान नंबर नकली पुलिस वाली कॉल है। उसे दबाइए।",
        },
        hint: { en: "It's the number marked 'Suspected spam'.", hi: "यह 'संदिग्ध स्पैम' लिखा हुआ नंबर है।" },
        traps: {
          "callback-scam": {
            en: "Careful, that would call them back. Never call a scammer back. Tap on the number itself instead.",
            hi: "सावधान, इससे उन्हें वापस फ़ोन लग जाता। धोखेबाज़ को कभी वापस फ़ोन मत कीजिए। नंबर पर ही दबाइए।",
          },
        },
      },
      {
        screen: "phone-detail",
        target: "block-btn",
        say: {
          en: "Tap 'Block and report spam'. They will not be able to call you again.",
          hi: "'ब्लॉक और स्पैम रिपोर्ट करें' दबाइए। वे आपको फिर से फ़ोन नहीं कर पाएँगे।",
        },
        hint: { en: "It's the red button at the bottom.", hi: "यह नीचे लाल बटन है।" },
        traps: {
          "call-back": {
            en: "Never call a scammer back. Nothing happened here. Tap 'Block and report spam'.",
            hi: "धोखेबाज़ को कभी वापस फ़ोन मत कीजिए। यहाँ कुछ नहीं हुआ। 'ब्लॉक और स्पैम रिपोर्ट करें' दबाइए।",
          },
        },
      },
      {
        screen: "phone-blocked",
        target: "call-1930",
        say: {
          en: "Blocked! Now remember 1930. It is the government's cyber fraud helpline. If you ever lose money or share your details, call 1930 straight away. Tap 'Call 1930'.",
          hi: "ब्लॉक हो गया! अब 1930 याद रखिए। यह सरकार की साइबर धोखाधड़ी हेल्पलाइन है। अगर कभी पैसे चले जाएँ या जानकारी दे दें, तो तुरंत 1930 पर फ़ोन कीजिए। '1930 पर कॉल करें' दबाइए।",
        },
        hint: { en: "The green 'Call 1930' button is at the bottom.", hi: "हरा '1930 पर कॉल करें' बटन नीचे है।" },
      },
      {
        screen: "phone-calling",
        target: "end-call",
        say: {
          en: "In real life, you would tell them what happened. The faster you call, the better the chance of getting money back. Tap the red button to end.",
          hi: "असल में, आप उन्हें बताते कि क्या हुआ। जितनी जल्दी फ़ोन करेंगे, पैसे वापस मिलने की उम्मीद उतनी ज़्यादा। खत्म करने के लिए लाल बटन दबाइए।",
        },
        hint: { en: "The red button is at the bottom.", hi: "लाल बटन नीचे है।" },
      },
    ],
    doneScreen: "phone-recents",
  },
];

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}
