# Cortex Platform

Cortex Platform 是本仓库 Cortex 产品使用的 Web 工作区与 Agent 后端。

## 组成

- `frontend/`：Vue 3 + Vite 工作区界面。
- `backend/`：FastAPI Agent API、WebSocket 事件流、认证、技能和文件服务。
- `sandbox/`：当前本地 Agent runtime 使用的 Docker 镜像。
- `docker-compose.yml`：本地开发服务（前端、后端、Sandbox 镜像构建、MongoDB、Redis）。

仓库根目录的 Next.js 站点负责介绍与用户认证，并通过 `/workspace`、`/studio` 打开工作区。

## 本地开发

1. 从 `.env.example` 创建 `cortex-platform/.env`。
2. 至少配置 `API_KEY` 和足够长的随机 `CORTEX_SSO_SECRET`。
3. 启动本地服务：

   ```bash
   cd cortex-platform
   docker compose up --build -d
   ```

4. 访问 <http://localhost:5173>。根目录 Next.js 站点需单独运行 `npm run dev`，并按根目录示例配置 `.env.local`。

## Vercel

仓库根目录的 `vercel.json` 描述 Next.js 站点、Vite 工作区与 FastAPI API 的 Vercel Services 路由。Vercel 不会自动转换 Docker Compose。**当前基于 Docker 的逐任务 Sandbox 不能直接在 Vercel Function 中运行**；开放 Agent 执行前，必须接入隔离的 Vercel Sandbox 或外部 Sandbox 服务。计费服务也仍然独立。

参阅 [Vercel 部署说明](../CORTEX_VERCEL_DEPLOYMENT.md)。
