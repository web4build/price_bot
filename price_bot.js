
// npm install axios
const axios = require('axios');

const pancakeSwapAPI = 'https://api.pancakeswap.info/api/v2/tokens/';
const bscScanAPI = 'https://api.bscscan.com/api';
const bscScanAPIKey = 'YOUR_BSCSCAN_API_KEY'; // Replace with your BscScan API key

async function fetchTokenData(contractAddress) {
  try {
    // Fetch token price from PancakeSwap
    const pancakeSwapResponse = await axios.get(`${pancakeSwapAPI}${contractAddress}`);
    const tokenPrice = pancakeSwapResponse.data.price;

    // Fetch total holders count from BSCScan
    const bscScanResponse = await axios.get(bscScanAPI, {
      params: {
        module: 'token',
        action: 'tokeninfo',
        contractaddress: contractAddress,
        apikey: bscScanAPIKey,
      },
    });
    const holdersCount = bscScanResponse.data.result.holders;

    // Return data in JSON format
    return {
      tokenPrice: parseFloat(tokenPrice),
      holdersCount: parseInt(holdersCount),
    };
  } catch (error) {
    console.error('Error fetching token data:', error);
    return null;
  }
}

const contractAddress = '0x...'; // Replace with the BEP20 token contract address

fetchTokenData(contractAddress).then(data => {
  if (data) {
    console.log('Token Data:', data);
  } else {
    console.error('Failed to fetch token data');
  }
});

// Remember to replace '0x...' with the BEP20 token contract address you want to fetch data for and 'YOUR_BSCSCAN_API_KEY' with your actual BscScan API key.
