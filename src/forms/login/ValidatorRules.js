import Validator from '../Validator';

export default function ValidatorRules(values) {
  const { errors } = Validator(
    values,
    {
      username: 'required|email',
      password: 'required',
    },
    {
      aliases: {
        username: 'email address',
      },
    },
  );

  return errors;
}
