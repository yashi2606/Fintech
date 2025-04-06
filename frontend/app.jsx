import React, { useState } from 'react';
import './App.css'; // Optional for custom styling

const App = () => {
  const loanDetails = {
    amount: 3800,
    term: 6,
    startDate: '2023-02-07',
  };

  const initialPayments = [
    { id: 1, due: 'Tue Feb 07 2023', loanAmount: 0, payment: 1000 },
    { id: 2, due: 'Tue Feb 14 2023', loanAmount: 0, payment: 1200 },
    { id: 3, due: 'Tue Feb 21 2023', loanAmount: 950, payment: '' },
    { id: 4, due: 'Tue Feb 28 2023', loanAmount: 950, payment: '' },
    { id: 5, due: 'Tue Mar 07 2023', loanAmount: 950, payment: '' },
    { id: 6, due: 'Tue Mar 14 2023', loanAmount: 950, payment: '' },
  ];

  const [payments, setPayments] = useState(initialPayments);

  const handlePaymentChange = (index, value) => {
    const updated = [...payments];
    updated[index].payment = value;
    setPayments(updated);
  };

  const handleSubmit = (id) => {
    alert(Payment submitted for Installment ${id});
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Your Loan Details</h1>
        <button className="logout">Logout</button>
      </div>
      <p>Loan amount to be paid : ${loanDetails.amount}</p>
      <p>Installment Term: {loanDetails.term}</p>
      <p>Term start: {loanDetails.startDate}</p>

      <table>
        <thead>
          <tr>
            <th>Installments</th>
            <th>Due Payment Date</th>
            <th>Loan Amount</th>
            <th>Payment Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((row, index) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.due}</td>
              <td>${row.loanAmount.toFixed(2)}</td>
              <td>
                <input
                  type="text"
                  value={row.payment}
                  onChange={(e) => handlePaymentChange(index, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSubmit(row.id)}>Submit Payment</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;