import React, { Component } from 'react';
import { withRouter } from 'react-router';
import LiveQuotePanelUI from './LiveQuotePanelUI.js';
import contest_portfolio from '../../apiclient/portfolio/contest_portfolio.js';
import contest_portfolio_txns from '../../apiclient/portfolio/contest_portfolio_txns.js';
import data_point from '../../apiclient/intrinio/data_point.js';

class LiveQuotePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      summary : null,
      tickerList : [],
    };
    this.getContestPortfolioCallback = this.getContestPortfolioCallback.bind(this);
    this.getContestPortfolioTxnsCallback = this.getContestPortfolioTxnsCallback.bind(this);
    this.getDataPointCallback = this.getDataPointCallback.bind(this);
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.handleTickerUnfold = this.handleTickerUnfold.bind(this)
    this.handleTickerFold = this.handleTickerFold.bind(this)
  }

  render() {
    return (
      <LiveQuotePanelUI
        tickerList={this.state.tickerList}
        onTickerFold={this.handleTickerFold}
        onTickerUnfold={this.handleTickerUnfold}
      />
    );
  }

  componentWillMount() {
    contest_portfolio.get(this.getContestPortfolioCallback)
    // setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    contest_portfolio.get(this.getContestPortfolioCallback)
  }

  getContestPortfolioCallback(portfolio) {
    if (!portfolio.detail) {
      // this.props.history.push('/contest/a')
      return;
    }
    portfolio.detail.map((ticker) => {
      ticker.folded = true;
    })
    this.setState({
      isLoading : false,
      summary : portfolio.summary,
      tickerList : portfolio.detail
    })
    contest_portfolio_txns.get(this.getContestPortfolioTxnsCallback)

    let tickerList = portfolio.detail.map(obj => obj.ticker).join(',')
    console.log(tickerList);
    data_point.get(this.getDataPointCallback, tickerList)
  }

  handleTickerUnfold(event) {
    event.preventDefault()
    let selectedTicker = event.target.getAttribute('data-id')
    let tickerList = this.state.tickerList;
    tickerList.map((ticker) => {
        ticker.folded = ticker.ticker !== selectedTicker;
    })
    this.setState({tickerList: tickerList})
  }

  handleTickerFold(event) {
    event.preventDefault()
    let tickerList = this.state.tickerList;
    tickerList.map((ticker) => {
      ticker.folded = true;
    })
    this.setState({tickerList: tickerList})
  }

  handlePortfolioChange() {
    contest_portfolio.get(this.getContestPortfolioCallback)
  }

  getDataPointCallback(stockList) {
    let stockMap = {};
    stockList.data.forEach(stock => stockMap[stock.identifier] = stock.value);
    console.log(stockMap);

    let tickerList = this.state.tickerList
    tickerList.map((ticker) => {
      ticker.close = stockMap[ticker.ticker];
      // ticker.close_formatted = stockMap[ticker.ticker];
    })

    console.log(tickerList);
    this.setState({
      tickerList : tickerList
    })
  }

  getContestPortfolioTxnsCallback(txns) {
    let tickerList = this.state.tickerList;
    tickerList.map((ticker) => {
      txns.map((txn) => {
        if (ticker.ticker === txn.ticker) {
          if (! ticker.txnList) {
            ticker.txnList = []
          }
          ticker.txnList.push(txn);
        }
      })
    })
    this.setState(tickerList: tickerList)
  }

}

export default withRouter(LiveQuotePanel);
