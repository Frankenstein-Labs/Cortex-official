# Cortex 快速开始

## 环境要求

- Docker Engine 20.10+ 与 Docker Compose。
- 支持工具调用的 LLM 服务及其 API Key。

## 本地启动工作区

在仓库根目录执行：

```bash
cd cortex-platform
cp .env.example .env
```

编辑 `cortex-platform/.env`，至少设置：

```env
API_KEY=你的模型服务密钥
CORTEX_SSO_SECRET=请使用足够长的随机字符串
```

构建并启动服务：

```bash
docker compose up --build -d
```

访问 <http://localhost:5173>。`AUTH_PROVIDER=none` 仅供私有本地冒烟测试，不要用于生产环境。

## 本地运行站点

Next.js 站点位于仓库根目录。根据根目录 `.env.local.example` 配置 `.env.local`，提供 Supabase 配置和相同的 `CORTEX_SSO_SECRET`，并设置 `NEXT_PUBLIC_CORTEX_STUDIO_URL=http://localhost:5173`：

```bash
cd ..
npm install
npm run dev
```

访问 <http://localhost:3000>。本地 Docker Compose 不是 Vercel 部署方式。

## Vercel

请参阅仓库根目录的 [Cortex Vercel 部署指南](../../CORTEX_VERCEL_DEPLOYMENT.md)。开放 Vercel 上的 Agent 执行前，必须先将当前 Docker socket Sandbox provider 替换为隔离的 Sandbox runtime。
