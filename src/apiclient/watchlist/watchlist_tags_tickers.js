import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/tags/';

const watchlist_tags_tickers = {

  post: (callback, tagId, tickers) => {
    let accessToken = localStorage.getItem("accessToken");
    let postResource = resource + tagId + "/tickers"
    let body = 'tickers=' + tickers
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
      callback(json)
    })
  },

  delete: (callback, tagId, tickers) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + tagId + "/tickers/" + tickers
    console.log('DELETE ' + deleteResource)

    fetch(deleteResource, {
      method: 'delete',
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(deleteResource, json);
      callback(json)
    })
  },

}

export default watchlist_tags_tickers
