import React, { useState } from "react"
//import Img from "gatsby-image"
import { StaticQuery, graphql } from "gatsby"
import "../../styles/css/screens/homescreen/experience-section.css"

function ExperienceSection({ data }) {
  //use data as props.data
  // const experiences = props.data.allMarkdownRemark.edges
  const allExperiences = data.othersJson.experience;
  const [experience, setExperience] = useState(allExperiences.find(
    exp => exp.org.toLowerCase() === "education"
  ));

  function changeExperience(org) {
    const newExperience = allExperiences.find(
      exp => exp.org === org
    );
    setExperience(newExperience);
  }
  return (
    <section className="home-section post-content-body">
      <h2 class="section-heading"><span>Experience</span></h2>
      <div className="experience-container row">
        <div className="experience-nav-container">
          {allExperiences.map((exp) => {
            if (exp.org === experience.org) {
              return (<button className="experience-nav-item active" onClick={() => changeExperience(exp.org)}>{exp.org}</button>)
            }
            else {
              return (<button className="experience-nav-item" onClick={() => changeExperience(exp.org)}>{exp.org}</button>)
            }
          })}
        </div>
        <div className="experience-body-container">
          {experience.posts.map((post) => {
            return (
              <div className="experience-item-container" >
                <h2 className="experience-heading">{post.title}</h2>
                <h3 className="experience-timeline">{post.start} - {post.end}</h3>

                <ul className="experience-description-list">
                  {post.description.map((descItem) => (
                    <li className="experience-description-list-item">{descItem}</li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const indexQuery = graphql`
  query {
    othersJson {
      experience {
        org
        posts {
          id
          title
          start
          end
          description
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

export default ExperienceSectionExport;