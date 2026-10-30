# praneeth-rdy.github.io

Personal portfolio + blog for Praneeth Reddy Kolanu. Gatsby 5 / React 18 static site, deployed to GitHub Pages.

## Working rules

- Edit files directly on the currently checked-out branch. Do not create branches or worktrees unless asked.
- Do **not** add `Co-Authored-By` or any other attribution trailer to commit messages.
- Commit style: conventional prefixes already used in history (`feat:`, `fix:`, `refactor:`, `content:`, `chore:`).
- Only commit or push when asked. Pushing to `v1` triggers the deploy workflow.
- Visual fidelity matters: the site's look is intentional. Do not change rendered output unless the task asks for it.

## Commands

```sh
yarn install          # Node 22 (see .nvmrc); yarn.lock is the lockfile
yarn develop          # dev server at http://localhost:8000 (GraphiQL at /___graphql)
yarn build            # gatsby build -> public/
yarn serve            # serve the production build at http://localhost:9000
yarn clean            # gatsby clean (.cache + public)
yarn format           # prettier --write "src/**/*.{js,jsx}"
```

- Never run `gatsby build` while `gatsby develop` is running (or two of either). They share `.cache`, and the result is random failures such as "Couldn't find temp query result" or "Can't resolve .cache/static-entry". Stop the dev server, `yarn clean`, then build.
- The `develop` and `build` scripts set `NODE_OPTIONS=--disable-warning=DEP0040`. Without it, Node 22 prints a harmless `punycode` deprecation warning from a transitive dependency (`tr46`/`whatwg-url`) that Gatsby's logger shows as `ERROR UNKNOWN`. Running `npx gatsby develop` directly still shows it.
- Prettier 3 config in `.prettierrc`: no semicolons, double quotes, 2-space, trailing commas es5, `arrowParens: avoid`.
- Husky 9 pre-commit runs `pretty-quick --staged`.
- No test suite exists.

## Deploy

`.github/workflows/build-export.yml`: on push to `v1`, builds with Node 22 and publishes `public/` to the `build` branch via `peaceiris/actions-gh-pages` (GitHub Pages serves `build`). `main` is the GitHub default branch but `v1` is the active working branch.

## Architecture

- `siteConfig.js` — name, URLs, social links, email. Feeds `siteMetadata` in `gatsby-config.js`.
- `gatsby-config.js` — `trailingSlash: "always"`; plugins: filesystem sources for `src/content/{blogs,data,images}`, transformer-json, transformer-remark (images, responsive-iframe, prismjs, copy-linked-files, smartypants), plugin-image + sharp, postcss (postcss-easy-import only), purgecss, google-gtag (GA4 id `G-TGQBB868SP`), manifest, remove-serviceworker (the site used to ship an offline service worker).
- `gatsby-node.js` — `createSchemaCustomization` declares the `DataJson*` types explicitly (optional fields stay queryable, image paths resolve via `@fileByRelativePath`); `onCreateNode` adds `fields.slug` to markdown; `createPages` builds `/blog/<slug>/` from `src/templates/blog-post.js`.
- `gatsby-browser.js` / `gatsby-ssr.js` — `wrapRootElement` mounts `ThemeContextProvider` once for the whole app.
- `src/pages/` — `index.js` (home), `blog.js` (list with category filter), `contact.js`, `404.js`. `about.js`, `elements.js` (component gallery / style reference), `experience.js`, `opensource.js`, `publications.js` are kept for future use but are not linked from the nav.
- `src/templates/blog-post.js` — blog post page.
- `src/components/Layout.jsx` — site chrome: nav (`NAV_LINKS` array; add an entry there to surface a hidden page), hamburger, dark-mode toggle, scroll-to-top, footer. Receives `location` from the page and derives the active link from `location.pathname`.
- `src/components/Seo.jsx` — Gatsby Head API component. Every page/template exports `Head = () => <Seo title="..." />`.
- `src/context/ThemeContextProvider.jsx` — dark mode state persisted in `localStorage.darkMode`; `useTheme()` returns `[isDarkMode, toggleThemeMode]`. `Layout` sets `document.body.className` to `light`/`dark`.
- `src/components/home/*.jsx` — `IntroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `SkillsetSection`. Data via `useStaticQuery` against `dataJson` / `site`.
- `src/components/core/` — `Tooltip`, `ExpandableText`, `Accordion` (reusable primitives; Accordion is currently unused but kept).
- `src/components/contact/ContactForm.jsx` — posts form data via axios to a Google Apps Script endpoint.

Conventions: React components are PascalCase `.jsx`; pages under `src/pages/` stay `.js`. Pages use exported page queries (`export const query = graphql\`...\``); components use `useStaticQuery`. No `StaticQuery` render-prop wrappers, no react-helmet.

## Content (edit these, not components, for data changes)

- `src/content/data/miscellaneous.json` — single JSON node (`dataJson`) with three arrays; schema is declared in `gatsby-node.js`:
  - `experience[]`: `org`, `orgLogo` (relative image path), `status` (`Present`|`Completed`), optional `type` (`Position of Responsibility`|`Opensource`), optional `returnOffer`, `tags[]`, `description`, `roles[]{title,start,end}`.
  - `skills[]`: `name`, `darkModeLogo`, `lightModeLogo`, `website`.
  - `projects[]`: `title`, `description`, `confidential`, optional `associatedWith{org,logo}`, `dates{start,end}` (ISO dates), `stacks[]` (image paths), `attachments{repository?,documentation?,site?}` (omit keys you don't have; icons render only for present links), optional `thumbnail` (falls back to `src/content/images/project-placeholder.png`, queried in `ProjectsSection.jsx`).
  - Image paths are relative to the JSON file (`../images/...`); every referenced file must exist or the build fails.
- `src/content/blogs/<slug>/index.md` — frontmatter: `title`, `date`, `author`, `maxread`, `description`, `subtext`, `category`. Images live beside the markdown.
- `src/content/images/` — `home/`, `org-logos/`, `projects/`, `skills/`, `stacks/`.
- `static/` — resume PDF (linked from `IntroSection`), favicon, robots.txt.

## Styling

- Plain CSS under `src/styles/css/`, entry `screens/main.css` imports `vars.css` and `components/*.css`. Section-specific files under `screens/home/`, `screens/blog/`.
- `*.module.css` files (projects, skillset) are CSS modules imported as `import * as Styles`.
- Theme colours via `.light` / `.dark` body classes and CSS custom properties in `vars.css`. Derived shades are pre-computed tokens named `--color-<base>-l<N>` (lighter) / `--color-<base>-d<N>` (darker); do not reintroduce PostCSS `color()` functions.
- purgecss is on in production builds: dynamically built class names must appear literally somewhere or be wrapped in `/* ! purgecss start ignore */ ... end ignore */` (see `components/core/tooltip.css`).

## Known quirks (intentionally left alone)

- `components/actions.css` has `@media (max-width: var(--xsmall))`, which browsers ignore; fixing it would change the ≤480px layout of `.actions`.
- `gatsby-remark-prismjs` is configured but no Prism theme CSS is imported; no blog post currently has a code block.
- Body font is `Muli` via a Google Fonts `@import` in `vars.css` (legacy family name; still served).
- Project cards intentionally have no shadow/hover-grow and `HorizontalLine` uses the global `hr` margins; both match the long-standing rendered look.
