import React from 'react';
import { Jumbotron, Row, Col, Button, Container } from 'reactstrap';
import { useAlert } from 'react-alert';
import { onlyAuth } from 'api/utils';
import { addBalance } from 'actions/user';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import MarketStocksTable from 'components/stocks/MarketStocksTable';
import AddBalanceDialog from 'components/AddBalanceDialog';
import StockChart from 'components/stocks/StockChart';

const IndexPage = () => {
  const alert = useAlert();
  const { state, dispatch } = getStateWithDispatcher();
  const [balanceDialog, setBalanceDialog] = React.useState(false);
  const onSubmitAddBalance = async balance => {
    try {
      await addBalance(dispatch, balance);
      alert.success(`${balance} have been added to your balance`);
    } catch (err) {
      alert.error(err);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={onlyAuth(() => 8)}>
            <Jumbotron className="bg-secondary box-shadow pb-0">
              <h4>Market</h4>
              <MarketStocksTable />
            </Jumbotron>
          </Col>

          {onlyAuth(() => (
            <Col xs={12} md={4}>
              <Jumbotron className="bg-secondary box-shadow text-primary">
                <h5>
                  <b>Balance available</b>
                </h5>
                <h6>
                  <b>
                    {state.userBalance} {state.currencySymbol}
                  </b>
                </h6>
                <Button
                  color="success"
                  onClick={() => setBalanceDialog(true)}
                  size="sm"
                >
                  Add balance
                </Button>
              </Jumbotron>
              <Jumbotron className="bg-secondary box-shadow text-primary">
                <h5>
                  <b>Stock worth</b>
                </h5>
                <h6 className="mb-0">
                  <b>
                    {state.userStocksValue} {state.currencySymbol}
                  </b>
                </h6>
              </Jumbotron>
            </Col>
          ))}
        </Row>

        {balanceDialog && (
          <AddBalanceDialog
            handleSubmit={onSubmitAddBalance}
            onClosed={() => setBalanceDialog(false)}
          />
        )}

        <Row>
          {state.marketStocks.map((stock, index) => (
            <Col xs={12} md={6} key={index}>
              <Jumbotron className="bg-secondary box-shadow">
                <h4 className="mb-0">{stock.name}</h4>
                <StockChart stock={stock} />
              </Jumbotron>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default IndexPage;
