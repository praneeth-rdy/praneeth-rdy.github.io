# Styling

The site is styled with hand-written CSS files and a small set of colour tokens, with a light and a dark theme switched by a class on the page body. Unused CSS is removed automatically at build time, and the look is treated as fixed: changes are measured against the live site.

## Structure

Plain CSS with two CSS modules; no framework. The stylesheets descend from a Ghost blog theme (`ghost.css`, the Muli font, `.post-content` classes) and an HTML5 UP template (`.row.gtr-uniform`, `.col-6`, `.actions`, `.button.primary.fit`).

- `src/styles/normalize.css`: reset.
- `src/styles/css/vars.css`: colour tokens, fonts, breakpoints, sizes.
- `src/styles/css/screens/main.css`: entry file; imports `vars.css` and `components/*.css`, then layout, nav and post styles.
- `src/styles/css/components/`: global, ghost, lists, grid, tables, forms, buttons, actions, hamburger, animations, scrollbar, toggle-button, `core/tooltip.css`, `core/accordion.css`.
- `src/styles/css/screens/home/`: intro, about and experience section files; `projects-section.module.css` and `skillset-section.module.css` are CSS modules imported as `import * as Styles`.
- `src/styles/css/screens/blog/`, `screens/contact.css`.
- Each section file starts with `@import "../vars.css"`; `postcss-easy-import` inlines the imports.

## Colour tokens

`vars.css` defines base colours (`--color-primary #3eb0ef`, `--color-border #ddd`, light base `#131313` on background `#f8f8f8`, dark base `#f8f8f8` on background `#131313`, plus fixed status colours) and pre-computed derived shades named `--color-<base>-l<N>` (lighter) and `--color-<base>-d<N>` (darker), for example `--color-light-base-l20: rgb(69, 69, 69)` and `--color-primary-d10: rgb(19, 157, 231)`.

The site previously used the `postcss-color-function` plugin (`color(var(--x) l(+20%))`), a 2018 plugin for an older PostCSS. During the framework upgrade each of the 34 expressions was run through the still-installed plugin to capture its exact output, those values became the derived tokens, and the plugin and `postcss-custom-properties` were removed. Do not reintroduce `color()`; add a new token the same way if another shade is needed.

## Themes

The body carries `light` or `dark`; rules are written as `.light .x` and `.dark .x`. The class is set before hydration by the script in `gatsby-ssr.tsx` and afterwards by the theme provider. Theme-specific images use the `theme-light-only` and `theme-dark-only` helper classes in `global.css`.

## Unused CSS removal

Production builds run `gatsby-plugin-purgecss` over the built CSS with the source files as content. A class that only appears dynamically must appear literally somewhere in source or sit inside `/* ! purgecss start ignore */ ... /* ! purgecss end ignore */`; `components/core/tooltip.css` uses that pattern for its position variants. Selectors to re-check after CSS edits: `tooltip-top`, `expandable-text`, `.primary`, `.loading`, `site-head-open`, `.night`, `nav-current`, `scroll-to-top-btn`, the experience status and type tags.

## Button resets

`buttons.css` styles every `button` globally (height, padding, radius, font size, `color: var(--color-primary) !important`, transitions, hover colour). The hamburger, theme toggle and scroll-to-top controls were converted from `<a>`, `<div>` and `<span>` to real `<button>`s for accessibility, so each has a `button.<class>` reset block that pins the original box and colours:

- `button.nav-burger` in `screens/main.css`
- `button.toggle` and `button.toggle.night` in `components/toggle-button.css`
- `button.scroll-to-top-btn` in `components/global.css`

If `buttons.css` or those classes change, keep the reset blocks in sync and re-measure the controls against the live site.

## Known quirks, intentionally left alone

- `components/actions.css` has `@media (max-width: var(--xsmall))`; browsers ignore a custom property in a media query, so the rule never applies. Fixing it would change the layout of `.actions` at 480px and below.
- `gatsby-remark-prismjs` is configured but no Prism theme is imported; no post has a code block yet.
- The body font is `Muli` (the Google Fonts legacy name for Mulish), loaded through `<link>` tags in `Seo.tsx`, not from CSS.
- Project cards have no shadow or hover grow (the original code applied the classes with literal quotes, so they never matched) and `HorizontalLine` uses the global `hr` margins (its default margin was invalid). Both were kept deliberately.
- A sensible future step is to stay on plain CSS: move the remaining section files to CSS modules, delete the Ghost and HTML5 UP leftovers that the purge step strips, add a CSS linter, and consider `color-mix()` for the derived tokens. A utility framework or CSS-in-JS would risk the look for no benefit on a static site.

## Visual fidelity and how it is verified

Rule: the rendered site must not change unless the task asks for it. Verification used during the upgrade and expected for future CSS or markup work:

1. Build before and after, then compare each page's body with a DOM-signature script: strip scripts and noscript, keep tags, classes (CSS-module hashes normalised), ARIA and role attributes and text, then diff. Only intended differences may remain.
2. Compare `page-data.json` results and static-query results between builds (keys sorted); they must be identical for data-only or type-only changes.
3. Serve the build locally and, in a browser, measure converted or restyled controls with `getBoundingClientRect` and `getComputedStyle` on both the local build and the live site: size, position, padding, colours, borders, radius, font and line height must match.
4. Screenshot the home sections, blog list, a post, contact and 404 in light and dark mode at 1280px and 390px, with the mobile menu open, and compare with the live site.
5. Check the console for errors and hydration warnings, and confirm purge-sensitive selectors survive in the built CSS.
