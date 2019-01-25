import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/recommendation';

const watchlist_recommendation = {

  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    let getResource = resource + '?version=1'
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

export default watchlist_recommendation
