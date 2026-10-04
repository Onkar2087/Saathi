import { getDb } from "./db";
import { embed, modelConfig } from "./model";
import { helpNotes } from "@/lessons/helpNotes";

const VECTOR_INDEX = "help_notes_vector";

function keywordSearch(query: string, k: number) {
  const words = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  return helpNotes
    .map((n) => ({ n, score: words.filter((w) => n.text.toLowerCase().includes(w)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.n.text);
}

/** Atlas Vector Search over help notes, falling back to keyword search when Atlas or embeddings are unavailable. */
export async function searchHelpNotes(query: string, k = 3): Promise<string[]> {
  // Hosts without an embedding model (e.g. serverless Gemma) set EMBED_MODEL_NAME empty and use keywords.
  const db = modelConfig.embedName ? await getDb() : null;
  if (db) {
    try {
      const vector = await embed(query);
      const docs = await db
        .collection("help_notes")
        .aggregate([
          { $vectorSearch: { index: VECTOR_INDEX, path: "embedding", queryVector: vector, numCandidates: 50, limit: k } },
          { $project: { _id: 0, text: 1 } },
        ])
        .toArray();
      if (docs.length) return docs.map((d) => d.text as string);
    } catch (err) {
      console.warn("[help] vector search unavailable, using keywords:", (err as Error).message);
    }
  }
  return keywordSearch(query, k);
}

export { VECTOR_INDEX };
