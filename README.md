# Praneeth Reddy Kolanu — Portfolio

Live site: https://praneeth-rdy.github.io

My personal portfolio and blog, built with Gatsby 5 and React 18 and deployed to GitHub Pages.

## Getting started

Use Node 22 (pinned in `.nvmrc`; run `nvm use` if you use nvm).

```sh
yarn install    # install dependencies
yarn develop    # start the dev server at http://localhost:8000
yarn build      # production build into public/
yarn serve      # serve the production build locally
yarn format     # format the code
```

## Editing content

- Experience, skills and projects live in `src/content/data/miscellaneous.json`.
- Blog posts are Markdown files at `src/content/blogs/<slug>/index.md`, with this frontmatter:

  ```yaml
  ---
  title:
  date:
  author:
  maxread:
  description:
  subtext:
  category:
  ---
  ```

- Images live under `src/content/images/`.
- The resume PDF lives in `static/`.

## Deployment

Pushing to the `v1` branch runs `.github/workflows/build-export.yml`, which builds the site and publishes `public/` to the `build` branch. GitHub Pages serves the site from the `build` branch.

## License

MIT. See `LICENSE`.
