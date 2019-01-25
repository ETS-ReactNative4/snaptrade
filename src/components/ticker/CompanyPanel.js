import React, { Component } from 'react';
import CompanyPanelUI from './CompanyPanelUI.js';
import tickers from '../../apiclient/tickers/tickers.js';

class CompanyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : this.props.ticker,
      tickerInfo : null,
      tickerError : null,
    };
    this.getTickersCallback = this.getTickersCallback.bind(this);
  }

  render() {
    return (
      <div>
        <CompanyPanelUI tickerInfo={this.state.tickerInfo} />
      </div>
    );
  }

  componentWillMount() {
    tickers.get(this.getTickersCallback, this.props.ticker);
  }

  getTickersCallback(json, ticker) {
    this.setState({
      isLoading : true,
      ticker : ticker,
      tickerError : null,
      tickerInfo : json[0]
    })
  }

}

export default CompanyPanel;
