import React from 'react';
import { Col, Row, Button, Form } from 'reactstrap';
import FormInput from 'components/FormInput';
import useForm from 'hooks/useForm';
import ValidatorRules from './ValidatorRules';

const initialState = {
  username: '',
  password: '',
};

const FormComponent = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    () => {
      onSubmit(values);
    },
    ValidatorRules,
  );

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col xs={12}>
            <FormInput
              type="email"
              name="username"
              label="Email"
              value={values.username}
              error={errors.username}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12}>
            <FormInput
              type="password"
              name="password"
              label="Password"
              value={values.password}
              error={errors.password}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12}>
            <Button color="primary" type="submit" block>
              Login
            </Button>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default FormComponent;
