import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Bankcard = () => {
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    try {
      // Fetch transactions using your API
      const response = await axios.post('http://localhost:5001/api/executeFlow');
      setTransactions(response.data);
      createChart();
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const createChart = () => {
    // Extracting transaction dates and amounts for the chart
    const labels = transactions.map((transaction) => transaction.postDate);
    const amounts = transactions.map((transaction) => parseFloat(transaction.amount));

    // Get the canvas element
    const ctx = document.getElementById('transactionChart').getContext('2d');

    // Create the chart
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Transaction Amounts',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'linear', // Assuming postDate is a date, you might need to adjust this based on your actual data
            position: 'bottom',
            title: {
              display: true,
              text: 'Transaction Date',
            },
          },
          y: {
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
      <canvas id="transactionChart" width="50" height="50"></canvas>
    </div>
  );
};

export default Bankcard;
