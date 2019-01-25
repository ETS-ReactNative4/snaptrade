import Constants from '../components/common/Constants.js';

const resource = Constants.API_URL + '/signals/sectors';

const signals_sectors = {
  get: (callback, sector, minPrice, maxPrice, minVolume, maxVolume, ruleId) => {
    let getResource = resource + '/' + sector;

    let qs = [];
    minPrice && qs.push('min_price=' + minPrice)
    maxPrice && qs.push('max_price=' + maxPrice)
    minVolume && qs.push('min_volume=' + minVolume)
    maxVolume && qs.push('max_volume=' + maxVolume)
    ruleId && qs.push('rule_id=' + ruleId)

    getResource = qs.length ? (getResource + '?' + qs.join('&')) : getResource;
    console.log('GET ' + getResource)

    fetch(getResource)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log('signals_sectors.length', json.length);
      callback(json)
    })
  },
}

export default signals_sectors
