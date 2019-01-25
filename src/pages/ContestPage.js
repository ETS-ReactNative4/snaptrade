import React, { Component } from 'react';
import ContestPageUI from './ContestPageUI.js';
import { withRouter } from 'react-router';

class ContestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestPostion: null
    };
    this.handleContestPositionChange = this.handleContestPositionChange.bind(this);
  }

  render() {
    return (
      <ContestPageUI
        anonymous={this.props.anonymous}
        contestPostion={this.state.contestPostion}
        onContestPositionChange={this.handleContestPositionChange}

        justLoggedOut={this.props.justLoggedOut}
        justSignedUp={this.props.justSignedUp}
        sectorList={this.props.sectorList}
        clickedTicker={this.props.clickedTicker}
        accessToken={this.props.accessToken}
      />
    );
  }

    handleContestPositionChange(position) {
      this.setState({contestPostion : position})
    }
}

export default withRouter(ContestPage);
