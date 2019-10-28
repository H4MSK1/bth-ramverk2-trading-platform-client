import React from 'react';
import { AppLayout } from 'layouts/AppLayout';

const LoadingPage = () => (
  <AppLayout>
    <div className="loading-indicator">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </div>
  </AppLayout>
);

export default LoadingPage;
