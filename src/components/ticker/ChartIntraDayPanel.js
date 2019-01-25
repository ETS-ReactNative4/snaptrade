import React, { Component } from 'react';
import ChartIntraDayPanelUI from './ChartIntraDayPanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class ChartIntraDayPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      intraDay : this.props.intraDay,
      indicator : this.props.indicator,
      ticker : this.props.ticker,
      eventArray : null,
      data : null
    };

    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
  }

  render() {
    return (
      <ChartIntraDayPanelUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        options={options}
      />
    );
  }

  componentWillMount() {
    chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '7d');
  }

  // https://www.highcharts.com/docs/chart-and-series-types/technical-indicator-series
  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let priceListAsc = priceList.slice();
    let newArray = priceListAsc.map(price => ([Date.parse(price.date), price.close]))
    console.log(newArray);

    options.yAxis = [
      {
        title: {
          text: ''
        },
      }
    ]

    options.series = [
      {
        name: ticker,
        data: [],
        tooltip: { valueDecimals: 2 }
      }
    ];
    options.rangeSelector = {
      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1d'
        }, {
            type: 'day',
            count: 7,
            text: '1w'
        }
      ],
      selected: 1,
      inputEnabled: false,
    };
    options.series[0].data = newArray;
    options.colors = ['#0081f2']

    this.setState({
      isLoading : false,
    });
  }

}

const options = {

    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    chart: {
      height: '320px'
    },
    time: {
      timezoneOffset: 420
    },
    exporting: {
      enabled: false
    }

}

export default ChartIntraDayPanel;
