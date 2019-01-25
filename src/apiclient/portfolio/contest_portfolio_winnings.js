import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/contest/portfolio/winnings';

const contest_portfolio_winnings = {

  get: (callback, userUuid) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    let getResource = resource + '?user_uuid=' + userUuid
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: {
        headers: authHeaders
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, userUuid)
    })
  },

}

export default contest_portfolio_winnings
