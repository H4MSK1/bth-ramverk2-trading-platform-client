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
import { adjustNumberWithinRange, roundNumber } from 'api/utils';

const defaultRange = {
  min: 1,
  max: 100,
};

const StockDialog = ({
  title,
  buttonText,
  handleSubmit,
  initialValue = '',
  open = true,
  range = defaultRange,
  stockPrice,
  onClose = () => {},
  ...props
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [isOpen, setIsOpen] = React.useState(open);

  const toggle = () => setIsOpen(!isOpen);

  const onChange = event => {
    let value = parseInt(event.target.value);
    setValue(adjustNumberWithinRange(range, value));
  };

  const onSubmit = event => {
    event.preventDefault();
    if (value >= range.min) {
      handleSubmit(value);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      onClosed={onClose}
      centered
      {...props}
    >
      {title && <ModalHeader toggle={toggle}>{title}</ModalHeader>}
      <ModalBody>
        <Form onSubmit={onSubmit}>
          <InputGroup>
            <Input
              type="number"
              placeholder="Number of stocks"
              min={range.min}
              max={range.max}
              value={value}
              onChange={onChange}
              style={{ borderRadius: 0 }}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                type="submit"
                disabled={!value || value < 1}
              >
                {buttonText || 'Submit'}
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {stockPrice && value > 0 && (
            <div style={{ fontWeight: 600, marginTop: '1rem' }}>
              Total cost: {roundNumber(value * stockPrice)}
            </div>
          )}
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default StockDialog;
