import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
// import Img from "gatsby-image"
import * as Styles from "../../styles/css/screens/home/skillset-section.module.css";

function SkillsetSection({ data }) {
  //use data as props.data
  const skills = data.allMarkdownRemark.edges;
  // console.log(data.allMarkdownRemark.edges);
  return (
    <section className="home-section post-content-body">
      <h2 className="section-heading">Skillset</h2>
      <div className={Styles.skillCardsContainer}>
        {skills && skills.map(({ node }, index) => {
          return (
            <div key={index} className={Styles.skillCard}>
              <GatsbyImage
                image={node.frontmatter.lightModeLogo.childImageSharp.gatsbyImageData}
                style={{ borderRadius: "8px" }}
                alt='Skill Logo'
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

const indexQuery = graphql`
query {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(/content/skills/)/"}}){
    edges {
      node {
        excerpt
        fields {
          slug
        }
        frontmatter {
          lightModeLogo {
            childImageSharp {
              gatsbyImageData
            }
          }
          darkModeLogo {
            childImageSharp {
              gatsbyImageData
            }
          }
          website
        }
      }
    }
  }
}
`

const SkillsetSectionExport = props => (
  <StaticQuery
    query={indexQuery}
    render={data => <SkillsetSection props data={data} {...props} />}
  />
)

export default SkillsetSectionExport