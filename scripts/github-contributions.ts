// Build-only GitHub client. This module must never be imported by browser code.
import type { ContributionDay, ContributionSnapshot } from "../src/types/github"

const TTL = 24 * 60 * 60 * 1000
const QUERY = `query PortfolioContributionCalendar($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date weekday contributionCount contributionLevel } }
      }
    }
  }
}`
const LEVELS = [
  "NONE",
  "FIRST_QUARTILE",
  "SECOND_QUARTILE",
  "THIRD_QUARTILE",
  "FOURTH_QUARTILE",
]
const record = (value: unknown): Record<string, unknown> | null =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
const count = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0

/** Reconstruct a strict allowlist so API/cache extras cannot enter public nodes. */
export function validateSnapshot(value: unknown): ContributionSnapshot | null {
  const data = record(value)
  if (
    !data ||
    !count(data.totalContributions) ||
    typeof data.fetchedAt !== "string" ||
    !Number.isFinite(Date.parse(data.fetchedAt)) ||
    !Array.isArray(data.days) ||
    data.days.length === 0 ||
    data.days.length > 371
  )
    return null
  const days: ContributionDay[] = []
  for (const item of data.days) {
    const day = record(item)
    if (
      !day ||
      typeof day.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
      !count(day.contributionCount) ||
      typeof day.contributionLevel !== "string" ||
      !LEVELS.includes(day.contributionLevel)
    )
      return null
    const timestamp = Date.parse(day.date + "T00:00:00Z")
    if (
      !Number.isFinite(timestamp) ||
      new Date(timestamp).toISOString().slice(0, 10) !== day.date ||
      day.weekday !== new Date(timestamp).getUTCDay()
    )
      return null
    if (
      days.length &&
      timestamp - Date.parse(days[days.length - 1].date + "T00:00:00Z") !==
        86400000
    )
      return null
    days.push({
      date: day.date,
      weekday: day.weekday as number,
      contributionCount: day.contributionCount,
      contributionLevel:
        day.contributionLevel as ContributionDay["contributionLevel"],
    })
  }
  return {
    totalContributions: data.totalContributions,
    fetchedAt: data.fetchedAt,
    days,
  }
}

interface LoadOptions {
  login: string
  token?: string
  cache: {
    get(key: string): Promise<unknown>
    set(key: string, value: ContributionSnapshot): Promise<unknown>
  }
  warn(message: string): void
  fetcher?: typeof fetch
  now?: number
}

export async function loadContributions({
  login,
  token,
  cache,
  warn,
  fetcher = fetch,
  now = Date.now(),
}: LoadOptions): Promise<ContributionSnapshot | null> {
  const key = `github-contributions:v1:${login}`
  let cached: ContributionSnapshot | null = null
  try {
    cached = validateSnapshot(await cache.get(key))
  } catch {
    /* Cache is optional. */
  }
  if (cached && Date.parse(cached.fetchedAt) > now) cached = null
  if (cached && now - Date.parse(cached.fetchedAt) < TTL) return cached
  if (!token) {
    warn(
      `GitHub activity: PROFILE_READ_PAT is not set; ${cached ? "using the previous snapshot" : "omitting the calendar"}.`
    )
    return cached
  }
  try {
    const response = await fetcher("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "praneeth-rdy.github.io-build",
      },
      body: JSON.stringify({ query: QUERY, variables: { login } }),
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error("GitHub request failed")
    const payload = record(await response.json())
    if (
      !payload ||
      (payload.errors !== undefined &&
        (!Array.isArray(payload.errors) || payload.errors.length > 0))
    )
      throw new Error("GraphQL errors")
    const calendar = record(
      record(record(record(payload.data)?.user)?.contributionsCollection)
        ?.contributionCalendar
    )
    if (
      !calendar ||
      !Array.isArray(calendar.weeks) ||
      calendar.weeks.length > 54
    )
      throw new Error("Invalid calendar")
    const days = calendar.weeks.flatMap(week => {
      const values = record(week)?.contributionDays
      if (!Array.isArray(values) || values.length === 0 || values.length > 7)
        throw new Error("Invalid week")
      return values
    })
    const snapshot = validateSnapshot({
      totalContributions: calendar.totalContributions,
      days,
      fetchedAt: new Date(now).toISOString(),
    })
    if (!snapshot) throw new Error("Invalid calendar")
    try {
      await cache.set(key, snapshot)
    } catch {
      warn("GitHub activity: could not save the calendar cache.")
    }
    return snapshot
  } catch {
    // Do not log upstream errors: an API/proxy response can contain credentials.
    warn(
      `GitHub activity unavailable; ${cached ? "using the previous snapshot" : "omitting the calendar"}.`
    )
    return cached
  }
}
