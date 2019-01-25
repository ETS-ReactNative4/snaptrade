import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/portfolio_game/get_voted_tickers';

const portfolio_game_get_voted_tickers = {

  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    console.log('GET ' + resource)

    fetch(resource, {
      headers: {
        headers: authHeaders
      }
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

export default portfolio_game_get_voted_tickers
