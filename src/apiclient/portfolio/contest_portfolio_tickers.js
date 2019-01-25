import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/contest/portfolio/tickers';

const contest_portfolio_tickers = {

  post: (callback, action, ticker, quantity) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'action=' + action + '&ticker=' + ticker + '&quantity=' + quantity
    console.log('POST ' + resource)
    console.log(body)

    fetch(resource, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + accessToken
      },
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(resource, json);
      callback(json)
    })
  },

}

export default contest_portfolio_tickers
