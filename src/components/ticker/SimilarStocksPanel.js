import React, { Component } from 'react';
import SimilarStocksPanelUI from './SimilarStocksPanelUI.js';
import tickers_similar from '../../apiclient/tickers/tickers_similar.js';

class SimilarStocksPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      tickerList : [],
    };
    this.getSimilarStocksCallback = this.getSimilarStocksCallback.bind(this);
  }

  render() {
    return (
      <div>
        <SimilarStocksPanelUI
          context={this.props.context}
          tickerList={this.state.tickerList}
        />
      </div>
    );
  }

  componentWillMount() {
    tickers_similar.get(this.getSimilarStocksCallback, this.props.ticker);
  }

  getSimilarStocksCallback(response, ticker) {
    this.setState({ tickerList : response})
  }

}

export default SimilarStocksPanel;
