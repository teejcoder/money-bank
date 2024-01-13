import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Bankcard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (transactions.length > 0) {
      destroyCharts();
      createPieChart();
      createBarChart();
      createLineChart();
      expenseDoughnutChart();
      calculateTotalBalance();
    }
  }, [transactions]);

  const destroyCharts = () => {
    ['pieChart', 'barChart', 'lineChart', 'doughnutChart'].forEach(chartName => {
      if (window[chartName]) {
        window[chartName].destroy();
      }
    });
  };

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

  const createPieChart = () => {
    const ctx = document.getElementById('transactionPieChart').getContext('2d');
  
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
  
    window.pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  };

  const createBarChart = () => {
    const ctx = document.getElementById('transactionBarChart').getContext('2d');

    // Process transactions to separate income and expenses by month
    const monthlyData = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.postDate);
      const monthYearKey = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = { income: 0, expenses: 0 };
      }

      const amount = parseFloat(transaction.amount);
      if (transaction.direction === 'debit') {
        monthlyData[monthYearKey].expenses += amount;
      } else {
        monthlyData[monthYearKey].income += amount;
      }
    });

    const months = Object.keys(monthlyData);
    const incomeData = months.map((key) => monthlyData[key].income);
    const expensesData = months.map((key) => monthlyData[key].expenses);

    const data = {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expensesData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Month-Year',
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
    };

    window.barChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  };

  const createLineChart = () => {
    const ctx = document.getElementById('incomeExpenseLineChart').getContext('2d');

    // Process transactions to track income minus expenses by month
    const monthlyData = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.postDate);
      const monthYearKey = `${date.getMonth() + 1}/${date.getFullYear()}`;

      if (!monthlyData[monthYearKey]) {
        monthlyData[monthYearKey] = 0;
      }

      const amount = parseFloat(transaction.amount);
      if (transaction.direction === 'credit') {
        monthlyData[monthYearKey] += amount;
      } else {
        monthlyData[monthYearKey] -= amount;
      }
    });

    const months = Object.keys(monthlyData);
    const netIncomeData = months.map((key) => monthlyData[key]);

    const data = {
      labels: months,
      datasets: [
        {
          label: 'Net Income',
          data: netIncomeData,
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Month-Year',
          },
        },
        y: {
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Net Income',
          },
        },
      },
    };

    window.lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  };

  const expenseDoughnutChart = () => {
    const ctx = document.getElementById('expenseDoughnutChart').getContext('2d');

    //get top expenses
    const topExpenses = transactions
      .filter(transaction => parseFloat(transaction.amount) < 0) // Consider only debit transactions (expenses)
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)) // Sort by amount in ascending order
      .slice(0, 5); // Take the top 5 expenses

    // Extract labels and data for the chart
    const expenseLabels = topExpenses.map(expense => expense.amount);
    const expenseData = topExpenses.map(expense => Math.abs(parseFloat(expense.amount)));

    // Create the doughnut chart
    const data = {
      labels: ['Top 5 expenses'],
      datasets: [
        {
          label: expenseLabels,
          data: expenseData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
        },
      ],
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Top 5 Expenses',
      },
    };

    window.doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: options,
    })
  };

  const calculateTotalBalance = () => {

    const balance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.direction === 'debit' ? acc - amount : acc + amount;
    }, 0);

    setTotalBalance(parseFloat(balance.toFixed(2)))
  }

  return (
    <div className='flex w-full justify-center items-center flex-col'>
      {transactions.length === 0 ? (
        <>
          <h2 className='mb-5'>Connect bank below</h2>
          <button
            onClick={getTransactions}
            className='border border-slate-300 w-1/2 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
          >
            Connect Bank
          </button>
        </>
        
      ) : (
          <div className='xl:flex items-center justify-center flex-col md:flex-row mt-10 mb-10'>

            {/* BAR CHART & TOTAL BALANCE*/}
            <div className='text-center p-5 chart-container '> 
              <h2 className='text-5xl'>${totalBalance}</h2>
              <span className='text-gray-400 text-sm'>Available</span>
              <h3 className='mt-20'>Monthly Income v Expenses</h3>
              <canvas id="transactionBarChart" width="400" height="300"></canvas>
            </div>

            {/* PIE CHART */}
            <div className='flex justify-center items-center flex-col '>
              <div className='text-center chart-container mb-10'> 
                <h3>Income v Expenses</h3>
                <canvas id="transactionPieChart" width="300" height="200"></canvas>
              </div>
              <div className='text-center chart-container'> 
                <canvas id="expenseDoughnutChart" width="300" height="300"></canvas>
              </div>
            </div>

            {/* LINE CHART */}
            <div className='text-center p-5 chart-container '> 
              <h3>Net Income Per Month</h3>
              <canvas id="incomeExpenseLineChart" width="400" height="300"></canvas>
            </div>

          </div>
      )}
    </div>
  );
}

export default Bankcard;