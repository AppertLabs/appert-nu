# appert.nu

Website for the apps by AppertLabs: **Fietsert** (cycle-junction app, the main page) and **Streamert** (internet radio for
iPhone, Apple TV and Android). Neither app is in the stores yet. Plain HTML + CSS: no build step, no external fonts/CDNs, no analytics, no cookies. The only JavaScript is `s/share.js` (the shared-station page, see below): it reads the station name from the URL fragment in the browser, makes no requests and stores nothing.

Hosted on GitHub Pages from branch `main`, folder `/`, custom domain `appert.nu` (`CNAME`). `.nojekyll` turns off Jekyll
processing.

```
index.html, privacy.html          NL (default)
en/index.html, en/privacy.html    EN
faq.html, en/faq.html             FAQ NL / EN (also served at /faq and /en/faq)
streamert/index.html              Streamert NL
en/streamert/index.html           Streamert EN
streamert/terms.html              Streamert Terms of Use NL
en/streamert/terms.html           Streamert Terms of Use EN
s/index.html, s/share.js          Shared Streamert station landing page (NL+EN in one page; noindex)
.well-known/                      apple-app-site-association (iOS Universal Links), assetlinks.json (Android App Links)
assets/                           CSS, icons, OG images
robots.txt, sitemap.xml, CNAME, .nojekyll
```

Canonical, hreflang, og:url/og:image and sitemap.xml use absolute `https://appert.nu/...` URLs.

## Shared stations (Streamert #185)

`https://appert.nu/s/#<base64url JSON>` carries one station in the URL **fragment**, which browsers never send to a server, so
nothing about the station reaches GitHub Pages or us. With the app installed, iOS (Universal Link) and Android (App Link) open
Streamert instead of this page. `.well-known/apple-app-site-association` (Team ID `44267NHU7P`, `nu.appert.streamert`, paths
`/s` and `/s/*`) and `.well-known/assetlinks.json` make that work. GitHub Pages serves the extensionless AASA file as
`application/octet-stream`, which iOS accepts. `assetlinks.json` needs the **Play app-signing** SHA-256 certificate fingerprint
(Play Console > Setup > App integrity > App signing); replace the placeholder before merging. Keep the `/s/` page out of
`sitemap.xml`.

## Open work

Open work lives in issues on the [AppertLabs board](https://github.com/orgs/AppertLabs/projects/1), not in this README:

- [#1 Real App Store and Google Play links at launch](https://github.com/AppertLabs/appert-nu/issues/1) (`data-todo="app-store-link"` / `"google-play-link"`)
- [#2 Contact email](https://github.com/AppertLabs/appert-nu/issues/2) (`data-todo="contact-email"`)
- [#3 Verify the privacy text against the apps' data flows](https://github.com/AppertLabs/appert-nu/issues/3)
- [#4 Real screenshots (incl. the Streamert player)](https://github.com/AppertLabs/appert-nu/issues/4)

The `TODO` comments in the HTML mark the exact spots. App icons are the real iOS icons from the app repos (`assets/*-icon-*.png`, `*-favicon-64.png`, `/favicon.ico`).

Dev helpers (screenshots, OG image sources) live outside this repo.
