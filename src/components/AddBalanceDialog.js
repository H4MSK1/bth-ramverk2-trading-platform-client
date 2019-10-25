import React from 'react';
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

const range = {
  min: 1,
  max: 100000,
};

const AddBalanceDialog = ({
  handleSubmit,
  open = true,
  onClose = () => {},
  ...props
}) => {
  const [value, setValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(open);

  const toggle = () => setIsOpen(!isOpen);

  const onChange = event => {
    const value = parseInt(event.target.value);
    if (value >= range.min && value <= range.max) {
      setValue(value);
    }
  };

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(value);
    setValue('');
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={onClose}
      centered
      {...props}
    >
      <ModalHeader toggle={toggle}>Add balance</ModalHeader>
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <InputGroup>
            <Input
              type="number"
              placeholder="Enter balance"
              value={value}
              onChange={onChange}
              pattern="\d*"
              style={{ borderRadius: 0 }}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                type="submit"
                disabled={!value || value < 1}
              >
                Add
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddBalanceDialog;
