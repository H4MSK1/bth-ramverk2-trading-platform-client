import React from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import InvestedStocksTable from 'components/stocks/InvestedStocksTable';
import BalanceWidget from 'components/widgets/BalanceWidget';
import StockWorthWidget from 'components/widgets/StockWorthWidget';
import AccountWidget from 'components/widgets/AccountWidget';

const InvestmentPage = () => (
  <Container>
    <Row>
      <Col xs={12} md={4} className="d-flex align-items-stretch">
        <BalanceWidget />
      </Col>
      <Col xs={12} md={4} className="d-flex align-items-stretch">
        <StockWorthWidget />
      </Col>
      <Col xs={12} md={4} className="d-flex align-items-stretch">
        <AccountWidget />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <Jumbotron className="bg-secondary box-shadow pb-0">
          <h4>Active investments</h4>
          <InvestedStocksTable />
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default InvestmentPage;
