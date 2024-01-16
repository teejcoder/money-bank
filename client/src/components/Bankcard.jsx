import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { useDarkMode } from '../contexts/DarkModeContext';
import Button from './Button';
import Spinner from './Spinner'

const Bankcard = () => {
  const { isDarkMode } = useDarkMode();
  const [showSpinner, setShowSpinner] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  useEffect(() => {
    if (transactions.length > 0) {
      destroyCharts();
      createPieChart();
      createBarChart();
      createLineChart();
      expenseDoughnutChart();
      calculateTotalBalance();
      calculateTotalDebits();
    }
  }, [transactions]);

  const destroyCharts = () => {
    ['pieChart', 'barChart', 'lineChart', 'doughnutChart'].forEach(chartName => {
      if (window[chartName]) {
        window[chartName].destroy();
      }
    });
  };

  //Get transactions - executeFlow function
  const getTransactions = async () => {
    try {
      setShowSpinner(true);
      console.log('Before getTransactions');

      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await axios.post('http://localhost:5001/api/executeFlow');
      setTransactions(response.data.data);
      console.log(response.data.data);
      console.log('after getTransactions');
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setShowSpinner(false); // Hide the spinner after the fetch is complete
    }
  };

  //Pie Chart
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
          backgroundColor: [isDarkMode ? 'rgba(255, 99, 132, 0.7)' : 'rgba(255, 99, 132, 0.7)', isDarkMode ? 'rgba(75, 192, 192, 0.7)' : 'rgba(75, 192, 192, 0.7)'],
          borderColor: [isDarkMode ? 'rgba(255, 99, 132, 0.1)' : 'rgba(255, 99, 132, 0.1)', isDarkMode ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.5)'],
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

  //Bar Graph
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
          color: isDarkMode ? '#FBF5F3' : '#000000',
          backgroundColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 1)',
          borderColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expensesData,
          color: isDarkMode ? '#FBF5F3' : '#000000',
          backgroundColor: isDarkMode ? '#FF6384' : 'rgba(255, 99, 132, 1)',
          borderColor: isDarkMode ? '#FF6384' : 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Month-Year',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0',
          },
        },
        y: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          color:'white',
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Amount',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0', 
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

  //Line chart
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
          color: isDarkMode ? '#FBF5F3' : '#000000',
          backgroundColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 0.7)',
          borderColor: isDarkMode ? '#4BC0C0' : 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          type: 'category',
          position: 'bottom',
          title: {
            display: true,
            text: 'Month-Year',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0',
          },
        },
        y: {
          ticks: {
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          beginAtZero: true,
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Net Income',
            color: isDarkMode ? '#BABABA' : '#6C6B6B',
          },
          grid: {
            color: isDarkMode ? '#BABABA' : '#e0e0e0',
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

  //Doughnut chart
  const expenseDoughnutChart = () => {
    const ctx = document.getElementById('expenseDoughnutChart').getContext('2d');

    //get top expenses
    const topExpenses = transactions
      .filter(transaction => parseFloat(transaction.amount) < 0) // Consider only debit transactions (expenses)
      .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount)) // Sort by amount in ascending order
      .slice(0, 5); // Take the top 5 expenses

    // Extract labels and data for the chart
    const expenseLabels = topExpenses.map(expense => expense.description);
    const expenseData = topExpenses.map(expense => expense.amount);

    // Create the doughnut chart
    const data = {
      labels: [
        expenseLabels,
      ],
      datasets: [
        {
          label: expenseLabels,
          data: expenseData,
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          hoverOffset: 4
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

  //Total balance credit minus debit
  const calculateTotalBalance = () => {
    const balance = transactions.reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount);
      return transaction.direction === 'debit' ? acc - amount : acc + amount;
    }, 0);
    setTotalBalance(parseFloat(balance.toFixed(2)))
  }

  const calculateTotalDebits = () => {

    const debits = transactions.filter((transaction) => {
      return transaction.direction === 'debit'
    })
    const totalDebits = debits.reduce((acc, transaction) => {
    const amount = parseFloat(transaction.amount);
    return acc + amount
  }, 0);
  setTotalDebit(parseFloat(totalDebits.toFixed(2)))
  }

  return (
    <div className={`flex w-full justify-center items-center flex-col ${isDarkMode ? 'bg-dark text-dark' : 'bg-light text-light'}`}>
      {transactions.length === 0 ? (
        <>
          {showSpinner && <Spinner/>}
          <Button
            onClick={getTransactions}
            className='border border-borderLight w-1/2 md:w-2/5 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
          >
            Connect Bank
          </Button>
        </>
      ) : (
        <div className='xl:flex items-center justify-center flex-col md:flex-row mt-10 mb-10'>
          
          {/* BAR CHART & TOTAL BALANCE*/}
          <div className='text-center p-5 chart-container'> 
            <h2 className='text-5xl text-green-600'>${totalBalance}</h2>
            <span className='text-gray-400 text-sm'>Available</span>
            <h3 className='mt-10'>Monthly Income v Expenses</h3>
            <canvas id="transactionBarChart" width="400" height="300"></canvas>
          </div>

          {/* PIE CHART */}
          <div className='flex justify-center items-center flex-col'>
            <div className='text-center chart-container'> 
              <h3>Income v Expenses</h3>
              <canvas id="transactionPieChart" width="300" height="200"></canvas>
            </div>
            {/* DOUGHNUT CHART */}
            <div className='text-center chart-container'> 
              <canvas id="expenseDoughnutChart" width="300" height="300"></canvas>
            </div>
          </div>

          {/* LINE CHART */}
          <div className='text-center p-5 chart-container'>
            <h2 className='text-5xl text-red-600'>${totalDebit}</h2>
            <span className='text-gray-400 text-sm'>Spend this Range</span> 
            <h3 className='mt-10'>Net Income Per Month</h3>
            <canvas id="incomeExpenseLineChart" className="w-full" height="300" width="400"></canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bankcard;