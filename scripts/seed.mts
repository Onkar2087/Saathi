// Seeds Atlas: embeds help notes with EmbeddingGemma (via Ollama) and creates the vector search index.
// Run: npm run seed   (needs MONGODB_URI and a running Gemma/Ollama endpoint)
import { MongoClient } from "mongodb";
import { helpNotes } from "../src/lessons/helpNotes.ts";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Set MONGODB_URI in .env.local first");
const baseUrl = process.env.MODEL_BASE_URL || "http://localhost:11434/v1";
const embedModel = process.env.EMBED_MODEL_NAME || "embeddinggemma";
const INDEX = "help_notes_vector";

async function embed(text: string): Promise<number[]> {
  const res = await fetch(`${baseUrl}/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.MODEL_API_KEY || "ollama"}` },
    body: JSON.stringify({ model: embedModel, input: text }),
  });
  if (!res.ok) throw new Error(`embedding failed (${res.status}): ${await res.text()}`);
  return ((await res.json()) as { data: { embedding: number[] }[] }).data[0].embedding;
}

const client = await new MongoClient(uri).connect();
try {
  const db = client.db(process.env.MONGODB_DB_NAME || "saathi");
  const notes = db.collection<{ _id: string; text: string; embedding: number[] }>("help_notes");

  let dims = 0;
  for (const note of helpNotes) {
    const embedding = await embed(note.text);
    dims = embedding.length;
    await notes.replaceOne({ _id: note.id }, { text: note.text, embedding }, { upsert: true });
    console.log(`  embedded ${note.id}`);
  }

  const existing = await notes.listSearchIndexes(INDEX).toArray();
  if (existing.length === 0) {
    await notes.createSearchIndex({
      name: INDEX,
      type: "vectorSearch",
      definition: { fields: [{ type: "vector", path: "embedding", numDimensions: dims, similarity: "cosine" }] },
    });
    console.log(`Created vector index "${INDEX}" (${dims} dims). Atlas takes ~1 minute to build it.`);
  }

  await db.collection("progress_events").createIndex({ userId: 1, ts: -1 });
  console.log(`Seeded ${helpNotes.length} help notes.`);
} finally {
  await client.close();
}
