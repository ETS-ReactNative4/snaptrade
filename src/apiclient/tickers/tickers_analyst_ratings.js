import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/tickers/analyst_ratings';

const tickers_analyst_ratings = {
  get: (callback, ticker) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource =  resource + '/' + ticker;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, ticker)
    })
  },
}

export default tickers_analyst_ratings
