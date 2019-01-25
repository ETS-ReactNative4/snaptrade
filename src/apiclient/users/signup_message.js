import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/signup/message';

const signup_message = {
  get: (callback, accessToken) => {
    // let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}
    console.log('GET ' + resource)

    fetch(resource, {
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

export default signup_message
