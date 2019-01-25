import React, {Component} from 'react';
import SummaryPanelUI from './SummaryPanelUI.js';
import tickers from '../../apiclient/tickers/tickers.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';

class SummaryPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: this.props.ticker,
            tickerInfo: null,
            tickerError: null,
            details: false,
            thourslabel: "",
        };
        //Pre- and post-market trading sessions allow investors to trade stocks
        //between the hours of 4:00 a.m. and 9:30 a.m. during pre-market trading,
        //and 4:00 p.m. to 8:00 p.m. for the post-market session.
        var localTime = new Date(); //get your local time
        var utcTime = localTime.getUTCHours(); // find UTC hours
        var estTime = new Date(); // create a new date object for the EST time
        estTime.setHours(utcTime - 5); // adjust it for ET hours
        let et = estTime.getHours();
        let etm = estTime.getMinutes();
        console.log('Time is ===============>>>>>>>>>>>>>>>' + et + ':' + etm + ' ET');
        if ((et >= 4 && et < 9) || (et == 9 && etm <= 30)) {
            this.state.thourslabel = "(pre-market quote)"
        } else if (et >= 16 || et < 4) {
            this.state.thourslabel = "(after hours quote)"
        }

        this.getTickersCallback = this.getTickersCallback.bind(this);
        this.handleWatchClick = this.handleWatchClick.bind(this);
        this.handleWatchClickCallback = this.handleWatchClickCallback.bind(this);
        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.handleLessClick = this.handleLessClick.bind(this);
    }

    render() {
        return (
            <div>
                <SummaryPanelUI
                    context={this.props.context}
                    ticker={this.props.ticker}
                    tickerInfo={this.state.tickerInfo}
                    details={this.state.details}
                    onWatchClick={this.handleWatchClick}
                    onMoreClick={this.handleMoreClick}
                    onLessClick={this.handleLessClick}
                    narrow={this.props.narrow}
                    thourslabel={this.state.thourslabel}
                />
            </div>
        );
    }

    componentWillReceiveProps(props) {

        if (props.ticker !== this.state.ticker) {
            this.setState({ticker: props.ticker})
            tickers.get(this.getTickersCallback, props.ticker);
            return
        }

        // not intialized; return
        if (!this.state.tickerInfo) {
            return
        }

        let tickerInfo = this.state.tickerInfo

        if ('watchList' in props.context) {
            let watchList = props.context.watchList
            watchList && watchList.map((watch) => {
                if (watch.ticker === tickerInfo.ticker) {
                    tickerInfo.is_in_watchlist = true
                }
            })
        }


    }

    componentWillMount() {
        tickers.get(this.getTickersCallback, this.props.ticker);
    }

    getTickersCallback(json) {
        let tickerInfo = json[0]
        console.log("-------------=======TICKER INFO=======-------------")
        console.log(json)
        let watchList = this.props.context.watchList
        watchList && watchList.map((watch) => {
            if (watch.ticker === tickerInfo.ticker) {
                tickerInfo.is_in_watchlist = true
            }
        })

        this.setState({
            tickerError: null,
            tickerInfo: tickerInfo,
        })
    }

    handleWatchClick(event) {
        event.preventDefault();
        let ticker = event.target.getAttribute('data-ticker')
        console.log(ticker)
        watchlist_tickers.post(this.handleWatchClickCallback, ticker)
    }

    handleWatchClickCallback(ticker) {
        let tickerInfo = this.state.tickerInfo;
        tickerInfo.is_in_watchlist = true
        this.setState({tickerInfo: tickerInfo});
    }

    handleMoreClick(e) {
        e.preventDefault();
        this.setState({details: true})
    }

    handleLessClick(e) {
        e.preventDefault();
        this.setState({details: false})
    }


}

export default SummaryPanel;
