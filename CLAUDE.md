# ai2ia Project Context

## Project

- **Type**: Tauri v2 desktop app (Rust backend + frontend)
- **Purpose**: Prompt optimization and parallel AI response comparison tool
- **Version**: v2.0.0
- **Branch**: `dev` for development, `main` for releases

## Essential Rules

1. **All code changes on `dev` branch** — merge to `main` for releases only
2. **Version files**: Update all 3 files simultaneously — `Cargo.toml`, `tauri.conf.json`, `package.json`
3. **No `unwrap()` in production Rust** — always use `Result<T, E>`
4. **Commit messages**: English, conventional format `type(scope): description`
5. **Release**: Run `./scripts/pre-release-check.sh` before every release, then use `/release`
6. **Tauri app**: Tell user to "restart app" not "reload browser"

## Commands

```bash
cargo tauri dev        # Development
cargo test             # Backend tests
```

## On-Demand Context

Load with `@` when needed:
- Developer Profile: `@.ai-context/shared/developer/YOSHIHIRO_NAKAHARA_PROFILE.md`
- Methodology: `@.ai-context/shared/methodology/AI_COLLABORATION.md`
- Insights: `@.ai-context/shared/insights/INSIGHTS_OVERVIEW.md`
