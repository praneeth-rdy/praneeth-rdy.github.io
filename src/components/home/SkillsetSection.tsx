import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Styles from "../../styles/css/screens/home/skillset-section.module.css"
import type { Skill } from "../../types/content"

function SkillsetSection() {
  const data = useStaticQuery<Queries.SkillsetSectionQuery>(query)
  // miscellaneous.json is always sourced, so dataJson exists.
  const skills = data.dataJson!.skills
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Skillset</h2>
      <div className={Styles.skillCardsContainer}>
        {skills &&
          skills.map((skill: Skill, index) => {
            // Every skill entry has both logos and they are raster images.
            const lightLogo = skill.lightModeLogo!
            const darkLogo = skill.darkModeLogo!
            return (
              <div key={index} className={Styles.skillCard}>
                {lightLogo.childImageSharp!.gatsbyImageData && (
                  <GatsbyImage
                    className="theme-light-only"
                    image={lightLogo.childImageSharp!.gatsbyImageData}
                    style={{ borderRadius: "8px" }}
                    alt="Skill Logo"
                  />
                )}
                {darkLogo.childImageSharp!.gatsbyImageData && (
                  <GatsbyImage
                    className="theme-dark-only"
                    image={darkLogo.childImageSharp!.gatsbyImageData}
                    style={{ borderRadius: "8px" }}
                    alt="Skill Logo"
                  />
                )}
              </div>
            )
          })}
      </div>
    </section>
  )
}

const query = graphql`
  query SkillsetSection {
    dataJson {
      skills {
        name
        darkModeLogo {
          childImageSharp {
            gatsbyImageData(
              height: 50
              layout: FIXED
              transformOptions: { fit: COVER }
            )
          }
        }
        lightModeLogo {
          childImageSharp {
            gatsbyImageData(height: 50)
          }
        }
        website
      }
    }
  }
`

export default SkillsetSection
