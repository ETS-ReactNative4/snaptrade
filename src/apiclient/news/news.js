import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/news';

const news = {
  get: (callback, { ticker, ticker_list, filter, limit, relevance, version, earnings_date }) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let qs = [];
    ticker && qs.push('ticker=' + ticker)
    ticker_list && qs.push('ticker_list=' + ticker_list)
    relevance != null && qs.push('relevance=' + relevance)
    filter && qs.push(filter)
    limit && qs.push('limit=' + limit)
    version && qs.push('version=' + version)
    earnings_date && qs.push('earnings_date=' + earnings_date)

    let getResource = qs.length ? (resource + '?' + qs.join('&')) : resource;

    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
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

export default news
