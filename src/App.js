import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { BaseLayout } from 'layouts/BaseLayout';
import StoreProvider from './providers/StoreProvider';
import AlertProvider from './providers/AlertProvider';
import routes from './routes';

export default function App() {
  return (
    <AlertProvider>
      <StoreProvider>
        <BaseLayout>
          <Router>{routes}</Router>
        </BaseLayout>
      </StoreProvider>
    </AlertProvider>
  );
}
