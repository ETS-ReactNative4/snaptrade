import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/portfolio';

const watchlist_portfolio = {
    get: (callback, tag_id, period) => {
        let accessToken = localStorage.getItem("accessToken");
        fetch(resource + "?" + "tag_id=" + tag_id + "?period=" + period, {
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                callback(json, tag_id,json)
            })
    },
}

export default watchlist_portfolio
