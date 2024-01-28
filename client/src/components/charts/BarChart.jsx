import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, isDarkMode }) => {
  useEffect(() => {
    const barChartCanvas = document.getElementById('transactionBarChart');

    if (window.barChart) {
        window.barChart.destroy();
      }

    if (barChartCanvas) {
      const ctx = barChartCanvas.getContext('2d');
      // Process data to separate income and expenses by month
      const monthlyData = {};

      data.forEach((transaction) => {
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

      const chartData = {
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
            color: 'white',
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
        data: chartData,
        options: options,
      });
    } else {
      console.error('Canvas element not found.');
    }
  }, [data, isDarkMode]);

  return <canvas id="transactionBarChart" width="400" height="300"></canvas>;
};

export default BarChart;
