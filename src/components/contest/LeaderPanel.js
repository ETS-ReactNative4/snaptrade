import React, { Component } from 'react';
import LeaderPanelUI from '../portfolio/LeaderPanelUI.js';
import contest_leaders from '../../apiclient/portfolio/contest_leaders.js';
import contest_portfolio from '../../apiclient/portfolio/contest_portfolio.js';
import contest_portfolio_winnings from '../../apiclient/portfolio/contest_portfolio_winnings.js'

class LeaderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      leaderList : [],
    };
    this.getContestCallback = this.getContestCallback.bind(this);
    this.getContestPortfolioWinningsCallback = this.getContestPortfolioWinningsCallback.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.handleUserUnfold = this.handleUserUnfold.bind(this);
    this.handleUserFold = this.handleUserFold.bind(this);
  }

  render() {
    return (
      <LeaderPanelUI
        isLoading={this.state.isLoading}
        leaderList={this.state.leaderList}
        onUserUnfold={this.handleUserUnfold}
        onUserFold={this.handleUserFold}
      />
    );
  }

  componentWillMount() {
    contest_leaders.get(this.getContestCallback)
    // setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    contest_leaders.get(this.getContestCallback)
  }

  getContestCallback(contest) {
    contest.map((leader, i) => {
      leader.folded = true;
    })

    this.setState({
      isLoading : false,
      leaderList : contest
    })
  }

  handleUserUnfold(event) {
    event.preventDefault()
    this.handleUserFold(event)
    let userUUid = event.target.getAttribute('data-id')
    contest_portfolio_winnings.get(this.getContestPortfolioWinningsCallback, userUUid)
  }

  handleUserFold(event) {
    event.preventDefault()
    let leaderList = this.state.leaderList;
    leaderList.map((leader) => {
      leader.folded = true;
      leader.tickerList = null;
    })
    this.setState({leaderList: leaderList})
  }

  getContestPortfolioWinningsCallback(response, userUUid) {
    let leaderList = this.state.leaderList;
    leaderList.map((leader) => {
      if (leader.uuid === userUUid) {
        leader.folded = false;
        leader.tickerList = response;
      }
    })
    this.setState({leaderList: leaderList})
  }

}

export default LeaderPanel;
