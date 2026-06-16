# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev:prepare   # stub build + prepare playground (run first after clone)
pnpm dev           # playground dev server at localhost:3000
pnpm lint          # ESLint
pnpm release       # lint → build → changelog → npm publish → git push
```

No test suite exists despite `vitest` being in devDependencies.

## Architecture

**nuxt-weblock** is a Nuxt 3 module that gates all routes behind a password form — intended for staging environments.

### Three-file core

| File | Role |
|------|------|
| `src/module.js` | Module entry. Reads `webLock` config, injects into `runtimeConfig.public`, registers `/weblock` page via `pages:extend`, adds global route middleware plugin. |
| `src/runtime/plugin.js` | Global client-side route middleware. On every navigation: checks `excludeRoutes`, reads `loggedIn` cookie, redirects unauthenticated users to `/weblock?origin=<from-path>`. |
| `src/runtime/pages/weblock.vue` | Full-screen password form. Validates input against `config.public.webLock.password`, sets `loggedIn` cookie to string `'true'`, then navigates to `origin` or `/`. On mount: auto-redirects if already logged in and `origin` query param present. |

### Data flow

```
nuxt.config { webLock: { password, isEnabled, excludeRoutes, cookieMaxAge? } }
  → module.js injects into runtimeConfig.public.webLock
  → plugin.js middleware runs on every route change
  → unauthenticated → /weblock?origin=<path>
  → correct password → cookie "loggedIn=true" (session or cookieMaxAge hours) → back to origin
```

### Non-obvious details

- Cookie value is string `'true'`. Works because Nuxt's `useCookie` stores strings raw (no JSON encoding), then `destr` parses the raw `true` back to boolean `true`. So `loginCookie.value !== true` correctly allows logged-in users through.
- `cookieMaxAge` (hours) is optional. When set, both `plugin.js` and `weblock.vue` pass `maxAge = cookieMaxAge * 3600` to `useCookie`. When absent, no `maxAge` → session cookie.
- `excludeRoutes` is matched with `startsWith` in the middleware. Adding `/api` excludes all `/api/*` paths.
- Module is ESM-first; built via `@nuxt/module-builder` (no manual rollup/esbuild config).
- `playground/` is a minimal Nuxt 3 app wired to the local module for manual testing.
