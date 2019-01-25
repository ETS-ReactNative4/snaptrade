import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/megaphone';

const megaphone = {
  get: (callback, location) => {
    let getResource = resource + '?location=' + location;

    console.log('GET ' + getResource)

    fetch(getResource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json)
    })
  },
}

export default megaphone
