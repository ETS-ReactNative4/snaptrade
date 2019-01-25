import React, { Component } from 'react';
import LikePanelUI from './LikePanelUI.js';
import eng_tickers from '../../apiclient/engagement/eng_tickers.js';
import eng_tickers_ratings from '../../apiclient/eng_tickers_ratings.js';

class LikePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingSummary : {},
    };
    this.getEngagementCallback = this.getEngagementCallback.bind(this);
    this.handleThumbsUp = this.handleThumbsUp.bind(this);
    this.handleThumbsDown = this.handleThumbsDown.bind(this);
    this.handleThumbsUpCallback = this.handleThumbsUpCallback.bind(this);
    this.handleThumbsDownCallback = this.handleThumbsDownCallback.bind(this);
  }

  render() {
    return (
      <LikePanelUI
        anonymous={this.props.anonymous}
        ratingSummary={this.state.ratingSummary}
        onThumbsUp={this.handleThumbsUp}
        onThumbsDown={this.handleThumbsDown}
      />
    );
  }

  componentWillMount() {
    eng_tickers.get(this.getEngagementCallback, this.props.ticker);
  }

  getEngagementCallback(engagement, ticker) {
    this.setState({
      ratingSummary : engagement.rating.summary,
    })
  }

  handleThumbsUp(event) {
    event.preventDefault();
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsUpCallback, ticker, 'up')
  }

  handleThumbsUpCallback(engagement, ticker) {
    this.setState({ratingSummary: engagement.rating.summary})
  }

  handleThumbsDown(event) {
    event.preventDefault();
    let ticker = this.props.ticker
    eng_tickers_ratings.post(this.handleThumbsDownCallback, ticker, 'down')
  }

  handleThumbsDownCallback(engagement, ticker) {
    this.setState({ratingSummary: engagement.rating.summary})
  }

}

export default LikePanel;
