import React from 'react';
import Navbar from 'navigation/Navbar';
import { DefaultContainer } from './DefaultContainer';

export const AppLayout = ({ children, title }) => {
  React.useEffect(() => {
    if (title) {
      document.title = `${process.env.REACT_APP_SITE_TITLE} - ${title}`;
    }
  }, [title]);

  return (
    <div className="app">
      <header>
        <Navbar />
      </header>

      <main className="app-main-content">{children}</main>

      <footer className="app-footer text-light">
        <DefaultContainer>
          This site was created with React & Reactstrap.{' '}
          <a
            href={process.env.REACT_APP_GITHUB_REPOSITORY}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            {process.env.REACT_APP_GITHUB_REPOSITORY}
          </a>
        </DefaultContainer>
      </footer>
    </div>
  );
};
