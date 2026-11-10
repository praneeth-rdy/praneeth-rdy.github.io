import fs from "fs"
import path from "path"
import type { GatsbyNode } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import siteConfig from "./siteConfig"
import { loadContributions } from "./scripts/github-contributions"

// Explicit schema for src/content/data/*.json so optional fields (project
// links, org associations, experience type, ...) stay queryable even when no
// entry currently sets them, and so relative image paths resolve to File nodes.
// Blog frontmatter stays inferred; only the optional is_archived flag is
// declared so queries can filter on it even when no post sets it.
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
    type DataJson implements Node {
      experience: [DataJsonExperience!]
      skills: [DataJsonSkills!]
      projects: [DataJsonProjects!]
    }

    type DataJsonExperience {
      org: String!
      orgLogo: File @fileByRelativePath
      status: String!
      kind: String!
      type: String
      returnOffer: Boolean
      tags: [String!]
      description: String
      roles: [DataJsonExperienceRoles!]
    }

    type DataJsonExperienceRoles {
      title: String!
      start: String
      end: String
    }

    type DataJsonSkills {
      name: String!
      darkModeLogo: File @fileByRelativePath
      lightModeLogo: File @fileByRelativePath
      website: String
    }

    type DataJsonProjects {
      title: String!
      description: String
      confidential: Boolean
      featured: Boolean
      associatedWith: DataJsonProjectsAssociatedWith
      stacks: [File] @fileByRelativePath
      attachments: DataJsonProjectsAttachments
      thumbnail: File @fileByRelativePath
    }

    type DataJsonProjectsAssociatedWith {
      org: String
      logo: File @fileByRelativePath
    }

    type DataJsonProjectsAttachments {
      repository: String
      documentation: String
      site: String
    }

    type OpensourceJson implements Node {
      intro: String
      quote: OpensourceJsonQuote
      programs: [OpensourceJsonPrograms!]
      repositories: [OpensourceJsonRepositories!]
      contributions: [OpensourceJsonContributions!]
    }

    type OpensourceJsonQuote {
      text: String
      author: String
    }

    type OpensourceJsonPrograms {
      name: String!
      year: String
      role: String
      work: String
      link: String
      logo: File @fileByRelativePath
    }

    type OpensourceJsonRepositories {
      name: String!
      repo: String
      summary: String
      stacks: [String!]
      link: String
      github: GithubRepo @link(by: "repo", from: "repo")
    }

    type OpensourceJsonContributions {
      project: String!
      title: String
      summary: String
      link: String
    }

    type ExtracurricularsJson implements Node {
      slug: String!
      title: String!
      archived: Boolean
      photoFit: String
      when: String
      summary: String
      moment: String
      images: [File] @fileByRelativePath
      links: [ExtracurricularsJsonLinks!]
    }

    type ExtracurricularsJsonLinks {
      label: String
      to: String
    }

    type GithubRepo implements Node {
      repo: String!
      stars: Int
      forks: Int
      fetchedAt: String
    }

    type GithubContributions implements Node @dontInfer {
      login: String!
      calendar: GithubContributionCalendar
    }

    type GithubContributionCalendar @dontInfer {
      totalContributions: Int!
      fetchedAt: String!
      days: [GithubContributionDay!]!
    }

    type GithubContributionDay @dontInfer {
      date: String!
      weekday: Int!
      contributionCount: Int!
      contributionLevel: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }

    type MarkdownRemarkFrontmatter {
      is_archived: Boolean
    }
  `)
  }

interface GithubRepoStats {
  stars: number
  forks: number
  fetchedAt: string
}

const GITHUB_CACHE_TTL_MS = 24 * 60 * 60 * 1000
const GITHUB_TIMEOUT_MS = 8000

async function fetchGithubRepoStats(repo: string): Promise<GithubRepoStats> {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "praneeth-rdy.github.io-build",
    },
    signal: AbortSignal.timeout(GITHUB_TIMEOUT_MS),
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`)
  }
  const body: unknown = await response.json()
  const { stargazers_count, forks_count } = (body ?? {}) as Record<
    string,
    unknown
  >
  if (typeof stargazers_count !== "number" || typeof forks_count !== "number") {
    throw new Error("response has no stargazers_count/forks_count")
  }
  return {
    stars: stargazers_count,
    forks: forks_count,
    fetchedAt: new Date().toISOString(),
  }
}

// One GithubRepo node per repository in src/content/data/opensource.json that
// names a `repo` (entries without one, such as "Smaller repositories", only
// link out), with star and fork counts from the GitHub API (unauthenticated),
// cached for 24h in Gatsby's cache. Any failure yields null counts and a warning; the build
// never fails on GitHub. OpensourceJsonRepositories.github links to these.
export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  cache,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const login = new URL(siteConfig.github).pathname
    .split("/")
    .filter(Boolean)[0]
  const calendar = await loadContributions({
    login,
    token: process.env.PROFILE_READ_PAT,
    cache,
    warn: message => reporter.warn(message),
  })
  const activity = { login, calendar }
  actions.createNode({
    ...activity,
    id: createNodeId(`github-contributions-${login}`),
    internal: {
      type: "GithubContributions",
      contentDigest: createContentDigest(activity),
    },
  })
  const file = path.resolve(`./src/content/data/opensource.json`)
  const { repositories } = JSON.parse(fs.readFileSync(file, "utf8")) as {
    repositories: { name: string; repo?: string }[]
  }
  const repos = repositories.flatMap(({ repo }) => (repo ? [repo] : []))

  await Promise.all(
    repos.map(async repo => {
      const cacheKey = `github-repo-stats:${repo}`
      let stats: GithubRepoStats | null = null
      try {
        const cached: GithubRepoStats | undefined = await cache.get(cacheKey)
        if (
          cached &&
          Date.now() - Date.parse(cached.fetchedAt) < GITHUB_CACHE_TTL_MS
        ) {
          stats = cached
        } else {
          stats = await fetchGithubRepoStats(repo)
          await cache.set(cacheKey, stats)
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        reporter.warn(
          `GitHub stats for ${repo} unavailable (${message}); rendering without stars/forks.`
        )
      }

      const content = {
        repo,
        stars: stats ? stats.stars : null,
        forks: stats ? stats.forks : null,
        fetchedAt: stats ? stats.fetchedAt : null,
      }
      actions.createNode({
        ...content,
        id: createNodeId(`github-repo-${repo}`),
        internal: {
          type: `GithubRepo`,
          contentDigest: createContentDigest(content),
        },
      })
    })
  )
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)

  const result = await graphql<Queries.BlogPostsForPagesQuery>(`
    query BlogPostsForPages {
      allMarkdownRemark(
        filter: { frontmatter: { is_archived: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // result.errors was checked above, so data is present.
  const posts = result.data!.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog${post.node.fields!.slug}`,
      component: blogPost,
      context: {
        // fields.slug is added to every MarkdownRemark node in onCreateNode.
        slug: post.node.fields!.slug,
        previous,
        next,
      },
    })
  })
}
