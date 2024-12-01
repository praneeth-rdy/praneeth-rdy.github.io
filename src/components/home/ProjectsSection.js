import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticQuery, graphql } from "gatsby"
import * as Styles from "../../styles/css/screens/home/projects-section.module.css"
import { FaBookOpen, FaGithub, FaLink } from "react-icons/fa"
import ExpandableText from "../core/ExpandableText"

function ProjectsSection({ data }) {
  const [showAll, setShowAll] = useState(false)
  const allProjects = data.allMarkdownRemark.edges

  const initialMaxCount = 3
  const visibleProjects = showAll
    ? allProjects
    : allProjects.slice(0, initialMaxCount)

  const toggleExpand = () => {
    setShowAll(current => !current)
  }

  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Projects</h2>
      <div className={Styles.projectCardsContainer}>
        {visibleProjects.map(({ node }, index) => {
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
                <div className={Styles.descriptionContainer}>
                  <ExpandableText
                    className={Styles.cardDescription}
                    charLimit={300}
                  >
                    {node.frontmatter.description}
                  </ExpandableText>
                </div>
                <div className={Styles.additionalInfo}>
                  <div className={Styles.stacksContainer}>
                    {node.frontmatter.stacks.map(
                      ({ childImageSharp }, index) => (
                        <GatsbyImage
                          key={index}
                          className={Styles.stack}
                          image={childImageSharp.gatsbyImageData}
                          alt={`Stack Image`}
                          objectFit="contain"
                        />
                      )
                    )}
                  </div>
                  <div className={`icons-container ${Styles.projectLinks}`}>
                    {node.frontmatter.repo && (
                      <a
                        className="link"
                        href={node.frontmatter.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {node.frontmatter.docs && (
                      <a
                        className="link"
                        href={node.frontmatter.docs}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaBookOpen />
                      </a>
                    )}
                    {node.frontmatter.site && (
                      <a
                        className="link"
                        href={node.frontmatter.site}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {allProjects.length > initialMaxCount && (
        <div className="text-center projects-expand-container">
          <button
            className="primary projects-expand-button"
            onClick={toggleExpand}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
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
            docs
            site
            thumbnail {
              childImageSharp {
                gatsbyImageData(height: 220, width: 330)
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

export default ProjectsSectionExport
