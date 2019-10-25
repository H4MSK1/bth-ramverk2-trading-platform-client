import React from 'react';
import { useAlert } from 'react-alert';
import { Jumbotron } from 'reactstrap';
import { DefaultContainer } from 'layouts/DefaultContainer';
import { RegisterForm } from 'forms/register';
import { register } from 'actions/auth';

const RegisterPage = ({ history }) => {
  const alert = useAlert();
  const onSubmit = async formValues => {
    try {
      await register(formValues);
      alert.success('Your account has been created');
      history.push('/login');
    } catch {
      alert.error('Unexpected error, please try again');
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
        <h4>Sign up to get started</h4>
        <RegisterForm onSubmit={onSubmit} />
      </Jumbotron>
    </DefaultContainer>
  );
};

export default RegisterPage;
