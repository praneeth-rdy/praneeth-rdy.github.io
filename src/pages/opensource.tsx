import React from "react"
import { Link, graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LineIcon from "../components/core/LineIcon"
import ContributionCalendar from "../components/opensource/ContributionCalendar"
import * as Home from "../styles/css/screens/home/home-sections.module.css"
import * as Page from "../styles/css/screens/collection-page.module.css"
import * as Styles from "../styles/css/screens/opensource-page.module.css"
import { LineIconName } from "../types/ui"
import type {
  OpenSourceContribution,
  OpenSourceProgram,
  OpenSourceWorkItem,
} from "../types/content"

const twoDigits = (value: number) => String(value).padStart(2, "0")

/**
 * Sum of a GitHub metric across every fetched repository, or null unless
 * every value is a number (a failed fetch leaves it null).
 */
function totalOf(values: ReadonlyArray<number | null | undefined>) {
  if (values.length === 0) return null
  let total = 0
  for (const value of values) {
    if (typeof value !== "number") return null
    total += value
  }
  return total
}

function ProgramRow({ program }: { program: OpenSourceProgram }) {
  const logoSrc =
    program.logo?.childImageSharp?.gatsbyImageData.images.fallback?.src
  return (
    <article className={`${Home.card} b-shadow-card ${Styles.program}`}>
      {logoSrc ? (
        <img
          className={Home.orgLogo}
          src={logoSrc}
          alt={`${program.name} logo`}
        />
      ) : (
        <span className={`${Home.orgLogo} ${Styles.iconTile}`}>
          <LineIcon name={LineIconName.Code} />
        </span>
      )}
      <div>
        {program.year && (
          <span className={`${Home.pill} ${Page.opensource}`}>
            {program.year}
          </span>
        )}
        <h3>{program.name}</h3>
        {program.role && <span className={Home.meta}>{program.role}</span>}
      </div>
      {program.work && <p className={Home.muted}>{program.work}</p>}
      {program.link && (
        <a
          className={`${Home.textLink} ${Styles.programLink}`}
          href={program.link}
          target="_blank"
          rel="noreferrer"
        >
          View project
          <LineIcon name={LineIconName.Arrow} />
        </a>
      )}
    </article>
  )
}

function WorkCard({
  item,
  index,
}: {
  item: OpenSourceWorkItem
  index: number
}) {
  const stars = item.github?.stars
  const forks = item.github?.forks
  const stacks = item.stacks ?? []
  const href = item.repo ? `https://github.com/${item.repo}` : item.link
  return (
    <article className={`${Home.card} b-shadow-card ${Styles.repo}`}>
      <span className={Styles.repoIndex}>{twoDigits(index + 1)} /</span>
      <div>
        <h3>{item.name}</h3>
        {item.summary && <p>{item.summary}</p>}
        {stacks.length > 0 && (
          <div className={`${Page.tags} ${Styles.repoTags}`}>
            {stacks.map(stack => (
              <span key={stack} className={Page.tag}>
                {stack}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={Styles.repoSide}>
        {typeof stars === "number" && typeof forks === "number" && (
          <div className={Home.metrics}>
            <span>
              <LineIcon name={LineIconName.Star} /> {stars}
              <span className={Home.srOnly}>
                {stars === 1 ? " star" : " stars"}
              </span>
            </span>
            <span>
              <LineIcon name={LineIconName.Fork} /> {forks}
              <span className={Home.srOnly}>
                {forks === 1 ? " fork" : " forks"}
              </span>
            </span>
          </div>
        )}
        {href && (
          <a className={Home.textLink} href={href}>
            {item.repo ? "Repository" : "All repositories"}
            <LineIcon name={LineIconName.Arrow} />
          </a>
        )}
      </div>
    </article>
  )
}

function ContributionCard({
  contribution,
  index,
}: {
  contribution: OpenSourceContribution
  index: number
}) {
  return (
    <article className={`${Home.card} b-shadow-card ${Styles.repo}`}>
      <span className={Styles.repoIndex}>{twoDigits(index + 1)} /</span>
      <div>
        <h3>{contribution.project}</h3>
        {contribution.title && (
          <span className={Home.meta}>{contribution.title}</span>
        )}
        {contribution.summary && <p>{contribution.summary}</p>}
      </div>
      {contribution.link && (
        <div className={Styles.repoSide}>
          <a className={Home.textLink} href={contribution.link}>
            View contribution
            <LineIcon name={LineIconName.Arrow} />
          </a>
        </div>
      )}
    </article>
  )
}

function Opensource({
  data,
  location,
}: PageProps<Queries.OpensourcePageQuery>) {
  // site.siteMetadata.social.github is set from siteConfig in gatsby-config.
  const github = data.site!.siteMetadata!.social!.github!
  const content = data.opensourceJson
  const intro = content?.intro
  const quote = content?.quote
  const programs = content?.programs ?? []
  const repositories = content?.repositories ?? []
  const contributions = content?.contributions ?? []
  const stats = data.allGithubRepo.nodes
  const stars = totalOf(stats.map(node => node.stars))
  const forks = totalOf(stats.map(node => node.forks))

  return (
    <Layout location={location}>
      <div className={`${Home.scope} ${Page.page} ${Styles.root}`}>
        <div className={Home.wrap}>
          <header className={Page.pageIntro}>
            <div className={Home.eyebrow}>Code, shared</div>
            <h1>Open Source</h1>
            {intro && <p>{intro}</p>}
          </header>
          <div className={Home.stats}>
            {stars !== null && (
              <div>
                <strong>{stars}</strong>
                <span>Stars across repositories</span>
              </div>
            )}
            {forks !== null && (
              <div>
                <strong>{forks}</strong>
                <span>Forks</span>
              </div>
            )}
            <div>
              <strong>{twoDigits(programs.length)}</strong>
              <span>Programs</span>
            </div>
          </div>
          <div className={Page.linkRow}>
            <p className={Home.muted}>{github.replace(/^https?:\/\//, "")}</p>
            <a className={Home.textLink} href={github}>
              Visit GitHub
              <LineIcon name={LineIconName.Arrow} />
            </a>
          </div>
          {data.githubContributions?.calendar && (
            <ContributionCalendar
              calendar={data.githubContributions.calendar}
              github={github}
            />
          )}
          {programs.length > 0 && (
            <section className={Home.homeBlock}>
              <div className={Home.sectionTitle}>
                <h2>Programs</h2>
              </div>
              <div className={Styles.programs}>
                {programs.map(program => (
                  <ProgramRow key={program.name} program={program} />
                ))}
              </div>
            </section>
          )}
          {quote?.text && (
            <blockquote className={Styles.quote}>
              {quote.text}
              {quote.author && <cite>{quote.author}</cite>}
            </blockquote>
          )}
          {repositories.length > 0 && (
            <section className={Home.homeBlock}>
              <div className={Home.sectionTitle}>
                <h2>My open-source work</h2>
              </div>
              <div className={Styles.repoGrid}>
                {repositories.map((item, index) => (
                  <WorkCard key={item.name} item={item} index={index} />
                ))}
              </div>
            </section>
          )}
          <section className={Home.homeBlock}>
            <div className={Home.sectionTitle}>
              <h2>Contributions</h2>
            </div>
            {contributions.length > 0 ? (
              <div className={Styles.repoGrid}>
                {contributions.map((contribution, index) => (
                  <ContributionCard
                    key={`${contribution.project}-${index}`}
                    contribution={contribution}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className={Styles.empty}>
                <p>
                  Pull requests to projects I don't maintain will be listed
                  here, with what each change did and a link.
                </p>
              </div>
            )}
          </section>
          <div className={Page.footLink}>
            <Link className={Home.textLink} to="/beyond-work/">
              Beyond work
              <LineIcon name={LineIconName.Arrow} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Opensource

export const Head: HeadFC<Queries.OpensourcePageQuery> = ({ location }) => (
  <Seo
    title="Open Source"
    description="Open-source programs, repositories and contributions by Praneeth Reddy Kolanu."
    pathname={location.pathname}
  />
)

export const query = graphql`
  query OpensourcePage {
    githubContributions {
      calendar {
        totalContributions
        fetchedAt
        days {
          date
          weekday
          contributionCount
          contributionLevel
        }
      }
    }
    site {
      siteMetadata {
        social {
          github
        }
      }
    }
    allGithubRepo {
      nodes {
        stars
        forks
      }
    }
    opensourceJson {
      intro
      quote {
        text
        author
      }
      programs {
        name
        year
        role
        work
        link
        logo {
          childImageSharp {
            gatsbyImageData(
              width: 96
              height: 96
              layout: FIXED
              transformOptions: { fit: COVER }
            )
          }
        }
      }
      repositories {
        name
        repo
        summary
        stacks
        link
        github {
          stars
          forks
        }
      }
      contributions {
        project
        title
        summary
        link
      }
    }
  }
`
