import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/tickers/list';

const tickers_list = {
  get: (callback, tickerList) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + "/" + tickerList;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, tickerList)
    })
  },
}

export default tickers_list
