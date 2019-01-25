import React, { Component } from 'react';
import TopNewsPanelUI from './TopNewsPanelUI.js';

import news from '../../apiclient/news/news.js';

class NewsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : this.props.ticker,
      newsList : [],
      relevance : 1
    };
    this.getNewsCallback = this.getNewsCallback.bind(this);
    this.handleRelevanceClick = this.handleRelevanceClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  render() {
    return (
      <div>
        <TopNewsPanelUI
          newsList={this.state.newsList}
          onRelevanceClick={this.handleRelevanceClick}
          onDateClick={this.handleDateClick}
          relevance={this.state.relevance}
        />
      </div>
    );
  }

  componentWillMount() {
    news.get(this.getNewsCallback, { ticker: this.props.ticker, limit: 5, relevance: 1 })
  }

  getNewsCallback(newsList) {
    this.setState({newsList: newsList,});
  }

  handleRelevanceClick(e) {
    e.preventDefault();
    this.setState({relevance: 1});
    news.get(this.getNewsCallback, { ticker: this.props.ticker, limit: 5, relevance: 1 })
  }

  handleDateClick(e) {
    e.preventDefault();
    this.setState({relevance: 0});
    news.get(this.getNewsCallback, { ticker: this.props.ticker, limit: 5, relevance: 0 })
  }

}

export default NewsPanel;
