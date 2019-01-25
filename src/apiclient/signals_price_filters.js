import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/signals/price_filters';

const signals_price_filters = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/signals/price_filters', json);
      callback(json)
    })
  },
}

export default signals_price_filters
