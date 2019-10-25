import React from 'react';

const useForm = (
  initialValues = {},
  callback,
  validate,
  preFilledValues = null,
) => {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    setIsSubmitting(false);
  }, [callback, errors, isSubmitting]);

  React.useEffect(() => {
    if (preFilledValues === null) {
      return;
    }

    if (Object.keys(preFilledValues).length === 0) {
      return setValues(initialValues);
    }

    setValues(state => ({
      ...state,
      ...preFilledValues,
    }));
  }, [preFilledValues]);

  const handleSubmit = event => {
    event && event.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = event => {
    event.persist();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues(state => ({
      ...state,
      [target.name]: value,
    }));
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
