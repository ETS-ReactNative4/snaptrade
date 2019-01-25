import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/signals/rule_filters';

const signals_rule_filters = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(resource, json);
      callback(json)
    })
  },
}

export default signals_rule_filters
