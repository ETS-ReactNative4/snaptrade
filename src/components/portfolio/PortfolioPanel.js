import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PortfolioPanelUI from './PortfolioPanelUI.js';
import contest_portfolio from '../../apiclient/portfolio/contest_portfolio.js';
import contest_portfolio_txns from '../../apiclient/portfolio/contest_portfolio_txns.js';

class PortfolioPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      summary : null,
      tickerList : [],
    };
    this.getContestPortfolioCallback = this.getContestPortfolioCallback.bind(this);
    this.getContestPortfolioTxnsCallback = this.getContestPortfolioTxnsCallback.bind(this);
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.handleTickerUnfold = this.handleTickerUnfold.bind(this)
    this.handleTickerFold = this.handleTickerFold.bind(this)
  }

  render() {
    return (
      <PortfolioPanelUI
        context={this.props.context}
        isLoading={this.state.isLoading}
        summary={this.state.summary}
        tickerList={this.state.tickerList}
        onPortfolioChange={this.handlePortfolioChange}
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
    // this.props.onContestPositionChange(portfolio.summary.contest_rank)
    contest_portfolio_txns.get(this.getContestPortfolioTxnsCallback)
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
}

export default withRouter(PortfolioPanel);
