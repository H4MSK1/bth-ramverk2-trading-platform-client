import Validator from '../Validator';

export default function ValidatorRules(values) {
  const { errors } = Validator(
    values,
    {
      first_name: 'required',
      last_name: 'required',
      email: 'required|email',
      password: 'required',
      password_confirm: 'required|same:password',
      tos: 'accepted',
    },
    {
      aliases: {
        first_name: 'first name',
        last_name: 'last name',
        email: 'email address',
        password_confirm: 'confirm password',
        tos: 'Terms of Service',
      },
    },
  );

  return errors;
}
