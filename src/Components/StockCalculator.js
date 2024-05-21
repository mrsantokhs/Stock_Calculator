import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const CommissionInput = ({ label, commissionType, setCommissionType, commission, setCommission }) => (
  <Form.Group as={Row}>
    <Form.Label column sm={2}>{label}</Form.Label>
    <Col sm={5}>
      <Form.Control
        type="number"
        placeholder="Enter commission"
        value={commission}
        onChange={(e) => setCommission(e.target.value)}
        required
      />
    </Col>
    <Col sm={5}>
      <Form.Control
        as="select"
        value={commissionType}
        onChange={(e) => setCommissionType(e.target.value)}
        required
      >
        <option value="percentage">Percentage</option>
        <option value="amount">Amount</option>
      </Form.Control>
    </Col>
  </Form.Group>
);

const StockCalculator = () => {
  const [shares, setShares] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [buyCommissionType, setBuyCommissionType] = useState('percentage');
  const [buyCommission, setBuyCommission] = useState('');
  const [sellCommissionType, setSellCommissionType] = useState('percentage');
  const [sellCommission, setSellCommission] = useState('');
  const [positionType, setPositionType] = useState('long');
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [roi, setROI] = useState(null);

  const handleCalculate = (event) => {
    event.preventDefault();
    
    const totalInvested = shares * buyPrice + calculateCommission(shares * buyPrice, buyCommissionType, buyCommission);
    const totalCurrentValue = shares * currentPrice;
    let profitOrLoss;

    if (positionType === 'long') {
      profitOrLoss = totalCurrentValue - totalInvested - calculateCommission(shares * currentPrice, sellCommissionType, sellCommission);
    } else {
      profitOrLoss = totalInvested - totalCurrentValue - calculateCommission(shares * currentPrice, sellCommissionType, sellCommission);
    }

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
        <Form.Group as={Row} controlId="formPositionType">
          <Form.Label column sm={2}>Position Type</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={positionType}
              onChange={(e) => setPositionType(e.target.value)}
              required
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </Form.Control>
          </Col>
        </Form.Group>

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

        <CommissionInput 
          label="Commission when buying share"
          commissionType={buyCommissionType}
          setCommissionType={setBuyCommissionType}
          commission={buyCommission}
          setCommission={setBuyCommission}
        />

        <CommissionInput 
          label="Commission when selling share"
          commissionType={sellCommissionType}
          setCommissionType={setSellCommissionType}
          commission={sellCommission}
          setCommission={setSellCommission}
        />

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
