import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/share/tags';

const watchlist_share_tags = {

  get: (callback, tagId) => {
    let accessToken = localStorage.getItem("accessToken");
    let getResource = resource + '/' + tagId + '/users';
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
      console.log(getResource, json);
      callback(json, tagId)
    })
  },

  post: (callback, tagId, friend) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'friend=' + friend
    let postResource = resource + '/' + tagId;
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

  delete: (callback, tagId) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + '/' + tagId;
    console.log('DELETE ' + deleteResource)

    fetch(deleteResource, {
      method: 'delete',
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(deleteResource, json);
      callback(json, tagId)
    })
  },

}

export default watchlist_share_tags
