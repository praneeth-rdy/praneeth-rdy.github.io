import React, { useState } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { StaticQuery, graphql } from "gatsby"
import * as Styles from "../../styles/css/screens/home/projects-section.module.css"
import { FaBookOpen, FaGithub, FaLink } from "react-icons/fa"
import { MdOutlineSecurity } from "react-icons/md"
import ExpandableText from "../core/ExpandableText"
import Tooltip from "../core/Tooltip"

function ProjectsSection({ data }) {
  const [showAll, setShowAll] = useState(false)
  const allProjects = data.allMarkdownRemark.edges

  const initialMaxCount = 2
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
                <div className={Styles.headingContainer}>
                  <h3 className={`${Styles.heading}`}>
                    {node.frontmatter.title}
                  </h3>
                  {node.frontmatter.associatedWith.logo && (
                    <Tooltip
                      text={`This project is associated with ${node.frontmatter.associatedWith.org}`}
                      position="top"
                    >
                      <img
                        src={
                          node.frontmatter.associatedWith.logo.childImageSharp
                            .gatsbyImageData.images.fallback.src
                        }
                        alt={node.frontmatter.associatedWith.org}
                        className={Styles.orgLogo}
                      />
                    </Tooltip>
                  )}
                  {node.frontmatter.confidential && (
                    <Tooltip
                      text="Confidential information is hidden"
                      position="top"
                    >
                      <span className={Styles.confidentialIcon}>
                        <MdOutlineSecurity size={16} />
                      </span>
                    </Tooltip>
                  )}
                </div>
                {/* <div className={Styles.datesContainer}>
                  <span className={Styles.date}>
                    {node.frontmatter.dates.start}
                  </span>
                  <span className={Styles.dateSeparator}>-</span>
                  <span className={Styles.date}>
                    {node.frontmatter.dates.end}
                  </span>
                </div> */}
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
                    {node.frontmatter.attachments.map((attachment, index) => {
                      if (attachment.repository) {
                        return (
                          <a
                            key={index}
                            className="link"
                            href={attachment.repository}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaGithub />
                          </a>
                        )
                      }
                      if (attachment.documentation) {
                        return (
                          <a
                            key={index}
                            className="link"
                            href={attachment.documentation}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaBookOpen />
                          </a>
                        )
                      }
                      if (attachment.site) {
                        return (
                          <a
                            key={index}
                            className="link"
                            href={attachment.site}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FaLink />
                          </a>
                        )
                      }
                      return null
                    })}
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
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(projects)/" } }
      sort: { fields: [frontmatter___dates___start], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            confidential
            associatedWith {
              org
              logo {
                childImageSharp {
                  gatsbyImageData(
                    width: 20
                    height: 20
                    layout: FIXED
                    transformOptions: { fit: COVER }
                  )
                }
              }
            }
            dates {
              start(formatString: "MMM 'YY")
              end(formatString: "MMM 'YY")
            }
            stacks {
              childImageSharp {
                gatsbyImageData
              }
            }
            attachments {
              repository
              documentation
              site
            }
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
