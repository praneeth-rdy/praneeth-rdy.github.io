import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  return <div>Hello World</div>;
};



export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
