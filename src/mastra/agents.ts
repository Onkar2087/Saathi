import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { MongoDBStore } from "@mastra/mongodb";
import { modelConfig } from "@/lib/model";
import { checkScamTool, searchHelpNotesTool } from "./tools";

const gemma = {
  providerId: "ollama",
  modelId: modelConfig.name,
  url: modelConfig.baseUrl,
  apiKey: modelConfig.apiKey,
};

export const storage = process.env.MONGODB_URI
  ? new MongoDBStore({
      id: "saathi-storage",
      uri: process.env.MONGODB_URI,
      dbName: process.env.MONGODB_DB_NAME || "saathi",
    })
  : undefined;

// Remembers recent questions (and, with tool-capable Gemma builds, a short profile of what she finds hard).
const memory = storage
  ? new Memory({
      storage,
      options: {
        lastMessages: 8,
        workingMemory: {
          enabled: modelConfig.supportsTools,
          template: `# Learner
- Name:
- Preferred language:
- Lessons finished:
- Things she finds confusing:
- Things she is worried about:
`,
        },
      },
    })
  : undefined;

export const saathiAgent = new Agent({
  id: "saathi",
  name: "Saathi",
  instructions: `You are Saathi, a gentle companion helping an older person practice using phone apps.
They may be nervous about technology. Everything they see is a PRACTICE copy of a real app; nothing real can happen.

How to talk:
- Use very short, simple sentences. At most 3 sentences unless asked for more.
- Be warm and patient. Never blame. Never say "error", "wrong" or "failed".
- Describe where things are on screen by colour, shape and position ("the green round button at the bottom right").
- If they seem worried, reassure them first: nothing can break here.
- Answer in the language you are asked to use.
- For safety questions, be clear: never share OTP or PIN, never tap links from strangers, call family when unsure.
- If you don't know, say so kindly and suggest asking a family member.
- Do not use markdown, lists or emojis — your answer will be read aloud.`,
  model: gemma,
  ...(modelConfig.supportsTools ? { tools: { searchHelpNotesTool, checkScamTool } } : {}),
  ...(memory ? { memory } : {}),
});

export const scamAgent = new Agent({
  id: "scam-checker",
  name: "Scam Checker",
  instructions: `You help an older person decide whether a message they received is a scam.
You are given the message and a list of red flags found by a rule scanner.
Explain in 2 or 3 very short, calm sentences what the message wants and whether it is safe.
Always end with one clear action, for example "Do not reply and do not tap the link" or "This one is fine".
No markdown, no lists, no emojis — your answer will be read aloud. Answer in the language you are asked to use.`,
  model: gemma,
});
