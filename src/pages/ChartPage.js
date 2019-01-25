import React, { Component } from 'react';
import ChartPageUI from './ChartPageUI.js';
import { withRouter } from 'react-router';

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ChartPageUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        ticker={this.props.match.params.ticker}
      />
    );
  }
}

export default withRouter(ChartPage);
