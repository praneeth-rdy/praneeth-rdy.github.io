import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import "../../styles/css/screens/homescreen/projects-section.css"

function ProjectsSection(props) {
  //use data as props.data
  const projects = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 class="section-heading">Projects</h2>
      <div className="projects-container row">
        {projects.map(({ node }) => {
          return (
            <div className="project-wrapper">
              <Link to={"/projects" + node.fields.slug}>
                <div className="project">
                  <img
                    src={node.frontmatter.thumbnail.publicURL}
                    alt="project"
                  />
                  <div className="project-info">
                    <h4 className="project-heading">
                      {node.frontmatter.title}
                    </h4>
                    <p className="project-caption">
                      {node.frontmatter.caption}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(projects)/" } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            caption
            description
            thumbnail {
              publicURL
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => <ProjectsSection props data={data} {...props} />}
  />
)
