import React, { Component } from 'react';
import ChartPanelUI from './ChartPanelUI.js';
import ChartIndexComparePanelUI from './ChartIndexComparePanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class ChartIndexComparePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : this.props.ticker,
      priceList : null,
      selectedPeriod : null,
    };

    this.getTickerChartCallback = this.getTickerChartCallback.bind(this);
  }

  render() {
    return (
      <ChartIndexComparePanelUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        options={options}
        selectedPeriod={this.state.selectedPeriod}
        intraDay={this.state.intraDay}
      />
    );
  }

  componentWillMount() {
    chart_tickers.get(this.getTickerChartCallback, this.props.ticker, 'index_compare');
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let series = []
    for (var i in priceList) {
      let priceListAsc = priceList[i].prices.slice().reverse();
      let newArray = priceListAsc.map(price => ([Date.parse(price.date), price.close]))
      let color = i == 0 ? '#eee' : null
      let item = {
        name: priceList[i].ticker,
        color: color,
        data: newArray,
        tooltip: {
            valueDecimals: 2
        }
      }
      options.series[i] = item
      series.push(item)
    }
    console.log(options.series);

    this.setState({
      isLoading : false,
      options : options,
    });
  }

}

const options = {
    rangeSelector: {
        selected: 4,
        inputEnabled:false
    },

    navigator: {
        enabled: false
    },
    scrollbar: {
        enabled: false
    },
    chart: {
      height: '240px'
    },
    plotOptions: {
        series: {
            compare: 'percent',
        }
    },
    rangeSelector: {
      enabled:false
    },

    series: [{
        name: '',
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
    ],
    legend: {
      enabled: true,
      itemStyle: {
        color: '#ccc'
      },
      itemHoverStyle: {
        color: '#eee'
      },
      itemHiddenStyle: {
        color: '#666'
      }
    }
}

export default ChartIndexComparePanel;
