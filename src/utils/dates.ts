// Helpers for the role dates in src/content/data/miscellaneous.json, which are
// strings such as "May '24": a three-letter English month name, a space, an
// apostrophe and a two-digit year (always 20xx). A role that is still held has
// the end "Present" (see PRESENT_ROLE_END). Everything here is pure; the
// caller supplies "today" so build-time figures stay deterministic.

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

/** The `end` of a role that is still held. */
export const PRESENT_ROLE_END = "Present"

/** True when a role end is exactly "Present". */
export function isPresentRoleEnd(value: string | null | undefined): boolean {
  return value === PRESENT_ROLE_END
}

/** A calendar month; `month` is 0-based (January = 0). */
export interface MonthYear {
  year: number
  month: number
}

/** Parses "May '24" into { year: 2024, month: 4 }; null if it does not match. */
export function parseRoleDate(
  value: string | null | undefined
): MonthYear | null {
  if (!value) return null
  const match = /^\s*([A-Za-z]{3})[A-Za-z]*\.?\s+['’](\d{2})\s*$/.exec(value)
  if (!match) return null
  const month = MONTHS.indexOf(match[1].toLowerCase())
  if (month === -1) return null
  return { year: 2000 + Number(match[2]), month }
}

/** Months since year 0, so two MonthYears compare with plain arithmetic. */
export function monthIndex({ year, month }: MonthYear): number {
  return year * 12 + month
}

/**
 * Whole years elapsed from the first day of `start`'s month to `today`
 * (e.g. Aug 2020 -> 4 Nov 2026 is 6). Uses UTC so the server render and the
 * browser agree on the same instant.
 */
export function fullYearsSince(start: MonthYear, today: Date): number {
  const months =
    monthIndex({ year: today.getUTCFullYear(), month: today.getUTCMonth() }) -
    monthIndex(start)
  return Math.max(0, Math.floor(months / 12))
}
