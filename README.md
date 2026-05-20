# SESSION-ID — POPKID

WhatsApp session ID generator using Baileys pair code flow + Mega.nz upload.

## Deploy on Render

1. Push this folder to a GitHub repo
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` — just click **Deploy**

Or manually set:
| Field | Value |
|---|---|
| Build Command | `npm install` |
| Start Command | `npm start` |
| Node Version | 20 |

## Routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/pair` | Pair code UI |
| `/code?number=2547XXXXXXXX` | Get pair code for a number |
| `/health` | Health check (used by Render) |

## What changed for Render

- `index.js` now binds to `0.0.0.0` (required by Render)
- `PORT` defaults to `8000`, respects `process.env.PORT` (Render sets 10000)
- `process.exit()` removed from `pair.js` — it would kill the dyno for all users; session is cleaned up gracefully instead
- Unused/conflicting npm packages removed from `package.json`
- `temp/` folder pre-created with `.gitkeep`
- `render.yaml` added for one-click deploy
