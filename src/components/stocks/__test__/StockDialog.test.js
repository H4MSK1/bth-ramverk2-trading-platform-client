/** global: jest */

import React from 'react';
import { mount } from 'enzyme';
import { Form, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import StockDialog from 'components/stocks/StockDialog';

describe('<StockDialog />', () => {
  let wrapper;

  const props = {
    title: 'test',
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  beforeEach(() => {
    wrapper = mount(<StockDialog {...props} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('renders one <Modal />', () => {
    expect(wrapper.find(Modal).length).toBe(1);
  });

  it('renders one <ModalHeader />', () => {
    expect(wrapper.find(ModalHeader).length).toBe(1);
  });

  it('renders one <ModalBody />', () => {
    expect(wrapper.find(ModalBody).length).toBe(1);
  });

  it('renders one <Form />', () => {
    expect(wrapper.find(Form).length).toBe(1);
  });

  it('renders one <Input />', () => {
    expect(wrapper.find(Input).length).toBe(1);
  });

  it('renders one <Button />', () => {
    expect(wrapper.find(Button).length).toBe(1);
  });
});
