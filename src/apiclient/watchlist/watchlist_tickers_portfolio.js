import Constants from '../../components/common/Constants.js';

const resource = Constants.API_URL + '/watchlist/portfolio/txn';

const watchlist_tickers_portfolio = {

    get: (ticker, callback) => {
        let accessToken = localStorage.getItem("accessToken");
        let getResource = resource + "?ticker=" + ticker
        console.log('GET ' + getResource)

        fetch(getResource, {
            headers: {
                "Authorization" : "Bearer " + accessToken
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.warn('watchlist/portfolio/txn');
                callback(ticker, json)
            })
    },

    post: (callback, tag) => {
        let accessToken = localStorage.getItem("accessToken");
        let body = 'ticker=' + tag.ticker + '&price=' + tag.price + '&quantity=' + tag.quantity
        console.log('POST ' + resource)
        console.log(body)

        fetch(resource, {
            method: 'post',
            body: body,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
                "Authorization" : "Bearer " + accessToken
            }
        })
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(resource, json);
                callback(json)
            })
    },

}

export default watchlist_tickers_portfolio
