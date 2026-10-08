# appert.nu

Website for the apps by AppertLabs: **Fietsert** (cycle-junction app, the main page) and **Streamert** (internet radio for
iPhone, Apple TV and Android). Fietsert is on the App Store (iPhone and Apple Watch; Android isn't public yet); Streamert isn't in the stores yet. Plain HTML + CSS: no build step, no JavaScript, no external fonts/CDNs, no analytics, no cookies.

Hosted on GitHub Pages from branch `main`, folder `/`, custom domain `appert.nu` (`CNAME`). `.nojekyll` turns off Jekyll
processing.

```
index.html, privacy.html          NL (default)
en/index.html, en/privacy.html    EN
faq.html, en/faq.html             FAQ NL / EN (also served at /faq and /en/faq)
streamert/index.html              Streamert NL
en/streamert/index.html           Streamert EN
assets/                           CSS, icons, OG images
robots.txt, sitemap.xml, CNAME, .nojekyll
```

Canonical, hreflang, og:url/og:image and sitemap.xml use absolute `https://appert.nu/...` URLs.

## Open work

Open work lives in issues on the [AppertLabs board](https://github.com/orgs/AppertLabs/projects/1), not in this README:

- [#1 Real App Store and Google Play links at launch](https://github.com/AppertLabs/appert-nu/issues/1): Fietsert's App Store badge is live (official Apple artwork in `assets/app-store-badge-{nl,en}.svg`, unmodified); still open: Fietsert Google Play and both Streamert stores (`data-todo="app-store-link"` / `"google-play-link"`)
- [#2 Contact email](https://github.com/AppertLabs/appert-nu/issues/2) (`data-todo="contact-email"`)
- [#3 Verify the privacy text against the apps' data flows](https://github.com/AppertLabs/appert-nu/issues/3)
- [#4 Real screenshots (incl. the Streamert player)](https://github.com/AppertLabs/appert-nu/issues/4)

The `TODO` comments in the HTML mark the exact spots. App icons are the real iOS icons from the app repos (`assets/*-icon-*.png`, `*-favicon-64.png`, `/favicon.ico`).

Dev helpers (screenshots, OG image sources) live outside this repo.
