import React from 'react';
import {
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import { currencies, setCurrency } from 'api/currency';

const CurrencySelector = () => {
  const { state, dispatch } = getStateWithDispatcher();
  return (
    <UncontrolledButtonDropdown size="sm">
      <Button id="caret">Currency</Button>
      <DropdownToggle color="warning" caret>
        {state.currency}
      </DropdownToggle>
      <DropdownMenu>
        {Object.keys(currencies).map((key, index) => (
          <DropdownItem key={index} onClick={() => setCurrency(dispatch, key)}>
            {key}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

export default CurrencySelector;
