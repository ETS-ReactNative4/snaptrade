import React, { Component } from 'react';
import EarningNewsPanelUI from './EarningNewsPanelUI.js';

import news from '../../apiclient/news/news.js';

class EarningNewsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : this.props.ticker,
      newsList : null,
      relevance : 1
    };
    this.getNewsCallback = this.getNewsCallback.bind(this);
    this.handleRelevanceClick = this.handleRelevanceClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  render() {
    return (
      <div>
        <EarningNewsPanelUI
          ticker={this.props.ticker}
          newsList={this.state.newsList}
          onRelevanceClick={this.handleRelevanceClick}
          onDateClick={this.handleDateClick}
          relevance={this.state.relevance}
        />
      </div>
    );
  }

  componentWillMount() {
    news.get(this.getNewsCallback, { ticker: this.props.ticker, relevance: 1 })
  }

  componentWillReceiveProps(props) {
    if (props.ticker === this.state.ticker)
      return
    this.setState({ticker: props.ticker})
    news.get(this.getNewsCallback, { ticker: props.ticker, relevance: this.state.relevance })
  }

  getNewsCallback(newsList) {
    this.setState({newsList: newsList,});
  }

  handleRelevanceClick(e) {
    e.preventDefault();
    this.setState({relevance: 1});
    news.get(this.getNewsCallback, { ticker: this.props.ticker, relevance: 1 })
  }

  handleDateClick(e) {
    e.preventDefault();
    this.setState({relevance: 0});
    news.get(this.getNewsCallback, { ticker: this.props.ticker, relevance: 0 })
  }

}

export default EarningNewsPanel;
