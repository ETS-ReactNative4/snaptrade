import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/engagement/tickers';

const eng_tickers_share = {
  post: (callback, ticker, friend) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'friend=' + friend
    let postResource = resource + '/' + ticker + '/share'
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

export default eng_tickers_share
