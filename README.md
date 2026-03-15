<div align="center">

# Resume Copilot

**你的私人 AI 求职助理：粘贴 JD，一键生成定制简历、面试预测题与 LaTeX 导出**

本地优先，隐私优先，BYOK（自带 API Key）

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-SQLite-2d3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-6-000?style=flat-square)](https://sdk.vercel.ai/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[核心亮点](#核心亮点) • [产品展示](#产品展示) • [小白使用指南](#小白使用指南) • [技术实现](#技术实现) • [项目结构](#项目结构)

</div>

## 产品演示

GitHub README 对内嵌视频支持不稳定，所以这里改成更稳定的观看方式：

- [点击观看演示视频（MP4）](https://github.com/wanqin2003/resume-copilot/raw/main/public/demo-video.mp4)
- [点击打开 AI 定制工作台截图](https://raw.githubusercontent.com/wanqin2003/resume-copilot/main/public/demo-tailor.png)

[![Resume Copilot Demo](https://raw.githubusercontent.com/wanqin2003/resume-copilot/main/public/demo-tailor.png)](https://github.com/wanqin2003/resume-copilot/raw/main/public/demo-video.mp4)

## 核心亮点

- 一份全量履历，多份定制简历：不需要为每个岗位重复改简历。
- 反幻觉生成：AI 只做选择、裁剪、重组和包装，不会编造不存在的经历。
- STAR 法则重写：自动把项目描述改写得更像面试官爱看的版本。
- 面试预测：同时给出高频问题和薄弱点压力问题。
- 本地存储：简历和投递记录保存在本地 SQLite，不依赖第三方后端。
- LaTeX 导出：在网页中直接下载 `.tex` 文件，方便继续排版或导出 PDF。

## 产品展示

### 履历素材库

维护你的全量经历、技能、项目、简介，作为 AI 定制的素材源。

![Profile](https://raw.githubusercontent.com/wanqin2003/resume-copilot/main/public/demo-profile.png)

### AI 定制工作台

输入目标岗位 JD，自动输出：

- 定制个人优势总结
- 精准匹配技能关键词
- 最相关的 3 个项目
- 面试预测问题
- LaTeX 简历源码导出

![Tailor](https://raw.githubusercontent.com/wanqin2003/resume-copilot/main/public/demo-tailor.png)

### 投递看板

用清晰的看板方式追踪每一条机会，从准备到结束。

![Tracker](https://raw.githubusercontent.com/wanqin2003/resume-copilot/main/public/demo-tracker.png)

## 小白使用指南

如果你完全不懂技术，只想把它跑起来，按下面做就可以。

### 1. 先准备两样东西

1. 安装 [Node.js LTS](https://nodejs.org/zh-cn)
2. 准备一个大模型 API Key
   - OpenAI: [platform.openai.com](https://platform.openai.com/)
   - Anthropic: [console.anthropic.com](https://console.anthropic.com/)

### 2. 下载项目

1. 点击 GitHub 页面右上角 `Code`
2. 选择 `Download ZIP`
3. 解压到本地

### 3. 配置 AI 密钥

1. 找到项目里的 `.env.example`
2. 复制一份，重命名为 `.env.local`
3. 打开后填入你的 Key，例如：

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-你的真实密钥
OPENAI_MODEL=gpt-4o
```

### 4. 启动项目

#### Windows

1. 打开项目文件夹
2. 在地址栏输入 `cmd`
3. 回车后依次执行：

```bash
npm install
npx prisma db push
npm run dev
```

#### macOS

1. 打开“终端”
2. 输入 `cd ` 后把项目文件夹拖进去
3. 回车后依次执行：

```bash
npm install
npx prisma db push
npm run dev
```

看到 `Ready` 后，打开浏览器访问：

```text
http://localhost:3000
```

## 技术实现

这个项目不只是“能用”，也尽量保持了清晰的工程结构。

### 前端

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 风格组件

### 后端

- Next.js Route Handlers
- Prisma ORM
- SQLite 本地数据库

### AI 引擎

- Vercel AI SDK `generateObject`
- Zod 结构化输出约束
- 支持通过环境变量切换 OpenAI / Anthropic / 兼容 OpenAI 接口

### 输出能力

- 定制摘要
- 技能匹配
- 精选项目重写
- 面试预测
- LaTeX 代码导出

## 项目结构

```text
resume-copilot/
├── prisma/
│   └── schema.prisma              # Prisma 数据模型
├── public/
│   ├── demo-profile.png           # README 展示图
│   ├── demo-tailor.png            # README 展示图
│   ├── demo-tracker.png           # README 展示图
│   └── demo-video.mp4             # 演示视频
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── ai/tailor/route.ts # AI 定制 API
│   │   ├── applications/          # 投递看板页
│   │   ├── profile/               # 履历素材库页
│   │   ├── tailor/                # AI 定制工作台页
│   │   ├── globals.css            # 全局样式
│   │   └── layout.tsx             # 全局布局
│   ├── components/
│   │   ├── ui/                    # 基础 UI 组件
│   │   └── sidebar.tsx            # 侧边栏
│   └── lib/
│       ├── db.ts                  # Prisma Client
│       ├── latex.ts               # LaTeX 导出逻辑
│       ├── utils.ts               # 通用工具
│       └── schemas/
│           └── tailor.ts          # Zod Schema
├── .env.example
├── README.md
└── package.json
```

## 面向开发者

如果你是开发者，建议用下面的方式启动：

```bash
git clone https://github.com/wanqin2003/resume-copilot.git
cd resume-copilot
npm install
cp .env.example .env.local
npx prisma db push
npm run dev
```

构建检查：

```bash
npx next build
```

## 常见问题

### 为什么 README 里的视频不是直接嵌入播放？

因为 GitHub README 对 `video` 标签支持不稳定，很多时候不会正常渲染。改成“封面图 + 直接 MP4 链接”是最稳妥的做法。

### 为什么图片改了 GitHub 上没有立刻更新？

GitHub 和浏览器都有缓存。通常重新 push 后稍等几分钟，或者强刷页面即可。

### 这个项目是否适合开源展示和社交媒体传播？

适合。它同时具备：

- 面向普通用户的清晰价值
- 面向开发者的完整工程结构
- AI、前端、后端、数据库、Prompt、结构化输出等多维度技术点

## License

MIT
