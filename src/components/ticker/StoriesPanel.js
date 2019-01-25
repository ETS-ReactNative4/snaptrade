import React, { Component } from 'react';
import StoriesPanelUI from './StoriesPanelUI';

import stories from '../../apiclient/tickers/ticker_stories';

class StoriesPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : this.props.ticker,
      storiesList: [],
    };
    this.getStoriesCallback = this.getStoriesCallback.bind(this);
  }

  render() {
    return (
      <div>
        <StoriesPanelUI
          storiesList={this.state.storiesList}
        />
      </div>
    );
  }

  componentWillMount() {
    stories.get(this.getStoriesCallback,this.props.ticker)
  }


  getStoriesCallback(storiesList){
    this.setState({
      storiesList
    })
  }

}

export default StoriesPanel;
