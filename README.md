# appert.nu

Website for the apps by AppertLabs: **Fietsert** (cycle-junction app, the main page) and **Streamert** (internet radio for
iPhone and Apple TV). Plain HTML + CSS: no build step, no JavaScript, no external fonts/CDNs, no analytics, no cookies.

Hosted on GitHub Pages from branch `main`, folder `/`, custom domain `appert.nu` (`CNAME`). `.nojekyll` turns off Jekyll
processing.

```
index.html, privacy.html          NL (default)
en/index.html, en/privacy.html    EN
streamert/index.html              Streamert NL
en/streamert/index.html           Streamert EN
assets/                           CSS, icons, OG images
robots.txt, sitemap.xml, CNAME, .nojekyll
```

Canonical, hreflang, og:url/og:image and sitemap.xml use absolute `https://appert.nu/...` URLs.

## Open TODOs (search for `TODO` in the HTML)

- **Store links**: every store button is a non-link "Binnenkort / Coming soon" label (`data-todo="app-store-link"` /
  `"google-play-link"`). When an app is live, swap in a real link with the official App Store / Google Play badge
  (hosted locally in `assets/`). Streamert has App Store only (iPhone + Apple TV).
- **Contact email**: `data-todo="contact-email"` in the footers and on the privacy pages.
- **Screenshots**: the phone mockups are HTML placeholders.
- **Privacy text**: verify the app-data wording (Fietsert and Streamert) before relying on it.
- **Streamert icon**: `assets/streamert.svg` is a simple stand-in mark; replace with the real app icon.

Dev helpers (screenshots, OG image sources) live outside this repo.
