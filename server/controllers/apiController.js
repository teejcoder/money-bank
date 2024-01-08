require('dotenv').config();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

let access_token; 
const basiq_user_id = "c31ec381-8294-465c-ae21-67f9df0362f1"

const apiController = {
  executeFlow: async () => {
    try {
      // Step 1: Generate Auth Token
      console.log('Starting auth flow');
      const encodedParams = new URLSearchParams();
      encodedParams.set('scope', 'SERVER_ACCESS');

      const options = {
        method: 'POST',
        url: 'https://au-api.basiq.io/token',
        headers: {
          'accept': 'application/json',
          'basiq-version': '3.0',
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${BASIQ_API_KEY}`,
        },
        data: encodedParams,
      };

      console.log('Before auth request');
      const response = await axios(options);
      console.log(response.data);
      console.log('After auth request');
      access_token = response.data.access_token;

      // Step 2: Check if the user has a basiq_user_id in Supabase DB
      // console.log('Checking Supabase for basiq_user_id');
      // const { data, error: supabaseError } = await supabase
      // .from('users')
      // .select('basiq_user_id');

      // if (supabaseError) {
      //   if (supabaseError.code === 'PGRST116') {
      //     console.log('No basiq_user_id found in Supabase');
      //   } else {
      //     console.error('Error checking Supabase:', supabaseError);
      //   }
      // }

      // Step 3: If basiq_user_id exists, call getBasiqUser; otherwise, call createBasiqUser
      // if (basiq_user_id) {
      //   console.log('Basiq user found in Supabase:', basiq_user_id);
        await apiController.getBasiqUser(access_token, basiq_user_id);
      // } else {
      //   console.log('Basiq user not found in Supabase. Creating...');
      //   await apiController.createBasiqUser(access_token);
      // }
        // await apiController.getAccount(access_token, basiq_user_id);
        await apiController.getTransactions(access_token, basiq_user_id);
      } catch (error) {
        console.error('Error:', error);
      }
  },

getConsents: async (access_token, basiq_user_id) => {
  try{
    const options = {
      method: 'GET',
      url: `https://au-api.basiq.io/users/${basiq_user_id}/consents`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${access_token}`
      }
    };
    console.log('before getConsents')
    const response = await axios.request(options)
    console.log('basiq user consents:', response.data)
    console.log('after getConsents')
  } catch (error) {
    console.error('Error getting getConsents', error)
  }
},

getAccount: async (access_token, basiq_user_id) => {
try {
  const options = {
    method: 'GET',
    url: `https://au-api.basiq.io/users/${basiq_user_id}/accounts/6cbd3f54-3623-4a7e-a73a-8cbb351b3487/`,
    headers: {accept: 'application/json', authorization: `Bearer ${access_token}`}
  };

  const response = await axios.request(options);
  console.log('getAccount function:', response.data.links.transactions);
} catch (error) {
  console.error(error)
  console.error('AxiosError:', error);
  console.error('Response Data:', error.response.data);
}
},


getTransactions: async (access_token, basiq_user_id) => {
  try {
    const options = {
      method: 'GET',
      url: `https://au-api.basiq.io/users/${basiq_user_id}/transactions?filter=account.id.eq('6cbd3f54-3623-4a7e-a73a-8cbb351b3487')`,
      params: {limit: '10'},
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${access_token}`
      }
    };
    const response = await axios.request(options);
    console.log('Basiq user transactions:', response.data);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
},

postAuthLink: async (access_token, basiq_user_id) => {
  const options = {
    method: 'POST',
    url: `https://au-api.basiq.io/users/${basiq_user_id}/auth_link`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`
    },
    data: { mobile: '+61412460636' }
  };

  try {
    const response = await axios.request(options);
    const authLinkData = response.data;
    console.log(authLinkData);
  } catch (error) {
    console.error(error);
  }
},

getBasiqUser: async (access_token, basiq_user_id) => {
  try {
    console.log('Getting Basiq user');
    const options = {
      method: 'GET',
      url: `https://au-api.basiq.io/users/${basiq_user_id}`,
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${access_token}`
      }
    };
    const response = await axios.request(options);
    console.log('Basiq user data:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
},

createBasiqUser: async (access_token) => {
  try {
    console.log('Starting createBasiqUser function');

    const options = {
      method: 'POST',
      url: 'https://au-api.basiq.io/users',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${access_token}`
      },
      data: { email: 'wentworth-smith@gmail.com', firstName: 'wentworth', lastName: 'smith' }
    };
    console.log('Before createBasiqUser request');
    const response = await axios(options);
    console.log(response.data);

    const new_basiq_user_id = response.data.id;
    console.log('Basiq user ID:', new_basiq_user_id);

    // Store basiq_user_id in Supabase
    // const { data, error } = await supabase
    //   .from('users')
    //   .insert({basiq_user_id: new_basiq_user_id})
    //   .select()
    // if (error) {
    //   console.error('Error storing basiq_user_id in Supabase:', error);
    // } if (data){
    //   console.log(data)
    //   console.log('Successfully stored basiq_user_id in Supabase');
    // }
      console.log('After createBasiqUser request');
    } catch (error) {
      console.error('Error:', error);
    }
}
};

module.exports = apiController;
