import React, { Component } from 'react';
import LiveChartPanelUI from './LiveChartPanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';
import contest_account_history from '../../apiclient/portfolio/contest_account_history.js';

class LiveChartPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
    };
    this.getAccountHistoryCallback = this.getAccountHistoryCallback.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
  }

  render() {
    return (
      <LiveChartPanelUI
        isLoading={this.state.isLoading}
        options={options}
      />
    );
  }

  componentWillMount() {
    contest_account_history.get(this.getAccountHistoryCallback);
    // setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    contest_account_history.get(this.getAccountHistoryCallback);
  }

  getAccountHistoryCallback(data) {
    let dataAsc = data.slice();
    //for (var data of dataAsc)
    //  console.log(this.d(data.date_unixtime), data.account_value);
    let newArray = dataAsc.map(value => ([value.date_unixtime*1000, value.account_value]))
    console.log(newArray);
    options.series[0].data = newArray;
    this.setState({
      isLoading : false,
      options : options
    });

/*
    options.series = [
      {
        type: 'line',
        name: '',
        data: newArray,
        tooltip: { valueDecimals: 2 }
      }
    ];
    */
  }

}

const options = {
      title: {
         text: ''
      },
      xAxis: {
          type: 'datetime',
          breaks: [{ // Nights
              from: Date.UTC(2018, 8, 9, 16),
              to: Date.UTC(2018, 8, 10, 8),
              repeat: 24 * 36e5
          }, { // Weekends
              from: Date.UTC(2018, 8, 3, 16),
              to: Date.UTC(2018, 8, 5, 8),
              repeat: 7 * 24 * 36e5
          }]
      },
      yAxis: {
        min: 0
      },
      legend: {
          enabled: false
      },
      series: [{
          type: 'line',
          name: '',
          data: [],
      }],
      time: {
        timezoneOffset: 420
      },
      yAxis: [
        {
          title: {
            text: ''
          },
        }
      ],
  };

export default LiveChartPanel;
