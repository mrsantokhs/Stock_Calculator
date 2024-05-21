import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvestmentCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(0);
  const [investment, setInvestment] = useState(0);
  const [rate, setRate] = useState(0);
  const [years, setYears] = useState(0);
  const [frequency, setFrequency] = useState('monthly');
  const [futureValue, setFutureValue] = useState(null);

  const calculateFutureValue = () => {
    const periods = frequency === 'monthly' ? 12 : 52;
    const r = rate / 100 / periods;
    const n = years * periods;
    const compoundInterest = ((1 + r) ** n - 1) / r;
    const fv = initialAmount * (1 + r) ** n + investment * compoundInterest * (1 + r);

    setFutureValue(fv.toFixed(2));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2>Mutual Investment Calculator</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Initial Starting Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Monthly/Weekly Investment Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={investment}
                  onChange={(e) => setInvestment(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Annual Interest Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Investment Period (years)</label>
                <input
                  type="number"
                  className="form-control"
                  value={years}
                  onChange={(e) => setYears(parseFloat(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Contribution Frequency</label>
                <select
                  className="form-control"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <button className="btn btn-primary btn-block mt-3" onClick={calculateFutureValue}>
                Calculate
              </button>

              {futureValue !== null && (
                <div className="mt-4 text-center">
                  <h4>Future Value: <span className="text-success">${futureValue}</span></h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
