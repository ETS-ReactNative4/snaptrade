import Constants from '../../components/common/Constants.js';

//https://api-dev.snaptrade.us/watchlist/tickers/AMD
const resource = Constants.API_URL + '/watchlist/alert/ticker';

const watchlist_alert_ticker = {
  post: (callback, ticker, buyprice, sellprice) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'buy_price=' + buyprice + '&sell_price=' + sellprice;

    let getResource = resource + "/" + ticker ;

    console.log('POST ' + getResource)
    console.log(body)

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

  delete: (callback, ticker) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + "/" + ticker ;
    console.log('DELETE ' + deleteResource)

    fetch(deleteResource, {
      method: 'delete',
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

export default watchlist_alert_ticker
