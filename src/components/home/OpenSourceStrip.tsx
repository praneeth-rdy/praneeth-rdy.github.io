import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName } from "../../types/ui"
import type { OpenSourceRepository } from "../../types/content"

// Repositories from src/content/data/opensource.json. Star and fork counts come
// from GithubRepo nodes sourced in gatsby-node.ts; when the GitHub fetch failed
// they are null and the metric row is left out.
function OpenSourceStrip() {
  const data = useStaticQuery<Queries.OpenSourceStripQuery>(query)
  // Entries without a `repo` (the Open Source page's "Smaller repositories"
  // card) are not single repositories, so the strip leaves them out.
  const repositories: ReadonlyArray<OpenSourceRepository> = (
    data.opensourceJson?.repositories ?? []
  ).filter(repository => repository.repo)

  return (
    <div className={Styles.scope}>
      <div className={Styles.wrap}>
        <section className={Styles.homeBlock}>
          <div className={Styles.sectionTitle}>
            <h2>Open source</h2>
          </div>
          <div className={Styles.repoStrip}>
            {repositories.map(repository => {
              const stars = repository.github?.stars
              const forks = repository.github?.forks
              return (
                <article key={repository.repo} className={Styles.card}>
                  <LineIcon name={LineIconName.Code} />
                  <h3>
                    <a href={`https://github.com/${repository.repo}`}>
                      {repository.name}
                    </a>
                  </h3>
                  {typeof stars === "number" && typeof forks === "number" && (
                    <div className={Styles.metrics}>
                      <span>
                        <LineIcon name={LineIconName.Star} /> {stars}
                        <span className={Styles.srOnly}>
                          {stars === 1 ? " star" : " stars"}
                        </span>
                      </span>
                      <span>
                        <LineIcon name={LineIconName.Fork} /> {forks}
                        <span className={Styles.srOnly}>
                          {forks === 1 ? " fork" : " forks"}
                        </span>
                      </span>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
          <Link className={Styles.textLink} to="/opensource/">
            Explore open source
            <LineIcon name={LineIconName.Arrow} />
          </Link>
        </section>
      </div>
    </div>
  )
}

const query = graphql`
  query OpenSourceStrip {
    opensourceJson {
      repositories {
        name
        repo
        github {
          stars
          forks
        }
      }
    }
  }
`

export default OpenSourceStrip
