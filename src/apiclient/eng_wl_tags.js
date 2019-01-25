import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/engagement/watchlist/tags';

const eng_wl_tags = {
  get: (callback, tagId) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + "/" + tagId ;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, tagId)
    })
  },
}

export default eng_wl_tags
