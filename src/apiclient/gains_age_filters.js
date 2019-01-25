import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/gains/age_filters';

const gains_age_filters = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/gains/age_filters', json);
      callback(json)
    })
  },
}

export default gains_age_filters
