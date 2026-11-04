# Project docs

## Overview

This repository holds Praneeth Reddy Kolanu's personal website, live at https://praneeth-rdy.github.io. The site is a portfolio and a blog. The home page introduces Praneeth, shows a short bio, work experience, selected projects and a row of technology logos, and offers the resume for download. The blog holds longer posts on productivity, career and personal interests. A contact page sends messages to Praneeth through a form.

The site has no server and no database. Everything a visitor sees is generated ahead of time from files in this repository, then published as static pages. That makes it cheap to host and hard to break, but it also means every change goes through the same path: edit a file, check the result, publish.

**How content is updated.** Experience, skills and projects live in one data file; each blog post is a folder with a text file and its images. A post can be hidden from the whole site with a single flag instead of being deleted. Images for projects and skills are added as files. Details and examples are in `content-model.md`.

**Who approves what.** Praneeth owns the site and approves every change before it is published. The site's appearance is deliberate: a change must not alter how pages look unless that is the explicit purpose of the change. Anything written under Praneeth's name (bios, blog posts) uses only facts he has supplied and is reviewed by him before it goes live. Decisions that shaped the current site are recorded in `decision-log.md`; open items are in `known-issues.md`; the way work is planned, built and checked is in `working-agreement.md`.

**Publishing.** Changes are prepared on the `v1` branch and published to the live site automatically when that branch is updated on GitHub. The `main` branch mirrors it.

## Plain-language docs

- `content-model.md`: what content exists, where it lives, how to add or change it (technical notes at the end).
- `decision-log.md`: dated record of decisions and the reasons behind them.
- `known-issues.md`: what is missing, waiting on the owner, or easy to trip over.
- `working-agreement.md`: how changes are planned, implemented, reviewed and verified.
- `agent-setup.md`: shared agent entry points, Codex configuration and the owner-mediated conversation in `chat.txt`.

## Technical docs

- `architecture.md`: code structure, data flow, theming, page metadata, TypeScript types.
- `styling.md`: CSS layout, colour tokens, unused-CSS removal, button resets, known quirks, how visual fidelity is verified.
- `build-and-deploy.md`: commands, runtime requirements, the build-cache hazard, the deploy workflow, branches, sitemap and analytics.

## Handoffs

- `handoffs/github-contributions.md`: Open Source contribution-calendar design and build integration, using the owner-provided `PROFILE_READ_PAT` repository secret.

- `handoffs/design-concept.md`: brief for fresh design concepts for the Experience, Home, Open Source and Beyond Work pages, with the agreed content, tokens and constraints. Reference mockups in `handoffs/mockups/` (standalone HTML) and `handoffs/screenshots/`.
- `handoffs/concepts/index.html`: review gallery for the Editorial and Collection directions, with both themes, responsive pages and browser screenshots. Rationale, open decisions and verification are in `handoffs/concepts/README.md`.
- `handoffs/intro-about/index.html`: follow-up options for merging the homepage introduction and About section. Three layouts, both themes, desktop/phone screenshots, and implementation guidance for Claude in the accompanying `README.md`.
