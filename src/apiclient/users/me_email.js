import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/me/email';

const users_me_email = {
  put: (callback, email) => {
    let body = 'email=' + email
    let accessToken = localStorage.getItem("accessToken");
    console.log('PUT ' + resource)
    console.log(body);

    fetch(resource, {
      method: 'put',
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
}

export default users_me_email
