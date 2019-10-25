import React from 'react';
import { Col, Row, Button, Form } from 'reactstrap';
import FormInput from 'components/FormInput';
import useForm from 'hooks/useForm';
import ValidatorRules from './ValidatorRules';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirm: '',
  tos: false,
};

const FormComponent = ({ onSubmit }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    () => {
      onSubmit(values);
    },
    ValidatorRules,
  );
  React.useEffect(() => {}, [values.tos, errors]);

  return (
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col xs={12}>
          <FormInput
            type="text"
            name="first_name"
            label="First name"
            value={values.first_name}
            error={errors.first_name}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12}>
          <FormInput
            type="text"
            name="last_name"
            label="Last name"
            value={values.last_name}
            error={errors.last_name}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12}>
          <FormInput
            type="email"
            name="email"
            label="Email address"
            value={values.email}
            error={errors.email}
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
          <FormInput
            type="password"
            name="password_confirm"
            label="Confirm password"
            value={values.password_confirm}
            error={errors.password_confirm}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12}>
          <FormInput
            type="checkbox"
            name="tos"
            label="I accept the Terms of Service"
            checked={values.tos}
            error={errors.tos}
            onChange={handleChange}
          />
        </Col>
        <Col xs={12}>
          <Button color="primary" type="submit" block>
            Register
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormComponent;
