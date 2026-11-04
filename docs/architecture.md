# Architecture

The site is generated ahead of time from React components, Markdown posts and one JSON data file, and published as static pages. There is no server-side code at runtime; a small client bundle adds interactivity such as the theme switch and the expandable sections.

## Stack

Gatsby 5.16, React 18.3, TypeScript (strict). Plain CSS with two CSS modules. Yarn 1, Node 22.

## Root files

| File                 | Role                                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `siteConfig.ts`      | Name, short name, URLs, social links, email. Exported `as const`; feeds `siteMetadata`.                                                                                                                                    |
| `gatsby-config.ts`   | Typed `GatsbyConfig`. `trailingSlash: "always"`, `graphqlTypegen` (writes `src/types/gatsby-types.d.ts`, `generateOnBuild: true`), plugin list.                                                                            |
| `gatsby-node.ts`     | `createSchemaCustomization` (explicit `DataJson*` types and `MarkdownRemarkFrontmatter.is_archived`), `onCreateNode` (adds `fields.slug` to markdown), `createPages` (one page per non-archived post).                     |
| `gatsby-browser.tsx` | `wrapRootElement` mounts `ThemeContextProvider` once.                                                                                                                                                                      |
| `gatsby-ssr.tsx`     | Same `wrapRootElement`, plus `onRenderBody` injecting the pre-hydration theme script.                                                                                                                                      |
| `tsconfig.json`      | Strict, `jsx: react-jsx`, `noEmit`, `allowJs: false`, `noUncheckedSideEffectImports: false` (plain CSS imports need no declarations); includes `src`, root `gatsby-*.ts*`, `siteConfig.ts`, `src/types/gatsby-types.d.ts`. |
| `.nvmrc`             | `22`.                                                                                                                                                                                                                      |

Plugins: three `gatsby-source-filesystem` sources (`src/content/blogs`, `src/content/data`, `src/content/images`), `gatsby-transformer-json`, `gatsby-transformer-remark` (images, responsive-iframe, prismjs, copy-linked-files, smartypants), `gatsby-plugin-image` with the sharp pair, `gatsby-plugin-postcss` (only `postcss-easy-import`), `gatsby-plugin-purgecss`, `gatsby-plugin-google-gtag`, `gatsby-plugin-manifest`, `gatsby-plugin-sitemap` (excludes the placeholder pages), `gatsby-plugin-remove-serviceworker`.

## Pages and templates

- `src/pages/index.tsx`: home. Composes `IntroSection`, `HorizontalLine`, `AboutSection`, `ExperienceSection`, `ProjectsSection`, `SkillsetSection`. Its page query loads the hero and about images.
- `src/pages/blog.tsx`: post list with category filter buttons derived from the posts; the query filters `is_archived: { ne: true }`.
- `src/pages/contact.tsx`: renders `ContactForm`.
- `src/pages/404.tsx`: styled with the theme's `.error-head` classes.
- `src/pages/about.tsx`, `elements.tsx`, `experience.tsx`, `opensource.tsx`, `publications.tsx`: kept for future use, not linked from the nav, excluded from the sitemap. `elements.tsx` is a component and style gallery.
- `src/templates/blog-post.tsx`: post page. `createPages` passes `slug`, `previous` and `next` in context; previous and next are not rendered yet.

Pages export page queries (`export const query = graphql\`...\``) and receive `data`and`location`. Components use `useStaticQuery`. There are no `StaticQuery` render-prop wrappers and no react-helmet.

## Components

