import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bankcard = () => {
  const [transactions, setTransactions] = useState([]);

  const getAuthToken = async (transactions, req, res) => {
    try {
      const response = await axios.post('http://localhost:5001/api/executeFlow');
      console.log(response);
      setTransactions(response); // Set the state with the actual array of transactions
    } catch (error) {
      console.error('Error in getAuthToken:', error);
    }
  };
  // const createBasiqUserRequest = async () => {
  //   try {
  //     const response = await axios.post('/api/createBasiqUser');
  //     setBasiqUserId(response.data.id)
  //     console.log(response.data);
  //     console.log(basiqUserId);
  //   } catch (error) {
  //     console.error('Error in getAuthToken:', error);
  //   }
  // };

  // const getBasiqUser = async () => {
  //   try {
  //     const response = await axios.get('/api/getBasiqUser');
  //     setBasiqUserId(response.data.id)
  //     console.log(response.data);
  //     console.log(basiqUserId);
  //   } catch (error) {
  //     console.error('Error getBasiqUser:', error);
  //   }
  // };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col'>
      <p className='mb-3'>It looks a little empty here..</p>
      <button
        onClick={getAuthToken}
        className='border border-slate-300 p-2 rounded-3xl hover:bg-indigo-500 hover:text-white hover:font-medium'
      >
        Connect Bank
      </button>
      <h2>Bank Transactions</h2>
      <ul>
        {transactions && transactions.map((transaction) => (
          <li key={transaction.id}>
            <p>Description: {transaction.description}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Date: {transaction.postDate}</p>
            <p>Type: {transaction.direction}</p>
            {/* Add additional fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bankcard;
