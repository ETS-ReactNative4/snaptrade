import React, { Component } from 'react';
import AdvancedChartModalUI from './AdvancedChartModalUI.js';
import users_feedbacks from '../../apiclient/users/users_feedbacks.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class AdvancedChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      priceList : null,
    };
    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
  }

  render() {
    return (
      <AdvancedChartModalUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        options={options}
        showChartModal={this.props.showChartModal}
        onHideChartModal={this.props.onHideChartModal}
      />
    );
  }

  componentWillMount() {
    // chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '1y');
  }

  componentWillReceiveProps(props) {
    if (props.showChartModal) {
      console.log('here');
      chart_tickers.get(this.getTickerChartCallback, this.props.ticker, '90d');
    }
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let priceListAsc = priceList.slice();
    if (selectedPeriod === '1y')
      priceListAsc = priceList.slice().reverse();
    //let newArray = priceListAsc.map(price => (
    //  [Date.parse(price.date), price.open, price.high, price.low, price.close])
    //)
    let newArray = priceListAsc.map(price => (
      [Date.parse(price.date), price.open, price.high, price.low, price.close])
    )
    console.log(newArray);
    console.log(options);
    // somehow options.series becomes null after first call in watchlist
    options.series = [{
        name: ticker,
        type: 'candlestick',
        data: [],
        tooltip: {
            valueDecimals: 2
        }
    }];

    options.series[0].data = newArray;

    this.setState({
      isLoading : false,
      priceList : priceList,
      options : options,
      selectedPeriod : selectedPeriod,
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

export default AdvancedChartModal;
