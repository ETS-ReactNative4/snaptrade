import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/portfolio_game/vote';

const portfolio_game_vote = {

  post: (callback, tickers) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'ticker=' + tickers
    console.log('POST ' + resource)
    console.log(body)

    fetch(resource, {
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
      console.log(json);
      callback(json, tickers)
    })
  },

}

export default portfolio_game_vote
