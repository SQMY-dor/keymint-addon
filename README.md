# 🔑 Keymint Addon

KernelSU WebUI Add-on for **Oh My Keymint Modded** — package name management, keybox import, and service control with Apple Liquid Glass UI.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

- **📋 Package Scope Management** — add/remove/deny packages, auto-sync to `injector.toml`
- **🔑 Keybox Import** — from URL, paste, or device file browser
- **⚙️ Service Control** — restart daemons, kill GMS, full deployment
- **🌐 i18n** — English & 简体中文, auto-follows system language
- **🖼️ Background Image** — set custom wallpaper from URL or device
- **🪟 Liquid Glass UI** — Apple-style edge refraction, chromatic aberration, and elastic mouse tracking

## 🌐 Internationalization

The WebUI auto-detects system language via `navigator.language` (Android system locale).

| Language | File |
|----------|------|
| English | `webroot/i18n/en.json` |
| 简体中文 | `webroot/i18n/zh-CN.json` |

To add a language: drop a new JSON file under `webroot/i18n/` named after the BCP 47 tag (e.g. `ja.json`, `ko.json`, `zh-TW.json`). The engine will pick it up automatically.

Override via URL: append `?lang=en` or `?lang=zh-CN`.

## 🚀 Installation

Flash in **KernelSU** or **APatch** manager, then open the WebUI via the Action button.

Requires [Oh My Keymint Modded](https://github.com/SQMY-dor/oh_my_keymint_modded) to be installed first.

## 🧱 Structure

```
keymint-addon/
├── customize.sh       # Stealth install script
├── action.sh          # WebUI launcher (KSUWebUIStandalone / MMRL)
├── module.prop        # Module metadata
├── LICENSE
├── README.md
└── webroot/
    ├── index.html     # Main UI
    ├── styles.css     # Liquid glass + layout styles
    ├── theme.css      # Monet color system
    ├── webui.js       # App logic (scope, keybox, daemon control)
    ├── config.json    # WebUI window config
    ├── assets/
    │   ├── kernelsu.js    # KernelSU shell binding
    │   └── liquid-glass.js # Liquid glass effect engine
    └── i18n/
        ├── i18n.js        # i18n engine
        ├── en.json        # English
        └── zh-CN.json     # 简体中文
```

## 📄 License

MIT
