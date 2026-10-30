// Content model types. Item types are derived from the generated `Queries`
// types (src/types/gatsby-types.d.ts) so schema/query changes propagate.

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
