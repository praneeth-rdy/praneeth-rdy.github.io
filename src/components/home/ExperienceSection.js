import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import "../../styles/css/screens/home/experience-section.css"
import { FaStar } from "react-icons/fa"
import { GatsbyImage } from "gatsby-plugin-image"
import Tooltip from "../core/Tooltip"
import ExpandableText from "../core/ExpandableText"

const ExperienceStatus = {
  COMPLETED: "Completed",
  PRESENT: "Present",
}

function ExperienceSection({ data }) {
  // use data as props.data
  // const experiences = props.data.allMarkdownRemark.edges
  const allExperiences = data.othersJson.experience

  const getTagClassnameByStatus = status => {
    switch (status) {
      case ExperienceStatus.COMPLETED:
        return "experience-status-tag-completed"
      case ExperienceStatus.PRESENT:
        return "experience-status-tag-present"
      default:
        return ""
    }
  }

  const getTagClassnameByType = type => {
    switch (type) {
      case "Position of Responsibility":
        return "experience-type-tag-por"
      default:
        return ""
    }
  }

  const getTooltipTextByType = type => {
    switch (type) {
      case "Position of Responsibility":
        return "This experience is a Position of Responsibility at IIT Kharagpur"
      default:
        return ""
    }
  }

  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">
        <span>Experience</span>
      </h2>
      <div className="experience-container">
        {allExperiences.map((experience, index) => (
          <div className="experience-card b-shadow-card" key={index}>
            <div className="experience-frontmatter-container">
              <span
                className={`experience-status-tag ${getTagClassnameByStatus(
                  experience.status
                )}`}
              >
                {experience.status}
              </span>
            </div>
            <div className="experience-header">
              <div className="experience-org-container">
                <h3 className="experience-title">{experience.org}</h3>
                {experience.orgLogo && (
                  <GatsbyImage
                    image={experience.orgLogo.childImageSharp.gatsbyImageData}
                    alt={experience.org}
                  />
                )}
                {!experience.type && experience.returnOffer && (
                  <Tooltip text="Received a return offer" position="top">
                    <span className="experience-trophy">
                      <FaStar size={16} />
                    </span>
                  </Tooltip>
                )}
              </div>
              <div className="experience-header-tags">
                {experience.type && (
                  <Tooltip
                    text={getTooltipTextByType(experience.type)}
                    position="top"
                  >
                    <span
                      className={`experience-type-tag ${getTagClassnameByType(
                        experience.type
                      )}`}
                    >
                      {experience.type}
                    </span>
                  </Tooltip>
                )}
                {experience.type && experience.returnOffer && (
                  <Tooltip text="Received a return offer" position="top">
                    <span className="experience-trophy">
                      <FaStar size={16} />
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>
            <ExpandableText className="experience-description" charLimit={120}>
              {experience.description}
            </ExpandableText>
            <div className="experience-tags-container">
              {experience.tags.map((tag, tagIndex) => (
                <span className="experience-tag" key={tagIndex}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="experience-roles-container">
              {experience.roles.map((role, roleIndex) => (
                <div className="experience-role" key={roleIndex}>
                  <h4 className="experience-role-title">{role.title}</h4>
                  <p className="experience-role-duration">
                    {role.start} - {role.end}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    othersJson {
      experience {
        org
        orgLogo {
          childImageSharp {
            gatsbyImageData(width: 40, height: 40, layout: FIXED)
          }
        }
        returnOffer
        status
        type
        tags
        description
        roles {
          title
          start
          end
        }
      }
    }
  }
`

const ExperienceSectionExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <ExperienceSection props data={data} {...props} />}
  />
)

export default ExperienceSectionExport
