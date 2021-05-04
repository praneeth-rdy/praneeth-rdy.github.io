import React from "react"
import { StaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { FaGithub, FaGoogleDrive, FaGlobe } from "react-icons/fa"
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
                <GatsbyImage image={node.frontmatter.thumbnail.childImageSharp.gatsbyImageData} style={{height: "100%"}} alt="project image" />
                {/* <img src={node.frontmatter.thumbnail.publicURL} /> */}
              </div>
              <div className="content">
                <div className="content-box">
                  <h3>
                  {node.frontmatter.title}
                    <br />
                    <span>{node.frontmatter.stack}</span>
                  </h3>
                </div>
                <ul className="sci">
                  <li style={{ "--i": 1 }}>
                    <a href={node.frontmatter.repo} target="_blank" rel="noreferrer">
                      <FaGithub className="icon" />
                    </a>
                  </li>
                  <li style={{ "--i": 2 }}>
                    <a href={node.frontmatter.drive} target="_blank" rel="noreferrer">
                      <FaGoogleDrive className="icon" />
                    </a>
                  </li>
                  <li style={{ "--i": 3 }}>
                    <a href={node.frontmatter.website} target="_blank" rel="noreferrer">
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
            stack
            repo
            drive
            website
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

const ProjectsSectionExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <ProjectsSection props data={data} {...props} />}
  />
)

export default ProjectsSectionExport;