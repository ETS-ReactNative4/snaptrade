import React, { Component } from 'react';
// import AverageAccountChartUI from './AverageAccountChartUI.js';
import contest_account_average_history from '../../apiclient/portfolio/contest_account_average_history.js';

class AverageAccountChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      accountValueList : null,
    };
    this.getAccountHistoryCallback = this.getAccountHistoryCallback.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
  }

  render() {
    return (
      <div>
      {/*
      <AverageAccountChartUI
        accountValueList={this.state.accountValueList}
      />
      */}
      </div>
    );
  }

  componentWillMount() {
    contest_account_average_history.get(this.getAccountHistoryCallback);
    // setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    contest_account_average_history.get(this.getAccountHistoryCallback);
  }

  getAccountHistoryCallback(data) {
    let dataAsc = data.slice();
    let newArray = dataAsc.map(value => ([value.portfolio_date_time_unix*1000, value.account_value]))
    console.log(newArray);
    this.setState({
      isLoading : false,
      accountValueList : newArray,
    });
  }
}

export default AverageAccountChart;
