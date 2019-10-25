import React from 'react';
import { transitions, positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1080,
  },
};

const AlertProvider = ({ children }) => (
  <Provider template={AlertTemplate} {...options}>
    {children}
  </Provider>
);

export default AlertProvider;
