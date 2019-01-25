import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/queue';

const users_queue_email = {

  get: (callback,email) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '?email=' + email
    console.log('GET ' + getResource)
    

    fetch(getResource, {
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

    post: (callback, referrer_code, page_version, email) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    let body = 'referrer_code=' + referrer_code + '&page_version=' + page_version + '&email=' + email
    console.log('POST ' + resource)
    console.log(body)

    fetch(resource, {
      method: 'post',
      body: body,
      headers: authHeaders
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

export default users_queue_email