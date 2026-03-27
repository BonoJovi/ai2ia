# ai2ia - AI to instruct AI

> Outil d'optimisation de prompts et de comparaison parallèle de réponses IA

ai2ia est une application de bureau qui vous permet de rédiger des prompts, de les optimiser pour différents modèles d'IA et de comparer les réponses côte à côte. Construit avec [Tauri 2](https://tauri.app/) (Rust + HTML/CSS/JS).

**Version : 2.0.0**

## Fonctionnalités

- **Comparaison multi-IA** - Envoyez des prompts à OpenAI, Anthropic, Google AI et xAI simultanément et comparez les réponses dans des panneaux parallèles
- **Optimisation de prompts** - Optimisez automatiquement vos prompts pour chaque modèle d'IA avant l'envoi
- **Génération de prompts par IA** - Décrivez votre idée approximativement et laissez l'IA générer un prompt élaboré
- **Panneaux glisser-déposer** - Réorganisez les panneaux de réponse IA par glisser-déposer
- **Mise en page flexible** - Basculez entre 2, 3 ou 4 colonnes
- **7 langues** - Anglais, japonais, français, italien, allemand, russe, arabe (support RTL inclus)
- **Thème sombre/clair** - Basculez entre le mode sombre et clair
- **Stockage sécurisé des clés API** - Les clés API sont stockées localement sur votre système

## Fournisseurs d'IA supportés

| Fournisseur | Modèles |
|-------------|---------|
| OpenAI | GPT-4o, GPT-4o-mini, GPT-4-turbo |
| Anthropic | Claude Sonnet 4, Claude Opus 4, Claude Haiku 4.5 |
| Google AI | Gemini 2.5 Flash, Gemini 2.5 Pro |
| xAI | Grok-3, Grok-3-mini |

## Prérequis

- [Rust](https://rustup.rs/) (dernière version stable)
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)
- Dépendances système pour Tauri : voir [Prérequis Tauri](https://v2.tauri.app/start/prerequisites/)

## Compilation

```bash
# Installer les dépendances Node
pnpm install

# Développement
pnpm tauri dev

# Build de production
pnpm tauri build
```

## Structure du projet

```
ai2ia/
  src/              # Backend Rust
    main.rs         # Point d'entrée
    lib.rs          # Configuration de l'app Tauri
    commands.rs     # Gestionnaires de commandes Tauri
    modules/
      ai_client.rs  # Clients API des fournisseurs d'IA
      api_keys.rs   # Gestion des clés API
  res/              # Frontend
    index.html      # Interface principale
    index-ar.html   # Interface arabe (RTL)
    css/            # Feuilles de style
    js/             # Modules JavaScript
  scripts/          # Scripts de release
```

## Configuration

Au premier lancement, allez dans **Paramètres** et entrez vos clés API pour les fournisseurs que vous souhaitez utiliser. Les clés sont stockées de manière sécurisée dans votre répertoire de données local.

## Licence

[MIT](../../LICENSE) - Copyright (c) 2026 Yoshihiro NAKAHARA
