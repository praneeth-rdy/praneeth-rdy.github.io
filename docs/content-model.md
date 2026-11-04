# Content model

All of the site's content lives in files under `src/content/`. Changing content never requires touching code: edit the data file or the post, check the result, publish.

## What content there is

- **Experience**: one entry per organisation, with a status (current or completed), an optional kind (position of responsibility, open source), tags, a short description and a list of roles with dates. The home page shows the first four and a "Show More" button.
- **Skills**: a row of technology logos on the home page. Each skill has a logo for the light theme and one for the dark theme; the name is stored but not shown.
- **Projects**: cards with a cover image, title, description, optional organisation badge, optional confidential marker, small stack icons and link icons for repository, documentation and site. The home page shows the first two and a "Show More" button.
- **Open source**: the Open Source page's intro, a quote, the programs taken part in (each with a link to the program), my own repositories and contributions to other projects. Until the contributions list has entries, that block shows a dashed placeholder box.
- **Beyond work**: one entry per activity (boxing, volleyball, volunteering, guitar) with when, a summary, a "moment to keep", optional photos and links. Each activity shows two "Photo" placeholder tiles until its photos are added.
- **Blog posts**: one folder per post containing the text and its images. The blog page lists posts newest first with category filter buttons made from the posts' categories.
- **Fixed assets**: the resume PDF, the site icon and the share image used for social previews.

## Where it lives

| Content                                                           | Location                                                       |
| ----------------------------------------------------------------- | -------------------------------------------------------------- |
| Experience, skills, projects                                      | `src/content/data/miscellaneous.json`                          |
| Open Source page                                                  | `src/content/data/opensource.json`                             |
| Beyond Work page                                                  | `src/content/data/extracurriculars.json`                       |
| Blog posts                                                        | `src/content/blogs/<post-name>/index.md` plus images beside it |
| Images for the home page, organisations, projects, skills, stacks | `src/content/images/` in matching folders                      |
| Project placeholder cover                                         | `src/content/images/project-placeholder.png`                   |
| Resume PDF, site icon, robots file                                | `static/`                                                      |
| Name, links, email shown across the site                          | `siteConfig.ts`                                                |

## How to make common changes

**Add a project.** Add an entry to the projects list in the data file with a title and description. Add a cover image to `src/content/images/projects/` and reference it, or leave the cover out and the abstract placeholder is used. Include only links that really exist; a link icon appears only for links that are present.

**Add or change a skill.** Add two logo files (light and dark) to `src/content/images/skills/`, or one file if it reads well on both backgrounds, and add an entry with the name, both file names and the website. Logos are rendered from official brand artwork; see the licence table below before adding one.

**Write a blog post.** Create a folder named after the URL you want (for example `my-boxing-journey` gives `/blog/my-boxing-journey/`), add `index.md` with the header fields shown below, and put images in the same folder with a caption in the image title. Preview locally before publishing.

**Hide a post.** Add `is_archived: true` to its header. The post disappears from the site, the list, the filters and the sitemap, and its page is no longer generated. Remove the line to bring it back.

**Update the resume.** Replace the PDF in `static/` and update the file name in the intro section if it changed.

Every image a file refers to must exist, or the site fails to build.

## Blog post header

```yaml
---
title: My post
date: "2024-11-30"
author: Praneeth Reddy Kolanu
maxread: 2 min
description: Shown in the blog list and used as the search-engine description.
subtext: Shown under the title on the post page.
category: productivity
is_archived: false # optional; true hides the post entirely
---
```

The Open Source intro and quote, the Beyond Work page intro (written in the page itself) and the activity moments, plus the guitar entry's dates and summary, are drafts awaiting the owner's review.

Currently live: "Living Asynchronously". "Three Rounds" (boxing) is written and awaiting review. "My Journey at a Startup" is archived. "Adding CSS Styles in React" was a placeholder and was deleted.

## Skill logo sources and licences

Logos were produced from official brand artwork and saved as transparent PNG files 120 pixels tall; only those files are in the repository.

| Logo                                           | Source                                                                     | Terms                                                                                   |
| ---------------------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| JavaScript                                     | github.com/voodootikigod/logo.js (community mark; no official logo exists) | MIT                                                                                     |
| TypeScript                                     | typescriptlang.org/branding, the 256px blue square                         | Do not modify the shape or imply endorsement                                            |
| Python, Java, React, Node.js, FastAPI, Android | Files already in the repository (original source to confirm)               | Respective trademarks                                                                   |
| Next.js                                        | vercel.com/geist/brands logotype, black and white                          | Vercel brand guidelines                                                                 |
| Gatsby                                         | gatsbyjs.com logo and the white variant from its logo pack                 | Gatsby logo guidelines                                                                  |
| Django                                         | djangoproject.com positive and negative marks                              | Django Software Foundation trademark policy                                             |
| PostgreSQL                                     | postgresql.org press elephant (icon only; no official wordmark)            | PostgreSQL trademark policy                                                             |
| Docker                                         | Docker logo pack, ocean-blue and white horizontal                          | Docker trademark guidelines                                                             |
| Kubernetes                                     | github.com/cncf/artwork horizontal colour and white                        | CNCF artwork repository                                                                 |
| Git                                            | git-scm.com two-colour and white logo                                      | CC BY 3.0, Jason Long; credited in the README                                           |
| Flutter                                        | flutter.dev/brand horizontal lockup, colour and white                      | Flutter trademark guidelines; the download links contain content hashes that may change |

Not in the row: AWS EC2 (removed at the owner's request), React Native (its only official asset is the same atom as React), MongoDB (artwork only available through a press-kit portal).

## For engineers

The JSON file is exposed to GraphQL as a single `dataJson` node. Its types are declared explicitly in `gatsby-node.ts` so optional fields stay queryable even when no entry sets them; image path fields resolve to `File` nodes with `@fileByRelativePath` and are relative to the JSON file (`../images/...`).

`experience[]`: `org` (required), `orgLogo`, `status` (`Present` or `Completed`, required), `type` (`Position of Responsibility` or `Opensource`), `returnOffer` (boolean), `tags[]`, `description` (folds at 120 characters), `roles[] { title, start, end }` with free-text dates in the `Month 'YY` style. The `status` and `type` strings must equal the `ExperienceStatus` and `ExperienceType` enums in `src/types/content.ts`.

`skills[]`: `name`, `darkModeLogo`, `lightModeLogo`, `website`, all required. Logos render at 50px height.

`projects[]`: `title` (required), `description` (folds at 300 characters), `confidential`, `associatedWith { org, logo }`, `stacks[]` (image paths; an empty array renders nothing), `attachments { repository?, documentation?, site? }`, `thumbnail` (falls back to the placeholder, which `ProjectsSection.tsx` queries). The former `dates` field was removed because nothing rendered it.

Blog frontmatter fields other than `is_archived` are inferred; `is_archived` is declared in the schema as `MarkdownRemarkFrontmatter { is_archived: Boolean }`, and both the page-creation query and the blog list query filter on `is_archived: { ne: true }`. Captions come from `gatsby-remark-images` with `showCaptions: true`, which uses the image title and falls back to the alt text.

Validate the JSON with `python3 -m json.tool` after editing. After adding a frontmatter field or changing the schema, run a build so the generated GraphQL types are refreshed.
