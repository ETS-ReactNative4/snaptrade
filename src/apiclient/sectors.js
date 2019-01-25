import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/sectors';

const sectors = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/sectors', json);
      callback(json)
    })
  },
}

export default sectors
