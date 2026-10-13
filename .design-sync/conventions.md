# JoepDeSchadeMan / MijnbouwschadeHulp — how to build with this system

Marketing site for mining-damage (mijnbouwschade) claim assistance in Groningen/Drenthe. Copy is **Dutch**, formal "u" form; tone is reassuring and plain ("No Cure, No Pay", "Gratis intake", "vrijblijvend").

## Setup
No provider or wrapper needed. All styling comes from `styles.css` (the site's own `css/style.css` + the Inter webfont). Components are on `window.JoepDeSchadeMan.*`. Font is Inter 400–800; headings are 700–800.

## Styling idiom: CSS custom properties + BEM classes
Use the components first. For your own layout glue, use these tokens via `var(--…)` — never hard-code new colors:

| Token | Value / use |
|---|---|
| `--color-primary` / `--color-primary-dark` / `--color-primary-light` | #1a56db brand blue / hover / pale-blue fills |
| `--color-accent` | #f59e0b amber (stars only) |
| `--color-text` / `--color-text-muted` | body text / secondary text |
| `--color-border`, `--color-bg`, `--color-bg-alt`, `--color-dark` | hairlines, white, light grey band, navy band/footer |
| `--radius-sm` 6 / `--radius-md` 12 / `--radius-lg` 20 | inputs / cards / form panel; buttons & pills are fully round (100px) |
| `--shadow-sm` / `--shadow-md` / `--shadow-lg` | resting / hover / floating |
| `--font-sans`, `--transition` | Inter stack, 0.2s ease |

Layout classes from the stylesheet you may use directly (they have no component): `contact__inner` (2-col grid info + form), `contact__info`, `contact__subtitle` (on dark), `eligibility__inner`, `eligibility__content`, `section__title`, `section__title--light`, `section__subtitle`, `link` (blue underlined inline link). Do not invent new BEM class names — they won't resolve; use inline styles with tokens instead.

## Page anatomy (compose in this order)
`Header` → `Hero` → `TrustBar` → `Section` (white) with `SectionHeader` + `ServicesGrid` of `ServiceCard` → `Section variant="alt"` with `Checklist` + `InfoNote` + `Button` → `Section` with `Steps`/`Step` → `Section` with `FaqList` → `Section variant="dark"` with `contact__inner`: `Badge tone="light"`, `section__title--light`, `ContactList` | `FormCard` (`FormRow`, `TextField`, `Checkbox`, `Button type="submit" fullWidth size="lg"`, `FormSuccess`) → `Footer`.

Rules: one primary CTA per view ("Gratis intake aanvragen"), paired with an `outline` secondary. `Section` already wraps children in `.container` (1160px). On dark backgrounds use `Badge tone="light"` and `Logo tone="dark"`. Icons in cards are emoji (🔧 💰 📋 🔍 ✍️ 🤝 🏠 ✅ ⚡). Every component's props and examples are in `components/<group>/<Name>/<Name>.d.ts` and `.prompt.md`; read `styles.css` → `_ds_bundle.css` for exact class rules.

## Example
```jsx
const { Section, SectionHeader, ServicesGrid, ServiceCard, Button } = window.JoepDeSchadeMan;

<Section id="diensten">
  <SectionHeader badge="Onze diensten" title="Waarmee kunnen wij u helpen?"
    subtitle="Van schademelding tot bezwaarprocedure." />
  <ServicesGrid>
    <ServiceCard icon="🔧" title="Schadeherstel" href="#contact">Begeleiding bij herstel van fysieke schade.</ServiceCard>
    <ServiceCard featured badge="Populair" icon="📋" title="Volledige Aanvraagbegeleiding" href="#contact">Wij nemen het hele traject uit handen.</ServiceCard>
    <ServiceCard icon="🔍" title="Rapportcontrole" href="#contact">Wij controleren of de compensatie juist is.</ServiceCard>
  </ServicesGrid>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
    <Button size="lg" href="#contact">Gratis intake aanvragen</Button>
  </div>
</Section>
```
