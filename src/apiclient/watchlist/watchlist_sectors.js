import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/sectors';

const watchlist_sectors = {
  post: (callback, sectorIds) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'sectors=' + sectorIds
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
      callback(json)
    })
  },

  delete: (sectorId, callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + '/' + sectorId
    console.log(deleteResource)

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

export default watchlist_sectors
