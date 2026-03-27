// ============================================
// i18n - Internationalization
// ============================================

const TRANSLATIONS = {
  en: {
    // Toolbar
    'toolbar.settings': 'Settings',
    'toolbar.history': 'History',
    'toolbar.templates': 'Templates',
    'toolbar.layout': 'Layout:',
    'toolbar.layout.2col': '2 Columns',
    'toolbar.layout.3col': '3 Columns',
    'toolbar.layout.4col': '4 Columns',
    'toolbar.lang': 'EN',
    'toolbar.lang.title': 'Switch Language',
    'toolbar.theme.toDark': 'Switch to Dark Mode',
    'toolbar.theme.toLight': 'Switch to Light Mode',

    // Input Section
    'input.mode.write': 'Write Prompt',
    'input.mode.generate': 'AI Generate',
    'input.target.all': 'Send to All',
    'input.target.openai': 'OpenAI only',
    'input.target.anthropic': 'Anthropic only',
    'input.target.google': 'Google only',
    'input.target.xai': 'xAI only',
    'input.optimize.auto': 'Optimize with: Auto',
    'input.optimize.gpt4': 'Optimize with: GPT-4',
    'input.optimize.claude': 'Optimize with: Claude',
    'input.optimize.gemini': 'Optimize with: Gemini',
    'input.optimize.grok': 'Optimize with: Grok',
    'input.placeholder': 'Enter your prompt here... ai2ia will optimize it for each AI model.',
    'input.charcount': '{count} characters',
    'input.btn.optimizeSend': 'Optimize & Send',
    'input.btn.sendRaw': 'Send Raw',

    // Generate Mode
    'input.gen.idea': 'Your Idea / Rough Input',
    'input.gen.ai.auto': 'Generate with: Auto',
    'input.gen.ai.gpt4': 'Generate with: GPT-4',
    'input.gen.ai.claude': 'Generate with: Claude',
    'input.gen.ai.gemini': 'Generate with: Gemini',
    'input.gen.ai.grok': 'Generate with: Grok',
    'input.gen.placeholder': 'Describe what you want roughly...',
    'input.gen.result': 'AI-Generated Prompt',
    'input.gen.editable': 'Editable',
    'input.gen.resultPlaceholder': 'AI-generated prompt will appear here...',
    'input.gen.charcount': '{inputCount} characters (input) / {genCount} characters (generated)',
    'input.gen.btn.generate': 'Generate Prompt',
    'input.gen.btn.optimizeSend': 'Optimize & Send',
    'input.gen.btn.send': 'Send Generated',

    // Output Panels
    'panel.placeholder': 'Send a prompt to see the response here.',
    'panel.status.ready': 'Ready',
    'panel.tokens': 'Tokens: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'API Status: Not Connected',
    'statusbar.tokens': 'Total Tokens: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'API Key Settings',
    'settings.apiKey.description': 'Configure your AI service API keys. Keys are securely stored on your system.',
    'settings.apiKey.close': 'Close',
    'settings.apiKey.status.set': 'Set',
    'settings.apiKey.status.notSet': 'Not Set',
    'settings.apiKey.edit': 'Edit',
    'settings.apiKey.save': 'Save',
    'settings.apiKey.cancel': 'Cancel',
    'settings.apiKey.delete': 'Delete',
    'settings.apiKey.placeholder': 'Enter API key...',
    'settings.apiKey.enterKey': 'Please enter an API key.',
    'settings.apiKey.confirmDelete': 'Are you sure you want to delete the API key for {provider}?',
    'settings.apiKey.deleteTitle': 'Delete API Key',
    'settings.apiKey.loadFailed': 'Failed to load API keys.',

    // Dialog
    'dialog.confirm': 'Confirm',
    'dialog.alert': 'Alert',
    'dialog.ok': 'OK',
    'dialog.cancel': 'Cancel',

  },

  ja: {
    // Toolbar
    'toolbar.settings': '設定',
    'toolbar.history': '履歴',
    'toolbar.templates': 'テンプレート',
    'toolbar.layout': 'レイアウト:',
    'toolbar.layout.2col': '2列',
    'toolbar.layout.3col': '3列',
    'toolbar.layout.4col': '4列',
    'toolbar.lang': 'JA',
    'toolbar.lang.title': '言語を切替',
    'toolbar.theme.toDark': 'ダークモードに切替',
    'toolbar.theme.toLight': 'ライトモードに切替',

    // Input Section
    'input.mode.write': 'プロンプト作成',
    'input.mode.generate': 'AI生成',
    'input.target.all': '全てに送信',
    'input.target.openai': 'OpenAIのみ',
    'input.target.anthropic': 'Anthropicのみ',
    'input.target.google': 'Googleのみ',
    'input.target.xai': 'xAIのみ',
    'input.optimize.auto': '最適化: 自動',
    'input.optimize.gpt4': '最適化: GPT-4',
    'input.optimize.claude': '最適化: Claude',
    'input.optimize.gemini': '最適化: Gemini',
    'input.optimize.grok': '最適化: Grok',
    'input.placeholder': 'プロンプトを入力してください... ai2iaが各AIモデル向けに最適化します。',
    'input.charcount': '{count} 文字',
    'input.btn.optimizeSend': '最適化して送信',
    'input.btn.sendRaw': 'そのまま送信',

    // Generate Mode
    'input.gen.idea': 'アイデア / ラフ入力',
    'input.gen.ai.auto': '生成AI: 自動',
    'input.gen.ai.gpt4': '生成AI: GPT-4',
    'input.gen.ai.claude': '生成AI: Claude',
    'input.gen.ai.gemini': '生成AI: Gemini',
    'input.gen.ai.grok': '生成AI: Grok',
    'input.gen.placeholder': 'やりたいことをざっくり書いてください...',
    'input.gen.result': 'AI生成プロンプト',
    'input.gen.editable': '編集可能',
    'input.gen.resultPlaceholder': 'AI生成プロンプトがここに表示されます...',
    'input.gen.charcount': '{inputCount} 文字（入力）/ {genCount} 文字（生成）',
    'input.gen.btn.generate': 'プロンプト生成',
    'input.gen.btn.optimizeSend': '最適化して送信',
    'input.gen.btn.send': '生成を送信',

    // Output Panels
    'panel.placeholder': 'プロンプトを送信すると、ここに応答が表示されます。',
    'panel.status.ready': '準備完了',
    'panel.tokens': 'トークン: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'API状態: 未接続',
    'statusbar.tokens': '合計トークン: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'APIキー設定',
    'settings.apiKey.description': 'AIサービスのAPIキーを設定します。キーはシステム上に安全に保存されます。',
    'settings.apiKey.close': '閉じる',
    'settings.apiKey.status.set': '設定済み',
    'settings.apiKey.status.notSet': '未設定',
    'settings.apiKey.edit': '編集',
    'settings.apiKey.save': '保存',
    'settings.apiKey.cancel': 'キャンセル',
    'settings.apiKey.delete': '削除',
    'settings.apiKey.placeholder': 'APIキーを入力...',
    'settings.apiKey.enterKey': 'APIキーを入力してください。',
    'settings.apiKey.confirmDelete': '{provider}のAPIキーを削除してもよろしいですか？',
    'settings.apiKey.deleteTitle': 'APIキー削除',
    'settings.apiKey.loadFailed': 'APIキーの読み込みに失敗しました。',

    // Dialog
    'dialog.confirm': '確認',
    'dialog.alert': 'お知らせ',
    'dialog.ok': 'OK',
    'dialog.cancel': 'キャンセル',

  },

  fr: {
    // Toolbar
    'toolbar.settings': 'Paramètres',
    'toolbar.history': 'Historique',
    'toolbar.templates': 'Modèles',
    'toolbar.layout': 'Disposition :',
    'toolbar.layout.2col': '2 colonnes',
    'toolbar.layout.3col': '3 colonnes',
    'toolbar.layout.4col': '4 colonnes',
    'toolbar.lang': 'FR',
    'toolbar.lang.title': 'Changer de langue',
    'toolbar.theme.toDark': 'Passer en mode sombre',
    'toolbar.theme.toLight': 'Passer en mode clair',

    // Input Section
    'input.mode.write': 'Écrire un prompt',
    'input.mode.generate': 'Générer par IA',
    'input.target.all': 'Envoyer à tous',
    'input.target.openai': 'OpenAI seul',
    'input.target.anthropic': 'Anthropic seul',
    'input.target.google': 'Google seul',
    'input.target.xai': 'xAI seul',
    'input.optimize.auto': 'Optimiser avec : Auto',
    'input.optimize.gpt4': 'Optimiser avec : GPT-4',
    'input.optimize.claude': 'Optimiser avec : Claude',
    'input.optimize.gemini': 'Optimiser avec : Gemini',
    'input.optimize.grok': 'Optimiser avec : Grok',
    'input.placeholder': 'Entrez votre prompt ici... ai2ia l\'optimisera pour chaque modèle IA.',
    'input.charcount': '{count} caractères',
    'input.btn.optimizeSend': 'Optimiser et envoyer',
    'input.btn.sendRaw': 'Envoyer brut',

    // Generate Mode
    'input.gen.idea': 'Votre idée / Entrée brute',
    'input.gen.ai.auto': 'Générer avec : Auto',
    'input.gen.ai.gpt4': 'Générer avec : GPT-4',
    'input.gen.ai.claude': 'Générer avec : Claude',
    'input.gen.ai.gemini': 'Générer avec : Gemini',
    'input.gen.ai.grok': 'Générer avec : Grok',
    'input.gen.placeholder': 'Décrivez ce que vous voulez approximativement...',
    'input.gen.result': 'Prompt généré par IA',
    'input.gen.editable': 'Modifiable',
    'input.gen.resultPlaceholder': 'Le prompt généré par IA apparaîtra ici...',
    'input.gen.charcount': '{inputCount} caractères (entrée) / {genCount} caractères (généré)',
    'input.gen.btn.generate': 'Générer le prompt',
    'input.gen.btn.optimizeSend': 'Optimiser et envoyer',
    'input.gen.btn.send': 'Envoyer le généré',

    // Output Panels
    'panel.placeholder': 'Envoyez un prompt pour voir la réponse ici.',
    'panel.status.ready': 'Prêt',
    'panel.tokens': 'Tokens : {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'État API : Non connecté',
    'statusbar.tokens': 'Tokens totaux : {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'Paramètres des clés API',
    'settings.apiKey.description': 'Configurez vos clés API pour les services IA. Les clés sont stockées en toute sécurité sur votre système.',
    'settings.apiKey.close': 'Fermer',
    'settings.apiKey.status.set': 'Définie',
    'settings.apiKey.status.notSet': 'Non définie',
    'settings.apiKey.edit': 'Modifier',
    'settings.apiKey.save': 'Enregistrer',
    'settings.apiKey.cancel': 'Annuler',
    'settings.apiKey.delete': 'Supprimer',
    'settings.apiKey.placeholder': 'Entrez la clé API...',
    'settings.apiKey.enterKey': 'Veuillez entrer une clé API.',
    'settings.apiKey.confirmDelete': 'Êtes-vous sûr de vouloir supprimer la clé API pour {provider} ?',
    'settings.apiKey.deleteTitle': 'Supprimer la clé API',
    'settings.apiKey.loadFailed': 'Échec du chargement des clés API.',

    // Dialog
    'dialog.confirm': 'Confirmer',
    'dialog.alert': 'Alerte',
    'dialog.ok': 'OK',
    'dialog.cancel': 'Annuler',

  },

  it: {
    // Toolbar
    'toolbar.settings': 'Impostazioni',
    'toolbar.history': 'Cronologia',
    'toolbar.templates': 'Modelli',
    'toolbar.layout': 'Layout:',
    'toolbar.layout.2col': '2 colonne',
    'toolbar.layout.3col': '3 colonne',
    'toolbar.layout.4col': '4 colonne',
    'toolbar.lang': 'IT',
    'toolbar.lang.title': 'Cambia lingua',
    'toolbar.theme.toDark': 'Passa alla modalità scura',
    'toolbar.theme.toLight': 'Passa alla modalità chiara',

    // Input Section
    'input.mode.write': 'Scrivi prompt',
    'input.mode.generate': 'Genera con IA',
    'input.target.all': 'Invia a tutti',
    'input.target.openai': 'Solo OpenAI',
    'input.target.anthropic': 'Solo Anthropic',
    'input.target.google': 'Solo Google',
    'input.target.xai': 'Solo xAI',
    'input.optimize.auto': 'Ottimizza con: Auto',
    'input.optimize.gpt4': 'Ottimizza con: GPT-4',
    'input.optimize.claude': 'Ottimizza con: Claude',
    'input.optimize.gemini': 'Ottimizza con: Gemini',
    'input.optimize.grok': 'Ottimizza con: Grok',
    'input.placeholder': 'Inserisci il tuo prompt qui... ai2ia lo ottimizzerà per ogni modello IA.',
    'input.charcount': '{count} caratteri',
    'input.btn.optimizeSend': 'Ottimizza e invia',
    'input.btn.sendRaw': 'Invia grezzo',

    // Generate Mode
    'input.gen.idea': 'La tua idea / Input grezzo',
    'input.gen.ai.auto': 'Genera con: Auto',
    'input.gen.ai.gpt4': 'Genera con: GPT-4',
    'input.gen.ai.claude': 'Genera con: Claude',
    'input.gen.ai.gemini': 'Genera con: Gemini',
    'input.gen.ai.grok': 'Genera con: Grok',
    'input.gen.placeholder': 'Descrivi approssimativamente cosa vuoi...',
    'input.gen.result': 'Prompt generato dall\'IA',
    'input.gen.editable': 'Modificabile',
    'input.gen.resultPlaceholder': 'Il prompt generato dall\'IA apparirà qui...',
    'input.gen.charcount': '{inputCount} caratteri (input) / {genCount} caratteri (generato)',
    'input.gen.btn.generate': 'Genera prompt',
    'input.gen.btn.optimizeSend': 'Ottimizza e invia',
    'input.gen.btn.send': 'Invia generato',

    // Output Panels
    'panel.placeholder': 'Invia un prompt per vedere la risposta qui.',
    'panel.status.ready': 'Pronto',
    'panel.tokens': 'Token: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'Stato API: Non connesso',
    'statusbar.tokens': 'Token totali: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'Impostazioni chiavi API',
    'settings.apiKey.description': 'Configura le chiavi API per i servizi IA. Le chiavi sono archiviate in modo sicuro sul tuo sistema.',
    'settings.apiKey.close': 'Chiudi',
    'settings.apiKey.status.set': 'Impostata',
    'settings.apiKey.status.notSet': 'Non impostata',
    'settings.apiKey.edit': 'Modifica',
    'settings.apiKey.save': 'Salva',
    'settings.apiKey.cancel': 'Annulla',
    'settings.apiKey.delete': 'Elimina',
    'settings.apiKey.placeholder': 'Inserisci chiave API...',
    'settings.apiKey.enterKey': 'Inserisci una chiave API.',
    'settings.apiKey.confirmDelete': 'Sei sicuro di voler eliminare la chiave API per {provider}?',
    'settings.apiKey.deleteTitle': 'Elimina chiave API',
    'settings.apiKey.loadFailed': 'Impossibile caricare le chiavi API.',

    // Dialog
    'dialog.confirm': 'Conferma',
    'dialog.alert': 'Avviso',
    'dialog.ok': 'OK',
    'dialog.cancel': 'Annulla',

  },

  de: {
    // Toolbar
    'toolbar.settings': 'Einstellungen',
    'toolbar.history': 'Verlauf',
    'toolbar.templates': 'Vorlagen',
    'toolbar.layout': 'Layout:',
    'toolbar.layout.2col': '2 Spalten',
    'toolbar.layout.3col': '3 Spalten',
    'toolbar.layout.4col': '4 Spalten',
    'toolbar.lang': 'DE',
    'toolbar.lang.title': 'Sprache wechseln',
    'toolbar.theme.toDark': 'Zum Dunkelmodus wechseln',
    'toolbar.theme.toLight': 'Zum Hellmodus wechseln',

    // Input Section
    'input.mode.write': 'Prompt schreiben',
    'input.mode.generate': 'KI-Generierung',
    'input.target.all': 'An alle senden',
    'input.target.openai': 'Nur OpenAI',
    'input.target.anthropic': 'Nur Anthropic',
    'input.target.google': 'Nur Google',
    'input.target.xai': 'Nur xAI',
    'input.optimize.auto': 'Optimieren mit: Auto',
    'input.optimize.gpt4': 'Optimieren mit: GPT-4',
    'input.optimize.claude': 'Optimieren mit: Claude',
    'input.optimize.gemini': 'Optimieren mit: Gemini',
    'input.optimize.grok': 'Optimieren mit: Grok',
    'input.placeholder': 'Geben Sie Ihren Prompt hier ein... ai2ia optimiert ihn für jedes KI-Modell.',
    'input.charcount': '{count} Zeichen',
    'input.btn.optimizeSend': 'Optimieren & Senden',
    'input.btn.sendRaw': 'Roh senden',

    // Generate Mode
    'input.gen.idea': 'Ihre Idee / Roheingabe',
    'input.gen.ai.auto': 'Generieren mit: Auto',
    'input.gen.ai.gpt4': 'Generieren mit: GPT-4',
    'input.gen.ai.claude': 'Generieren mit: Claude',
    'input.gen.ai.gemini': 'Generieren mit: Gemini',
    'input.gen.ai.grok': 'Generieren mit: Grok',
    'input.gen.placeholder': 'Beschreiben Sie grob, was Sie möchten...',
    'input.gen.result': 'KI-generierter Prompt',
    'input.gen.editable': 'Bearbeitbar',
    'input.gen.resultPlaceholder': 'Der KI-generierte Prompt erscheint hier...',
    'input.gen.charcount': '{inputCount} Zeichen (Eingabe) / {genCount} Zeichen (generiert)',
    'input.gen.btn.generate': 'Prompt generieren',
    'input.gen.btn.optimizeSend': 'Optimieren & Senden',
    'input.gen.btn.send': 'Generierten senden',

    // Output Panels
    'panel.placeholder': 'Senden Sie einen Prompt, um die Antwort hier zu sehen.',
    'panel.status.ready': 'Bereit',
    'panel.tokens': 'Token: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'API-Status: Nicht verbunden',
    'statusbar.tokens': 'Gesamttoken: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'API-Schlüssel-Einstellungen',
    'settings.apiKey.description': 'Konfigurieren Sie Ihre API-Schlüssel für KI-Dienste. Schlüssel werden sicher auf Ihrem System gespeichert.',
    'settings.apiKey.close': 'Schließen',
    'settings.apiKey.status.set': 'Gesetzt',
    'settings.apiKey.status.notSet': 'Nicht gesetzt',
    'settings.apiKey.edit': 'Bearbeiten',
    'settings.apiKey.save': 'Speichern',
    'settings.apiKey.cancel': 'Abbrechen',
    'settings.apiKey.delete': 'Löschen',
    'settings.apiKey.placeholder': 'API-Schlüssel eingeben...',
    'settings.apiKey.enterKey': 'Bitte geben Sie einen API-Schlüssel ein.',
    'settings.apiKey.confirmDelete': 'Möchten Sie den API-Schlüssel für {provider} wirklich löschen?',
    'settings.apiKey.deleteTitle': 'API-Schlüssel löschen',
    'settings.apiKey.loadFailed': 'API-Schlüssel konnten nicht geladen werden.',

    // Dialog
    'dialog.confirm': 'Bestätigen',
    'dialog.alert': 'Hinweis',
    'dialog.ok': 'OK',
    'dialog.cancel': 'Abbrechen',

  },

  ru: {
    // Toolbar
    'toolbar.settings': 'Настройки',
    'toolbar.history': 'История',
    'toolbar.templates': 'Шаблоны',
    'toolbar.layout': 'Макет:',
    'toolbar.layout.2col': '2 столбца',
    'toolbar.layout.3col': '3 столбца',
    'toolbar.layout.4col': '4 столбца',
    'toolbar.lang': 'RU',
    'toolbar.lang.title': 'Сменить язык',
    'toolbar.theme.toDark': 'Переключить на тёмный режим',
    'toolbar.theme.toLight': 'Переключить на светлый режим',

    // Input Section
    'input.mode.write': 'Написать промпт',
    'input.mode.generate': 'ИИ-генерация',
    'input.target.all': 'Отправить всем',
    'input.target.openai': 'Только OpenAI',
    'input.target.anthropic': 'Только Anthropic',
    'input.target.google': 'Только Google',
    'input.target.xai': 'Только xAI',
    'input.optimize.auto': 'Оптимизация: Авто',
    'input.optimize.gpt4': 'Оптимизация: GPT-4',
    'input.optimize.claude': 'Оптимизация: Claude',
    'input.optimize.gemini': 'Оптимизация: Gemini',
    'input.optimize.grok': 'Оптимизация: Grok',
    'input.placeholder': 'Введите промпт здесь... ai2ia оптимизирует его для каждой модели ИИ.',
    'input.charcount': '{count} символов',
    'input.btn.optimizeSend': 'Оптимизировать и отправить',
    'input.btn.sendRaw': 'Отправить как есть',

    // Generate Mode
    'input.gen.idea': 'Ваша идея / Черновой ввод',
    'input.gen.ai.auto': 'Генерация: Авто',
    'input.gen.ai.gpt4': 'Генерация: GPT-4',
    'input.gen.ai.claude': 'Генерация: Claude',
    'input.gen.ai.gemini': 'Генерация: Gemini',
    'input.gen.ai.grok': 'Генерация: Grok',
    'input.gen.placeholder': 'Опишите примерно, что вы хотите...',
    'input.gen.result': 'Промпт от ИИ',
    'input.gen.editable': 'Редактируемый',
    'input.gen.resultPlaceholder': 'Сгенерированный ИИ промпт появится здесь...',
    'input.gen.charcount': '{inputCount} символов (ввод) / {genCount} символов (сгенерировано)',
    'input.gen.btn.generate': 'Сгенерировать промпт',
    'input.gen.btn.optimizeSend': 'Оптимизировать и отправить',
    'input.gen.btn.send': 'Отправить сгенерированный',

    // Output Panels
    'panel.placeholder': 'Отправьте промпт, чтобы увидеть ответ здесь.',
    'panel.status.ready': 'Готов',
    'panel.tokens': 'Токены: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia v0.1.0',
    'statusbar.api': 'Статус API: Не подключён',
    'statusbar.tokens': 'Всего токенов: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'Настройки API-ключей',
    'settings.apiKey.description': 'Настройте API-ключи для ИИ-сервисов. Ключи надёжно хранятся на вашей системе.',
    'settings.apiKey.close': 'Закрыть',
    'settings.apiKey.status.set': 'Установлен',
    'settings.apiKey.status.notSet': 'Не установлен',
    'settings.apiKey.edit': 'Изменить',
    'settings.apiKey.save': 'Сохранить',
    'settings.apiKey.cancel': 'Отмена',
    'settings.apiKey.delete': 'Удалить',
    'settings.apiKey.placeholder': 'Введите API-ключ...',
    'settings.apiKey.enterKey': 'Пожалуйста, введите API-ключ.',
    'settings.apiKey.confirmDelete': 'Вы уверены, что хотите удалить API-ключ для {provider}?',
    'settings.apiKey.deleteTitle': 'Удалить API-ключ',
    'settings.apiKey.loadFailed': 'Не удалось загрузить API-ключи.',

    // Dialog
    'dialog.confirm': 'Подтверждение',
    'dialog.alert': 'Уведомление',
    'dialog.ok': 'OK',
    'dialog.cancel': 'Отмена',

  },

  ar: {
    // Toolbar
    'toolbar.settings': 'الإعدادات',
    'toolbar.history': 'السجل',
    'toolbar.templates': 'القوالب',
    'toolbar.layout': 'التخطيط:',
    'toolbar.layout.2col': 'عمودان',
    'toolbar.layout.3col': '3 أعمدة',
    'toolbar.layout.4col': '4 أعمدة',
    'toolbar.lang': 'AR',
    'toolbar.lang.title': 'تغيير اللغة',
    'toolbar.theme.toDark': 'التبديل إلى الوضع الداكن',
    'toolbar.theme.toLight': 'التبديل إلى الوضع الفاتح',

    // Input Section
    'input.mode.write': 'كتابة برومبت',
    'input.mode.generate': 'توليد بالذكاء',
    'input.target.all': 'إرسال للجميع',
    'input.target.openai': 'OpenAI فقط',
    'input.target.anthropic': 'Anthropic فقط',
    'input.target.google': 'Google فقط',
    'input.target.xai': 'xAI فقط',
    'input.optimize.auto': 'تحسين بـ: تلقائي',
    'input.optimize.gpt4': 'تحسين بـ: GPT-4',
    'input.optimize.claude': 'تحسين بـ: Claude',
    'input.optimize.gemini': 'تحسين بـ: Gemini',
    'input.optimize.grok': 'تحسين بـ: Grok',
    'input.placeholder': 'أدخل البرومبت هنا... سيقوم ai2ia بتحسينه لكل نموذج ذكاء اصطناعي.',
    'input.charcount': '{count} حرف',
    'input.btn.optimizeSend': 'تحسين وإرسال',
    'input.btn.sendRaw': 'إرسال كما هو',

    // Generate Mode
    'input.gen.idea': 'فكرتك / إدخال تقريبي',
    'input.gen.ai.auto': 'توليد بـ: تلقائي',
    'input.gen.ai.gpt4': 'توليد بـ: GPT-4',
    'input.gen.ai.claude': 'توليد بـ: Claude',
    'input.gen.ai.gemini': 'توليد بـ: Gemini',
    'input.gen.ai.grok': 'توليد بـ: Grok',
    'input.gen.placeholder': 'صف ما تريده بشكل تقريبي...',
    'input.gen.result': 'برومبت مولّد بالذكاء',
    'input.gen.editable': 'قابل للتعديل',
    'input.gen.resultPlaceholder': 'سيظهر البرومبت المولّد هنا...',
    'input.gen.charcount': '{inputCount} حرف (إدخال) / {genCount} حرف (مولّد)',
    'input.gen.btn.generate': 'توليد البرومبت',
    'input.gen.btn.optimizeSend': 'تحسين وإرسال',
    'input.gen.btn.send': 'إرسال المولّد',

    // Output Panels
    'panel.placeholder': 'أرسل برومبت لرؤية الاستجابة هنا.',
    'panel.status.ready': 'جاهز',
    'panel.tokens': 'الرموز: {count}',

    // Status Bar
    'statusbar.version': 'ai2ia الإصدار 0.1.0',
    'statusbar.api': 'حالة API: غير متصل',
    'statusbar.tokens': 'إجمالي الرموز: {count}',

    // Settings (API Keys)
    'settings.apiKey.title': 'إعدادات مفاتيح API',
    'settings.apiKey.description': 'قم بتكوين مفاتيح API لخدمات الذكاء الاصطناعي. يتم تخزين المفاتيح بأمان على نظامك.',
    'settings.apiKey.close': 'إغلاق',
    'settings.apiKey.status.set': 'مُعيَّن',
    'settings.apiKey.status.notSet': 'غير مُعيَّن',
    'settings.apiKey.edit': 'تعديل',
    'settings.apiKey.save': 'حفظ',
    'settings.apiKey.cancel': 'إلغاء',
    'settings.apiKey.delete': 'حذف',
    'settings.apiKey.placeholder': 'أدخل مفتاح API...',
    'settings.apiKey.enterKey': 'يرجى إدخال مفتاح API.',
    'settings.apiKey.confirmDelete': 'هل أنت متأكد من حذف مفتاح API لـ {provider}؟',
    'settings.apiKey.deleteTitle': 'حذف مفتاح API',
    'settings.apiKey.loadFailed': 'فشل تحميل مفاتيح API.',

    // Dialog
    'dialog.confirm': 'تأكيد',
    'dialog.alert': 'تنبيه',
    'dialog.ok': 'موافق',
    'dialog.cancel': 'إلغاء',

  },
};

