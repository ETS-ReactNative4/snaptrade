import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/chart/tickers';

const chart_tickers = {
  get: (callback, ticker, period) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + "/" + ticker + "?period=" + period;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(ticker, period, json)
    })
  },
}

export default chart_tickers
