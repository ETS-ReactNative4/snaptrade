import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/feedbacks';

const users_feedbacks = {
  post: (callback, page, category, message) => {
    let accessToken = localStorage.getItem("accessToken");
    let body = 'category=' + category + '&message=' + message;
    console.log('POST ' + resource)
    console.log(body)

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

export default users_feedbacks