// Language cycle order
const LANG_CYCLE = ['en', 'ja', 'fr', 'it', 'de', 'ru', 'ar'];

let currentLocale = localStorage.getItem('ai2ia-lang') || 'en';

/**
 * Translate a key with optional parameter interpolation
 */
function t(key, params = {}) {
  const translations = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
  let text = translations[key];

  if (text === undefined) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  for (const [paramKey, paramValue] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
  }

  return text;
}

function getLocale() {
  return currentLocale;
}

function setLocale(lang) {
  if (!TRANSLATIONS[lang]) {
    console.warn(`Unsupported locale: ${lang}`);
    return;
  }

  currentLocale = lang;
  localStorage.setItem('ai2ia-lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  updateUIText();

  window.dispatchEvent(new CustomEvent('localechange', {
    detail: { locale: lang }
  }));
}

function toggleLocale() {
  const idx = LANG_CYCLE.indexOf(currentLocale);
  const next = LANG_CYCLE[(idx + 1) % LANG_CYCLE.length];
  setLocale(next);
}

/**
 * Update all DOM elements with data-i18n attributes
 */
function updateUIText() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Title / tooltip
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  // Placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // <option> elements with data-i18n
  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Update theme button tooltip
  if (typeof updateThemeButton === 'function') {
    updateThemeButton();
  }
}

function initI18n() {
  document.documentElement.lang = currentLocale;
  document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
  updateUIText();
}

// Global exports
window.i18n = { t, getLocale, setLocale, toggleLocale, updateUIText, TRANSLATIONS };
window.t = t;
window.getLocale = getLocale;
