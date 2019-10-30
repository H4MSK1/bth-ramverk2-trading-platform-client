import React from 'react';
import { mount } from 'enzyme';
import { DefaultContainer } from 'layouts/DefaultContainer';

import PageNotFound from 'pages/PageNotFound';

describe('<RegisterPage />', () => {
  let wrapper;
  const props = { body: 'testing' };

  beforeEach(() => {
    wrapper = mount(<PageNotFound {...props} />);
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
