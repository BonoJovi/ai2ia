# ai2ia - AI to instruct AI

<div align="center">

**Strumento di ottimizzazione dei prompt e confronto parallelo delle risposte IA**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](../../LICENSE)

</div>

Scrivi la tua idea, lascia che l'IA la trasformi nel prompt perfetto, poi lancialo a più modelli di IA contemporaneamente — confronta le risposte fianco a fianco e scegli la migliore! Costruito con [Tauri 2](https://tauri.app/) (Rust + HTML/CSS/JS).

## Funzionalità

- **Confronto multi-IA** - Invia prompt a OpenAI, Anthropic, Google AI e xAI contemporaneamente e confronta le risposte in pannelli paralleli
- **Ottimizzazione dei prompt** - Ottimizza automaticamente i tuoi prompt per ogni modello IA prima dell'invio
- **Generazione prompt tramite IA** - Descrivi la tua idea approssimativamente e lascia che l'IA generi un prompt elaborato
- **Pannelli drag & drop** - Riordina i pannelli di risposta IA trascinandoli
- **Layout flessibile** - Passa tra layout a 2, 3 o 4 colonne
- **7 lingue** - Inglese, giapponese, francese, italiano, tedesco, russo, arabo (supporto RTL incluso)
- **Tema scuro/chiaro** - Passa tra modalità scura e chiara
- **Archiviazione sicura delle chiavi API** - Le chiavi API sono memorizzate localmente sul tuo sistema

## Provider IA supportati

| Provider | Modelli |
|----------|---------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## Prerequisiti

- [Rust](https://rustup.rs/) (ultima versione stabile)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- Dipendenze di sistema per Tauri: vedi [Prerequisiti Tauri](https://v2.tauri.app/start/prerequisites/)

## Compilazione

```bash
# Installa le dipendenze Node
pnpm install

# Sviluppo
pnpm tauri dev

# Build di produzione
pnpm tauri build
```

## Struttura del progetto

```
ai2ia/
  src/              # Backend Rust
    main.rs         # Punto di ingresso
    lib.rs          # Configurazione app Tauri
    commands.rs     # Handler dei comandi Tauri
    modules/
      ai_client.rs  # Client API dei provider IA
      api_keys.rs   # Gestione chiavi API
  res/              # Frontend
    index.html      # Interfaccia principale
    index-ar.html   # Interfaccia araba (RTL)
    css/            # Fogli di stile
    js/             # Moduli JavaScript
  scripts/          # Script di rilascio
```

## Configurazione

Al primo avvio, vai in **Impostazioni** e inserisci le chiavi API per i provider che desideri utilizzare. Le chiavi sono archiviate in modo sicuro nella tua directory dati locale.

## Licenza

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
