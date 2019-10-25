import ValidatorRules from './ValidatorRules';

describe('forms/login/ValidatorRules', () => {
  const formValues = {
    username: 'test@unit.local',
    password: 'pass',
  };

  it('returns zero errors when provided values', () => {
    const feedback = ValidatorRules(formValues);

    expect(feedback).toEqual({});
  });

  it('returns two error messages when not provided any values', () => {
    const feedback = ValidatorRules({});

    expect(Object.keys(feedback).length).toBe(2);
    expect(feedback).toHaveProperty('username');
    expect(feedback).toHaveProperty('password');
  });

  it('returns one error message for invalid email for field username', () => {
    const feedback = ValidatorRules({ ...formValues, username: 'user@' });

    expect(Object.keys(feedback).length).toBe(1);
    expect(feedback).toHaveProperty('username');
  });
});
