import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/tags';

const watchlist_tags = {

  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log('GET ' + resource)

    fetch(resource, {
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/watchlist/tags', json);
      callback(json)
    })
  },

  post: (callback, tag) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'tag=' + tag
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
      console.log(resource, json);
      callback(json)
    })
  },

  delete: (tagId, callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + '/' + tagId
    console.log('DELETE ' + deleteResource)

    fetch(deleteResource, {
      method: 'delete',
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      console.log(response.status)
      callback(tagId)
    })
  },
}

export default watchlist_tags
