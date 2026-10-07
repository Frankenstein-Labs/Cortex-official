# Cortex

Cortex is a browser-based AI workspace for software development. This repository contains the public Next.js site, the authenticated workspace shell, a Vue/Vite application and a FastAPI backend.

## Repository layout

- `app/`, `components/`, `utils/`: Next.js site, authentication and workspace host.
- `cortex-platform/frontend/`: Vue/Vite workspace UI.
- `cortex-platform/backend/`: FastAPI API, agent orchestration and WebSocket routes.
- `cortex-platform/sandbox/`: sandbox service used by the local Docker Compose stack.
- `CORTEX_VERCEL_DEPLOYMENT.md`: Vercel Services architecture, environment variables and deployment blockers.

## Architecture status

The web application currently uses the agent backend included in `cortex-platform/`. Rebranding the web application does **not** mean that the Cortex.dev editor extension runtime has already been ported into this server. The editor runtime and the web-agent backend are separate code paths; replacing the backend with the actual Cortex Agent runtime remains a distinct integration task.

## Local development

### Marketing site and account shell

Requirements: Node.js 20+ and Yarn 1.22.

```bash
yarn install --frozen-lockfile
cp .env.local.example .env.local
yarn dev
```

Open `http://localhost:3000`.

### Agent workspace stack

Requirements: Docker and Docker Compose.

```bash
cd cortex-platform
cp .env.example .env
# Set the model provider credentials and local secrets in .env.
./dev.sh up
```

The local workspace frontend is served by Vite and the API by FastAPI. The Cortex site can host the workspace at `/workspace` when the services are configured together.

## Environment variables

Do not commit `.env`, `.env.local`, API keys, database credentials, or signing secrets. Start from the checked-in examples and see the deployment guide for the full Vercel variable matrix.

For the web shell, configure at least:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `CORTEX_SSO_SECRET` (same secret on the site and agent API)

The agent API also needs a model provider, MongoDB, Redis, JWT/session secrets and an isolated sandbox provider. The current Docker sandbox configuration is for local development; production deployment requires a Vercel Sandbox adapter or another isolated sandbox service.

## Validation

```bash
yarn lint
cd cortex-platform/frontend && npm ci && npm run type-check && npm test -- --reporter=dot && npm run build
```

## Upstream and third-party notices

Some components in `cortex-platform/` originate from an independently licensed web-agent project. Preserve its `LICENSE` and notices when modifying or redistributing that code. The Cortex mark used by this site is copied from the Cortex Agent repository; see `THIRD_PARTY_NOTICES.md`.
