import Constants from '../components/common/Constants.js';
// gets data and time both.  any other time js function will be redundant
const resource = Constants.API_URL + '/waitlist';

const waitlist = {
  get: (callback) => {
    console.log('GET ' + resource)

    fetch(resource,)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('/waitlist', json);
      callback(json)
    })
  },
}

export default waitlist