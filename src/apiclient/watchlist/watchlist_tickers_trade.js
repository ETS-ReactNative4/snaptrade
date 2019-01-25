import Constants from '../../components/common/Constants.js';

//https://api-dev.snaptrade.us/watchlist/tickers/AMD
const resource = Constants.API_URL + '/watchlist/tickers';

const watchlist_tickers_trade = {
  post: (callback, ticker, buyprice, sellprice, tradetype, check) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'buy_price=' + buyprice + '&sell_price=' + sellprice + '&trade_type=' + tradetype + '&is_public=' + check;

    let getResource = resource + "/" + ticker + "/trade";

    console.log('POST ' + getResource)
    console.log(body)
    console.log(accessToken);

    fetch(getResource, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json);
      callback(json)
    })
  },


}

export default watchlist_tickers_trade
