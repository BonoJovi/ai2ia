# ai2ia - AI to instruct AI

<div align="center">

[JA](docs/ja/README.md) | [FR](docs/fr/README.md) | [IT](docs/it/README.md) | [DE](docs/de/README.md) | [RU](docs/ru/README.md) | [AR](docs/ar/README.md)

**Prompt optimization and parallel AI response comparison tool**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/bonojovi)

**Write your idea, let AI optimize it into a perfect prompt, then fire it at multiple AI models at once —**

**compare their answers side by side and pick the best!**

</div>

---

## Message from Developer / 開発者からのメッセージ

<div style="border: 3px solid #4a90e2; padding: 20px; margin: 20px 0; background-color: #f8f9fa; font-size: 1.1em;">

### ai2iaユーザの皆さんへ

ai2iaに関心を寄せていただき、ありがとうございます。
プロジェクト発案者のBonoJovi(Yoshihiro NAKAHARA)です。

**🎉 v2.0.0 をリリースいたしました！全機能が無料でご利用いただけます。**

**主な機能**:
- **マルチAI比較** - OpenAI、Anthropic、Google AI、xAIに同時送信し、レスポンスを並列パネルで比較
- **プロンプト最適化** - 送信前に各AIモデル向けにプロンプトを自動最適化
- **AIプロンプト生成** - アイデアをざっくり書くだけで、AIが洗練されたプロンプトを生成
- **ドラッグ＆ドロップ** - AIレスポンスパネルをドラッグで並べ替え
- **柔軟なレイアウト** - 2列、3列、4列レイアウトを切り替え
- **7言語対応** - 英語、日本語、フランス語、イタリア語、ドイツ語、ロシア語、アラビア語（RTL対応含む）
- **ダーク/ライトテーマ** - ダークモードとライトモードの切り替え
- **安全なAPIキー管理** - APIキーはローカルシステムに安全に保存

**[Announcement] フィードバックをお待ちしています！**
- [Issues](https://github.com/BonoJovi/ai2ia/issues) または [Discussions](https://github.com/BonoJovi/ai2ia/discussions) でご意見をお寄せください！

**2026-03-28 (JST) Written by Yoshihiro NAKAHARA**

---

### To ai2ia Users

Thank you for your interest in ai2ia.
I'm BonoJovi (Yoshihiro NAKAHARA), the project initiator.

**🎉 We have released v2.0.0! All features are now free to use.**

**Key Features**:
- **Multi-AI Comparison** - Send prompts to OpenAI, Anthropic, Google AI, and xAI simultaneously and compare responses in parallel panels
- **Prompt Optimization** - Automatically optimize your prompts for each AI model before sending
- **AI Prompt Generation** - Describe your idea roughly and let AI generate a polished prompt for you
- **Drag & Drop Panels** - Rearrange AI response panels by dragging
- **Flexible Layout** - Switch between 2, 3, or 4 column layouts
- **7 Languages** - English, Japanese, French, Italian, German, Russian, Arabic (including RTL support)
- **Dark/Light Theme** - Toggle between dark and light mode
- **Secure API Key Storage** - API keys are stored locally on your system

**[Announcement] We want to hear from you!**
- Share your ideas on [Issues](https://github.com/BonoJovi/ai2ia/issues) or [Discussions](https://github.com/BonoJovi/ai2ia/discussions)!

**2026-03-28 (JST) Written by Yoshihiro NAKAHARA**

</div>

<!-- STATS_START -->
## 📊 Repository Statistics

<div align="center">

### 📈 Daily Traffic

![Daily Traffic Stats](docs/stats_graph_daily.png)

### 📊 Cumulative Traffic

![Cumulative Traffic Stats](docs/stats_graph_cumulative.png)

| Metric | Count |
|--------|-------|
| 👁️ **Total Views** | **5** |
| 📦 **Total Clones** | **120** |

*Last Updated: 2026-04-05 01:35 UTC*

</div>
<!-- STATS_END -->

---

## Supported AI Providers

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- System dependencies for Tauri: see [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/)

## Build

```bash
# Install Node dependencies
pnpm install

# Development
pnpm tauri dev

# Production build
pnpm tauri build
```

## Project Structure

```
ai2ia/
  src/              # Rust backend
    main.rs         # Entry point
    lib.rs          # Tauri app setup
    commands.rs     # Tauri command handlers
    modules/
      ai_client.rs  # AI provider API clients
      api_keys.rs   # API key management
  res/              # Frontend
    index.html      # Main UI
    index-ar.html   # Arabic (RTL) UI
    css/            # Stylesheets
    js/             # JavaScript modules
  scripts/          # Release scripts
```

## Configuration

On first launch, go to **Settings** and enter your API keys for the providers you want to use. Keys are stored securely in your local data directory.

## License

[MIT](LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/bonojovi)
