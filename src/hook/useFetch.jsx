import React, { useEffect } from 'react';
import axios from 'axios';

const UseFetch = () => {


    useEffect(() => {
        const displayData = async () => {
            const encodedParams = new URLSearchParams();
                encodedParams.set('scope', 'CLIENT_ACCESS');

            const options = {
                method: 'POST',
                url: 'https://au-api.basiq.io/token',
                headers: {
                accept: 'application/json',
                'basiq-version': '3.0',
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic MzA4NDMyZTAtNjgzOS00ZGU0LWJkZDEtOWVhMzc2ZWUyZDJhOmQ4OTE0MjZhLWMzMmYtNDc1Ni04OTIyLWQyNjM2ZmEzODZjNw==' 
                }
            };
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });   
        }; displayData()
    }, []);


  return (
    <div>
        trying to get API data..
    </div>
  )
}

export default UseFetch