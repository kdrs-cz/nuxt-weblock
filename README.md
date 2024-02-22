# Nuxt WebLock Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 module to lock your whole website with password.

## Features

- 🔒 Lock your whole website with password. Ideal for staging environments, client previews, etc.

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

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Release new version
npm run release
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
