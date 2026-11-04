# Known issues and open items

What is missing, what is waiting on the owner, and what is easy to trip over. Dates say when an item was last checked.

## Waiting on the owner

- **Project images.** Live Scoreboard has no cover and shows the abstract placeholder. Campus Modeler's cover is a screenshot of an unrelated form and does not match its description (checked 4 Nov 2026).
- **Project links.** CapAe, Campus Modeler, Voice Chess and Live Scoreboard have no repository, documentation or site links. Only CapAe (a slide deck) and CV Buddy (its repository) link anywhere.
- **Resume.** The linked resume is the 2023 version. A newer draft exists but the owner marked it incomplete. Suggested: name the file `resume.pdf` so the link never changes when it is replaced.
- **Placeholder pages.** About, Elements, Experience, Open Source and Publications are reachable by their web addresses with placeholder content. They are hidden from navigation and the sitemap but still published. Elements is a style gallery meant for internal reference.
- **Blog.** One post is live; "Three Rounds" awaits the owner's review and has placeholder images with captions to replace; "My Journey at a Startup" is archived.
- **Contact form.** It has no protection against automated spam.

## Engineering gaps

- No automated build check on proposed changes; publishing happens on push to the working branch.
- No automated tests. Type checking is the only static check.
- No automated screenshot comparison, even though "the look must not change" is the governing rule; it has been verified by hand so far.
- No code-style linting in the automated pipeline.
- Blog posts do not yet show previous and next links, although the data for them is prepared.
- Code blocks in blog posts would render without syntax colouring; no post has one yet.

## Easy to trip over

- Running the development server and a production build at the same time corrupts the shared build cache and causes random, confusing failures. Run one at a time; see `build-and-deploy.md`.
- After changing a data query or the data schema, type checking fails until a build has refreshed the generated types.
- Every button on the site inherits a global button style; a new button in the page frame needs its own reset rules or it turns into a blue pill.
- Flutter's logo download links contain content hashes and may stop working when flutter.dev is redeployed; the logo files in the repository do not depend on them.
- Adding React Native back to the skill row needs a composite image or a supplied one; the official asset duplicates React's.
- The service-worker removal plugin must stay in place for a while so returning visitors' browsers drop the old offline cache.
- TypeScript resolved to version 7; editor plugins or linters that expect version 5 may need a pin.

## Resolved recently

- Trumio status: the current role now ends "Present" instead of "Nov '26"; date helpers treat "Present" as the latest end (4 Nov 2026).
- Duplicate React logo in the skill row (4 Nov 2026).
- Clipped TypeScript logo replaced by the official square (4 Nov 2026).
- Analytics recording nothing since 2023 (30 Oct 2026).
- Dark-mode flash on page load (30 Oct 2026).

## For engineers

- The placeholder pages are `src/pages/about.tsx`, `elements.tsx`, `experience.tsx`, `opensource.tsx`, `publications.tsx`; excluding them from production means an `onCreatePage` hook that deletes those pages when `NODE_ENV` is `production`.
- `previous` and `next` are already in the blog template's page context from `createPages`.
- `gatsby-remark-prismjs` is configured; a Prism theme CSS import (light and dark) is the missing piece.
- Typegen staleness shows as `Property ... does not exist on type Queries...` from `yarn typecheck`; a build or develop run regenerates `src/types/gatsby-types.d.ts`.
- The global button rule lives in `src/styles/css/components/buttons.css`; reset examples are `button.nav-burger`, `button.toggle`, `button.scroll-to-top-btn`.
- Automated tooling in this repository is configured to refuse `rm -rf` and `git push --force`; these are safety rails, not project requirements.
