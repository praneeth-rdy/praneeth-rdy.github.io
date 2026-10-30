import React from "react"
import { Link } from "gatsby"
import { BsDot } from "react-icons/bs"
import "../../styles/css/screens/blog/blog-item.css"
import type { BlogPostNode } from "../../types/content"

interface BlogItemProps {
  node: BlogPostNode
}

// Every post has fields.slug (onCreateNode) and frontmatter.
function BlogItem({ node }: BlogItemProps) {
  return (
    <article className="blog-item transition-fade" style={{ padding: 0 }}>
      <Link to={"/blog" + node.fields!.slug} className="blog-item-link">
        <div className="post-content-body">
          <h2 className="blog-item-category">{node.frontmatter!.category}</h2>
          <h3 className="blog-item-heading" style={{ margin: 0 }}>
            {node.frontmatter!.title || node.fields!.slug}
          </h3>
          <div className="blog-item-addinfo">
            <h2>Published on {node.frontmatter!.date}</h2>
            <div className="addinfo-separator">
              <BsDot className="fa-icon" />
            </div>
            <h2>{node.frontmatter!.maxread} read</h2>
          </div>
          <p className="blog-item-description">
            {node.frontmatter!.description}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default BlogItem
