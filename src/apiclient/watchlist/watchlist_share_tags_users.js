import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/share/tags';

const watchlist_share_tags_users = {
  delete: (callback, tagId, userId) => {
    let accessToken = localStorage.getItem("accessToken");
    let deleteResource = resource + '/' + tagId + '/users/' + userId
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
      callback(json, tagId, userId)
    })
  },
}

export default watchlist_share_tags_users
