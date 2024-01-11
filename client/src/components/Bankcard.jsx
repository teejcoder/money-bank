import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Bankcard = () => {
  const [transactions, setTransactions] = useState({});

  const getTransactions = async () => {
    try {
      // Replace the sample data with the actual data fetching logic
      console.log('Before getTransactions');
      const response = await axios.post('http://localhost:5001/api/executeFlow');
      setTransactions(response.data.data);
      console.log(response.data.data);
      console.log('after getTransactions');
      createChart();
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const createChart = () => {
    const ctx = document.getElementById('transactionChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: transactions.desciption,
        datasets: [{
          label: 'Transaction Amounts',
          data: transactions.amount,
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'category', // Use 'category' for dates
            position: 'bottom',
            title: {
              display: true,
              text: 'Transaction Date',
            },
          },
          y: {
            beginAtZero: true,
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Amount',
            },
          },
        },
      },
    });
  };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>It looks a little empty here..</p>
      <button
        onClick={getTransactions}
        className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
      >
        Connect Bank
      </button>
      <h2>Bank Transactions</h2>

      <div className=''>
        <canvas id="transactionChart" width="50" height="50">
        </canvas>
      </div>
    </div>
  );
};

export default Bankcard;
