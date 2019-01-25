import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/tickers/search';

const tickers_search = {
  get: (callback, q) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + "?" + q;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, q)
    })
  },
}

export default tickers_search
