import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export const DefaultContainer = ({
  keepContainer = false,
  children,
  padding,
  column = {},
  ...props
}) => (
  <Container style={{ padding }} {...props}>
    {keepContainer ? (
      children
    ) : (
      <Row>
        <Col {...column}>{children}</Col>
      </Row>
    )}
  </Container>
);
