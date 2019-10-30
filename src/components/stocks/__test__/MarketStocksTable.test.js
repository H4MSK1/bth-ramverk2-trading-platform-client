import React from 'react';
import { mount } from 'enzyme';
import { Table } from 'reactstrap';
import StoreProvider from 'providers/StoreProvider';
import AlertProvider from 'providers/AlertProvider';
import MarketStocksTable from 'components/stocks/MarketStocksTable';

describe('<MarketStocksTable />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AlertProvider>
        <StoreProvider>
          <MarketStocksTable />
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

  it('renders one <Table />', () => {
    expect(wrapper.find(Table).length).toBe(1);
  });

  it('renders one <thead />', () => {
    expect(wrapper.find('thead').length).toBe(1);
  });

  it('renders one <tbody />', () => {
    expect(wrapper.find('tbody').length).toBe(1);
  });
});
