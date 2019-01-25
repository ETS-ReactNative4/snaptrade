import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/signals/volume_filters';

const signals_volume_filters = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/signals/volume_filters', json);
      callback(json)
    })
  },
}

export default signals_volume_filters
