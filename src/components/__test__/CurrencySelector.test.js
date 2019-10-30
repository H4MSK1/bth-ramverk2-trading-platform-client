import React from 'react';
import { mount } from 'enzyme';
import { UncontrolledButtonDropdown, DropdownMenu } from 'reactstrap';
import StoreProvider from 'providers/StoreProvider';
import CurrencySelector from 'components/CurrencySelector';

describe('<CurrencySelector />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <StoreProvider>
        <CurrencySelector />
      </StoreProvider>,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders one <UncontrolledButtonDropdown />', () => {
    expect(wrapper.find(UncontrolledButtonDropdown).length).toBe(1);
  });

  it('renders one <DropdownMenu />', () => {
    expect(wrapper.find(DropdownMenu).length).toBe(1);
  });
});
