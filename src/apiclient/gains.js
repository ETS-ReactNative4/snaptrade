import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/gains';

const gains = {
  get: (callback, ticker, sectorId, minPrice, maxPrice, minVolume, maxVolume, maxAge) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let qs = [];
    ticker && qs.push('ticker=' + ticker)
    sectorId && qs.push('sector_id=' + sectorId)
    minPrice && qs.push('min_price=' + minPrice)
    maxPrice && qs.push('max_price=' + maxPrice)
    minVolume && qs.push('min_volume=' + minVolume)
    maxVolume && qs.push('max_volume=' + maxVolume)
    maxAge && qs.push('max_age=' + maxAge)

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

export default gains
