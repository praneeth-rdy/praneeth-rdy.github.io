// Pure derivations over dataJson.experience for the home page. Inputs are the
// structural minimum so any experience query shape can be passed in.
import { ExperienceStatus, ExperienceType } from "../types/content"
import {
  fullYearsSince,
  isPresentRoleEnd,
  monthIndex,
  parseRoleDate,
} from "./dates"

interface RoleLike {
  readonly title: string
  readonly start?: string | null
  readonly end?: string | null
}

interface ExperienceLike {
  readonly org: string
  readonly status: string
  readonly type?: string | null
  readonly roles?: ReadonlyArray<RoleLike> | null
}

const isInternship = (role: RoleLike) => role.title.includes("Intern")

/** The first entry with status Present (entries are listed newest first). */
export function findCurrentExperience<T extends ExperienceLike>(
  experience: ReadonlyArray<T>
): T | undefined {
  return experience.find(entry => entry.status === ExperienceStatus.Present)
}

/** "<latest role title> at <org>" for the current entry, or null. */
export function currentRoleLine(
  experience: ReadonlyArray<ExperienceLike>
): string | null {
  const current = findCurrentExperience(experience)
  const latestRole = current?.roles?.[0]
  return current && latestRole ? `${latestRole.title} at ${current.org}` : null
}

/** "May '26 – Present" / "May '24 – Jul '24" (en dash), or just the start when a role has no end. */
export function formatRoleRange(role: RoleLike): string {
  return [role.start, role.end].filter(Boolean).join(" – ")
}

/**
 * Earliest start and latest end across an entry's roles, as the original
 * strings ("Jun '23" / "Present"); an end of "Present" is later than any
 * date. Null when no role date parses.
 */
export function experienceSpan(
  roles: ReadonlyArray<RoleLike>
): { start: string; end: string } | null {
  let start: { label: string; index: number } | null = null
  let end: { label: string; index: number } | null = null
  for (const role of roles) {
    for (const label of [role.start, role.end]) {
      if (!label) continue
      if (label === role.end && isPresentRoleEnd(label)) {
        end = { label, index: Number.POSITIVE_INFINITY }
        continue
      }
      const parsed = parseRoleDate(label)
      if (!parsed) continue
      const index = monthIndex(parsed)
      if (!start || index < start.index) start = { label, index }
      if (!end || index > end.index) end = { label, index }
    }
  }
  return start && end ? { start: start.label, end: end.label } : null
}

export interface ExperienceFigures {
  /** Whole years from the earliest internship start to `today`. */
  yearsSinceFirstInternship: number | null
  /** Entries that are not open-source programmes. */
  organisations: number
  /** Entries typed "Position of Responsibility". */
  positions: number
}

export function experienceFigures(
  experience: ReadonlyArray<ExperienceLike>,
  today: Date
): ExperienceFigures {
  let first: ReturnType<typeof parseRoleDate> = null
  for (const entry of experience) {
    for (const role of entry.roles ?? []) {
      if (!isInternship(role)) continue
      const parsed = parseRoleDate(role.start)
      if (parsed && (!first || monthIndex(parsed) < monthIndex(first))) {
        first = parsed
      }
    }
  }
  return {
    yearsSinceFirstInternship: first ? fullYearsSince(first, today) : null,
    organisations: experience.filter(
      entry => entry.type !== ExperienceType.Opensource
    ).length,
    positions: experience.filter(
      entry => entry.type === ExperienceType.PositionOfResponsibility
    ).length,
  }
}

/**
 * Sort key for "newest first": the latest parsed role end as a month index.
 * A role ending "Present", or with a start but no parseable end, is ongoing
 * (+Infinity); an entry with no parseable dates sorts last (-Infinity).
 */
export function latestRoleEnd(roles: ReadonlyArray<RoleLike>): number {
  let latest = Number.NEGATIVE_INFINITY
  for (const role of roles) {
    if (isPresentRoleEnd(role.end)) return Number.POSITIVE_INFINITY
    const end = parseRoleDate(role.end)
    if (end) latest = Math.max(latest, monthIndex(end))
    else if (parseRoleDate(role.start)) return Number.POSITIVE_INFINITY
  }
  return latest
}

/** Descriptions shorter than this render in full without a fold. */
const DESCRIPTION_FOLD_MIN = 220
/** The fold's excerpt is cut at the last word break before this length. */
const DESCRIPTION_EXCERPT_MAX = 190

/**
 * The excerpt shown above a "Read description +" fold (the concept's rule:
 * descriptions of 220+ characters fold, the excerpt is the first 190
 * characters cut back to a word boundary, plus an ellipsis), or null when the
 * description is short enough to show in full.
 */
export function descriptionExcerpt(text: string): string | null {
  if (text.length < DESCRIPTION_FOLD_MIN) return null
  const head = text.slice(0, DESCRIPTION_EXCERPT_MAX)
  const cut = head.lastIndexOf(" ")
  return `${cut > 0 ? head.slice(0, cut) : head}…`
}
