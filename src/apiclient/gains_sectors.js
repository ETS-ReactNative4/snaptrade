import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/gains/sectors';

const gains_sectors = {
  get: (callback, sectorId, minPrice, maxPrice, minVolume, maxVolume, maxAge) => {
    let accessToken = localStorage.getItem("accessToken");
    let authHeaders = accessToken ?
      { "Authorization" : "Bearer " + accessToken } : {}

    let getResource = resource + '/' + sectorId;

    console.log('tmp logging: maxAge = ' + maxAge)
    let qs = [];
    minPrice && qs.push('min_price=' + minPrice)
    maxPrice && qs.push('max_price=' + maxPrice)
    minVolume && qs.push('min_volume=' + minVolume)
    maxVolume && qs.push('max_volume=' + maxVolume)
    maxAge && qs.push('max_age=' + maxAge)

    getResource = qs.length ? (getResource + '?' + qs.join('&')) : getResource;
    console.log('GET ' + getResource)

    fetch(getResource, {
      headers: authHeaders
    })
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('gains_sectors.length', json.length);
      callback(json)
    })
  },
}

export default gains_sectors
