import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/queue/count';

const users_queue_count = {

  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    console.log('GET ' + resource)

    fetch(resource, {
      headers: {
        headers: authHeaders
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

}

export default users_queue_count
