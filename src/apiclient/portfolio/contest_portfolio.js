import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/contest/portfolio';

const contest_portfolio = {

  get: (callback) => {
    let accessToken = localStorage.getItem("accessToken");
    console.log('GET ' + resource)

    fetch(resource, {
      headers: {
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

export default contest_portfolio
