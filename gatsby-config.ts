import type { GatsbyConfig } from "gatsby"
import postcssEasyImport from "postcss-easy-import"
import siteConfig from "./siteConfig"

const config: GatsbyConfig = {
  pathPrefix: siteConfig.prefix,
  trailingSlash: "always",
  // Writes Queries.* types for every named query; see CLAUDE.md.
  graphqlTypegen: {
    typesOutputPath: "src/types/gatsby-types.d.ts",
    generateOnBuild: true,
  },
  siteMetadata: {
    title: siteConfig.name,
    navHeading: siteConfig.shortName,
    author: siteConfig.author,
    authorFullName: siteConfig.fullName,
    description: siteConfig.description,
    siteUrl: new URL(siteConfig.prefix, siteConfig.url).href,
    social: {
      github: siteConfig.github,
      linkedin: siteConfig.linkedin,
      facebook: siteConfig.facebook,
      email: siteConfig.email,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/blogs`,
        name: `blogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/data`,
        name: `data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/images`,
        name: `images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1360,
              withWebp: true,
              showCaptions: true,
              quality: 75,
              wrapperStyle: `margin: 7vw 0;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [postcssEasyImport()],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [`G-TGQBB868SP`],
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteConfig.name,
        short_name: siteConfig.shortName,
        start_url: siteConfig.prefix,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/content/images/website-icon.jpeg`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Placeholder pages that are not linked from the nav yet.
        excludes: [
          `/about/`,
          `/elements/`,
          `/experience/`,
          `/opensource/`,
          `/publications/`,
        ],
      },
    },
    // The site previously shipped gatsby-plugin-offline; this unregisters the
    // stale service worker for returning visitors.
    `gatsby-plugin-remove-serviceworker`,
  ],
}

export default config
