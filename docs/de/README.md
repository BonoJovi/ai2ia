# ai2ia - AI to instruct AI

<div align="center">

> **Werkzeug zur Prompt-Optimierung und parallelen Vergleich von KI-Antworten**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](../../LICENSE)

</div>

ai2ia ist eine Desktop-Anwendung, mit der Sie Prompts schreiben, sie für verschiedene KI-Modelle optimieren und die Antworten nebeneinander vergleichen können. Entwickelt mit [Tauri 2](https://tauri.app/) (Rust + HTML/CSS/JS).

## Funktionen

- **Multi-KI-Vergleich** - Senden Sie Prompts gleichzeitig an OpenAI, Anthropic, Google AI und xAI und vergleichen Sie die Antworten in parallelen Panels
- **Prompt-Optimierung** - Optimieren Sie Ihre Prompts automatisch für jedes KI-Modell vor dem Senden
- **KI-Prompt-Generierung** - Beschreiben Sie Ihre Idee grob und lassen Sie die KI einen ausgearbeiteten Prompt generieren
- **Drag & Drop Panels** - Ordnen Sie die KI-Antwort-Panels per Drag & Drop neu an
- **Flexibles Layout** - Wechseln Sie zwischen 2, 3 oder 4 Spalten
- **7 Sprachen** - Englisch, Japanisch, Französisch, Italienisch, Deutsch, Russisch, Arabisch (einschließlich RTL-Unterstützung)
- **Dunkles/Helles Theme** - Wechseln Sie zwischen dunklem und hellem Modus
- **Sichere API-Schlüssel-Speicherung** - API-Schlüssel werden lokal auf Ihrem System gespeichert

## Unterstützte KI-Anbieter

| Anbieter | Modelle |
|----------|---------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## Voraussetzungen

- [Rust](https://rustup.rs/) (neueste stabile Version)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- Systemabhängigkeiten für Tauri: siehe [Tauri-Voraussetzungen](https://v2.tauri.app/start/prerequisites/)

## Kompilierung

```bash
# Node-Abhängigkeiten installieren
pnpm install

# Entwicklung
pnpm tauri dev

# Produktions-Build
pnpm tauri build
```

## Projektstruktur

```
ai2ia/
  src/              # Rust-Backend
    main.rs         # Einstiegspunkt
    lib.rs          # Tauri-App-Konfiguration
    commands.rs     # Tauri-Befehlshandler
    modules/
      ai_client.rs  # KI-Anbieter-API-Clients
      api_keys.rs   # API-Schlüssel-Verwaltung
  res/              # Frontend
    index.html      # Hauptoberfläche
    index-ar.html   # Arabische (RTL) Oberfläche
    css/            # Stylesheets
    js/             # JavaScript-Module
  scripts/          # Release-Skripte
```

## Konfiguration

Beim ersten Start gehen Sie zu **Einstellungen** und geben Sie Ihre API-Schlüssel für die gewünschten Anbieter ein. Die Schlüssel werden sicher in Ihrem lokalen Datenverzeichnis gespeichert.

## Lizenz

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
