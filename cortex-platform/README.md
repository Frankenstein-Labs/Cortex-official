# Cortex Platform

Cortex is the web workspace and agent backend used by the Cortex product repository.

## Components

- `frontend/`: Vue 3 + Vite workspace UI.
- `backend/`: FastAPI agent API, WebSocket event stream, authentication, skills and file services.
- `sandbox/`: Docker image used by the current local agent runtime.
- `docker-compose.yml`: local development stack (frontend, backend, sandbox image build, MongoDB and Redis).

The marketing/authentication site lives at the repository root in Next.js. It hands authenticated users to the workspace at `/workspace` and `/studio`.

## Local development

1. Create `cortex-platform/.env` from `.env.example`.
2. Set at least `API_KEY` and a long random `CORTEX_SSO_SECRET`.
3. Start the local stack:

   ```bash
   cd cortex-platform
   docker compose up --build -d
   ```

4. Open the local workspace at <http://localhost:5173>. Run the root Next.js site separately with `npm run dev` after configuring `.env.local` from the repository-root example.

## Vercel

The repository-root `vercel.json` describes Vercel Services routing for the Next.js site, Vite workspace and FastAPI API. It does not convert Docker Compose automatically. **The current Docker-based per-task sandbox is not ready to run inside a Vercel Function**; an isolated Vercel Sandbox or external sandbox adapter is required before enabling agent execution for users. Billing also remains a separate service.

See [Cortex Vercel deployment notes](../CORTEX_VERCEL_DEPLOYMENT.md) for routes, build commands, environment variables and the go-live checklist.
