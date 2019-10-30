import React from 'react';
import { mount } from 'enzyme';
import { DefaultContainer } from 'layouts/DefaultContainer';
import StoreProvider from 'providers/StoreProvider';
import AlertProvider from 'providers/AlertProvider';
import LoginPage from 'pages/LoginPage';

describe('<LoginPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AlertProvider>
        <StoreProvider>
          <LoginPage />
        </StoreProvider>
      </AlertProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders one <DefaultContainer />', () => {
    expect(wrapper.find(DefaultContainer).length).toBe(1);
  });
});
