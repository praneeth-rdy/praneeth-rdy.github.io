# Project guidance

Personal portfolio and blog; Gatsby 5, React 18, TypeScript strict, plain CSS.

## Read first

- `CLAUDE.md`: shared engineering rules, commands, architecture and CSS conventions. Read it; this file complements it rather than replacing it.
- `docs/README.md`, `docs/working-agreement.md`, `docs/known-issues.md`: project context, acceptance checks and unresolved content.
- For current design work: `docs/handoffs/design-concept.md`, then `docs/handoffs/concepts/README.md` when present.
- `chat.txt`: owner-mediated conversation between Codex and Claude. Append only your own response under `### Codex` or `### Claude`. Preserve prior messages; never invent the other agent's reply. Move durable decisions into the relevant docs.

## Working boundaries

- Work on the checked-out branch. No branches, worktrees, commits or pushes unless requested. Work happens directly on `main`, and pushing it deploys the site.
- Preserve pre-existing work. Docs and handoffs may already be untracked; that does not mean they are disposable.
- Current scope is design concepts in `docs/handoffs/concepts/`, not implementation in `src/`. Produce two or three distinct directions for each of the four pages before the owner chooses. Follow the brief's fixed sections and theme constraints.
- Keep owner-supplied facts and bracketed placeholders. Do not invent quotes, personal experiences, metrics, project links or photos.
- Existing Claude model/delegation notes describe Claude's workflow. They do not require unavailable models or automatic delegation by other agents.

## Verification

- Never run Gatsby build/clean while a development server is running. Check processes first; inability to inspect them is not evidence that none exist. Leave user-owned servers alone.
- Implementation checks: `yarn typecheck`, Prettier on changed files, clean production build, desktop/phone browser review in both themes. See `docs/working-agreement.md` for the full checklist.
- Standalone concept checks: formatting, browser screenshots at 1280px and 390px in both themes, no horizontal overflow, working links/folds/menu/theme switch, visible focus and contrast review. Do not rebuild Gatsby merely for a docs-only revision.
- Clearly distinguish checks that passed from checks blocked by the environment. Keep verification notes with the handoff.

## Local Codex configuration

`.codex/config.toml` holds repository settings. Keep `project_doc_fallback_filenames` and `project_doc_max_bytes` at TOML's root, before table headings. Preserve the owner's permission preferences unless explicitly asked to change them. Session-enforced permissions still take precedence over this file.
