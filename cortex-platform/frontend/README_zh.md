# Cortex 工作区前端

Cortex 工作区前端基于 Vue 3、TypeScript 和 Vite。本地默认通过 `5173` 端口访问；计划中的 Vercel Services 路由为 `/studio/`。

## 功能

- 聊天会话、计划面板与 WebSocket 事件流。
- 搜索、文件、终端、浏览器和 MCP 工具视图。
- Sandbox 查看器、登录、会话分享及文件上传/下载。
- 中文与英文界面。

## 开发

在此目录执行：

```bash
npm install
npm run dev
npm run type-check
npm test
npm run lint
npm run build
```

若要连接单独运行的 FastAPI 后端，在 `.env.development` 中设置 `VITE_API_URL=http://127.0.0.1:8000`，也可通过 `BACKEND_URL=http://localhost:8000 npm run dev` 启用本地 `/api` 代理。

完整本地服务栈请在 `cortex-platform/` 中执行 `docker compose up --build -d`。生产路由和限制见仓库根目录的 [Vercel 部署指南](../../CORTEX_VERCEL_DEPLOYMENT.md)。
