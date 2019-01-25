import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/tickers/';

const watchlist_tickers_tags = {

  get: (ticker, callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let getResource = resource + ticker + "/tags"
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/watchlist/tickers/<ticker>/tags', json);
      callback(ticker, json)
    })
  },

  put: (callback, ticker, tagIdList) => {
    let accessToken = localStorage.getItem("accessToken");
    let putResource = resource + ticker + "/tags"
    let body = 'tag_id=' + tagIdList.join()
    console.log('PUT ' + putResource)
    console.log(body)

    fetch(putResource, {
      method: 'put',
      body: body,
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      console.log(response.status)
      callback()
      // return response.json()
    })
  },

}

export default watchlist_tickers_tags
