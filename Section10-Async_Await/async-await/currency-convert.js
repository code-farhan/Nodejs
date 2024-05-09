/**
 * File    : currency-convert.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 8/10/2017
 */
// EUR USD 23
// 23 EUR is worth 28 USD. You can spend these in the following countries:
// rates from: http://fixer.io/
// countries from: https://restcountries.eu/#api-endpoints-currency


const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];

    if (rate){
      return rate;
    } else {
      // if to is invalid, the error will run
      throw new Error();
    }
  } catch (e) {
    // if from and/or to is invalid, the error wil run
    throw new Error(`Unable to get exchange rate for ${from} to ${to}`);
  }

};
// getExchangeRate('EUR', 'USD').then((rate) => {
//   console.log(rate);
// });

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}.`);
  }
};
// getCountries('USD').then((countries) => {
//   console.log(countries);
// });


const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  });
};
// convertCurrency('EUR', 'CAD', 100).then((status) => {
//   console.log(status);
// });

// Create convertCurrencyAlt as async function
const convertCurrencyAlt = async (from, to, amount) => {
  // get countries and rate using await and our two function
  const countries = await getCountries(to);
  // paused until countries gets a value
  const rate = await getExchangeRate(from, to);
  // paused until rate gets a value

  // or run all at the same time!!
  // const [ countries, rate ] = await Promise.all([getCountries(to), getExchangeRate(from, to)]);

  // Calculate exchange amount
  const exchangedAmount = amount * rate;

  // Return status string
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
};

convertCurrencyAlt('USD', 'EUR', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  //console.log(e); // will output Error message and trace
  console.log(e.message); // will output only message
});




















