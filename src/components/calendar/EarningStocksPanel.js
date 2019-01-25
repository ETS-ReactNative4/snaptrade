import React, { Component } from 'react';
import EarningStocksPanelUI from './EarningStocksPanelUI.js';
import tickers_similar from '../../apiclient/tickers/tickers_similar.js';

class EarningStocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      tickerList : [],
    };
    this.getEarningStocksCallback = this.getEarningStocksCallback.bind(this);
  }

  render() {
    return (
      <div>
        <EarningStocksPanelUI
          context={this.props.context}
          tickerList={this.state.tickerList}
        />
      </div>
    );
  }

  componentWillMount() {
    tickers_similar.get(this.getEarningStocksCallback, this.props.ticker);
  }

  getEarningStocksCallback(response, ticker) {
    this.setState({ tickerList : response})
  }

}

export default EarningStocksPanel;
