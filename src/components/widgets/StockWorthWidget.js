import React from 'react';
import { Jumbotron } from 'reactstrap';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';

const StockWorthWidget = () => {
  const { state } = getStateWithDispatcher();
  return (
    <Jumbotron className="bg-secondary box-shadow text-primary widget-box">
      <h5>
        <b>Stock worth</b>
      </h5>
      <h6>
        <b>
          {state.userStocksValue} {state.currencySymbol}
        </b>
      </h6>
    </Jumbotron>
  );
};

export default StockWorthWidget;
