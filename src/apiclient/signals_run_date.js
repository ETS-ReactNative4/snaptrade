import Constants from '../components/common/Constants.js';
// gets data and time both.  any other time js function will be redundant
const resource = Constants.API_URL + '/signals/run_date_and_time';

const signals_run_date = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/signals/run_date_and_time', json);
      callback(json)
    })
  },
}

export default signals_run_date
