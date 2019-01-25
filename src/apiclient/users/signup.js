import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/signup';

const signup = {
  post: (callback, email, username, password, invCode, referrer) => {

    let qs = [];
    qs.push('email=' + email)
    qs.push('nickname=' + username)
    invCode && qs.push('invCode=' + invCode)
    referrer && qs.push('referrer=' + referrer)
    qs.push('password=')

    let body = qs.join('&');

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

export default signup
