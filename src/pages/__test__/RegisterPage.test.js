import React from 'react';
import { mount } from 'enzyme';
import { DefaultContainer } from 'layouts/DefaultContainer';
import StoreProvider from 'providers/StoreProvider';
import AlertProvider from 'providers/AlertProvider';
import RegisterPage from 'pages/RegisterPage';

describe('<RegisterPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AlertProvider>
        <StoreProvider>
          <RegisterPage />
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
