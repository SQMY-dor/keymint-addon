/**
 * Oh My Keymint — i18n Engine
 *
 * Auto-detects system language (Android → navigator.language),
 * loads the matching locale JSON, and replaces all [data-i18n]
 * elements.  Falls back to English.
 *
 * JS API:
 *   window.__('key.path')              → translated string
 *   window.__('key.path', {a: 'x'})    → with template vars
 *
 * Add locale: drop a new .json file under i18n/ named after
 * the BCP 47 tag (e.g. zh-TW.json, ja.json, ko.json).
 */

(function () {
  "use strict";

  var SUPPORTED = ["en", "zh-CN"];

  /* ---------- language detection ---------- */
  function detectLang() {
    // 1. URL param overrides everything
    var m = location.search.match(/[?&]lang=([a-zA-Z-]+)/);
    if (m && SUPPORTED.includes(m[1])) return m[1];

    // 2. System language (Android WebView exposes navigator.language)
    var sys = (navigator.language || "en").replace("_", "-");
    // Try exact match first, then prefix
    if (SUPPORTED.includes(sys)) return sys;
    var prefix = sys.split("-")[0];
    var match = SUPPORTED.find(function (s) { return s.startsWith(prefix); });
    if (match) return match;

    // 3. English fallback
    return "en";
  }

  /* ---------- JSON loading (sync for reliability) ---------- */
  function loadJSON(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); // sync — i18n must be ready before DOM render
    try {
      xhr.send();
    } catch (e) {
      return null;
    }
    if (xhr.status === 200) {
      try { return JSON.parse(xhr.responseText); } catch (e) { return null; }
    }
    return null;
  }

  /* ---------- key lookup ---------- */
  function get(keys, source) {
    var parts = keys.split(".");
    var val = source;
    for (var i = 0; i < parts.length; i++) {
      if (val == null) return undefined;
      val = val[parts[i]];
    }
    return val;
  }

  /* ---------- template interpolation ---------- */
  function tpl(str, vars) {
    if (!vars) return str;
    return str.replace(/\{(\w+)\}/g, function (_, k) {
      return vars[k] !== undefined ? vars[k] : "{" + k + "}";
    });
  }

  /* ---------- bootstrap ---------- */
  var lang = detectLang();
  var strings = loadJSON("i18n/" + lang + ".json");

  // Fallback: if the detected locale fails, load English
  if (!strings && lang !== "en") {
    lang = "en";
    strings = loadJSON("i18n/en.json");
  }
  if (!strings) {
    // Ultimate fallback: empty dict so __() returns the key itself
    strings = {};
  }

  /* ---------- public API ---------- */
  window.__ = function (key, vars) {
    var s = get(key, strings);
    if (typeof s !== "string") return key; // key not found
    return tpl(s, vars);
  };

  // Expose for debugging
  window.__lang = lang;

  /* ---------- DOM scanning ---------- */
  function scanDOM() {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var key = el.getAttribute("data-i18n");
      if (!key) continue;
      var text = get(key, strings);
      if (typeof text === "string") {
        // Handle data-i18n-placeholder separately
        var phKey = el.getAttribute("data-i18n-placeholder");
        if (phKey) {
          var ph = get(phKey, strings);
          if (typeof ph === "string") el.setAttribute("placeholder", ph);
        }
        // Only replace textContent if the element has no children
        if (el.children.length === 0) {
          el.textContent = text;
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", scanDOM);
})();
