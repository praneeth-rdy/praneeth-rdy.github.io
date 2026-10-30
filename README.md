# Praneeth Reddy Kolanu — Portfolio

Live site: https://praneeth-rdy.github.io

My personal portfolio and blog. It is a static site built with Gatsby 5, React 18 and TypeScript, styled with plain CSS, and deployed to GitHub Pages.

What the site has:

- A home page with intro, about, experience, projects and skillset sections, all driven by one JSON data file.
- A blog written in Markdown, with category filters.
- A contact form that posts to a Google Apps Script endpoint.
- A light/dark theme toggle that remembers the choice in `localStorage`.
- Search-friendly head tags (canonical URL, Open Graph and Twitter cards) and a generated sitemap.

## Getting started

Requirements: Node 22 (pinned in `.nvmrc`; run `nvm use` if you use nvm) and Yarn 1.

```sh
yarn install    # install dependencies
yarn develop    # dev server at http://localhost:8000 (GraphiQL at /___graphql)
yarn build      # production build into public/
yarn serve      # serve the production build at http://localhost:9000
yarn clean      # delete .cache and public
yarn typecheck  # type-check the project with tsc (strict)
yarn format     # run Prettier over src/ and the root TypeScript files
```

Do not run `yarn build` while `yarn develop` is running. Both use the same `.cache` directory and the build fails in confusing ways. Stop the dev server, run `yarn clean`, then build.

A Husky pre-commit hook formats staged files with Prettier.

### TypeScript and GraphQL types

All source is TypeScript. Every GraphQL query is named, and Gatsby generates a `Queries.<Name>Query` type for each one into `src/types/gatsby-types.d.ts`. That file is generated (do not edit it) and committed so `yarn typecheck` works on a fresh clone. After changing a query or the data schema, run `yarn build` or `yarn develop` once to regenerate it.

## Project layout

```
siteConfig.ts                 name, URLs, social links, email
gatsby-config.ts              plugins and site metadata
gatsby-node.ts                data schema and blog page generation
gatsby-browser.tsx            wraps the app in the theme provider
gatsby-ssr.tsx                same, plus the pre-hydration theme script
tsconfig.json                 TypeScript settings (strict)
src/pages/                    one .tsx file per route (index, blog, contact, 404, ...)
src/templates/blog-post.tsx   blog post page
src/components/               Layout, Seo, home sections, blog item, contact form (.tsx)
src/components/core/          Tooltip, ExpandableText, Accordion
src/context/                  theme (dark mode) provider
src/types/                    shared types and enums; gatsby-types.d.ts is generated
src/content/data/             miscellaneous.json (experience, skills, projects)
src/content/blogs/            one folder per post
src/content/images/           home, org-logos, projects, skills, stacks
src/styles/css/               stylesheets; vars.css holds the colour tokens
static/                       resume PDF, favicon, robots.txt
```

## Conventions

- React components are PascalCase `.tsx` files, one component per file, with the file named after the component. Pages under `src/pages/` are lowercase `.tsx` because the file name is the route.
- Pages use exported page queries (`` export const query = graphql`...` ``); components use `useStaticQuery`. Every query needs a unique name (`query IndexPage { ... }`) so typegen emits a `Queries.IndexPageQuery` type for it.
- Shared types and enums live only in `src/types/`: `content.ts` (data model enums and item types derived from the generated query types), `theme.ts` and `ui.ts`. Module declarations go in `css-modules.d.ts` and `modules.d.ts`. Do not add `.d.ts` files anywhere else.
- Fixed sets of strings (experience status and type, theme mode, tooltip position, SEO type) are enums. Their values must stay equal to the strings used in the JSON data and in CSS class names.
- Non-null assertions (`!`) are allowed only where the old JavaScript would already have thrown on a missing value, and each one gets a short comment. Everywhere else, use `?? undefined`.
- Run `yarn typecheck` before committing; the pre-commit hook only formats.
- Visual fidelity: the site's look is intentional. Changes should not alter the rendered output unless that is the task.

## Editing content

### Experience, skills and projects

Everything lives in `src/content/data/miscellaneous.json`. Image paths are relative to that file. A project entry looks like this:

```json
{
  "title": "Project name",
  "description": "What it does.",
  "confidential": false,
  "associatedWith": {
    "org": "IIT Kharagpur",
    "logo": "../images/org-logos/iitkgp-logo.jpeg"
  },
  "stacks": ["../images/stacks/react.png"],
  "attachments": {
    "repository": "https://github.com/...",
    "documentation": "",
    "site": ""
  },
  "thumbnail": "../images/projects/project-cover.png"
}
```

Notes:

- `associatedWith` is optional. Leave out `attachments` keys you do not have; an icon is shown only for links that are present.
- `thumbnail` is optional. Entries without one show `src/content/images/project-placeholder.png`.
- Experience entries take `org`, `orgLogo`, `status` (`Present` or `Completed`), optional `type` (`Position of Responsibility` or `Opensource`), optional `returnOffer`, `tags`, `description` and `roles`. These strings must match the `ExperienceStatus` and `ExperienceType` enums in `src/types/content.ts`.
- Every image path must point to an existing file or the build fails.

### Blog posts

Create `src/content/blogs/<slug>/index.md`. The slug becomes the URL `/blog/<slug>/`. Put images next to the Markdown file and reference them with relative paths.

```yaml
---
title: My post
date: "2024-11-30"
author: Praneeth Reddy Kolanu
maxread: 2 min
description: Shown in the blog list and used as the meta description.
subtext: Shown under the title on the post page.
category: productivity
---
```

Categories are collected automatically for the filter buttons.

### Other bits

- Name, social links and email: `siteConfig.ts`.
- Share image for social previews: `src/content/images/home/dp.jpg` (referenced in `src/components/Seo.tsx`).
- Sitemap: generated at `/sitemap-index.xml`; placeholder pages are excluded in `gatsby-config.ts`.
- Resume: replace the PDF in `static/` and update the filename in `src/components/home/IntroSection.tsx`.
- Contact form endpoint: the URL in `src/components/contact/ContactForm.tsx`.
- Analytics: the GA4 measurement ID in `gatsby-config.ts`.

## Deployment

Pushing to the `v1` branch runs `.github/workflows/build-export.yml`. It builds the site on Node 22 and publishes `public/` to the `build` branch, which GitHub Pages serves. No secrets are needed beyond the default `GITHUB_TOKEN`.

## Troubleshooting

- The dev server fails to start or the build fails with "Couldn't find temp query result": another Gatsby process was using `.cache`. Stop it and run `yarn clean`.
- A GraphQL error about a missing image: a path in `miscellaneous.json` or a blog post points to a file that does not exist.
- Styles missing in the production build but present in `yarn develop`: PurgeCSS removed a class that only appears dynamically. See `src/styles/css/components/core/tooltip.css` for the ignore-comment pattern.
- `yarn typecheck` fails with `Property ... does not exist on type Queries...` after you changed a query or the schema: the generated types are stale. Run `yarn build` or `yarn develop` once to regenerate `src/types/gatsby-types.d.ts`.

## License

MIT. See `LICENSE`.
