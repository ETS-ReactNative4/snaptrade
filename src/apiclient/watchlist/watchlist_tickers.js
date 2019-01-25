import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/tickers';

const watchlist_tickers = {
  get: (callback, tagUuid, type) => {
    let accessToken = localStorage.getItem("accessToken");
    let getResource = resource;
    if (tagUuid)
      getResource = getResource + '?tag_uuid=' + tagUuid;
    if (type)
      getResource = getResource + '?type=' + type;
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
      console.log(resource, json);
      callback(json, tagUuid, type)
    })
  },

  post: (callback, tickers) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'tickers=' + tickers
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

  delete: (ticker, callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + '/' + ticker
    console.log('DELETE ' + deleteResource)

    fetch(deleteResource, {
      method: 'delete',
      headers: {
        "Authorization" : "Bearer " + accessToken
      }
    })
    .then((response) => {
      console.log(response.status)
      callback()
    })
  },
}

export default watchlist_tickers
