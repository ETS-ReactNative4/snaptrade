import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/portfolio';

const watchlist_portfolio = {
    get: (callback, tagUuid, type) => {
        let accessToken = localStorage.getItem("accessToken");
        fetch(resource, {
            headers: {
                "Authorization" : "Bearer " + accessToken
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(resource, json);
                callback(json, tagUuid, type)
            })
    },
}

export default watchlist_portfolio
