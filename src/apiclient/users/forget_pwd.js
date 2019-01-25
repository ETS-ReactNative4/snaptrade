import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/users/forget_pwd';

const forget_pwd = {
  post: (callback, email) => {
    let getResource = `${resource}?email=${email}`
    console.log('GET ' + resource)

    fetch(getResource, {
      method: 'get',
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

export default forget_pwd
