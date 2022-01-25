# Titan Plus

**English** | [中文](./README-zh_CN.md)

> vue3-admin-plus provides enterprise-level development demo

A new generation admin construct using vue3(setup-script)+vite2+element-plus ，It's fast!

Use eslint+prettier+gitHooks format and verification code to improve code standardization and development efficiency

Vite need Node.js >= 12.0.0。

#### Comparison of performance between vue3 and vue2

- 41% reduction in package size

- The initial rendering is 55% faster, the update rendering is 133% faster

- Memory reduction 54%

- **Use Proxy instead of defineProperty to implement data responsiveness**

- **Rewrite the implementation of virtual DOM and Tree-Shaking**

## Build Setup

```bash
# pnpm address https://pnpm.io/zh/motivation
# install dependency(Recommend use pnpm)
# you can  use "npm -g i pnpm" to install pnpm
pnpm i / npm i

# develop
pnpm run dev / npm run dev
```

using the browser to open http://localhost:5001

## Build

```bash
# build for test environment
pnpm run build-serve / npm run build-serve

# build for production environment
pnpm run build / npm run build
```

## Others

```bash
# preview the release environment effect
pnpm run preview / npm run preview

# code format check
pnpm run lint / npm run lint
```

## Browsers support

Note: Vue3 is not supported the Internet Explorer

Modern browsers and Internet Explorer 11+.
