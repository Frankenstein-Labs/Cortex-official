# Cortex workspace frontend

The Cortex workspace frontend is a Vue 3 + TypeScript + Vite application. It is served locally at port `5173` and, in the planned Vercel Services setup, at `/studio/`.

## Features

- Chat sessions, plan panel and WebSocket event streaming.
- Tool views for search, files, terminal, browser and MCP.
- Sandbox viewer, login, session sharing and file upload/download.
- Chinese and English UI locales.

## Development

From this directory:

```bash
npm install
npm run dev
npm run type-check
npm test
npm run lint
npm run build
```

For a separate local FastAPI backend, set `VITE_API_URL=http://127.0.0.1:8000` in `.env.development`, or start Vite with `BACKEND_URL=http://localhost:8000` to enable its local `/api` proxy.

For the whole local stack, use `docker compose up --build -d` from `cortex-platform/`. Production routing and deployment limits are documented in the repository-root [Vercel guide](../../CORTEX_VERCEL_DEPLOYMENT.md).