- `src/components/Layout.tsx`: site frame. `NAV_LINKS` array (Home, Blog, Contact; add an entry to surface a hidden page), hamburger `<button>` with `aria-expanded`, logo link, `ToggleButton`, `<main>` with children, scroll-to-top `<button>` shown after 400px, footer. The active link is derived from `location.pathname` with trailing slashes stripped. `navHeading` comes from its own static query.
- `src/components/Seo.tsx`: Head API component with props `title`, `description`, `keywords`, `pathname`, `type` (`SeoType.Website` or `Article`) and `children`. Emits `<html lang>`, the title in the `X | Praneeth Reddy` format, a canonical link built from `siteUrl` and the pathname, description, Open Graph and Twitter tags using `images/home/dp.jpg` as the share image, keywords, Google Fonts preconnect and stylesheet links for Muli, then children. Every page and the template exports `Head = ({ location }) => <Seo ... pathname={location.pathname} />`; the post template adds `type="article"` and an `article:published_time` meta tag.
- `src/components/home/IntroSection.tsx`: name, title, resume link (`static/19AE30030_Praneeth-Reddy-Kolanu_Resume.pdf`), social icons, hero illustration in both theme variants.
- `src/components/home/AboutSection.tsx`: portrait and three hard-coded paragraphs.
- `src/components/home/ExperienceSection.tsx`: cards from `dataJson.experience`; first four shown, "Show More" expands; status pill, type tag, return-offer star with tooltip, folding description, tag chips, roles list. Uses the `ExperienceStatus` and `ExperienceType` enums.
- `src/components/home/ProjectsSection.tsx`: cards from `dataJson.projects`; first two shown; thumbnail with placeholder fallback; organisation tooltip; confidential icon; stack icons; link icons only for present links.
- `src/components/home/SkillsetSection.tsx`: one card per skill with both logo variants rendered.
- `src/components/blog/BlogItem.tsx`: list card (category, title, date, read time, description).
- `src/components/contact/ContactForm.tsx`: name, email, mobile, subject, message; posts with axios to the Google Apps Script endpoint in `siteConfig.contactFormEndpoint`, as a URL-encoded body with `requestType=POST` and `formData`, a JSON string with the keys `name`, `email`, `mobile`, `subject`, `message` and `timestamp` (the script lowercases the sheet's column headers, Name, Email, Mobile, Subject, Message, Timestamp, before matching); it shows a success line only when the response has `success: true`. The form validates on blur and on submit with inline messages under each field (rules in `src/utils/contact-form.ts`) and only sends when every field passes.
- `src/components/core/Tooltip.tsx` (hover, focus and Escape; `aria-describedby`; `TooltipPosition` enum), `ExpandableText.tsx` (character-limit fold with read more and read less), `Accordion.tsx` (unused, kept for reuse).
- `src/components/HorizontalLine.tsx`, `ToggleButton.tsx` (a `<button>` with `aria-pressed`).

## Theming

- `src/context/ThemeContextProvider.tsx` holds `isDarkMode`, reads `localStorage.darkMode` on mount, exposes `useTheme()` returning `ThemeContextValue` (`[boolean, () => void]`) and throws outside the provider. After mount it sets `document.body.className` to `ThemeMode.Light` or `ThemeMode.Dark` (`light` or `dark`). Nothing else writes the body class.
- `gatsby-ssr.tsx` injects an inline script before the body content that reads the same storage key and sets the body class before React runs, so dark-mode visitors never see a light flash.
- Theme-dependent images (hero illustration, skill logos) are rendered twice with the classes `theme-light-only` and `theme-dark-only`; `global.css` hides the inactive one under `.light` and `.dark`. The server HTML is correct for both themes and no image swaps after hydration.
- Initial React state is light to match the server render; the stored value is applied in an effect.

## Data flow

1. `gatsby-source-filesystem` creates `File` nodes for data, images and blogs.
2. `gatsby-transformer-json` turns `src/content/data/miscellaneous.json` into one `DataJson` node (type name from the folder). `gatsby-transformer-remark` turns each `index.md` into a `MarkdownRemark` node.
3. `createSchemaCustomization` declares `DataJson`, `DataJsonExperience`, `DataJsonExperienceRoles`, `DataJsonSkills`, `DataJsonProjects`, `DataJsonProjectsAssociatedWith`, `DataJsonProjectsAttachments`, and `MarkdownRemarkFrontmatter { is_archived: Boolean }`. Image path fields use `@fileByRelativePath`. Optional fields stay queryable even when no entry sets them; without this, inference drops a field no entry uses and the query fails.
4. `onCreateNode` adds `fields.slug` from the folder name.
5. `createPages` queries non-archived posts sorted by date descending and creates `/blog/<slug>/` with the template.
6. The blog list query applies the same `is_archived` filter, so archived posts leave the list, the category buttons and the sitemap together.

## TypeScript

- The build strips types; `tsc --noEmit` (`yarn typecheck`) is the only type check and must pass.
- Every GraphQL query is named; typegen emits `Queries.<Name>Query` into `src/types/gatsby-types.d.ts` on each build or develop run. The file is committed. After changing a query or the schema, rebuild and commit the regenerated file.
- `src/types/content.ts`: enums `ExperienceStatus` (`Present`, `Completed`) and `ExperienceType` (`Position of Responsibility`, `Opensource`); types `Experience`, `ExperienceRole`, `Project`, `Skill`, `BlogPostNode` derived from the generated query types.
- `src/types/theme.ts`: `ThemeMode` enum, `ThemeContextValue`.
- `src/types/ui.ts`: `TooltipPosition` and `SeoType` enums, `WithChildren`, `ImageData` (alias of `IGatsbyImageData`).
- `src/types/css-modules.d.ts` and `src/types/modules.d.ts` (declaration for `postcss-easy-import`).
- Non-null assertions are allowed only where the previous JavaScript would already have thrown on a missing value, each with a comment; elsewhere `?? undefined` keeps React's attribute-dropping behaviour.
- TypeScript resolved to 7.0.2; it works and does not affect output. Pin `^5` if editor tooling needs it.
