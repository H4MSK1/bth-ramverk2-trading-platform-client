import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import { AppRoute, AuthRoute, GuestRoute } from 'routes/Route';
import LoadingPage from 'pages/LoadingPage';

const IndexPage = lazy(() => import('pages/IndexPage'));
const PageNotFound = lazy(() => import('pages/PageNotFound'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const InvestmentPage = lazy(() => import('pages/InvestmentPage'));

export default (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <AppRoute path="/" exact component={IndexPage} title="Market" />

      <GuestRoute path="/login" component={LoginPage} title="Login" />

      <GuestRoute path="/register" component={RegisterPage} title="Sign up" />

      <AuthRoute
        path="/investments"
        component={InvestmentPage}
        title="Investments"
      />

      <AppRoute path="*" component={PageNotFound} />
    </Switch>
  </Suspense>
);
