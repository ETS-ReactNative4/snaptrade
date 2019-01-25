import React, { Component } from 'react';
import PortfolioGamePageUI from './PortfolioGamePageUI.js';
import { withRouter } from 'react-router';

class PortfolioGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestPostion: null
    };
    this.handleContestPositionChange = this.handleContestPositionChange.bind(this);
  }

  render() {
    return (
      <PortfolioGamePageUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        contestPostion={this.state.contestPostion}
        onContestPositionChange={this.handleContestPositionChange}
      />
    );
  }

    handleContestPositionChange(position) {
      this.setState({contestPostion : position})
    }
}

export default withRouter(PortfolioGamePage);
