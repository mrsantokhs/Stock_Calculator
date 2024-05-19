import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const StockCalculator = () => {
  const [shares, setShares] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [buyCommissionType, setBuyCommissionType] = useState('percentage');
  const [buyCommission, setBuyCommission] = useState('');
  const [sellCommissionType, setSellCommissionType] = useState('percentage');
  const [sellCommission, setSellCommission] = useState('');
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [roi, setROI] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    const totalInvested = shares * buyPrice + calculateCommission(shares * buyPrice, buyCommissionType, buyCommission);
    const totalCurrentValue = shares * currentPrice;
    const profitOrLoss = totalCurrentValue - totalInvested - calculateCommission(shares * currentPrice, sellCommissionType, sellCommission);
    const roiValue = ((profitOrLoss / totalInvested) * 100).toFixed(2);

    setTotalInvestment(totalInvested.toFixed(2));
    setProfitLoss(profitOrLoss.toFixed(2));
    setROI(roiValue);
  };

  const calculateCommission = (amount, type, commission) => {
    if (type === 'percentage') {
      return (amount * commission) / 100;
    } else {
      return parseFloat(commission);
    }
  };

  return (
    <Container>
      <h1 className="mt-5">Stock Calculator</h1>
      <Form onSubmit={handleCalculate}>
        <Form.Group as={Row} controlId="formShares">
          <Form.Label column sm={2}>Number of Shares</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter number of shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBuyPrice">
          <Form.Label column sm={2}>Buy Price per Share</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter buy price per share"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCurrentPrice">
          <Form.Label column sm={2}>Current Price per Share</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Enter current price per share"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formBuyCommission">
          <Form.Label column sm={2}>Commission when buying share</Form.Label>
          <Col sm={5}>
            <Form.Control
              type="number"
              placeholder="Enter commission"
              value={buyCommission}
              onChange={(e) => setBuyCommission(e.target.value)}
              required
            />
          </Col>
          <Col sm={5}>
            <Form.Control
              as="select"
              value={buyCommissionType}
              onChange={(e) => setBuyCommissionType(e.target.value)}
              required
            >
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSellCommission">
          <Form.Label column sm={2}>Commission when selling share</Form.Label>
          <Col sm={5}>
            <Form.Control
              type="number"
              placeholder="Enter commission"
              value={sellCommission}
              onChange={(e) => setSellCommission(e.target.value)}
              required
            />
          </Col>
          <Col sm={5}>
            <Form.Control
              as="select"
              value={sellCommissionType}
              onChange={(e) => setSellCommissionType(e.target.value)}
              required
            >
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Button variant="warning" type="submit">
          Calculate
        </Button>
      </Form>

      {totalInvestment !== null && (
        <div className="mt-4">
          <h3>Total Investment: ${totalInvestment}</h3>
          <h3>{profitLoss >= 0 ? 'Profit' : 'Loss'}: ${profitLoss}</h3>
          <h3>Return on Investment (ROI): {roi}%</h3>
        </div>
      )}
    </Container>
  );
};

export default StockCalculator;
