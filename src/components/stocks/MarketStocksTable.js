import React from 'react';
import { useAlert } from 'react-alert';
import { Table, Button } from 'reactstrap';
import { buyStocks, getMarketStocks } from 'actions/stocks';
import { formatDateTime } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import StockDialog from './StockDialog';
import AuthService from 'api/AuthService';

const MarketStocksTable = () => {
  const alert = useAlert();
  const [selectedStock, setSelectedStock] = React.useState(null);
  const { state, dispatch } = getStateWithDispatcher();

  const onSubmitStockPurchase = async amount => {
    try {
      await buyStocks(dispatch, selectedStock.id, amount);
      const feedback = `${amount} stocks of ${selectedStock.product.title} have been purchased`;

      alert.success(feedback);
      setSelectedStock(null);
    } catch (err) {
      alert.error(err);
    }
  };

  React.useEffect(() => {
    getMarketStocks(dispatch);
  }, []);

  const TableRow = (stock, index) => (
    <tr key={index}>
      <th>
        {(stock && stock.product.title) || 'No stocks available for purchase.'}
      </th>
      <th>{stock && stock.price}</th>
      <th>{stock && formatDateTime(stock.updatedAt)}</th>
      <th>
        {stock && (
          <Button
            color="primary"
            size="sm"
            onClick={() => setSelectedStock(stock)}
            disabled={!AuthService.isAuth()}
          >
            Purchase
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
              <th>Last updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!state.marketStocks.length && TableRow()}
            {state.marketStocks.map((stock, index) => TableRow(stock, index))}
          </tbody>
        </Table>
      </div>

      {selectedStock && (
        <StockDialog
          buttonText="Purchase"
          title={`Purchase ${selectedStock.product.title} stocks`}
          onClose={() => setSelectedStock(null)}
          handleSubmit={onSubmitStockPurchase}
          stockPrice={selectedStock.price}
        />
      )}
    </React.Fragment>
  );
};

export default MarketStocksTable;
