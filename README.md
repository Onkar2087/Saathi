# Saathi — practice phone apps where nothing can go wrong

Many older people are scared of everyday apps. *What if I tap the wrong thing and lose money?*
Saathi ("companion") gives them **practice copies** of the apps they're afraid of, with fake people
and fake money. A patient AI companion talks them through every step, out loud, in their language.

- **12 guided lessons in 4 groups:** talk to family (send a message, make and answer a video call, send a voice note), money (pay with UPI, scan a QR code, pay the electricity bill, spot a fake payment request), daily needs (book a cab, order medicines), and staying safe (spot the scam, block and report a scam number and call 1930). The next button glows, a wrong tap gets *"That's okay, nothing happened."*, and tapping a dangerous button (like *Pay* on a fake request) explains exactly why it's a trap.
- **Ask Saathi:** tap the mic and ask anything ("what is a UPI PIN?"). The answer is grounded in what's on screen right now.
- **Spot the scam:** a 9-message quiz: KYC links, "new number", KBC lottery, fake "digital arrest" police calls, AnyDesk customer care, forwarded WhatsApp codes, electricity disconnection threats.
- **Is this message safe?** Paste a real message you got. Rules catch the red flags, and Gemma explains them kindly.
- **English and Hindi**, large text, one action per screen, no timeouts, installable as a PWA.

## How it's built

```
Phone (Next.js PWA) ──► Next.js route handlers ──► Mastra agents ──► Gemma (OpenAI-compatible API)
   mock apps                /api/ask  /api/check      saathi            Gemma 3 on a laptop (Ollama) or Gemma 4 on DigitalOcean Serverless
   lesson engine            /api/progress             scam-checker
   voice (ElevenLabs)       /api/voice/*              tools + memory ──► MongoDB Atlas
                                                      traces ──────────► Sentry AI monitoring
```

| Piece | Where |
|---|---|
| Lessons (data, en + hi) | `src/lessons/` |
| Mock chat and UPI apps | `src/components/mock/` |
| Lesson engine (glow, hints, progress) | `src/components/LessonPlayer.tsx` |
| Mastra agents, tools, memory, Sentry | `src/mastra/` |
| Help-note RAG (Atlas Vector Search, keyword fallback) | `src/lib/helpNotes.ts` |
| Scam red-flag rules | `src/lib/scamRules.ts` |
| ElevenLabs TTS/STT, browser fallback | `src/lib/elevenlabs.ts`, `src/lib/speech.ts` |

Every external piece is optional. With no keys at all, lessons, the quiz and the scam rules still work,
using the browser's voice.

## Run it locally

```bash
# 1. Gemma (open weights, runs on a laptop)
ollama pull gemma3:4b
ollama pull embeddinggemma

# 2. App
cp .env.example .env.local      # fill in what you have
npm install
npm run dev                     # http://localhost:3000
```

Optional extras:

```bash
npm run seed        # embed help notes into Atlas + create the vector index (needs MONGODB_URI)
npm run gen-audio   # pre-generate all lesson narration with ElevenLabs into public/audio/
```

## Deploy

- **Model:** Gemma 4 on DigitalOcean Serverless Inference, using a Model Access Key limited to Gemma. See [deploy/digitalocean.md](deploy/digitalocean.md).
- **App:** create a Render Blueprint from `render.yaml`, then fill in the secret env vars.
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`) lints, typechecks and builds every PR. On `main` it triggers the Render deploy hook (add it as the `RENDER_DEPLOY_HOOK_URL` repo secret).

## Why open models

- **Privacy:** the real messages she checks for scams go only to open-weight Gemma. On her laptop they never leave the house; online we pick where Gemma runs and can move it any time.
- **Works offline:** point `MODEL_BASE_URL` at `localhost` and the whole app runs on a laptop with no internet.
- **Cheap to run:** free on a laptop, and about $0.0002 per answer on DigitalOcean serverless.
- **Easy to change:** we can swap model sizes, tune the prompt for her pace, or fine-tune on her own questions.

ElevenLabs is only used for voice. Lesson narration is generated once at build time from our own
scripts, so practicing a lesson sends nothing to ElevenLabs. The only voice data that leaves the app
is a spoken "Ask Saathi" question (ElevenLabs speech-to-text, or the browser's recogniser when no key is set).
Typed questions and the scam checker go only to Gemma.
