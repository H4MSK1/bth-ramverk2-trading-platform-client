import React from 'react';
import { mount } from 'enzyme';
import { Jumbotron } from 'reactstrap';
import StoreProvider from 'providers/StoreProvider';
import StockWorthWidget from 'components/widgets/StockWorthWidget';

describe('<StockWorthWidget />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <StoreProvider>
        <StockWorthWidget />
      </StoreProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders one <Jumbotron />', () => {
    expect(wrapper.find(Jumbotron).length).toBe(1);
  });
});
