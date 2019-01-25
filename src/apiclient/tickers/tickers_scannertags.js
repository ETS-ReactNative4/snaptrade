import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/tickers/scanner';

const tickers_scannertags = {
  get: (callback, tag) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource =  resource + '?tag=' + tag;
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

export default tickers_scannertags
