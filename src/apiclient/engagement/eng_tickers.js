import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/engagement/tickers';

const eng_tickers_comments = {
  get: (callback, ticker) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '/' + ticker
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

export default eng_tickers_comments
