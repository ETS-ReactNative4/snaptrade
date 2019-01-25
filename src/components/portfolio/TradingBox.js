import React, { Component } from 'react';
import TradingBoxUI from './TradingBoxUI.js';
import contest_portfolio_tickers from '../../apiclient/portfolio/contest_portfolio_tickers.js';

class TradingBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : '',
      quantity : '',
      tradingSuccess : null,
      tradingError : null
    };
    this.handleTickerEdit = this.handleTickerEdit.bind(this);
    this.handleQuantityEdit = this.handleQuantityEdit.bind(this);
    this.handleBuySubmit = this.handleBuySubmit.bind(this);
    this.handleSellSubmit = this.handleSellSubmit.bind(this);
    this.handleTradingCallback = this.handleTradingCallback.bind(this);
  }

  render() {
    return (
      <TradingBoxUI
        ticker={this.state.ticker}
        quantity={this.state.quantity}
        tradingSuccess={this.state.tradingSuccess}
        tradingError={this.state.tradingError}
        onTickerEdit={this.handleTickerEdit}
        onQuantityEdit={this.handleQuantityEdit}
        onBuySubmit={this.handleBuySubmit}
        onSellSubmit={this.handleSellSubmit}
      />
    );
  }

  handleTickerEdit(event) {
    this.setState({ticker : event.target.value.toUpperCase()})
  }

  handleQuantityEdit(event) {
    this.setState({quantity : event.target.value})
  }

  handleBuySubmit(e) {
    this.handleTradingSubmit(e, 'buy')
  }

  handleSellSubmit(e) {
    this.handleTradingSubmit(e, 'sell')
  }

  handleTradingSubmit(e, type) {
    e.preventDefault()
    let ticker = this.state.ticker.trim()
    let quantity = this.state.quantity.trim()
    if (!ticker || !quantity)
      return;
    contest_portfolio_tickers.post(
      this.handleTradingCallback, type,
      this.state.ticker, this.state.quantity
    )
  }

  handleTradingCallback(response) {
    if (response.error) {
      this.setState({
        tradingSuccess : null,
        tradingError : response.error
      })
      return;
    }

    this.setState({
      ticker : '',
      quantity : '',
      tradingSuccess : response.success,
      tradingError : null
    })

    // this.props.onPortfolioChange()
  }

}

export default TradingBox;
