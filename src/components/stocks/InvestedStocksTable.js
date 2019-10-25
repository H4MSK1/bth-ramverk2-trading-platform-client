import React from 'react';
import { useAlert } from 'react-alert';
import { Table, Button } from 'reactstrap';
import { sellStocks } from 'actions/stocks';
import { formatDateTime } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import StockDialog from './StockDialog';

const InvestedStocksTable = () => {
  const alert = useAlert();
  const [selectedStock, setSelectedStock] = React.useState(null);
  const { state, dispatch } = getStateWithDispatcher();

  const onSubmitStockSell = async amount => {
    try {
      await sellStocks(dispatch, selectedStock.id, amount);
      const feedback = `${amount} stocks of ${selectedStock.stock.name} have been sold`;

      alert.success(feedback);
      setSelectedStock(null);
    } catch (err) {
      alert.error(err);
    }
  };

  const TableRow = (userStock, index) => (
    <tr key={index}>
      <th>
        {(userStock && userStock.stock.name) ||
          'You have no active investments registered.'}
      </th>
      <th>{userStock && userStock.stock.price}</th>
      <th>{userStock && userStock.price_when_purchased}</th>
      <th>{userStock && userStock.amount}</th>
      <th>{userStock && formatDateTime(userStock.updatedAt)}</th>
      <th>
        {userStock && (
          <Button
            color="primary"
            size="sm"
            onClick={() => setSelectedStock(userStock)}
          >
            Sell
          </Button>
        )}
      </th>
    </tr>
  );

  return (
    <React.Fragment>
      <div className="table-container">
        <Table striped hover responsive borderless className="mb-0">
          <thead>
            <tr>
              <th>Stock name</th>
              <th>Current price ({state.currencySymbol})</th>
              <th>Buy-In price ({state.currencySymbol})</th>
              <th>Amount</th>
              <th>Purchased</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!state.userStocks.length && TableRow()}
            {state.userStocks.map((userStock, index) =>
              TableRow(userStock, index),
            )}
          </tbody>
        </Table>
      </div>

      {selectedStock && (
        <StockDialog
          buttonText="Sell"
          title={`Sell ${selectedStock.stock.name} stocks`}
          onClose={() => setSelectedStock(null)}
          handleSubmit={onSubmitStockSell}
          range={{ min: 1, max: selectedStock.amount }}
        />
      )}
    </React.Fragment>
  );
};

export default InvestedStocksTable;
