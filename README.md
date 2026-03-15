<div align="center">
  <h1>✨ Resume Copilot</h1>
  <p><strong>AI-Powered Career Management & Smart Job Application Assistant</strong></p>
  <p>基于大模型的个人职业生涯管理与智能投递助理<br/>本地存储 · 隐私优先 · BYOK（自带 API Key）</p>

  <p>
    <a href="#quick-start">Quick Start</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#contributing">Contributing</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Prisma-SQLite-2d3748?style=flat-square&logo=prisma" alt="Prisma" />
    <img src="https://img.shields.io/badge/Vercel_AI_SDK-6-000?style=flat-square" alt="AI SDK" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
  </p>
</div>

---

## The Problem

每次投递简历，你是否都在做这些重复劳动？

- 🔁 从"全量简历"里手动挑选、删减经历
- ✍️ 根据 JD 反复修改措辞和描述
- 🤔 猜测面试官可能会问什么问题
- 📊 用 Excel 或备忘录追踪投递状态

**Resume Copilot** 用 AI 帮你自动化这一切。

## Features

### 📋 履历素材库 (Master Profile)
维护一份**全量简历数据**——所有技能、经历、项目一个不落。AI 会根据目标岗位自动筛选最匹配的内容。

### 🎯 AI 定制工作台 (Tailor Studio)
粘贴目标岗位的 JD，一键生成：
- **定制化自我介绍**：高度贴合 JD 核心诉求
- **匹配技能标签**：从你的技能库中精准挑选
- **精选项目经历**：STAR 法则重写，最多 3 个最相关项目
- **面试预测**：高频题（你的强项）+ 压力测试题（可能的短板）+ 策略建议

### 📊 投递看板 (Application Tracker)
看板视图追踪每一次投递：`准备中` → `已投递` → `面试中` → `已结束`

### 🔒 隐私优先
- **数据全部存储在本地 SQLite**，不上传任何服务器
- **BYOK 模式**：使用你自己的 API Key，支持 OpenAI / Anthropic / 兼容接口

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui |
| Database | Prisma ORM + SQLite |
| AI Engine | Vercel AI SDK + Zod structured output |
| AI Models | OpenAI GPT-4o / Anthropic Claude 3.5 (switchable) |

## Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- An **OpenAI** or **Anthropic** API Key

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/resume-copilot.git
cd resume-copilot
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API key:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4o
```

<details>
<summary>💡 Using Anthropic instead?</summary>

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-your-key-here
ANTHROPIC_MODEL=claude-3-5-sonnet-20240620
```
</details>

<details>
<summary>💡 Using a local model (Ollama)?</summary>

```env
AI_PROVIDER=openai
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_MODEL=llama3
```
</details>

### 3. Initialize Database

```bash
npx prisma db push
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start building your career profile!

## Project Structure

```
resume-copilot/
├── prisma/
│   └── schema.prisma          # Data models (MasterProfile, Application)
├── src/
│   ├── app/
│   │   ├── api/ai/tailor/     # AI tailoring API route
│   │   ├── profile/           # Master Profile page
│   │   ├── applications/      # Application Tracker page
│   │   ├── tailor/            # AI Tailor Studio page
│   │   └── layout.tsx         # Root layout with sidebar
│   ├── components/
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── db.ts              # Prisma client singleton
│       ├── utils.ts           # Utility functions
│       └── schemas/
│           └── tailor.ts      # Zod schemas for AI output
├── .env.example               # Environment template
└── package.json
```

## How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Master Profile  │────▶│  AI Tailor API    │────▶│  Tailored Resume │
│  (Your full CV)  │     │  + Target JD      │     │  + Interview Prep │
└─────────────────┘     └──────────────────┘     └─────────────────┘
        │                        │
        │                  ┌─────┴──────┐
        │                  │  Zod Schema │  ← Structured output
        │                  │  + System   │    (no hallucination)
        │                  │    Prompt   │
        │                  └────────────┘
        │
        ▼
┌─────────────────┐
│  Application     │
│  Tracker Board   │  ← Track all your applications
└─────────────────┘
```

**Core AI Rules:**
1. **Anti-hallucination** — Never fabricates skills or experiences
2. **STAR format** — Rewrites bullets with Situation-Task-Action-Result
3. **Smart selection** — Picks top 3 most relevant projects
4. **Interview prep** — Predicts questions from strengths AND weaknesses

## Roadmap

- [ ] Profile data persistence (save/load from SQLite)
- [ ] PDF resume export
- [ ] Application CRUD operations
- [ ] Drag-and-drop kanban board
- [ ] Multi-language resume generation
- [ ] Chrome extension for one-click JD import
- [ ] Resume version history & diff

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>If this project helps you land your dream job, consider giving it a ⭐!</p>
  <p>Built with ❤️ and AI</p>
</div>
