// Content model types. Item types are derived from the generated `Queries`
// types (src/types/gatsby-types.d.ts) so schema/query changes propagate.

export type GithubCalendar = NonNullable<
  NonNullable<Queries.OpensourcePageQuery["githubContributions"]>["calendar"]
>

/** Values of `experience[].status` in src/content/data/miscellaneous.json. */
export enum ExperienceStatus {
  Completed = "Completed",
  Present = "Present",
}

/** Values of the optional `experience[].type` in miscellaneous.json. */
export enum ExperienceType {
  PositionOfResponsibility = "Position of Responsibility",
  Opensource = "Opensource",
}

/** Values of the required `experience[].kind` in miscellaneous.json; the
 * Experience page groups entries by it (open-source entries are left out). */
export enum ExperienceKind {
  FullTime = "full-time",
  Internship = "internship",
  PositionOfResponsibility = "position-of-responsibility",
  OpenSource = "open-source",
}

export type Experience = NonNullable<
  NonNullable<Queries.ExperienceSectionQuery["dataJson"]>["experience"]
>[number]

export type ExperienceRole = NonNullable<Experience["roles"]>[number]

export type Project = NonNullable<
  NonNullable<Queries.ProjectsSectionQuery["dataJson"]>["projects"]
>[number]

export type Skill = NonNullable<
  NonNullable<Queries.SkillsetSectionQuery["dataJson"]>["skills"]
>[number]

export type BlogPostNode =
  Queries.BlogPageQuery["allMarkdownRemark"]["edges"][number]["node"]

/** Experience entry as queried by the home page's experience highlight. */
export type HighlightExperience = NonNullable<
  NonNullable<Queries.ExperienceHighlightQuery["dataJson"]>["experience"]
>[number]

/** Project as queried by the home page's featured projects section. */
export type FeaturedProject = NonNullable<
  NonNullable<Queries.FeaturedProjectsQuery["dataJson"]>["projects"]
>[number]

/** Blog post as queried by the home page's latest writing section. */
export type LatestWritingPost =
  Queries.LatestWritingQuery["allMarkdownRemark"]["edges"][number]["node"]

/** Repository from opensource.json with its linked GitHub stats node. */
export type OpenSourceRepository = NonNullable<
  NonNullable<Queries.OpenSourceStripQuery["opensourceJson"]>["repositories"]
>[number]

/** Experience entry as queried by the Experience page. */
export type ExperiencePageEntry = NonNullable<
  NonNullable<Queries.ExperiencePageQuery["dataJson"]>["experience"]
>[number]

type OpensourcePageData = NonNullable<
  Queries.OpensourcePageQuery["opensourceJson"]
>

/** Program from opensource.json as queried by the Open Source page. */
export type OpenSourceProgram = NonNullable<
  OpensourcePageData["programs"]
>[number]

/** Repository card on the Open Source page (with or without a `repo`). */
export type OpenSourceWorkItem = NonNullable<
  OpensourcePageData["repositories"]
>[number]

/** Contribution from opensource.json as queried by the Open Source page. */
export type OpenSourceContribution = NonNullable<
  OpensourcePageData["contributions"]
>[number]

/** Activity from extracurriculars.json as queried by the Beyond Work page. */
export type Extracurricular =
  Queries.BeyondWorkPageQuery["allExtracurricularsJson"]["nodes"][number]
