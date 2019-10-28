import React from 'react';
import { Jumbotron, Row, Col, Container } from 'reactstrap';
import { onlyAuth } from 'api/utils';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import MarketStocksTable from 'components/stocks/MarketStocksTable';
import StockChart from 'components/stocks/StockChart';
import BalanceWidget from 'components/widgets/BalanceWidget';
import StockWorthWidget from 'components/widgets/StockWorthWidget';

const IndexPage = () => {
  const { state } = getStateWithDispatcher();
  return (
    <Container>
      <Row>
        <Col xs={12} lg={onlyAuth(() => 8)}>
          <Jumbotron className="bg-secondary box-shadow pb-0">
            <h4>Market</h4>
            <MarketStocksTable />
          </Jumbotron>
        </Col>

        {onlyAuth(() => (
          <Col xs={12} lg={4}>
            <BalanceWidget />
            <StockWorthWidget />
          </Col>
        ))}
      </Row>

      <Row>
        {state.marketStocks.map((stock, index) => (
          <Col xs={12} lg={6} key={index}>
            <Jumbotron className="bg-secondary box-shadow">
              <h4>{stock.name}</h4>
              <StockChart stock={stock} />
            </Jumbotron>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default IndexPage;
