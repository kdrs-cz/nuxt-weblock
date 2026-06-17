# Nuxt WebLock Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module to lock your whole website with password. All routes will be inaccessible until the correct password is entered.

## Features

- 🔒 Lock your whole website with password. Ideal for staging environments, client previews, etc.
- 🍪 Successfully entered password will be stored in a cookie, so you don't have to enter it again.

![nuxt-weblock screenshot](https://i.imgur.com/xXWNGrF.png)

## Quick Setup

1. Add `nuxt-weblock` dependency to your project

```bash
# Using pnpm
pnpm add nuxt-weblock

# Using yarn
yarn add nuxt-weblock

# Using npm
npm install nuxt-weblock
```

2. Add `nuxt-weblock` to the `modules` section of `nuxt.config.ts/js` and configure `nuxt-weblock` by defining `webLock` section

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-weblock'
  ],
  webLock: {
    password: '123456', // safer password might be a better idea 😁
    isEnabled: true // ideal to be set to false in production
  }
})
```

That's it! You can now use WebLock Module in your Nuxt app ✨

## Configuration

| Option | Type | Required | Default | Description |
|---|---|---|---|---|
| `password` | `string` | ✅ | — | Password to unlock the site |
| `isEnabled` | `boolean` | ✅ | — | Toggle the lock (set `false` in production) |
| `excludeRoutes` | `string[]` | ❌ | `[]` | Routes to bypass the lock (e.g. `['/api/health']`) |
| `cookieMaxAge` | `number` | ❌ | session | Hours until the login cookie expires. Omit for a session cookie |

### Full example

```js
export default defineNuxtConfig({
  modules: ['nuxt-weblock'],
  webLock: {
    password: 'my-secret',
    isEnabled: true,
    excludeRoutes: ['/api/health'],
    cookieMaxAge: 24 // cookie expires after 24 hours
  }
})
```

## Development

```bash
# Install dependencies
yarn install

# Generate type stubs
yarn run dev:prepare

# Develop with the playground
yarn run dev

# Build the playground
yarn run dev:build

# Run ESLint
yarn run lint

# Release new version
yarn run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-weblock/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-weblock

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-weblock.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-weblock

[license-src]: https://img.shields.io/npm/l/nuxt-weblock.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-weblock

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
