# Cortex workspace documentation

Cortex is a web workspace for AI-assisted software and research tasks. This documentation covers the workspace frontend, FastAPI agent backend, skills, MCP configuration and the current local runtime.

## Start here

- [Quick start](quick_start.md) — run the workspace locally with Docker Compose.
- [Configuration](configuration.md) — model, database, Redis, sandbox, search and authentication settings.
- [Skills](skills.md) — upload/import reusable skill packages and invoke them in a task.
- [MCP](mcp.md) — connect external tool servers.
- [Architecture](architecture.md) — service boundaries and task flow.

## Deployment status

The repository root contains Vercel Services configuration for the Next.js site, Vite workspace and FastAPI API. This is deployment preparation, not a claim that the full agent is production-ready on Vercel. The current Docker-socket sandbox provider must be replaced with an isolated Vercel Sandbox or external runtime, and the separate billing API must be provisioned or migrated before production use.

See the repository-level [Vercel deployment guide](../../../CORTEX_VERCEL_DEPLOYMENT.md).
