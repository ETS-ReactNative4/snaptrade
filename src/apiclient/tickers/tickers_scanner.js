import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/tickers/scanner';

const tickers_scanner = {
  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource =  resource;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json)
    })
  },
}

export default tickers_scanner
