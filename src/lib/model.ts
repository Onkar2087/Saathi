const embedSetting = process.env.EMBED_MODEL_NAME ?? "embeddinggemma";

/** One place to point Saathi at any OpenAI-compatible Gemma server (Ollama locally, or DigitalOcean Serverless Inference). */
export const modelConfig = {
  baseUrl: process.env.MODEL_BASE_URL || "http://localhost:11434/v1",
  name: process.env.MODEL_NAME || "gemma3:4b",
  apiKey: process.env.MODEL_API_KEY || "ollama",
  supportsTools: process.env.MODEL_SUPPORTS_TOOLS === "true",
  /** "none" (or empty) turns off vector search for hosts without an embedding model */
  embedName: embedSetting === "none" ? "" : embedSetting,
};

export async function embed(text: string): Promise<number[]> {
  const res = await fetch(`${modelConfig.baseUrl}/embeddings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${modelConfig.apiKey}` },
    body: JSON.stringify({ model: modelConfig.embedName, input: text }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) throw new Error(`embedding failed: ${res.status}`);
  const json = (await res.json()) as { data: { embedding: number[] }[] };
  return json.data[0].embedding;
}
