/** global: jest */

import React from 'react';
import { mount } from 'enzyme';
import { Jumbotron } from 'reactstrap';
import AuthService from 'api/AuthService';
import AccountWidget from 'components/widgets/AccountWidget';

describe('<AccountWidget />', () => {
  let wrapper;

  function mockUser() {
    jest.spyOn(AuthService, 'user').mockImplementationOnce(() => ({
      createdAt: new Date().toISOString(),
      email: 'test@test.test',
    }));
  }

  beforeEach(() => {
    wrapper = mount(<AccountWidget />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    mockUser();
    expect(wrapper.length).toBe(1);
  });

  it('renders one <Jumbotron />', () => {
    mockUser();
    expect(wrapper.find(Jumbotron).length).toBe(1);
  });
});
