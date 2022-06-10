import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import ThemeContextProvider from "../context/ThemeContextProvider";

const NotFoundPage = ({ data, location }) => {
  const navHeading = data.site.siteMetadata.navHeading;

  return (
    <ThemeContextProvider>
      <Layout location={location} navHeading={navHeading}>
        <Seo title="404: Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    </ThemeContextProvider>
  )
}


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        navHeading
      }
    }
  }
`

const NotFoundPageExport = (props) => (
  <StaticQuery
    query={pageQuery}
    render={data => (
      <NotFoundPage location={props.location} data={data} {...props} />
    )}
  />
);

export default NotFoundPageExport;
