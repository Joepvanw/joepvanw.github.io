# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing site for **MijnbouwschadeHulp** — a Dutch B2C service helping property owners in mining areas (Groningen, Drenthe) file damage claims on a No Cure, No Pay basis. The site is fully in Dutch.

**Hosting:** GitHub Pages at `joepdeschademan.nl` (auto-deploys on push to `main`).

## Development

No build tools, package manager, or dev server. Edit HTML/CSS/JS files directly and open `index.html` in a browser to test locally.

To deploy: `git push origin main` — GitHub Pages picks up changes automatically.

## Architecture

Single-page site with two HTML files:

- [index.html](index.html) — Full landing page with anchor-based sections: `#diensten`, `#aanmerking`, `#werkwijze`, `#faq`, `#contact`
- [privacy.html](privacy.html) — GDPR-compliant privacy policy

Styling and interactivity are each centralized in one file:

- [css/style.css](css/style.css) — All styles (~1244 lines). Uses CSS custom properties for the design system (primary: `#1a56db`, accent: `#f59e0b`), Inter font via Google Fonts, and fluid spacing with `clamp()`.
- [js/main.js](js/main.js) — All interactivity (~257 lines): sticky header scroll shadow, mobile hamburger menu (with click-outside), scroll-spy nav highlighting (IntersectionObserver), FAQ accordion (single-open), scroll animations (IntersectionObserver), and contact form handling.

## Contact Form

Form submissions go to the [Web3Forms](https://web3forms.com/) API (serverless email delivery to `info@joepdeschademan.nl`). The access key is hardcoded in [js/main.js](js/main.js) at the `WEB3FORMS_KEY` constant and also stored in `.env` (git-ignored).

Validated fields: `voornaam`, `achternaam`, `email` (regex), `adres`, `akkoord` (checkbox). Errors display as Dutch "Let op:" labels styled in orange. The success message appears in-page after a successful API response.

## Styling Conventions

- BEM-like class naming: `.service-card`, `.service-card__icon`, `.service-card--featured`
- Responsive breakpoints: 1024px, 768px, 480px
- All layout uses CSS Grid and Flexbox — no frameworks
