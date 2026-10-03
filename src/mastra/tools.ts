import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { searchHelpNotes } from "@/lib/helpNotes";
import { scanForRedFlags } from "@/lib/scamRules";

export const searchHelpNotesTool = createTool({
  id: "search-help-notes",
  description:
    "Look up trusted facts about phone apps, UPI payments, WhatsApp and scams. Use before answering any factual question.",
  inputSchema: z.object({ query: z.string().describe("What she is asking about, in English keywords") }),
  outputSchema: z.object({ notes: z.array(z.string()) }),
  execute: async ({ query }) => ({ notes: await searchHelpNotes(query) }),
});

export const checkScamTool = createTool({
  id: "check-scam",
  description: "Scan a message she received for common scam red flags (OTP requests, KYC threats, links, lottery, urgency).",
  inputSchema: z.object({ message: z.string() }),
  outputSchema: z.object({
    verdict: z.enum(["safe", "careful", "scam"]),
    flags: z.array(z.string()),
  }),
  execute: async ({ message }) => {
    const { verdict, flags } = scanForRedFlags(message);
    return { verdict, flags };
  },
});
