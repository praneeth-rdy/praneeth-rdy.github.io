import React from "react"
import { StaticQuery, graphql } from "gatsby"
import {
  FaFacebook,
  FaGithub,
  FaBlo,
  FaBlog,
  FaBook,
  FaFile,
  FaGoogleDrive,
  FaGlobe,
} from "react-icons/fa"
import "../../styles/css/screens/homescreen/projects-section.css"

function ProjectsSection(props) {
  //use data as props.data
  const projects = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Projects</h2>
      <div className="projects-container">
        {projects.map(({ node }) => {
          return (
            <div className="project-card">
              <div className="image-box">
                <img src={node.frontmatter.thumbnail.publicURL} />
              </div>
              <div className="content">
                <div className="content-box">
                  <h3>
                    Project Name
                    <br />
                    <span>Tech Stack</span>
                  </h3>
                </div>
                <ul className="sci">
                  <li style={{ "--i": 1 }}>
                    <a href="#">
                      <FaGithub className="icon" />
                    </a>
                  </li>
                  <li style={{ "--i": 2 }}>
                    <a href="#">
                      <FaGoogleDrive className="icon" />
                    </a>
                  </li>
                  <li style={{ "--i": 3 }}>
                    <a href="#">
                      <FaGlobe className="icon" />
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div className="project">
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
                </div> */}
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
