require('dotenv').config();
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const BASIQ_API_KEY = process.env.BASIQ_API_KEY;

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
      const access_token = response.data.access_token;

    // Step 2: Check if the user has a basiq_user_id in Supabase DB
    console.log('Checking Supabase for basiq_user_id');
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('users')
      .select('basiq_user_id')
      .single();

    if (supabaseError) {
      if (supabaseError.code === 'PGRST116') {
        console.log('No basiq_user_id found in Supabase');
      } else {
        console.error('Error checking Supabase:', supabaseError);
      }
    }

    const basiq_user_id = supabaseData?.basiq_user_id;

    // Step 3: If basiq_user_id exists, call getBasiqUser; otherwise, call createBasiqUser
    if (basiq_user_id) {
      console.log('Basiq user found in Supabase:', basiq_user_id);
      await apiController.getBasiqUser(access_token, basiq_user_id);
    } else {
      console.log('Basiq user not found in Supabase. Creating...');
      await apiController.createBasiqUser(access_token);
    }
  } catch (error) {
    console.error('Error:', error);
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
      data: { email: 'gavin@hooli.com', firstName: 'Gavin', lastName: 'Belson' }
    };
    console.log('Before createBasiqUser request');
    const response = await axios(options);
    console.log(response.data);

    const new_basiq_user_id = response.data.id;
    console.log('Basiq user ID:', new_basiq_user_id);

    // Store basiq_user_id in Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{basiq_user_id: new_basiq_user_id}])
      .select()
    if (error) {
      console.error('Error storing basiq_user_id in Supabase:', error);
    } if (data){
      console.log(data)
      console.log('Successfully stored basiq_user_id in Supabase');
    }
      console.log('After createBasiqUser request');
    } catch (error) {
      console.error('Error:', error);
    }
}
};

module.exports = apiController;
