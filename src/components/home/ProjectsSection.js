import React from "react";
//import Slider from "react-slick"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image";
//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"
import { StaticQuery, graphql } from "gatsby";
// import { FaGithub, FaGoogleDrive, FaGlobe } from "react-icons/fa";
import "../../styles/css/screens/home/projects-section.css";

function ProjectsSection(props) {
  //use data as props.data
  const projects = props.data.allMarkdownRemark.edges
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Projects</h2>
      <div className="project-cards-container">
        {projects.map(({ node }, index) => {
          return (
            <div key={index} className="card b-shadow grow">
              <div className="card-image">
                <GatsbyImage
                  image={
                    node.frontmatter.thumbnail.childImageSharp.gatsbyImageData
                  }
                  style={{ height: "100%" }}
                  alt={`${node.frontmatter.title} Image`}
                />
              </div>
              <h3 className="heading">{node.frontmatter.title}</h3>
              <div className="card-description">
                <p>{node.frontmatter.stack}</p>
              </div>
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