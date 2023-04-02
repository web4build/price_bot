const axios = require("axios");
const { lastTokenPriceQuery } = require("../bitquery/queries");

const getLastTokenPrice = async (base, quote) => {
  const { data } = await axios.post("https://graphql.bitquery.io", {
    query: lastTokenPriceQuery,
    variables: {
      base,
      quote
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.BITQUERY_API_KEY
    }
  });
  return data.data.ethereum.dexTrades[0].quotePrice;
};

module.exports = getLastTokenPrice;
