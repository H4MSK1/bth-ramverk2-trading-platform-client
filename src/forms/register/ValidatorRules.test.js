import ValidatorRules from './ValidatorRules';

describe('forms/register/ValidatorRules', () => {
  const formValues = {
    first_name: 'user',
    last_name: 'user',
    email: 'user@user.user',
    password: 'user',
    password_confirm: 'user',
    tos: true,
  };

  const onEachFormKeyValue = fn =>
    Object.keys(formValues).forEach(key => fn(key, formValues[key]));

  it('returns zero errors when provided values', () => {
    const feedback = ValidatorRules(formValues);

    expect(feedback).toEqual({});
  });

  it('returns error messages when not provided any values', () => {
    const feedback = ValidatorRules({});

    expect(Object.keys(feedback).length).toBe(Object.keys(formValues).length);

    onEachFormKeyValue(key => {
      expect(feedback).toHaveProperty(key);
    });
  });
});
