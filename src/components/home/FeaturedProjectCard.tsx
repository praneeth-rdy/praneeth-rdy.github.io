import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Styles from "../../styles/css/screens/home/home-sections.module.css"
import LineIcon from "../core/LineIcon"
import { LineIconName, type ImageData } from "../../types/ui"
import type { FeaturedProject } from "../../types/content"

interface FeaturedProjectCardProps {
  project: FeaturedProject
  placeholderImage: ImageData
}

// A project card from the home page concept: cover, eyebrow, title, full
// description and a link for each attachment that is present.
function FeaturedProjectCard({
  project,
  placeholderImage,
}: FeaturedProjectCardProps) {
  // Every project has `attachments`; thumbnails are raster images.
  const attachments = project.attachments!
  const links = [
    { label: "Repository", href: attachments.repository },
    { label: "Documentation", href: attachments.documentation },
    { label: "Site", href: attachments.site },
  ].filter((link): link is { label: string; href: string } => !!link.href)

  return (
    <article className={Styles.project}>
      <figure>
        <GatsbyImage
          className={Styles.cover}
          image={
            project.thumbnail
              ? project.thumbnail.childImageSharp!.gatsbyImageData
              : placeholderImage
          }
          alt={`${project.title} project preview`}
        />
      </figure>
      <div>
        <span className={Styles.eyebrow}>
          {project.confidential ? "Confidential project" : "Project"}
        </span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {links.length > 0 && (
          <div className={Styles.projectLinks}>
            {links.map(link => (
              <a
                key={link.label}
                className={Styles.textLink}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <LineIcon name={LineIconName.Arrow} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default FeaturedProjectCard
