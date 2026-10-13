# design-sync notes — JoepDeSchadeMan

## How this repo is synced (read first)
- The repo is a **static HTML/CSS site** (index.html, css/style.css, js/main.js) — not a component package. With the user's OK (2026-10-01) the design system is a hand-built React wrapper kit at `.design-sync/kit/` whose components emit the **exact BEM markup from index.html**. The site's `css/style.css` is the shipped stylesheet (copied verbatim into `kit/dist/style.css`, prefixed with the Inter Google Fonts `@import` that index.html loads via `<link>`).
- `.design-sync/kit/` is dot-prefixed so GitHub Pages (Jekyll) never serves it.
- Build: `cd .design-sync/kit && npm ci && npm run build` (esbuild ESM + `tsc` declarations → `dist/`). Then from repo root:
  `node .ds-sync/package-build.mjs --config .design-sync/config.json --node-modules .design-sync/kit/node_modules --out ./ds-bundle` (entry comes from `cfg.entry`).
- Groups come from the kit's `src/<group>/` dirs (layout, actions, content, navigation, sections, forms).
- **When the site markup or CSS changes, update the matching `kit/src/**.tsx` by hand** — the kit is a mirror, nothing regenerates it. Components with no site counterpart: `ReviewCard`/`ReviewsGrid` (CSS still exists in style.css; the reviews section was removed from index.html).
- Not wrapped: the Google Map (`#eligibility-map`) and the zone-info panel (styled by **ids** `#zone-info*` — a component would emit duplicate ids). `MapLegend` covers the legend only.
- Repo `.gitignore` ignores `*.md`; `!.design-sync/*.md` re-includes NOTES.md / conventions.md.

## Capture environment
- Playwright **1.63.0** in `.ds-sync/` matches the cached `chromium_headless_shell-1243`.
- WSL had no emoji font → emoji icons rendered as tofu in screenshots. Fixed locally by copying `/mnt/c/Windows/Fonts/seguiemj.ttf` to `~/.local/share/fonts/` + `fc-cache -f`. Real browsers / Claude Design render emoji natively; this only affects local grading.
- Full-width site sections (Header, Hero, Footer, Section, TrustBar, ServicesGrid, ReviewsGrid) use `cardMode: column` + a 1280px `viewport` override — at the default card width the desktop nav wraps and the hero squashes.

## Known render warns
- none outstanding (GRID_OVERFLOW resolved via `cfg.overrides` cardMode column).

## Re-sync risks
- Kit drift: `css/style.css` ships automatically on rebuild, but markup changes in index.html do **not** propagate to `kit/src` — diff index.html sections against the kit components on every re-sync.
- `Hero` defaults `badgeTone="light"` to match the live site, where that badge is nearly invisible on the light gradient; previews use `default`. If the site fixes this, flip the default.
- Inter is loaded remotely from Google Fonts (network at render time).
- Emoji glyphs in captures depend on the locally-installed Segoe UI Emoji (not in git).
