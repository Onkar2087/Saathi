# Running Gemma on a DigitalOcean Droplet

Saathi talks to any OpenAI-compatible endpoint. On DigitalOcean we run **Ollama + Gemma** and put a
small Caddy proxy in front so only Saathi (holding a secret key) can use it.

## 1. Create the Droplet

- **GPU Droplet** (fastest): pick a 1-Click Model / Ollama image, or a plain Ubuntu GPU image.
- **CPU Droplet** (cheapest): `gemma3:4b` runs acceptably on 8 GB RAM / 4 vCPU for a demo.

GPU Droplets bill by the hour. **Destroy it after recording your demo.**

## 2. Install Ollama and pull the models

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull gemma3:4b        # tutor + scam explainer
ollama pull embeddinggemma   # help-note embeddings for Atlas Vector Search
```

Ollama listens on `127.0.0.1:11434`. Leave it there; never expose it directly.

## 3. Put Caddy in front with a bearer key

```bash
sudo apt install -y caddy
export SAATHI_KEY=$(openssl rand -hex 24); echo $SAATHI_KEY   # copy this
```

`/etc/caddy/Caddyfile` (replace the domain with one pointing at the Droplet for automatic HTTPS):

```
gemma.example.com {
  @auth header Authorization "Bearer {$SAATHI_KEY}"
  handle @auth {
    reverse_proxy 127.0.0.1:11434
  }
  respond 401
}
```

Add `SAATHI_KEY=...` to `/etc/default/caddy`, then `sudo systemctl restart caddy`.
In the DigitalOcean Cloud Firewall, allow only ports 22, 80 and 443.

## 4. Point Saathi at it

```
MODEL_BASE_URL=https://gemma.example.com/v1
MODEL_API_KEY=<SAATHI_KEY>
MODEL_NAME=gemma3:4b
```

Test it:

```bash
curl https://gemma.example.com/v1/chat/completions \
  -H "Authorization: Bearer $SAATHI_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gemma3:4b","messages":[{"role":"user","content":"Say namaste"}]}'
```

## Going fully offline instead

Run the same two `ollama pull` commands on a laptop and keep `MODEL_BASE_URL=http://localhost:11434/v1`.
Saathi then works with no internet at all (lessons, Ask Saathi and the scam checker), using the browser's built-in voice.
