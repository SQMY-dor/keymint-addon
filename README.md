# 🔑 Keymint Addon

KernelSU WebUI Add-on for **Oh My Keymint** — package name management, keybox import, and service control.

[Oh My Keymint](https://github.com/qwq233/OhMyKeymint)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

- **📋 Package Scope Management** — add/remove/deny packages, auto-sync to `injector.toml`
- **🔑 Keybox Import** — from URL, paste, or device file browser
- **⚙️ Service Control** — restart daemons, kill GMS, full deployment
- **🌐 i18n** — English & 简体中文, auto-follows system language
- **🖼️ Background Image** — set custom wallpaper from URL or device

## 🌐 Internationalization

Auto-detects system language via `navigator.language` (Android system locale).

| Language | File |
|----------|------|
| English | `webroot/i18n/en.json` |
| 简体中文 | `webroot/i18n/zh-CN.json` |

Add a language: drop a new JSON file under `webroot/i18n/`. Override via URL: `?lang=en` or `?lang=zh-CN`.

## 🚀 Installation

Flash in **KernelSU** or **APatch** manager. Requires [Oh My Keymint](https://github.com/qwq233/OhMyKeymint) installed first.

## 📄 License

MIT
