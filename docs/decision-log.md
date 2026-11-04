# Decision log

A dated record of the decisions made with the owner and why, so settled questions are not reopened. Newest entries are at the bottom. Technical specifics are under "For engineers" at the end.

## 2026-10-30: framework upgrade and clean-up

- **Modernise the site rather than rebuild it.** The site ran on a framework version that was no longer maintained and on build tooling that could not be upgraded in place. The decision was to move to the current versions while keeping the site's appearance exactly as it was.
- **Keep the look.** Two small bugs that affected appearance (project cards without a shadow, a divider with default spacing) were kept as they are because fixing them would have changed the live site.
- **Fix analytics.** Visits had not been recorded since 2023 because the wrong analytics integration was in use. It was replaced; the same measurement ID is used.
- **Drop unused features.** An RSS feed nobody linked to, a hosting integration for a provider not in use, an offline cache that could serve stale pages, and several unused font packages were removed.
- **Keep the placeholder pages.** About, Experience, Open Source, Publications and Elements exist as unfinished pages. The owner wants them kept for later. They are hidden from the navigation and from the sitemap.
- **Remove fake links.** Several projects linked to the GitHub home page as a placeholder. Those links were removed; link icons now appear only for real links. The CV Buddy description, which had text copied from another project, was trimmed.
- **New publishing pipeline.** The automated publish step was rebuilt on the current runtime; it still publishes to the same branch, so no hosting settings changed.
- **Align the two main branches** without rewriting history: a merge brought `main` level with `v1`.
- **Accessibility, metadata and polish.** Menu, theme switch and scroll-to-top became real buttons with no visible change; dark-mode visitors no longer see a light flash; every page gained proper search and social-sharing metadata and a sitemap; the 404 page was styled (the one intentional visual change of the day).
- **Move the code to TypeScript** for safer future changes, with the published output verified identical.

## 2026-11-03: blog housekeeping

- The placeholder post "Adding CSS Styles in React" was deleted instead of rewritten.
- A post can now be archived with one flag; "My Journey at a Startup" was archived at the owner's request.
- A new post about the owner's boxing journey was started from an interview. Rule agreed: nothing personal is invented; the draft is reviewed by the owner.

## 2026-11-04: content refresh and planning

- The boxing post was rewritten as "Three Rounds": scene-driven, cinematic section titles, the "what I am still bad at" section dropped, the work-pressure angle replaced with the owner's own framing, a modest account of the first sparring session. Images are placeholders until real photos arrive.
- Project descriptions for Campus Modeler, Live Scoreboard and CV Buddy were rewritten from the owner's current resume. CV Buddy is the open-source project at github.com/praneeth-rdy/CV-Buddy. CapAe and Voice Chess were left as they were.
- The Trumio roles were set to: AI Systems Engineering Lead (May 2026 to Nov 2026), Software Engineering Lead (Nov 2025 to May 2026), Software Engineer (May 2024 to Nov 2025), plus the two earlier internships.
- The skill row was curated to 16 technologies using official logos in both themes. AWS EC2 was removed at the owner's request; React Native was removed because its only official logo is identical to React's; MongoDB was dropped because its artwork is not freely downloadable. Kubernetes and Flutter were added. TypeScript uses the official blue square after the wordmark version proved clipped and visually heavy.
- A roadmap of further improvements and a design exploration for the experience section were prepared and shared with the owner on 4 Nov 2026; the owner holds the links. Nothing from them is built until approved.
- The planned Open Source page will sit in the navigation between Home and Blog.
- Documentation for the project (this folder) was written so that any new engineer can take over.

## For engineers

- Framework targets: Gatsby 5.16, React 18 (not 19, for plugin compatibility), TypeScript strict. TypeScript resolved to 7.0.2 and was kept; the build strips types, so it has no effect on output.
- Replaced integrations: `gatsby-plugin-google-analytics` (Universal Analytics, retired) by `gatsby-plugin-google-gtag`; `react-helmet` by the Head API; `gatsby-plugin-offline` by `gatsby-plugin-remove-serviceworker`; `postcss-color-function` and `postcss-custom-properties` by pre-computed colour tokens. Also removed: `gatsby-plugin-feed`, `gatsby-plugin-netlify`, `typeface-*`, `autoprefixer`, `url-join`.
- Explicit GraphQL schema for the data file so optional fields survive the removal of placeholder values.
- Deploy: `actions/setup-node` 22 plus `peaceiris/actions-gh-pages` to the `build` branch; the previous custom action built in a Node 14 image.
- Branch sync: merge commit `a8ffb5e` with `v1`'s tree and both branches as parents, fast-forwarded to `main` and `v1`.
- TypeScript conversion: every file renamed with `git mv`, named queries with generated types, enums and derived types under `src/types/`, non-null assertions only where the old code would already have thrown. Verified by identical page data and structurally identical HTML.
- Sitemap excludes the five placeholder pages; archived posts drop out automatically.
- Skill logos are rendered from SVG at 120px height with the repository's image library; licences are listed in `content-model.md`.
