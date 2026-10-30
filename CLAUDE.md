# praneeth-rdy.github.io

Personal portfolio + blog for Praneeth Reddy Kolanu. Gatsby 5 / React 18 static site written in TypeScript, deployed to GitHub Pages.

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
yarn typecheck        # tsc --noEmit (strict); must pass before committing
yarn format           # prettier over src/**/*.{js,jsx,ts,tsx}, gatsby-*.{ts,tsx}, siteConfig.ts
```

- Never run `gatsby build` while `gatsby develop` is running (or two of either). They share `.cache`, and the result is random failures such as "Couldn't find temp query result" or "Can't resolve .cache/static-entry". Stop the dev server, `yarn clean`, then build.
- The `develop` and `build` scripts set `NODE_OPTIONS=--disable-warning=DEP0040`. Without it, Node 22 prints a harmless `punycode` deprecation warning from a transitive dependency (`tr46`/`whatwg-url`) that Gatsby's logger shows as `ERROR UNKNOWN`. Running `npx gatsby develop` directly still shows it.
- Prettier 3 config in `.prettierrc`: no semicolons, double quotes, 2-space, trailing commas es5, `arrowParens: avoid`.
- Husky 9 pre-commit runs `pretty-quick --staged`.
- No test suite exists; `yarn typecheck` is the static check.

## Deploy

`.github/workflows/build-export.yml`: on push to `v1`, builds with Node 22 and publishes `public/` to the `build` branch via `peaceiris/actions-gh-pages` (GitHub Pages serves `build`). `main` is the GitHub default branch but `v1` is the active working branch.

## Architecture

- `siteConfig.ts` — name, URLs, social links, email. Feeds `siteMetadata` in `gatsby-config.ts`.
- `gatsby-config.ts` — typed `GatsbyConfig`; `trailingSlash: "always"`; `graphqlTypegen` writes `src/types/gatsby-types.d.ts` (see TypeScript below); plugins: filesystem sources for `src/content/{blogs,data,images}`, transformer-json, transformer-remark (images, responsive-iframe, prismjs, copy-linked-files, smartypants), plugin-image + sharp, postcss (postcss-easy-import only), purgecss, google-gtag (GA4 id `G-TGQBB868SP`), manifest, remove-serviceworker (the site used to ship an offline service worker).
- `gatsby-node.ts` — `createSchemaCustomization` declares the `DataJson*` types explicitly (optional fields stay queryable, image paths resolve via `@fileByRelativePath`); `onCreateNode` adds `fields.slug` to markdown; `createPages` builds `/blog/<slug>/` from `src/templates/blog-post.tsx`.
- `gatsby-browser.tsx` / `gatsby-ssr.tsx` — `wrapRootElement` mounts `ThemeContextProvider` once for the whole app. `gatsby-ssr.tsx` also injects a pre-body inline script that reads `localStorage.darkMode` and sets the body class before hydration, so there is no light-to-dark flash. Nothing else may write `document.body.className`.
- Theme-dependent images (intro illustration, skill logos) render both variants with the helper classes `theme-light-only` / `theme-dark-only` (hidden via `.light`/`.dark` rules in `global.css`) instead of choosing in JS, so SSR output is already correct for dark-mode visitors.
- `src/pages/` — `index.tsx` (home), `blog.tsx` (list with category filter), `contact.tsx`, `404.tsx`. `about.tsx`, `elements.tsx` (component gallery / style reference), `experience.tsx`, `opensource.tsx`, `publications.tsx` are kept for future use but are not linked from the nav.
- `src/templates/blog-post.tsx` — blog post page.
- `src/components/Layout.tsx` — site chrome: nav (`NAV_LINKS` array; add an entry there to surface a hidden page), hamburger, dark-mode toggle, scroll-to-top, footer. Receives `location` from the page and derives the active link from `location.pathname`.
- `src/components/Seo.tsx` — Gatsby Head API component. Every page/template exports `Head = ({ location }) => <Seo title="..." pathname={location.pathname} />`. It emits title, canonical, Open Graph and Twitter tags (share image is `images/home/dp.jpg`), the Google Fonts `<link>`s for Muli, and optional `type="article"` + children (blog posts add `article:published_time`).
- `gatsby-plugin-sitemap` writes `/sitemap-index.xml`; the placeholder pages are excluded in `gatsby-config.ts`, and `static/robots.txt` points at the index.
- The hamburger, theme toggle and scroll-to-top controls are real `<button>`s. `buttons.css` styles every `button` globally, so each has a `button.<class>` reset block in its stylesheet that pins the original look; keep those in sync if you touch either side.
- `src/context/ThemeContextProvider.tsx` — dark mode state persisted in `localStorage.darkMode`; `useTheme()` returns `[isDarkMode, toggleThemeMode]` (`ThemeContextValue`) and throws if used outside the provider. After mount the provider sets `document.body.className` to `ThemeMode.Light`/`ThemeMode.Dark` (`light`/`dark`).
- `src/components/home/*.tsx` — `IntroSection`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `SkillsetSection`. Data via `useStaticQuery` against `dataJson` / `site`.
- `src/components/core/` — `Tooltip`, `ExpandableText`, `Accordion` (reusable primitives; Accordion is currently unused but kept).
- `src/components/contact/ContactForm.tsx` — posts form data via axios to a Google Apps Script endpoint.

Conventions: React components are PascalCase `.tsx`, one component per file, file name = component name; pages under `src/pages/` are lowercase `.tsx` (the file name is the route). Pages use exported page queries (`export const query = graphql\`...\``); components use `useStaticQuery`. No `StaticQuery` render-prop wrappers, no react-helmet.

## TypeScript

- All source is `.ts`/`.tsx`, checked with `strict` (`tsconfig.json`, `noEmit`; Gatsby's Babel strips the types, so they never affect the build output). Run `yarn typecheck` after changes.
- **Name every GraphQL query** (`query IndexPage { ... }`); names must be unique. Typegen emits `Queries.<Name>Query` for each named query. Pages use `PageProps<Queries.XxxQuery>` and `HeadFC<Queries.XxxQuery>`, components `useStaticQuery<Queries.XxxQuery>(...)`, and `gatsby-node.ts` `graphql<Queries.XxxQuery>(...)`.
- `src/types/gatsby-types.d.ts` is **generated** by Gatsby typegen (`graphqlTypegen` in `gatsby-config.ts`, with `generateOnBuild: true`) on every `yarn develop` and `yarn build`. Never edit it by hand. It is committed so `yarn typecheck` works on a fresh clone; after changing a query or the schema in `gatsby-node.ts`, run `yarn build` (or `yarn develop`) to regenerate it and commit the result.
- Hand-written shared types live only in `src/types/`: `content.ts` (enums `ExperienceStatus`, `ExperienceType`; item types `Experience`, `ExperienceRole`, `Project`, `Skill`, `BlogPostNode` derived from the generated `Queries` types), `theme.ts` (`ThemeMode`, `ThemeContextValue`), `ui.ts` (`TooltipPosition`, `SeoType`, `WithChildren`, `ImageData`), `css-modules.d.ts` (`*.module.css`), `modules.d.ts` (declarations for untyped packages, currently `postcss-easy-import`).
- Enum string values equal the strings used in the JSON data and CSS class names (`tooltip-${position}`, body `light`/`dark`); change both together.
- Generated query types are nullable throughout. Where the code relies on a value that always exists (site metadata, committed images, required JSON fields) it uses a non-null assertion `!` with a short comment rather than a fallback, so a missing value still fails as it did before.
- `tsconfig.json` sets `noUncheckedSideEffectImports: false` so plain `import "./x.css"` side-effect imports need no declarations.

## Content (edit these, not components, for data changes)

- `src/content/data/miscellaneous.json` — single JSON node (`dataJson`) with three arrays; schema is declared in `gatsby-node.ts`:
  - `experience[]`: `org`, `orgLogo` (relative image path), `status` (`Present`|`Completed`), optional `type` (`Position of Responsibility`|`Opensource`), optional `returnOffer`, `tags[]`, `description`, `roles[]{title,start,end}`.
  - `skills[]`: `name`, `darkModeLogo`, `lightModeLogo`, `website`.
  - `projects[]`: `title`, `description`, `confidential`, optional `associatedWith{org,logo}`, `dates{start,end}` (ISO dates), `stacks[]` (image paths), `attachments{repository?,documentation?,site?}` (omit keys you don't have; icons render only for present links), optional `thumbnail` (falls back to `src/content/images/project-placeholder.png`, queried in `ProjectsSection.tsx`).
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
- Body font is `Muli` from Google Fonts (legacy family name; still served), loaded via `<link>` tags in `Seo.tsx`, not from CSS.
- Project cards intentionally have no shadow/hover-grow and `HorizontalLine` uses the global `hr` margins; both match the long-standing rendered look.
