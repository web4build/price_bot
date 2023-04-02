const lasTokenPriceQuery = `query getLastokenPrice($base: String!, $quote: String!) {
  ethereum(network: bsc) {
    dexTrades(
      options: {limit: 10 desc: "block.timestamp.unixtime"}
      quoteCurrency: {is: $base}
      baseCurrency: {is: $quote}
    ) {
      quotePrice
      block {
        timestamp {
          unixtime
        }
      }
    }
  }
}
`

module.exports = {
  lasTokenPriceQuery
};
