# Working agreement

How changes are planned, built, reviewed and verified on this repository, as agreed with the owner in October and November 2026. It applies to people and to automated assistants alike.

## Principles

- **The owner approves.** Nothing is published without the owner's review. Work is prepared and shown; the owner decides when it goes live.
- **The look is fixed.** The site's appearance is deliberate. A change must not alter what visitors see unless that is its explicit purpose, and intentional visual changes are shown as before-and-after screenshots and approved one by one.
- **No invented content.** Text published under the owner's name uses only facts the owner supplied. Where a detail is missing, it is left general or marked as a placeholder, never guessed.
- **Small, reviewable steps.** Each piece of work is scoped so it can be reviewed on its own, with its checks listed.

## Roles

- A **planner** reads the code and writes a precise spec: what to change, which files may and may not be touched, the facts and constraints to respect, and the checks to run.
- An **implementer** executes the spec without widening it and reports exactly what changed and what was verified.
- A **reviewer** checks the result before it is accepted. Mechanical checks (file lists, searches, screenshot comparison against a checklist) can be done quickly; judgement calls (does behaviour still match, is a finding real) get a deliberate second look that tries to disprove the finding before it is acted on.
- The planner integrates the pieces and runs the final verification.

## Source control

- Work directly on the currently checked-out branch. No feature branches or separate working copies unless asked.
- Leave changes uncommitted until the owner asks for a commit; the owner has so far committed, merged and published the work personally.
- Commit messages use the prefixes already in the history: `feat:`, `fix:`, `refactor:`, `content:`, `chore:`. No attribution trailers.
- Never rewrite published history. When two branches diverged, they were aligned with a merge.
- Updating the working branch on GitHub publishes the site, so nothing unreviewed is pushed there.

## Content and data

- Content changes go in the data file and the blog folders, never in components.
- Third-party images (logos) are downloaded only after the owner has approved the list of files and sources; only the processed image files enter the repository, with licences recorded in `content-model.md`.
- Personal content is drafted from the owner's answers to explicit questions and reviewed by the owner before publishing.

## Verification before a change is called done

1. Type checking passes.
2. Code formatting passes on the changed files.
3. A clean production build passes with no other build or development process running.
4. The built pages are compared with the previous build: only the intended differences remain.
5. The production build is checked in a browser: home in light and dark themes, blog list, one post, contact and 404, on a desktop width and a phone width with the menu open; no errors in the browser console.
6. Restyled or converted interface controls are measured against the live site (size, position, colours).
7. For content changes, the new content, the sitemap and the category filters are checked.

## For engineers

- Checks: `yarn typecheck`, Prettier (`yarn format` or a check on changed files), `yarn clean && yarn build`.
- DOM comparison: a script strips scripts from each built page, keeps tags, classes (CSS-module hashes normalised), ARIA attributes and text, and diffs the result against the previous build; page-data and static-query JSON are compared with sorted keys.
- Browser comparison: serve a saved copy of `public/` on a local port and compare `getBoundingClientRect` and `getComputedStyle` of the controls with the live site.
- Keep the `build` branch untouched by hand; it is overwritten by the publish step.
- Documentation (`README.md`, this folder, and the operating notes at the repository root) is updated with every structural change.
