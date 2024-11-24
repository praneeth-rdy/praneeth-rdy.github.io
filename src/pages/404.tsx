import React from 'react';
import { Link, HeadFC, PageProps } from 'gatsby';

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-4xl font-semibold text-gray-600 mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-500 text-xl mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <p className="text-gray-500 mb-8">
            Try creating a page in{' '}
            <code className="bg-gray-200 px-2 py-1 rounded text-gray-700 font-mono">
              src/pages/
            </code>
          </p>
        )}
        <Link 
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
