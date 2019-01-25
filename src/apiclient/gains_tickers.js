import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/gains/tickers';

const gains_tickers = {
  get: (callback, ticker, maxAge) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '/' + ticker;

    let qs = [];
    maxAge && qs.push('max_age=' + maxAge)

    getResource = qs.length ? (getResource + '?' + qs.join('&')) : getResource;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('gains_tickers.length', json.length);
      callback(json)
    })
  },
}

export default gains_tickers
