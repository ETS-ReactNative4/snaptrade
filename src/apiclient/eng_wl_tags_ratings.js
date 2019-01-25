import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/engagement/watchlist/tags';

const eng_wl_tags_ratings = {
  get: (callback, tagId) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '/' + tagId + '/ratings'
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

  post: (callback, tagId, action) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'action=' + action
    let postResource = resource + '/' + tagId + '/ratings'
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
      callback(json, tagId)
    })
  },

}

export default eng_wl_tags_ratings
