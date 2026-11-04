import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import FeaturedProjectCard from "./FeaturedProjectCard"

// One large featured card and two supporting cards (projects flagged
// `featured`, in data order), then the remaining projects in a native fold.
function FeaturedProjects() {
  const data = useStaticQuery<Queries.FeaturedProjectsQuery>(query)
  // dataJson.projects and project-placeholder.png always exist, as in
  // ProjectsSection.
  const allProjects = data.dataJson!.projects!
  const placeholderImage = data.placeholder!.childImageSharp!.gatsbyImageData

  const featured = allProjects.filter(project => project.featured).slice(0, 3)
  const remaining = allProjects.filter(project => !featured.includes(project))

  return (
    <div className={Styles.scope}>
      <div className={Styles.wrap}>
        <section className={Styles.homeBlock} id="projects">
          <div className={Styles.sectionTitle}>
            <h2>Featured projects</h2>
          </div>
          <div className={Styles.projects}>
            {featured.map(project => (
              <FeaturedProjectCard
                key={project.title}
                project={project}
                placeholderImage={placeholderImage}
              />
            ))}
          </div>
          {remaining.length > 0 && (
            <details className={`${Styles.description} ${Styles.allProjects}`}>
              <summary>
                <span className={Styles.fold}>All projects +</span>
              </summary>
              <div className={Styles.projects}>
                {remaining.map(project => (
                  <FeaturedProjectCard
                    key={project.title}
                    project={project}
                    placeholderImage={placeholderImage}
                  />
                ))}
              </div>
            </details>
          )}
        </section>
      </div>
    </div>
  )
}

const query = graphql`
  query FeaturedProjects {
    placeholder: file(relativePath: { eq: "project-placeholder.png" }) {
      childImageSharp {
        gatsbyImageData(width: 660, height: 495)
      }
    }
    dataJson {
      projects {
        title
        description
        confidential
        featured
        attachments {
          repository
          documentation
          site
        }
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 660, height: 495)
          }
        }
      }
    }
  }
`

export default FeaturedProjects
