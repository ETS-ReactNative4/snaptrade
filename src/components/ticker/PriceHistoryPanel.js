import React, { Component } from 'react';
import PriceHistoryPanelUI from './PriceHistoryPanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class PriceHistoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      priceList : null,
    };

    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
  }

  render() {
    return (
      <PriceHistoryPanelUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        priceList={this.state.priceList}
      />
    );
  }

  componentWillMount() {
    chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '30d');
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    this.setState({
      isLoading : false,
      priceList : priceList.reverse(),
    });
  }

}

export default PriceHistoryPanel;
