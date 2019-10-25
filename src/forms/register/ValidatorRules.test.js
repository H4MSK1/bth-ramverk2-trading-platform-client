import ValidatorRules from './ValidatorRules';

describe('forms/register/ValidatorRules', () => {
  const formValues = {
    name: 'user',
    email: 'test@unit.local',
    password: 'pass',
    password_confirm: 'pass',
    year: 2000,
    month: 1,
    day: 1,
  };
  const formKeys = Object.keys(formValues);
  const onEachFormKeyValue = fn =>
    formKeys.forEach(key => fn(key, formValues[key]));

  it('returns zero errors when provided values', () => {
    const feedback = ValidatorRules(formValues);

    expect(feedback).toEqual({});
  });

  it('returns error messages when not provided any values', () => {
    const feedback = ValidatorRules({});

    expect(Object.keys(feedback).length).toBe(formKeys.length);

    onEachFormKeyValue(key => {
      expect(feedback).toHaveProperty(key);
    });
  });
});
