import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/queue/invite';

const users_queue_invite = {
  post: (callback, email, friend_email) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + accessToken
      } :
      {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    let body = 'email=' + email + '&friend_email=' + friend_email
    console.log('POST ' + resource)
    console.log(body);

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

export default users_queue_invite
