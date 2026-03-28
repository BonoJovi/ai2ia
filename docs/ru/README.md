# ai2ia - AI to instruct AI

<div align="center">

**Инструмент для оптимизации промптов и параллельного сравнения ответов ИИ**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](../../LICENSE)

</div>

Напишите свою идею, позвольте ИИ превратить её в идеальный промпт, затем отправьте его сразу нескольким моделям ИИ — сравните ответы бок о бок и выберите лучший! Создано с помощью [Tauri 2](https://tauri.app/) (Rust + HTML/CSS/JS).

## Возможности

- **Сравнение нескольких ИИ** — отправляйте промпты в OpenAI, Anthropic, Google AI и xAI одновременно и сравнивайте ответы в параллельных панелях
- **Оптимизация промптов** — автоматическая оптимизация промптов для каждой модели ИИ перед отправкой
- **Генерация промптов с помощью ИИ** — опишите свою идею приблизительно, и ИИ сгенерирует проработанный промпт
- **Перетаскивание панелей** — переупорядочивайте панели ответов ИИ перетаскиванием
- **Гибкая компоновка** — переключайтесь между 2, 3 или 4 столбцами
- **7 языков** — английский, японский, французский, итальянский, немецкий, русский, арабский (включая поддержку RTL)
- **Тёмная/светлая тема** — переключение между тёмным и светлым режимом
- **Безопасное хранение API-ключей** — API-ключи хранятся локально на вашей системе

## Поддерживаемые провайдеры ИИ

| Провайдер | Модели |
|-----------|--------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## Требования

- [Rust](https://rustup.rs/) (последняя стабильная версия)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- Системные зависимости для Tauri: см. [Требования Tauri](https://v2.tauri.app/start/prerequisites/)

## Сборка

```bash
# Установка зависимостей Node
pnpm install

# Разработка
pnpm tauri dev

# Продакшн-сборка
pnpm tauri build
```

## Структура проекта

```
ai2ia/
  src/              # Бэкенд на Rust
    main.rs         # Точка входа
    lib.rs          # Настройка приложения Tauri
    commands.rs     # Обработчики команд Tauri
    modules/
      ai_client.rs  # API-клиенты провайдеров ИИ
      api_keys.rs   # Управление API-ключами
  res/              # Фронтенд
    index.html      # Основной интерфейс
    index-ar.html   # Арабский (RTL) интерфейс
    css/            # Таблицы стилей
    js/             # JavaScript-модули
  scripts/          # Скрипты релиза
```

## Настройка

При первом запуске перейдите в **Настройки** и введите API-ключи для провайдеров, которых хотите использовать. Ключи безопасно хранятся в локальной директории данных.

## Лицензия

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
