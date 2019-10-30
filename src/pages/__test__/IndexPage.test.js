import React from 'react';
import { mount } from 'enzyme';
import { Container } from 'reactstrap';
import StoreProvider from 'providers/StoreProvider';
import AlertProvider from 'providers/AlertProvider';
import IndexPage from 'pages/IndexPage';

jest.mock('../../hooks/useStockWatchEvent');

describe('<IndexPage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AlertProvider>
        <StoreProvider>
          <IndexPage />
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

  it('renders one <Container />', () => {
    expect(wrapper.find(Container).length).toBe(1);
  });
});
