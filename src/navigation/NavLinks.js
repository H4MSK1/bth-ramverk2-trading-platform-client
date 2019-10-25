export const NavLinks = [
  {
    to: '/',
    name: 'Market',
    exact: true,
  },
  {
    to: '/login',
    name: 'Login',
    exact: true,
    isGuest: true,
  },
  {
    to: '/register',
    name: 'Sign up',
    exact: true,
    isGuest: true,
  },
  {
    to: '/investments',
    name: 'My investments',
    isAuth: true,
  },
];
