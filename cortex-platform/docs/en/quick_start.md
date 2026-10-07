# Cortex quick start

## Requirements

- Docker Engine 20.10+ and Docker Compose.
- An API key for an LLM provider that supports tool calling.

## Run the local workspace

From the repository root:

```bash
cd cortex-platform
cp .env.example .env
```

Edit `cortex-platform/.env` and set at least:

```env
API_KEY=your-model-provider-key
CORTEX_SSO_SECRET=use-a-long-random-secret
```

Then build and start the stack:

```bash
docker compose up --build -d
```

Open <http://localhost:5173> for the local workspace. For a local auth-free smoke test, use the documented `AUTH_PROVIDER=none` mode only in a private development environment; do not use it in production.

## Run the public site locally

The Next.js site is at the repository root. Configure `.env.local` from the repository-root `.env.local.example`, including Supabase settings and a matching `CORTEX_SSO_SECRET`. Set `NEXT_PUBLIC_CORTEX_STUDIO_URL=http://localhost:5173`, then run:

```bash
cd ..
npm install
npm run dev
```

Open <http://localhost:3000>. Local Docker Compose is not the Vercel deployment mechanism.

## Vercel

See [Cortex Vercel deployment](../../../CORTEX_VERCEL_DEPLOYMENT.md) for Vercel Services routing, build commands, environment variables and the production blockers. In particular, the Docker-socket sandbox provider must be replaced before enabling agent execution on Vercel.
