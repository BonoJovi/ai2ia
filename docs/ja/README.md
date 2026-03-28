# ai2ia - AI to instruct AI

<div align="center">

**プロンプト最適化と複数AIレスポンス並列比較ツール**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](../../LICENSE)

**アイデアを書くだけでAIが最適なプロンプトに仕上げ、複数のAIモデルに一斉送信！**

**レスポンスを並べて比較し、ベストな回答を見つけよう！**

</div>

---

## 開発者からのメッセージ

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

</div>

## 対応AIプロバイダー

| プロバイダー | モデル |
|------------|--------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## 前提条件

- [Rust](https://rustup.rs/)（最新の安定版）
- [Node.js](https://nodejs.org/)（v18以上）
- [pnpm](https://pnpm.io/)
- Tauriのシステム依存パッケージ: [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/) を参照

## ビルド

```bash
# Node依存パッケージのインストール
pnpm install

# 開発モード
pnpm tauri dev

# プロダクションビルド
pnpm tauri build
```

## プロジェクト構成

```
ai2ia/
  src/              # Rustバックエンド
    main.rs         # エントリーポイント
    lib.rs          # Tauriアプリ設定
    commands.rs     # Tauriコマンドハンドラ
    modules/
      ai_client.rs  # AIプロバイダーAPIクライアント
      api_keys.rs   # APIキー管理
  res/              # フロントエンド
    index.html      # メインUI
    index-ar.html   # アラビア語（RTL）UI
    css/            # スタイルシート
    js/             # JavaScriptモジュール
  scripts/          # リリーススクリプト
```

## 設定

初回起動時に**設定**（Settings）を開き、使用したいプロバイダーのAPIキーを入力してください。キーはローカルデータディレクトリに安全に保存されます。

## ライセンス

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
