# ai2ia - AI to instruct AI

<div align="center">

**أداة لتحسين البرومبتات ومقارنة استجابات الذكاء الاصطناعي بالتوازي**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](https://github.com/BonoJovi/ai2ia/releases)
[![Rust](https://img.shields.io/badge/Rust-1.70+-orange.svg)](https://www.rust-lang.org/)
[![Tauri](https://img.shields.io/badge/Tauri-v2-blue.svg)](https://tauri.app/)
[![License](https://img.shields.io/badge/License-MIT-green)](../../LICENSE)

</div>

اكتب فكرتك، ودع الذكاء الاصطناعي يحولها إلى برومبت مثالي، ثم أرسله إلى عدة نماذج ذكاء اصطناعي في آن واحد — قارن إجاباتها جنبًا إلى جنب واختر الأفضل! مبني باستخدام [Tauri 2](https://tauri.app/) (Rust + HTML/CSS/JS).

## الميزات

- **مقارنة متعددة للذكاء الاصطناعي** - أرسل البرومبتات إلى OpenAI وAnthropic وGoogle AI وxAI في وقت واحد وقارن الاستجابات في لوحات متوازية
- **تحسين البرومبتات** - تحسين تلقائي للبرومبتات لكل نموذج ذكاء اصطناعي قبل الإرسال
- **توليد البرومبتات بالذكاء الاصطناعي** - صف فكرتك بشكل تقريبي ودع الذكاء الاصطناعي يولّد برومبتًا متقنًا
- **سحب وإفلات اللوحات** - أعد ترتيب لوحات استجابة الذكاء الاصطناعي بالسحب
- **تخطيط مرن** - التبديل بين تخطيط 2 أو 3 أو 4 أعمدة
- **7 لغات** - الإنجليزية واليابانية والفرنسية والإيطالية والألمانية والروسية والعربية (بما في ذلك دعم RTL)
- **سمة داكنة/فاتحة** - التبديل بين الوضع الداكن والفاتح
- **تخزين آمن لمفاتيح API** - يتم تخزين مفاتيح API محليًا على نظامك

## مزودو الذكاء الاصطناعي المدعومون

| المزود | النماذج |
|--------|---------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## المتطلبات الأساسية

- [Rust](https://rustup.rs/) (أحدث إصدار مستقر)
- [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث)
- [pnpm](https://pnpm.io/)
- تبعيات النظام لـ Tauri: راجع [متطلبات Tauri](https://v2.tauri.app/start/prerequisites/)

## البناء

```bash
# تثبيت تبعيات Node
pnpm install

# وضع التطوير
pnpm tauri dev

# بناء الإنتاج
pnpm tauri build
```

## هيكل المشروع

```
ai2ia/
  src/              # الواجهة الخلفية بلغة Rust
    main.rs         # نقطة الدخول
    lib.rs          # إعداد تطبيق Tauri
    commands.rs     # معالجات أوامر Tauri
    modules/
      ai_client.rs  # عملاء API لمزودي الذكاء الاصطناعي
      api_keys.rs   # إدارة مفاتيح API
  res/              # الواجهة الأمامية
    index.html      # الواجهة الرئيسية
    index-ar.html   # الواجهة العربية (RTL)
    css/            # أوراق الأنماط
    js/             # وحدات JavaScript
  scripts/          # سكريبتات الإصدار
```

## الإعداد

عند التشغيل لأول مرة، انتقل إلى **الإعدادات** وأدخل مفاتيح API للمزودين الذين تريد استخدامهم. يتم تخزين المفاتيح بأمان في مجلد البيانات المحلي.

## الترخيص

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
