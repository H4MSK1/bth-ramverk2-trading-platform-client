import React from 'react';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  CustomInput,
} from 'reactstrap';

const FormInput = ({
  children,
  name,
  label,
  type,
  error,
  helpText,
  onChange = () => {},
  ...props
}) => {
  const elemProps = {
    id: `input_${name}`,
    type,
    name,
    onChange,
    invalid: Boolean(error),
    ...props,
  };

  return (
    <FormGroup>
      {['checkbox', 'radio', 'switch'].includes(type) ? (
        <CustomInput label={label} htmlFor={elemProps.id} {...elemProps} />
      ) : (
        <React.Fragment>
          {label && <Label for={elemProps.id}>{label}</Label>}
          <Input {...elemProps}>{children}</Input>
        </React.Fragment>
      )}

      {helpText && <FormText color="muted">{helpText}</FormText>}

      {error && (
        <FormFeedback>{error || 'This field is invalid.'}</FormFeedback>
      )}
    </FormGroup>
  );
};
export default FormInput;
