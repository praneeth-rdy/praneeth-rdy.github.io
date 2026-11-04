/** Public aggregate data only; never add authentication or repository details. */
export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE"

export interface ContributionDay {
  date: string
  weekday: number
  contributionCount: number
  contributionLevel: ContributionLevel
}

export interface ContributionSnapshot {
  totalContributions: number
  days: ContributionDay[]
  fetchedAt: string
}
