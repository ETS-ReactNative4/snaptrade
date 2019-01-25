import React, { Component } from 'react';
import TickerTagsPanelUI from './TickerTagsPanelUI.js';
import tickers_tags from '../../apiclient/tickers/tickers_tags.js';

class TickerTagsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerTagList : []
    };
    this.getTickerTagsCallback = this.getTickerTagsCallback.bind(this);
  }

  render() {
    return (
      <div>
        <TickerTagsPanelUI tickerTagList={this.state.tickerTagList} />
      </div>
    );
  }

  componentWillMount() {
    tickers_tags.get(this.getTickerTagsCallback, this.props.ticker);
  }

  getTickerTagsCallback(json, ticker) {
    this.setState({
      tickerTagList : json,
    })
  }

}

export default TickerTagsPanel;
