import React, { Component } from 'react';
import StockPageUI from './StockPageUI.js';
import { withRouter } from 'react-router';

class StockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : null,
    };
  }

  render() {
    return (
      <StockPageUI
        anonymous={this.props.anonymous}
        justLoggedOut={this.props.justLoggedOut}
        justSignedUp={this.props.justSignedUp}
        sectorList={this.props.sectorList}
        clickedTicker={this.props.clickedTicker}
        onLogin={this.props.onLogin}
        onSignUp={this.props.onSignUp}
        accessToken={this.props.accessToken}

        ticker={this.props.match.params.ticker}
      />
    );
  }

}

export default withRouter(StockPage);
