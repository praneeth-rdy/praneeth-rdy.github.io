const urljoin = require("url-join")
const siteConfig = require("./siteConfig")

module.exports = {
  pathPrefix: siteConfig.prefix,
  siteMetadata: {
    title: siteConfig.name,
    navHeading: siteConfig.shortName,
    author: siteConfig.author,
    authorFullName: siteConfig.fullName,
    description: siteConfig.description,
    siteUrl: urljoin(siteConfig.url, siteConfig.prefix),
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
    `gatsby-transformer-json`,
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-easy-import")(),
          require("postcss-custom-properties")({ preserve: false }),
          require("postcss-color-function")(),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-TGQBB868SP`,
        head: true, // Puts tracking script in the head instead of the body
        anonymize: true, // Anonymizes IP addresses
        respectDNT: true, // Respects Do Not Track setting
        defer: false, // Defers script load
        cookieDomain: "auto",
      },
    },
    `gatsby-plugin-feed`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
