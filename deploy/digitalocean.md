# Gemma on DigitalOcean

The deployed Saathi uses **Gemma 4 (31B) on DigitalOcean Serverless Inference**: an OpenAI-compatible
endpoint, billed per token, with nothing to run or patch. A typical "Ask Saathi" answer costs about $0.0002.

## Set it up

1. In the DigitalOcean control panel, open **Inference Engine → Model Catalog** and confirm **Gemma 4** (`gemma-4-31B-it`) is listed as Serverless.
2. **Inference Engine → Model Access Keys → Create Key.** Choose **Select models** and tick **only Gemma 4**, so a leaked key can't run expensive models.
3. Set these on Render (or in `.env.local` to try it locally):

```
MODEL_BASE_URL=https://inference.do-ai.run/v1
MODEL_NAME=gemma-4-31B-it
MODEL_API_KEY=<your Model Access Key>
MODEL_SUPPORTS_TOOLS=true
EMBED_MODEL_NAME=none
```

`MODEL_SUPPORTS_TOOLS=true` turns on Mastra tools (help-note search, scam scan) and working memory,
because Gemma 4 does native tool calling. There is no serverless embedding model, so `EMBED_MODEL_NAME=none`
makes help notes use keyword search online. Atlas Vector Search still runs locally with EmbeddingGemma.

## Test it

```bash
curl https://inference.do-ai.run/v1/chat/completions \
  -H "Authorization: Bearer $MODEL_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gemma-4-31B-it","messages":[{"role":"user","content":"Say namaste"}]}'
```

## Fully offline instead

```bash
ollama pull gemma3:4b
ollama pull embeddinggemma
```

Keep `MODEL_BASE_URL=http://localhost:11434/v1`. Saathi then runs on a laptop with no internet at all:
lessons, Ask Saathi, the scam checker and Atlas-free keyword search, with pre-generated narration.
