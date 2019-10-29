import React from 'react';
import {
  Jumbotron,
  Row,
  Col,
  Container,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import { onlyAuth } from 'api/utils';
import useStockWatchEvent from 'hooks/useStockWatchEvent';
import MarketStocksTable from 'components/stocks/MarketStocksTable';
import StockChart from 'components/stocks/StockChart';
import BalanceWidget from 'components/widgets/BalanceWidget';
import StockWorthWidget from 'components/widgets/StockWorthWidget';

const IndexPage = () => {
  useStockWatchEvent();
  const { state } = getStateWithDispatcher();
  const [gridType, setGridType] = React.useState(1);
  const toggleChartGrid = () => setGridType(prev => +!prev);
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
        <Col xs={12} className="text-right mb-2 d-none d-lg-block">
          <ButtonGroup>
            <Button
              color="primary"
              size="sm"
              onClick={toggleChartGrid}
              disabled={gridType === 1}
              style={{ width: 65, textAlign: 'center' }}
            >
              Grid
            </Button>
            <Button
              color="primary"
              size="sm"
              onClick={toggleChartGrid}
              disabled={gridType === 0}
              style={{ width: 65, textAlign: 'center' }}
            >
              List
            </Button>
          </ButtonGroup>
        </Col>

        {state.marketStocks.map((stock, index) => (
          <Col xs={12} lg={gridType === 1 && 6} key={index}>
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
