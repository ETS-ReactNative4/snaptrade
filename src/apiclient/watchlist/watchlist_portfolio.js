import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/portfolio';

const watchlist_portfolio = {
    get: (callback, tag_id) => {
        let accessToken = localStorage.getItem("accessToken");
        fetch(resource + "?" +  "tag_id=" + tag_id, {
            headers: {
                "Authorization" : "Bearer " + accessToken
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(resource, json);
                callback(json, tag_id, )
            })
    },
}

export default watchlist_portfolio
