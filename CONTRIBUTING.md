# Contributing to ai2ia

Thank you for your interest in contributing to ai2ia! This document provides guidelines for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ai2ia.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Test your changes: `pnpm tauri dev`
6. Commit and push to your fork
7. Open a Pull Request

## Development Setup

See [README.md](README.md) for prerequisites and build instructions.

## Guidelines

### Code Style

- **Rust**: Follow standard Rust formatting (`cargo fmt`)
- **JavaScript**: Use consistent style with the existing codebase
- **CSS**: Follow the existing naming conventions

### Commits

- Write clear, concise commit messages
- Use conventional commit prefixes: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`

### Pull Requests

- Keep PRs focused on a single change
- Provide a clear description of what your PR does and why
- Make sure the project builds successfully (`pnpm tauri build`)

### Adding a New Language

ai2ia supports i18n via `res/js/i18n.js`. To add a new language:

1. Add a new translation block in `TRANSLATIONS` in `res/js/i18n.js`
2. Add the language option to `langSelect` in both `res/index.html` and `res/index-ar.html`
3. Add the language code to `LANG_CYCLE` in `res/js/i18n.js`

### Adding a New AI Provider

1. Add the provider to `src/modules/ai_client.rs`
2. Add the provider mapping in `src/commands.rs` (`to_provider_type`)
3. Update `get_ai_providers()` in `src/commands.rs`
4. Add UI elements for the new provider in the HTML files

## Reporting Issues

- Use GitHub Issues to report bugs
- Include steps to reproduce, expected behavior, and actual behavior
- Include your OS, Rust version, and Node.js version

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
