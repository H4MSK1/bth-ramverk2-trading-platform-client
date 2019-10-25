import React from 'react';
import { Jumbotron } from 'reactstrap';
import { DefaultContainer } from 'layouts/DefaultContainer';

const PageNotFound = ({ title = '404 error', body }) => (
  <DefaultContainer>
    <Jumbotron className="bg-secondary box-shadow">
      <h2>{title}</h2>
      {body && (
        <React.Fragment>
          <hr className="my-2" />
          <p>{body}</p>
        </React.Fragment>
      )}
    </Jumbotron>
  </DefaultContainer>
);

export default PageNotFound;
