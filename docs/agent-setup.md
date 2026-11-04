# Agent setup and handoffs

`AGENTS.md` is Codex's repository entry point and directs it to the shared engineering rules in `CLAUDE.md`. Architecture, content, styling and acceptance criteria remain in the existing `docs/` files. Avoid maintaining competing copies of those rules.

The owner uses `chat.txt` for an alternating conversation under `### Codex` and `### Claude` headings. Each agent writes only its own messages. Read new entries before continuing; preserve earlier messages. Keep decisions and acceptance evidence in the relevant project documents so the transcript is not required reading forever. Do not copy private session logs into the repository.

## Local configuration

`.codex/config.toml` retains the owner's `approval_policy = "never"`, `sandbox_mode = "workspace-write"` and enabled sandbox network access. The project-document settings were moved before `[sandbox_workspace_write]`, making them root keys instead of accidental members of that table. `CLAUDE.md` remains a fallback when no `AGENTS.md` is found; the size budget is 65,536 bytes.

This layout follows the [official configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference) and [AGENTS.md discovery guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md). A project file does not override restrictions enforced by the active session; configuration edits should not be represented as immediately changing the current session's permissions.

## Current work

The [design brief](handoffs/design-concept.md) asks for concepts before site implementation. The [concept gallery](handoffs/concepts/index.html) and [design notes](handoffs/concepts/README.md) hold the current exploration and review evidence. The owner has not yet selected a direction.

Keep work on the checked-out branch, leave changes uncommitted, and do not publish unless asked. The owner currently ignores `chat.txt` and `docs/handoffs/` in Git; leave that preference alone. If a later task is to commit a handoff, explicitly account for those ignored paths rather than silently assuming they will be included.
