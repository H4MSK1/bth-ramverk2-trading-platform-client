import React from 'react';
import { mount } from 'enzyme';
import { Jumbotron } from 'reactstrap';
import StoreProvider from 'providers/StoreProvider';
import AlertProvider from 'providers/AlertProvider';
import BalanceWidget from 'components/widgets/BalanceWidget';

describe('<BalanceWidget />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AlertProvider>
        <StoreProvider>
          <BalanceWidget />
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

  it('renders one <Jumbotron />', () => {
    expect(wrapper.find(Jumbotron).length).toBe(1);
  });

  it('renders one <Button />', () => {
    expect(wrapper.find('Button').length).toBe(1);
  });
});
