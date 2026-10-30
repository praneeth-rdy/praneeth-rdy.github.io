import React, { useState } from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

import "../styles/normalize.css"
import "../styles/css/screens/main.css"
import "../styles/css/screens/blog/blog-page.css"

import BlogItem from "../components/blog/BlogItem"
import HorizontalLine from "../components/HorizontalLine"

const BlogPage = ({ data, location }: PageProps<Queries.BlogPageQuery>) => {
  const allPosts = data.allMarkdownRemark.edges
  const allCategories = [
    "all",
    ...new Set(
      // Every post sets frontmatter.category.
      data.allMarkdownRemark.edges.map(
        ({ node }) => node.frontmatter!.category!
      )
    ),
  ]
  const [posts, setPosts] = useState(allPosts)
  const [category, setCategory] = useState("all")

  function filterPosts(categ: string) {
    if (categ === "all") {
      setPosts(allPosts)
    } else {
      const newPosts = allPosts.filter(
        postItem => postItem.node.frontmatter!.category === categ
      )
      setPosts(newPosts)
    }
    setCategory(categ)
  }

  return (
    <Layout location={location}>
      {/* site.siteMetadata is always set from siteConfig. */}
      {data.site!.siteMetadata!.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site!.siteMetadata!.description}
          </h2>
        </header>
      )}
      <HorizontalLine color="rgba(0, 0, 0, 0.5)" />
      <h2 className="blogs-page-heading">My Recent Blogs</h2>
      <div className="blog-filters-container">
        {allCategories.map((categ, index) => (
          <button
            key={index}
            className={`blog-filter button ${
              categ === category ? "primary" : ""
            } small`}
            onClick={() => filterPosts(categ)}
          >
            {categ[0].toUpperCase() + categ.slice(1)}
          </button>
        ))}
      </div>
      <div className="blog-body">
        {posts.map(({ node }) => (
          <BlogItem key={node.fields!.slug} node={node} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogPage

export const Head: HeadFC<Queries.BlogPageQuery> = ({ location }) => (
  <Seo
    title="Blog"
    keywords={[`blog`, `gatsby`, `javascript`, `react`]}
    pathname={location.pathname}
  />
)

export const query = graphql`
  query BlogPage {
    site {
      siteMetadata {
        description
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            description
            maxread
            category
          }
        }
      }
    }
  }
`
