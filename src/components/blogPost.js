import React from "react"
import { Link } from "gatsby"

export default props => (
    <article className="post-content page-template no-image" style={{ padding: 0, }}>
        <div className="post-content-body">
            <h3 id="heading-level-3" style={{ margin: 0, }}>{props.node.frontmatter.title || props.node.fields.slug}</h3>
            <div
                className={`post-card ${props.postClass
                    } ${props.node.frontmatter.thumbnail ? `with-image` : `no-image`}`}
                style={
                    props.node.frontmatter.thumbnail && {
                        backgroundImage: `url(${props.node.frontmatter.thumbnail.childImageSharp.fluid.src
                            })`,
                        marginTop: '2rem',
                        marginBottom: '2rem',
                    }
                }
            >
                <div className="post-card-content">
                    <h2 className="post-card-title">
                        {props.node.frontmatter.title || props.node.fields.slug}
                    </h2>
                </div>
            </div>
            <blockquote>
                {props.node.frontmatter.quote || props.node.fields.slug}
            </blockquote>
            <p>
                {props.node.frontmatter.description}
            </p>
        </div>
        <hr
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                height: 2
            }}
        />
    </article>
)
