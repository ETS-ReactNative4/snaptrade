import React, { Component } from 'react';
import OthersTickersPanelUI from './OthersTickersPanelUI.js'
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import watchlist_other_tickers from '../../apiclient/watchlist/watchlist_other_tickers.js';
import signals_tickers from '../../apiclient/signals_tickers.js';

class OthersTickersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      othersTickerList : null,
    };
    this.getOthersTickersCallback = this.getOthersTickersCallback.bind(this);
  }

  render() {
    return (
      <OthersTickersPanelUI
        context={this.props.context}
        othersTickerList={this.state.othersTickerList}
      />
    );
  }

  componentWillMount() {
    watchlist_other_tickers.get(this.getOthersTickersCallback)
  }

  getOthersTickersCallback(tickers) {
    this.setState({othersTickerList: tickers})
  }

}

export default OthersTickersPanel;
