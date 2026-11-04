import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName } from "../../types/ui"
import type { LatestWritingPost } from "../../types/content"

// The two newest non-archived posts, newest first, then a link to the blog.
function LatestWriting() {
  const data = useStaticQuery<Queries.LatestWritingQuery>(query)
  const posts: LatestWritingPost[] = data.allMarkdownRemark.edges.map(
    edge => edge.node
  )

  return (
    <div className={Styles.scope}>
      <div className={Styles.wrap}>
        <section className={Styles.homeBlock}>
          <div className={Styles.sectionTitle}>
            <h2>Latest writing</h2>
          </div>
          <div className={Styles.writingList}>
            {/* Every post has fields.slug (onCreateNode) and frontmatter. */}
            {posts.map(post => (
              <Link
                key={post.fields!.slug}
                className={Styles.writing}
                to={"/blog" + post.fields!.slug}
              >
                <span className={Styles.category}>
                  {post.frontmatter!.category}
                </span>
                <h3>{post.frontmatter!.title || post.fields!.slug}</h3>
                <div className={Styles.meta}>
                  Published on {post.frontmatter!.date} &middot;{" "}
                  {post.frontmatter!.maxread} read
                </div>
                <p>{post.frontmatter!.description}</p>
              </Link>
            ))}
            <Link className={Styles.textLink} to="/blog/">
              All posts
              <LineIcon name={LineIconName.Arrow} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

const query = graphql`
  query LatestWriting {
    allMarkdownRemark(
      filter: { frontmatter: { is_archived: { ne: true } } }
      sort: { frontmatter: { date: DESC } }
      limit: 2
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            description
            maxread
            category
          }
        }
      }
    }
  }
`

export default LatestWriting
