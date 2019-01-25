import React, { Component } from 'react';
import Chart2PanelUI from './Chart2PanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class Chart2Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceList : null,
    };

    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
  }

  render() {
    return (
      <Chart2PanelUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        options={options}
      />
    );
  }

  componentWillMount() {
    chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '1y');
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let priceListAsc = priceList.slice();
    if (selectedPeriod === '1y')
      priceListAsc = priceList.slice().reverse();
    let newArray = priceListAsc.map(price => (
      [Date.parse(price.date), price.open, price.high, price.low, price.close])
    )
    console.log(newArray);

    options.series = [
      {
        name: ticker,
        data: [],
        tooltip: {
            valueDecimals: 2
        },
        type: 'candlestick',
      },
    ];

    options.series[0].data = newArray;

    this.setState({
      priceList : priceList,
    });
  }

}

const options = {
  rangeSelector: {
      enabled:false
    },
    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    chart: {
      height: '420px'
    },
    plotOptions: {
        candlestick: {
            color: '#f44',
            upColor: '#4f4',
            upLineColor: '#888'
        }
    },
    series: [{
        name: '',
        type: 'candlestick',
        data: [],
        tooltip: {
            valueDecimals: 2
        }
    }],

    yAxis: [
      {
        title: {
          text: ''
        },
        labels1: {
          formatter: function () {
              if(this.value > 1000000000){
                  return (this.value / 1000000000).toFixed(1) + "B";
              }else if(this.value > 1000000){
                  return (this.value / 1000000).toFixed(1) + "M";
              } else {
                  return (this.value);
              }
          }
        },
      },
    ]
}

export default Chart2Panel;
