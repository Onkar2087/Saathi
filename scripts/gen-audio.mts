// Pre-generates every scripted sentence as ElevenLabs narration into public/audio/.
// Lessons then play from static files: no live API call and none of her data ever leaves the app.
// Run: npm run gen-audio   (needs ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID)
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { lessons } from "../src/lessons/index.ts";
import { scamCards, scamIntro } from "../src/lessons/scams.ts";
import { ui, type Lang } from "../src/lib/i18n.ts";
import { textKey } from "../src/lib/textKey.ts";
import { textToSpeech } from "../src/lib/elevenlabs.ts";

if (!process.env.ELEVENLABS_API_KEY || !process.env.ELEVENLABS_VOICE_ID) {
  throw new Error("Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in .env.local first");
}

const out = join(import.meta.dirname, "..", "public", "audio");
mkdirSync(out, { recursive: true });

// Must mirror exactly what the components pass to speak().
const sentences = new Set<string>();
for (const lang of ["en", "hi"] as Lang[]) {
  sentences.add(ui.wrongTap[lang]);
  sentences.add(ui.lessonDone[lang]);
  sentences.add(`${ui.wellDone[lang]} ${ui.lessonDone[lang]}`);
  for (const lesson of lessons) {
    sentences.add(`${lesson.intro[lang]} ${lesson.steps[0].say[lang]}`);
    for (const step of lesson.steps) {
      sentences.add(step.say[lang]);
      sentences.add(step.hint[lang]);
      if (step.needs) sentences.add(step.needs.reminder[lang]);
    }
  }
  sentences.add(`${scamIntro[lang]} ${scamCards[0].body[lang]}`);
  for (const card of scamCards) {
    sentences.add(card.body[lang]);
    sentences.add(`${ui.correct[lang]} ${card.why[lang]}`);
    sentences.add(`${ui.notQuite[lang]} ${card.why[lang]}`);
  }
}

let made = 0;
let stoppedEarly = "";
for (const text of sentences) {
  const file = join(out, `${textKey(text)}.mp3`);
  if (existsSync(file)) continue;
  try {
    writeFileSync(file, Buffer.from(await textToSpeech(text)));
  } catch (err) {
    // Usually the monthly credit quota. Keep what we made; re-run later to fill in the rest.
    stoppedEarly = (err as Error).message.slice(0, 200);
    break;
  }
  made++;
  console.log(`  ✓ ${text.slice(0, 60)}`);
}

// Always save the manifest, even after a partial run, so finished clips get used.
const keys = readdirSync(out)
  .filter((f) => f.endsWith(".mp3"))
  .map((f) => f.replace(/\.mp3$/, ""));
writeFileSync(join(out, "manifest.json"), JSON.stringify(keys));
console.log(`Generated ${made} new clips (${keys.length} total).`);
if (stoppedEarly) {
  const left = [...sentences].filter((t) => !existsSync(join(out, `${textKey(t)}.mp3`))).length;
  console.log(`Stopped early (${left} clips still missing): ${stoppedEarly}`);
  console.log("Those lines use the browser voice until you run this again, e.g. when your credits renew.");
}
