# Cortex 工作区文档

Cortex 是用于 AI 辅助软件开发和研究任务的 Web 工作区。本文档介绍工作区前端、FastAPI Agent 后端、Skills、MCP 配置以及当前本地 runtime。

## 从这里开始

- [快速开始](quick_start.md)：使用 Docker Compose 在本地启动工作区。
- [配置](configuration.md)：模型、数据库、Redis、Sandbox、搜索和认证设置。
- [Skills 技能](skills.md)：上传/导入可复用技能包并在任务中调用。
- [MCP 配置](mcp.md)：连接外部工具服务。
- [架构](architecture.md)：服务边界和任务流程。

## 部署状态

仓库根目录包含用于 Next.js 站点、Vite 工作区和 FastAPI API 的 Vercel Services 配置。这是部署准备，并不代表完整 Agent 已可直接在 Vercel 上投入生产。当前依赖 Docker socket 的 Sandbox provider 必须替换为隔离的 Vercel Sandbox 或外部 runtime；此外，生产环境还需要部署独立的计费 API，或将计费迁移进本项目。

参阅仓库根目录的 [Vercel 部署指南](../../CORTEX_VERCEL_DEPLOYMENT.md)。
