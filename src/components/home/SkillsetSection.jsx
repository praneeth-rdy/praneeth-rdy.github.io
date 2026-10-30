import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Styles from "../../styles/css/screens/home/skillset-section.module.css"
import { useTheme } from "../../context/ThemeContextProvider"

function SkillsetSection() {
  const data = useStaticQuery(query)
  const [isDarkMode] = useTheme()
  const skills = data.dataJson.skills
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Skillset</h2>
      <div className={Styles.skillCardsContainer}>
        {skills &&
          skills.map((skill, index) => {
            const skillLogo = isDarkMode
              ? skill.darkModeLogo
              : skill.lightModeLogo
            return (
              <div key={index} className={Styles.skillCard}>
                {skillLogo.childImageSharp.gatsbyImageData && (
                  <GatsbyImage
                    image={skillLogo.childImageSharp.gatsbyImageData}
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
  query {
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
