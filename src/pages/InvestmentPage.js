import React from 'react';
import { Jumbotron } from 'reactstrap';
import { DefaultContainer } from 'layouts/DefaultContainer';
import InvestedStocksTable from 'components/stocks/InvestedStocksTable';

const InvestmentPage = () => (
  <DefaultContainer>
    <Jumbotron className="bg-secondary box-shadow pb-0">
      <h4>Active investments</h4>
      <InvestedStocksTable />
    </Jumbotron>
  </DefaultContainer>
);

export default InvestmentPage;
