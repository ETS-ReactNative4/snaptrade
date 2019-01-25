import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/engagement/tickers';

const eng_tickers_ratings = {
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


  post: (callback, ticker, action) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'action=' + action
    let postResource = resource + '/' + ticker + '/ratings'
    console.log('POST ' + postResource)
    console.log(body)

    fetch(postResource, {
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
      console.log(postResource, json);
      callback(json, ticker)
    })
  },

}

export default eng_tickers_ratings
