import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark

  return (
    <Layout location={location}>
      <article className={`post-content no-image`}>
        <header className="post-content-header">
          <h1 className="post-content-title">{post.frontmatter.title}</h1>
        </header>

        {post.frontmatter.subtext && (
          <p className="post-content-excerpt">{post.frontmatter.subtext}</p>
        )}
        <div
          className="post-content-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <footer className="post-content-footer" />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={
      data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt
    }
  />
)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        subtext
        description
      }
    }
  }
`
