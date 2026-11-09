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
    bio: siteConfig.bio,
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
    {
      resolve: `gatsby-transformer-json`,
      options: {
        // Object files are typed by their directory by default, so every JSON
        // object under src/content/data would become a DataJson node and
        // `dataJson` would be ambiguous. miscellaneous.json keeps DataJson;
        // any other file is typed by its own name (opensource.json ->
        // OpensourceJson), as array files already are.
        typeName: ({ node }: { node: { name: string } }) =>
          node.name === "miscellaneous"
            ? "DataJson"
            : `${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}Json`,
      },
    },
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
              // Figures follow the paragraph rhythm (1.5em from the
              // surrounding <p> margins) instead of adding their own gap.
              wrapperStyle: `margin: 0;`,
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
          {
            // Smart quotes and ellipses only: the site avoids em dashes, so
            // "--" and "---" stay as typed instead of becoming dashes.
            resolve: `gatsby-remark-smartypants`,
            options: { dashes: false },
          },
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
        excludes: [`/about/`, `/elements/`, `/publications/`],
      },
    },
    // The site previously shipped gatsby-plugin-offline; this unregisters the
    // stale service worker for returning visitors.
    `gatsby-plugin-remove-serviceworker`,
  ],
}

export default config
