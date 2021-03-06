import React from "react"
import { graphql } from "gatsby"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ThemeContextProvider from "../context/ThemeContextProvider"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const navHeading = data.site.siteMetadata.navHeading

  return (
    <ThemeContextProvider>
      <Layout navHeading={navHeading} location={location} title={siteTitle}>
        <Seo
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>

          {post.frontmatter.description && (
            <p class="post-content-excerpt">{post.frontmatter.description}</p>
          )}

          {post.frontmatter.thumbnail && (
            <div className="kg-image-card kg-width-half">
              <GatsbyImage
                className="kg-image"
                image={
                  post.frontmatter.thumbnail.childImageSharp.gatsbyImageData
                }
                alt={post.frontmatter.title}
              />
            </div>
          )}
          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    </ThemeContextProvider>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        navHeading
        description
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
