import Constants from '../../components/common/Constants.js';

//https://api-dev.snaptrade.us
const resource = Constants.API_URL + '/login';

const login = {
  post: (callback, username, password) => {
    let body = 'username=' + username + '&password='
    console.log('POST ' + resource)
    console.log(body + '******')
    body += password

    fetch(resource, {
      method: 'post',
      body: body,
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
      }
    })
    .then((response) => {
      console.log(resource, response.status)
      return response.json()
    })
    .then((json) => {
      console.log(resource, json);
      callback(json)
    })
  },
}

export default login
