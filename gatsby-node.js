const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Explicit schema for src/content/data/*.json so optional fields (project
// links, org associations, experience type, ...) stay queryable even when no
// entry currently sets them, and so relative image paths resolve to File nodes.
exports.createSchemaCustomization = ({ actions }) => {
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
      associatedWith: DataJsonProjectsAssociatedWith
      dates: DataJsonProjectsDates
      stacks: [File] @fileByRelativePath
      attachments: DataJsonProjectsAttachments
      thumbnail: File @fileByRelativePath
    }

    type DataJsonProjectsAssociatedWith {
      org: String
      logo: File @fileByRelativePath
    }

    type DataJsonProjectsDates {
      start: Date @dateformat
      end: Date @dateformat
    }

    type DataJsonProjectsAttachments {
      repository: String
      documentation: String
      site: String
    }
  `)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
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

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}
