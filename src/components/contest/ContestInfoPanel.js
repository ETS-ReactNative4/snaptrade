import React, { Component } from 'react';
import ContestInfoPanelUI from './ContestInfoPanelUI.js';
import contest_info from '../../apiclient/portfolio/contest_info.js';

class ContestInfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      contestInfo : null,
    };
    this.getContestInfoCallback = this.getContestInfoCallback.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
  }

  render() {
    return (
      <ContestInfoPanelUI
        isLoading={this.state.isLoading}
        contestInfo={this.state.contestInfo}
        contestPostion={this.props.contestPostion}
      />
    );
  }

  componentWillMount() {
    contest_info.get(this.getContestInfoCallback)
    // setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    contest_info.get(this.getContestInfoCallback)
  }

  getContestInfoCallback(response) {
    this.setState({
      isLoading : false,
      contestInfo : response,
    })
  }

}

export default ContestInfoPanel;
