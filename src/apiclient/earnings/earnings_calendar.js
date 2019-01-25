import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/earnings/calender';

const earnings_calender = {
  get: (callback, date) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + (date ? ("?date=" + date) : '')
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, date)
    })
  },
}

export default earnings_calender
