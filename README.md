# SESSION-ID — POPKID

WhatsApp session ID generator using Baileys pair code flow + Mega.nz upload.

## Deploy on Koyeb

### Option 1 — One-click via GitHub (recommended)

1. Push this folder to a GitHub repo
2. Go to [koyeb.com](https://koyeb.com) → **Create App** → **GitHub**
3. Select your repo and branch (`main`)
4. Set these settings:
   | Field | Value |
   |---|---|
   | Builder | Buildpack (auto-detected) |
   | Build Command | `npm install` |
   | Run Command | `npm start` |
   | Port | `8000` |
5. Add environment variable: `NODE_ENV` = `production`
6. Click **Deploy**

### Option 2 — Koyeb CLI

```bash
koyeb app create session-id-popkid
koyeb service create \
  --app session-id-popkid \
  --name web \
  --git github.com/YOUR_USERNAME/YOUR_REPO \
  --git-branch main \
  --build-command "npm install" \
  --run-command "npm start" \
  --port 8000:http \
  --env NODE_ENV=production \
  --health-check-path /health
```

## Routes

| Route | Description |
|---|---|
| `/` | Main landing page |
| `/pair` | Pair code UI |
| `/code?number=2547XXXXXXXX` | Get pair code for a number |
| `/health` | Health check |

## Notes for Koyeb

- App binds to `0.0.0.0:8000` — compatible with Koyeb's routing
- `PORT` env var defaults to `8000` (Koyeb's default)
- `/health` endpoint used for health checks
- `temp/` folder pre-created with `.gitkeep`
