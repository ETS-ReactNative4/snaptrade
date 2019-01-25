import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/queue';

const users_waitlist = {

  post: (callback, email) => {
    let accessToken = localStorage.getItem("accessToken");
    
    let body = 'email=' + email 
    console.log('POST ' + resource)
    console.log(body);

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
}

export default users_waitlist
