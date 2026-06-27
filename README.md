---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: '37d56cd4-1948-45a1-8819-70d3d144ce0b'
  PropagateID: '37d56cd4-1948-45a1-8819-70d3d144ce0b'
  ReservedCode1: '99cd2867-bebc-4edd-8dd3-1b6f5f340901'
  ReservedCode2: '99cd2867-bebc-4edd-8dd3-1b6f5f340901'
---

# Kernel's Blog CMS

Kernel's Blog 的内容管理后端，基于 [Strapi v5](https://strapi.io/) 构建，为 [Vue 3 前端](https://github.com/BJY-STUDIO/myprofile) 提供文章、作者等 RESTful API。

## 架构概览

| 层级 | 技术栈 | 部署平台 | 说明 |
|------|--------|----------|------|
| 前端展示 | Vue 3 + Material Web | Cloudflare Pages | [myprofile 仓库](https://github.com/BJY-STUDIO/myprofile) |
| 内容管理 | Strapi v5 | Render (免费 Web Service) | 本仓库 |
| 数据持久化 | PostgreSQL | Neon (免费 Hobby) | 连接池模式 |

前端通过 Strapi Public API 读取已发布文章，内容管理通过 Strapi Admin 面板或 Admin API 操作，所有数据存储在 Neon PostgreSQL 中。

## 项目结构

```
myprofile-cms/
├── config/
│   ├── database.ts        # 数据库连接配置（支持 PostgreSQL / SQLite）
│   ├── server.ts          # 服务配置（端口、CORS、Webhook）
│   └── admin.ts           # Admin 面板配置
├── src/
│   ├── api/
│   │   ├── article/       # Article 内容类型（标题、slug、正文、标签等）
│   │   └── author/        # Author 内容类型（姓名、角色、头像）
│   ├── extensions/        # 插件扩展
│   └── admin/             # Admin 面板自定义
├── public/                # 静态资源
├── .env.example           # 环境变量模板
├── package.json
└── tsconfig.json
```

### 内容类型

**Article** — 文章

| 字段 | 类型 | 说明 |
|------|------|------|
| title | Text (Short) | 文章标题 |
| slug | UID | URL 友好标识（基于 title 自动生成） |
| description | Text (Short) | 文章摘要 |
| content | Rich Text (Markdown) | 文章正文 |
| tags | JSON | 标签数组，如 `["m3", "deployment"]` |
| coverImage | Media (Single) | 封面图片 |
| author | Relation | 关联 Author（Article has one Author） |

**Author** — 作者

| 字段 | 类型 | 说明 |
|------|------|------|
| name | Text (Short) | 作者姓名 |
| role | Text (Short) | 作者角色 |
| avatar | Media (Single) | 作者头像 |

## 快速入门

### 环境要求

- **Node.js** >= 20（推荐 20.x LTS）
- **npm** >= 6
- **Git** >= 2.30

### 本地开发

1. **克隆仓库**

   ```bash
   git clone https://github.com/BJY-STUDIO/myprofile-cms.git
   cd myprofile-cms
   ```

2. **安装依赖**

   ```bash
   npm install
   ```

3. **配置环境变量**

   复制模板并填入实际值：

   ```bash
   cp .env.example .env
   ```

   `.env` 关键变量说明：

   | 变量名 | 必填 | 说明 |
   |--------|------|------|
   | `HOST` | 是 | 监听地址，默认 `0.0.0.0` |
   | `PORT` | 是 | 监听端口，默认 `1337` |
   | `APP_KEYS` | 是 | 加密 session 的密钥对，逗号分隔 |
   | `API_TOKEN_SALT` | 是 | API Token 加密盐 |
   | `ADMIN_JWT_SECRET` | 是 | Admin JWT 签名密钥 |
   | `TRANSFER_TOKEN_SALT` | 是 | 数据传输加密盐 |
   | `JWT_SECRET` | 是 | JWT 签名密钥 |
   | `ENCRYPTION_KEY` | 是 | 加密密钥 |
   | `DATABASE_CLIENT` | 否 | 数据库客户端，默认 `postgres` |
   | `DATABASE_HOST` | 否 | 数据库主机，默认 `127.0.0.1` |
   | `DATABASE_PORT` | 否 | 数据库端口，默认 `5432` |
   | `DATABASE_NAME` | 否 | 数据库名，默认 `strapi` |
   | `DATABASE_USERNAME` | 否 | 数据库用户名，默认 `strapi` |
   | `DATABASE_PASSWORD` | 否 | 数据库密码 |
   | `DATABASE_SSL` | 否 | 是否启用 SSL，Neon 需设为 `true` |
   | `EXTRA_CORS_ORIGINS` | 否 | 额外的 CORS 允许域名，逗号分隔 |

   生成随机密钥：

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. **启动开发服务器**

   ```bash
   npm run develop
   ```

   首次启动会自动创建数据库表结构。打开 http://localhost:1337/admin 创建管理员账号。

### 使用 SQLite（无需 PostgreSQL）

如果本地不想安装 PostgreSQL，可修改 `.env`：

```
DATABASE_CLIENT=sqlite
```

Strapi 会在项目根目录创建 SQLite 数据库文件。适合快速体验和本地调试。

### 连接远程 Strapi

如果不想本地运行 Strapi，前端可以直接访问部署在 Render 上的 Strapi 实例。在前端项目 `.env` 中配置：

```
VITE_API_BASE_URL=https://myprofile-cms.onrender.com/api
```

注意 Render 免费实例有 30-50 秒冷启动延迟。

## 部署到 Render

### 前置条件

1. 已创建 [Neon PostgreSQL](https://console.neon.tech/) 数据库，获取连接字符串
2. 已注册 [Render](https://dashboard.render.com/) 账号

### 部署步骤

1. **创建 Web Service**

   - 进入 Render Dashboard → New → Web Service
   - 选择 "Build and deploy from a Git repository"
   - 连接 `myprofile-cms` 仓库

2. **配置构建命令**

   | 配置项 | 值 |
   |--------|-----|
   | Build Command | `npm install && npm run build` |
   | Start Command | `npm run start` |
   | Node.js 版本 | 20 |

3. **设置环境变量**

   在 Render 的 Environment 界面逐一添加：

   | 变量名 | 值 |
   |--------|-----|
   | `NODE_ENV` | `production` |
   | `HOST` | `0.0.0.0` |
   | `PORT` | `10000` |
   | `DATABASE_CLIENT` | `postgres` |
   | `DATABASE_HOST` | Neon 主机地址（如 `ep-xxx.us-east-1.aws.neon.tech`） |
   | `DATABASE_PORT` | `5432` |
   | `DATABASE_NAME` | `neondb` |
   | `DATABASE_USERNAME` | Neon 用户名 |
   | `DATABASE_PASSWORD` | Neon 密码 |
   | `DATABASE_SSL` | `true` |
   | `APP_KEYS` | 两组随机 base64 字符串，逗号分隔 |
   | `API_TOKEN_SALT` | 随机 base64 字符串 |
   | `ADMIN_JWT_SECRET` | 随机 base64 字符串 |
   | `TRANSFER_TOKEN_SALT` | 随机 base64 字符串 |
   | `JWT_SECRET` | 随机 base64 字符串 |
   | `ENCRYPTION_KEY` | 随机 base64 字符串 |

4. **等待部署完成**

   首次部署约 3-5 分钟。部署成功后访问 `https://your-app.onrender.com/admin` 创建管理员账号。

### 配置 CORS

项目已在 `config/server.ts` 中预配置了以下 CORS 允许源：

- `http://localhost:5179`（本地开发）
- `http://localhost:1337`（本地 Strapi）
- `https://myprofile-2qp.pages.dev`（Cloudflare Pages 生产环境）

如需添加其他域名，设置 `EXTRA_CORS_ORIGINS` 环境变量（逗号分隔）。

## 通过 API 管理文章

### Public API（读取）

```bash
# 获取所有已发布文章（包含关联数据）
curl https://myprofile-cms.onrender.com/api/articles?populate=*
```

### Admin API（创建 / 更新 / 发布）

1. **登录获取 Token**

   ```bash
   curl -X POST https://myprofile-cms.onrender.com/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"your-email","password":"your-password"}'
   ```

2. **创建文章**

   ```bash
   curl -X POST https://myprofile-cms.onrender.com/content-manager/collection-types/api::article.article \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "文章标题",
       "slug": "article-slug",
       "description": "文章摘要",
       "content": "## Markdown 正文",
       "tags": ["tag1", "tag2"],
       "author": { "connect": ["AUTHOR_DOCUMENT_ID"] }
     }'
   ```

3. **发布文章**

   创建后文章为草稿状态，需单独发布：

   ```bash
   curl -X POST https://myprofile-cms.onrender.com/content-manager/collection-types/api::article.article/DOCUMENT_ID/actions/publish \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

> **注意**：`author` 字段必须使用 `{ "connect": ["documentId"] }` 格式，直接传字符串或数字会导致 500 错误。这是 Strapi v5 Admin API 的关联字段格式要求。

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run develop` | 启动开发服务器（热重载） |
| `npm run build` | 构建 Admin 面板 |
| `npm run start` | 启动生产服务器 |
| `npm run upgrade` | 升级 Strapi 到最新版本 |
| `npm run upgrade:dry` | 预览升级变更（不实际执行） |

## 成本

| 服务 | 月费用 | 说明 |
|------|--------|------|
| Render Web Service | 免费 | 750 小时/月，512MB RAM，冷启动 |
| Neon PostgreSQL | 免费 | 0.5GB 存储，基础计算 |
| Cloudflare Pages | 免费 | 500 次构建/月，不限带宽 |

**总计：0 元/月。** 唯一的使用代价是 Render 冷启动延迟（30-50 秒），前端通过降级策略自动处理。

## 相关项目

- [BJY-STUDIO/myprofile](https://github.com/BJY-STUDIO/myprofile) — Vue 3 + Material Web 前端
- [Strapi 官方文档](https://docs.strapi.io)
- [Material Design 3](https://m3.material.io)