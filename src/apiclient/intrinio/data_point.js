import Constants from '../../components/common/Constants.js';

const resource = 'https://api.intrinio.com/data_point';
const USERNAME = "7bb406d16d4b7ccc5aa96899009d6382"
const PASSWORD = "a96b950f2debf63c1bcbc4b19430a165"

const data_point = {
  get: (callback, tickerlist) => {
    let getResource = resource + '?identifier=' + tickerlist + '&item=last_price ';
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: {
        "Authorization" : "Basic " + btoa(USERNAME + ':' + PASSWORD)
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json)
    })
  },
}

export default data_point
