import Constants from '../components/common/Constants.js';

// const resource = Constants.API_URL + '/signals/tickers';
const resource = Constants.API_URL + '/signals';

const signals_tickers = {
  get: (callback, ticker, ruleId, id) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '?ticker=' + ticker;
    if (ruleId)
      getResource += '&rule_id=' + ruleId;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(getResource, json);
      callback(json, ticker, id)
    })
  },
}

export default signals_tickers
