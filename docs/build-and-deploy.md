# Build and deploy

The site is built with a handful of commands on Node 22 and published automatically when the working branch is updated on GitHub. The one operational hazard is running two build processes at once, which corrupts the shared cache.

## Requirements

Node 22 (`.nvmrc`) and Yarn 1 (`yarn.lock` is the lockfile). Gatsby 5.16 supports Node 18 to 25.

## Commands

```sh
yarn install
yarn develop     # http://localhost:8000, GraphiQL at /___graphql
yarn build       # production build into public/
yarn serve       # serve public/ at http://localhost:9000
yarn clean       # delete .cache and public
yarn typecheck   # tsc --noEmit, strict
yarn format      # prettier over src and the root TypeScript files
```

`develop` and `build` set `NODE_OPTIONS=--disable-warning=DEP0040`. Without it, Node 22 prints a `punycode` deprecation warning from a transitive dependency (`tr46` via `whatwg-url`) that the build logger renders as a red `ERROR UNKNOWN` block at startup. It is harmless; the flag hides only that warning code, and child processes inherit it.

Husky 9 runs `pretty-quick --staged` on commit. Prettier 3 config: no semicolons, double quotes, two-space indent, `trailingComma: es5`, `arrowParens: avoid`.

## The shared-cache hazard

Never run `gatsby build` while `gatsby develop` is running, or two of either. Both processes read and write `.cache`, and the loser sees random failures such as:

- `Couldn't find temp query result for "/blog/<slug>/"`
- `Can't resolve '.../.cache/static-entry'` while building the SSR bundle
- a dev server that fails to start or serves stale pages

During the upgrade 3 of 5 builds failed this way while a dev server was running; with no other process, 4 of 4 clean builds passed. Check with `pgrep -fl "gatsby (develop|build)"`, stop the other process, run `yarn clean`, then build. The errors are not caused by the database library or framework bugs in this setup.

## Deploy

`.github/workflows/build-export.yml` runs on push to `main`: `actions/checkout@v4`, `actions/setup-node@v4` with Node 22 and the yarn cache, `yarn install --frozen-lockfile`, `yarn build`, then `peaceiris/actions-gh-pages@v4` publishes `public/` to the `build` branch with `force_orphan`. GitHub Pages serves the `build` branch. The default `GITHUB_TOKEN` is enough; the old `secrets.TOKEN` used by the previous Node 14 Docker action is no longer needed.

A production build regenerates `src/types/gatsby-types.d.ts`; commit it when it changes.

## Branches

- `main` is the GitHub default branch and, since 2026-11-08, the deploy trigger. Work happens on a working branch (currently `v1`) and reaches `main` through pull requests; pushing `v1` no longer deploys.
- They had diverged (24 commits only on `main` from late 2024, 33 newer on `v1`). On 2026-10-30 a merge commit `a8ffb5e` ("chore: sync main with v1") was created with `v1`'s exact tree and both branches as parents, then fast-forward pushed to both, so `main` equals `v1` without rewriting history. On 2026-11-08 the deploy trigger moved to `main`; `v1` stays the working branch and reaches `main` through pull requests.

## SEO and analytics plumbing

- `gatsby-plugin-sitemap` writes `/sitemap-index.xml` and `/sitemap-0.xml`; `static/robots.txt` points at the index. The five placeholder pages are excluded in `gatsby-config.ts`; archived posts drop out automatically.
- `Seo.tsx` emits canonical, Open Graph and Twitter tags per page using `siteMetadata.siteUrl`.
- Analytics is GA4 measurement ID `G-TGQBB868SP` through `gatsby-plugin-google-gtag`, loaded in production builds only. The previous `gatsby-plugin-google-analytics` injected the retired Universal Analytics script, so nothing was recorded before 2026-10-30.
- The site used to ship an offline service worker (`gatsby-plugin-offline`). It was removed, and `gatsby-plugin-remove-serviceworker` publishes an `sw.js` that unregisters the old worker in returning visitors' browsers. Keep that plugin until the old worker has had time to clear.

## Local verification setup

Serve a saved copy of `public/` with `python3 -m http.server 9000 --bind 127.0.0.1` from that folder, so rebuilds do not disturb what the browser is comparing. Keep such copies outside the repository.
