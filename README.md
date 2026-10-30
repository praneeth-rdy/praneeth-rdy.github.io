# Praneeth Reddy Kolanu — Portfolio

Live site: https://praneeth-rdy.github.io

My personal portfolio and blog. It is a static site built with Gatsby 5 and React 18, styled with plain CSS, and deployed to GitHub Pages.

What the site has:

- A home page with intro, about, experience, projects and skillset sections, all driven by one JSON data file.
- A blog written in Markdown, with category filters.
- A contact form that posts to a Google Apps Script endpoint.
- A light/dark theme toggle that remembers the choice in `localStorage`.

## Getting started

Requirements: Node 22 (pinned in `.nvmrc`; run `nvm use` if you use nvm) and Yarn 1.

```sh
yarn install    # install dependencies
yarn develop    # dev server at http://localhost:8000 (GraphiQL at /___graphql)
yarn build      # production build into public/
yarn serve      # serve the production build at http://localhost:9000
yarn clean      # delete .cache and public
yarn format     # run Prettier over src/
```

Do not run `yarn build` while `yarn develop` is running. Both use the same `.cache` directory and the build fails in confusing ways. Stop the dev server, run `yarn clean`, then build.

A Husky pre-commit hook formats staged files with Prettier.

## Project layout

```
siteConfig.js                 name, URLs, social links, email
gatsby-config.js              plugins and site metadata
gatsby-node.js                data schema and blog page generation
src/pages/                    one file per route (index, blog, contact, 404, ...)
src/templates/blog-post.js    blog post page
src/components/               Layout, Seo, home sections, blog item, contact form
src/components/core/          Tooltip, ExpandableText, Accordion
src/context/                  theme (dark mode) provider
src/content/data/             miscellaneous.json (experience, skills, projects)
src/content/blogs/            one folder per post
src/content/images/           home, org-logos, projects, skills, stacks
src/styles/css/               stylesheets; vars.css holds the colour tokens
static/                       resume PDF, favicon, robots.txt
```

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
  "dates": { "start": "2023-01-03", "end": "2023-05-06" },
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
- Experience entries take `org`, `orgLogo`, `status` (`Present` or `Completed`), optional `type` (`Position of Responsibility` or `Opensource`), optional `returnOffer`, `tags`, `description` and `roles`.
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

- Name, social links and email: `siteConfig.js`.
- Resume: replace the PDF in `static/` and update the filename in `src/components/home/IntroSection.jsx`.
- Contact form endpoint: the URL in `src/components/contact/ContactForm.jsx`.
- Analytics: the GA4 measurement ID in `gatsby-config.js`.

## Deployment

Pushing to the `v1` branch runs `.github/workflows/build-export.yml`. It builds the site on Node 22 and publishes `public/` to the `build` branch, which GitHub Pages serves. No secrets are needed beyond the default `GITHUB_TOKEN`.

## Troubleshooting

- The dev server fails to start or the build fails with "Couldn't find temp query result": another Gatsby process was using `.cache`. Stop it and run `yarn clean`.
- A GraphQL error about a missing image: a path in `miscellaneous.json` or a blog post points to a file that does not exist.
- Styles missing in the production build but present in `yarn develop`: PurgeCSS removed a class that only appears dynamically. See `src/styles/css/components/core/tooltip.css` for the ignore-comment pattern.

## License

MIT. See `LICENSE`.
