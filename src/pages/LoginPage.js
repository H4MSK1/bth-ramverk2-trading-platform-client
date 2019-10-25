import React from 'react';
import { useAlert } from 'react-alert';
import { Jumbotron } from 'reactstrap';
import { DefaultContainer } from 'layouts/DefaultContainer';
import { LoginForm } from 'forms/login';
import { login } from 'actions/auth';
import AuthService from 'api/AuthService';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const LoginPage = ({ history }) => {
  const alert = useAlert();
  const { dispatch } = getStateWithDispatcher();

  const onSubmit = async formValues => {
    try {
      await login(dispatch, formValues);
      alert.success(`Welcome back, ${AuthService.user().first_name}`);
      history.push('/');
    } catch {
      alert.error('Wrong credentials');
    }
  };

  return (
    <DefaultContainer
      column={{
        xs: 12,
        md: { size: 8, offset: 2 },
        lg: { size: 6, offset: 3 },
      }}
    >
      <Jumbotron className="bg-secondary box-shadow">
        <h4>Login</h4>
        <LoginForm onSubmit={onSubmit} />
      </Jumbotron>
    </DefaultContainer>
  );
};

export default LoginPage;
