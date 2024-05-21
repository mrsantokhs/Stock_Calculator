import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import StockCalculator from './Components/StockCalculator';
import InvestmentCalculator from './Components/InvestmentCalculator';


const Home = () => (
  <Container className="mt-5">
    <h1>Welcome to the Financial Calculators</h1>
    <p>Select a calculator to get started:</p>
    <div className="d-flex flex-column">
      <Button as={Link} to="/stock-calculator" variant="primary" className="mb-2">Stock Calculator</Button>
      <Button as={Link} to="/investment" variant="success" className="mb-2">Investment Calculator</Button>
    </div>
  </Container>
);

const App = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Profit planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/stock-calculator">Stock Calculator</Nav.Link>
            <Nav.Link as={Link} to="/investment">Investment Calculator</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock-calculator" element={<StockCalculator />} />
        <Route path="/investment" element={<InvestmentCalculator />} />
        
      </Routes>
    </Router>
  );
}

export default App;
