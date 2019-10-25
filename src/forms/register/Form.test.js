import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'reactstrap';

import FormComponent from './Form';

describe('<FormInput />', () => {
  let wrapper;
  const props = {
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<FormComponent {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders one <Form />', () => {
    expect(wrapper.find(Form).length).toBe(1);
  });
});
