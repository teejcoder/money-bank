import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Bankcard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // This useEffect will be triggered whenever transactions state changes
    if (transactions.length > 0) {
      createBarChart();
    }
  }, [transactions]);
  
  const getTransactions = async () => {
    try {
      console.log('Before getTransactions');
      const response = await axios.post('http://localhost:5001/api/executeFlow');
      
      setTransactions(response.data.data);
      console.log(response.data.data);
      console.log('after getTransactions');
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const createBarChart = () => {
    const ctx = document.getElementById('transactionChart').getContext('2d');
  
    if (window.myChart) {
      window.myChart.destroy();
    }
    // Process transactions to separate withdrawals and deposits
    const withdrawals = [];
    const deposits = [];

    transactions.forEach((transaction) => {
      // console.log('Processing transaction:', transaction);
      
      const amount = parseFloat(transaction.amount);
      if (transaction.direction === 'debit') {
        withdrawals.push(amount);
      } else {
        deposits.push(amount);
      }
    });

    let withdrawTotal = withdrawals.reduce((acc,c) => acc + c, 0);
    let depositTotal = deposits.reduce((acc,c) => acc + c, 0);

    console.log('Withdrawals:', withdrawTotal);
    console.log('Deposits:', depositTotal);
  
    const data = {
      labels: ['Outgoing', 'Incoming'],
      datasets: [
        {
          label: 'All Transactions',
          data: [withdrawals.reduce((a, b) => a + b, 0), deposits.reduce((a, b) => a + b, 0)],
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        total: [withdrawTotal + depositTotal]
      },
    };
  
    window.myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  };

  // const createLineGraph = () => {
  //   const ctx = document.getElementById('transactionChart').getContext('2d');
  
  //   if (window.myChart) {
  //     window.myChart.destroy();
  //   }
  //   // Process transactions to separate withdrawals and deposits
  //   const withdrawals = [];
  //   const deposits = [];

  //   transactions.forEach((transaction) => {
  //     console.log('Processing transaction:', transaction);
      
  //     const amount = parseFloat(transaction.amount);
  //     if (transaction.direction === 'debit') {
  //       withdrawals.push(amount);
  //     } else {
  //       deposits.push(amount);
  //     }
  //   });

  //   let withdrawTotal = withdrawals.reduce((acc,c) => acc + c, 0);
  //   let depositTotal = deposits.reduce((acc,c) => acc + c, 0);

  //   console.log('Withdrawals:', withdrawTotal);
  //   console.log('Deposits:', depositTotal);
  
  //   const data = {
  //     labels: ['Withdrawals', 'Deposits'],
  //     datasets: [
  //       {
  //         label: 'Transaction Amount',
  //         data: [withdrawals.reduce((a, b) => a + b, 0), deposits.reduce((a, b) => a + b, 0)],
  //         backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
  //         borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  
  //   const options = {
  //     scales: {
  //       x: {
  //         type: 'category',
  //         position: 'bottom',
  //         title: {
  //           display: true,
  //           text: 'Transaction Type',
  //         },
  //       },
  //       y: {
  //         beginAtZero: true,
  //         type: 'linear',
  //         position: 'left',
  //         title: {
  //           display: true,
  //           text: 'Amount',
  //         },
  //       },
  //     },
  //   };
  
  //   window.myChart = new Chart(ctx, {
  //     type: 'bar',
  //     data: data,
  //     options: options,
  //   });
  // };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      {transactions.length === 0 && (
        <button
          onClick={getTransactions}
          className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
        >
          Connect Bank
        </button>
      )}
      
      {transactions.length > 0 && <h2>Total Bank Transactions</h2>}

      <div>
        <canvas id="transactionChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
};

export default Bankcard;