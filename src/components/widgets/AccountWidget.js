import React from 'react';
import { Jumbotron } from 'reactstrap';
import AuthService from 'api/AuthService';
import { formatDateTime } from 'api/utils';

const AccountWidget = () => {
  const user = AuthService.user();
  return (
    <Jumbotron className="bg-secondary box-shadow text-primary widget-box">
      <h5>
        <b>Your account</b>
      </h5>
      <h6>
        <b>
          Member since {formatDateTime(user.createdAt, 'y-LL-dd')}
          <br />
          Contact info (
          <a href={`mailto:${user.email}`} className="text-primary">
            {user.email}
          </a>
          )
        </b>
      </h6>
    </Jumbotron>
  );
};

export default AccountWidget;
