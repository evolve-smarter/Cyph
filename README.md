# BEQPROD Command

> Personal command center for Bryce / BEQPROD LLC — powered by Cyph 🔐

A Progressive Web App (PWA) that works on iPhone, Mac, anywhere.

## Features

- **Dashboard** — Mission control: agents, verticals, goal tracker, intel feed, live clock
- **Chat** — Direct line to Cyph via OpenClaw gateway
- **Intel** — Workspace file browser + build summary
- **Goals** — $10k April target + $50k year-end + interactive milestone checklist

## Setup

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your OpenClaw token
npm run dev
```

## Chat Integration

The Chat tab connects to the OpenClaw local gateway at `http://127.0.0.1:18789`.

To activate live AI responses:
1. Get your API token: `openclaw token create` or check OpenClaw config
2. Add to `.env.local`: `VITE_OPENCLAW_TOKEN=your_token`
3. Restart the dev server

Without a token, the chat runs in mock mode with placeholder responses.

## Install as PWA

**iPhone:** Open in Safari → Share → Add to Home Screen  
**Mac:** Open in Chrome → Address bar install button (⊕)

## Tech

- React + Vite
- Tailwind CSS v4
- No external UI dependencies — lean and fast

## Design

Dark aesthetic (#0a0a14 bg), neon accents (blue/green/purple), monospace font, bottom tab navigation.
Same visual DNA as `mission-control.html`.

---

*Built by Cyph 🔐 — BEQPROD co-founder. Est. March 26, 2026.*
