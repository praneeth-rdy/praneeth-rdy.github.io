import React from "react";
//import Slider from "react-slick"
// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image";
//import "slick-carousel/slick/slick.css"
//import "slick-carousel/slick/slick-theme.css"
import { StaticQuery, graphql } from "gatsby";
// import { FaGithub, FaGoogleDrive, FaGlobe } from "react-icons/fa";
import * as Styles from "../../styles/css/screens/home/projects-section.module.css";

function ProjectsSection(props) {
  //use data as props.data
  const projects = props.data.allMarkdownRemark.edges
  console.log(projects);
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Projects</h2>
      <div className={Styles.projectCardsContainer}>
        {projects.map(({ node }, index) => {
          return (
            <div key={index} className={`${Styles.card} 'b-shadow' 'grow'`}>
              <div className={Styles.cardImage}>
                <GatsbyImage
                  image={
                    node.frontmatter.thumbnail.childImageSharp.gatsbyImageData
                  }
                  alt={`${node.frontmatter.title} Image`}
                />
              </div>
              <div className={Styles.body}>
                <h3 className={`${Styles.heading}`}>
                  {node.frontmatter.title}
                </h3>
                <div>
                  <p className={Styles.cardDescription}>
                    {node.frontmatter.description}
                  </p>
                </div>
                <div className={Styles.stacksContainer}>
                  {node.frontmatter.stacks.map(({childImageSharp}, index) => (
                    <GatsbyImage
                      key={index}
                      className={Styles.stack}
                      image={childImageSharp.gatsbyImageData}
                      alt={`Stack Image`}
                      objectFit='contain'
                    />
                  ))}
                </div>
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
            description
            stacks {
              childImageSharp {
                gatsbyImageData
              }
            }
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