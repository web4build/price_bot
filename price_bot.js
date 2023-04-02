
require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const getLastTokenPrice = require('./utils/getLastTokenPrice');
const { tokens } = require('./config');

async function main() {
  try {
    const response = await axios.get(`https://bscscan.com/token/${tokens.WEB4}`);
    const $ = cheerio.load(response.data);
    const totalHolders = $('#ContentPlaceHolder1_tr_tokenHolders .mr-3').text().trim();

    const WEB4xBNB = await getLastTokenPrice(tokens.BNB, tokens.WEB4)
    const BNBxBUSD = await getLastTokenPrice(tokens.BUSD, tokens.BNB)
    const WEB4xBUSD = (BNBxBUSD * WEB4xBNB).toFixed(18)
    const output = {
      totalHolders: totalHolders.split(' ')[0],
      'WEB4/BNB': WEB4xBNB.toFixed(18),
      'WEB4/BUSD': WEB4xBUSD
    }

    console.log(JSON.stringify(output, null, 2))
  } catch (error) {
    console.error(error);
  }
}



main();

