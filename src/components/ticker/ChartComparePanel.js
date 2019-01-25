import React, { Component } from 'react';
import ChartPanelUI from './ChartPanelUI.js';
import ChartComparePanelUI from './ChartComparePanelUI.js';
import chart_tickers from '../../apiclient/chart_tickers.js';

class ChartComparePanel extends Component {
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
      <ChartComparePanelUI
        isLoading={this.state.isLoading}
        ticker={this.props.ticker}
        options={options}
        selectedPeriod={this.state.selectedPeriod}
        intraDay={this.state.intraDay}
      />
    );
  }

  componentWillMount() {
    chart_tickers.get(this.getTickerChartCallback, this.props.ticker, 'peer_compare');
  }

  getTickerChartCallback(ticker, selectedPeriod, priceList) {
    let series = []
    options.series = []
    for (var i in priceList) {
      let priceListAsc = priceList[i].prices.slice();
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
        series: {
            compare: 'percent',
        }
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
        labels: {
          format: '{value}%',
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
    },
    exporting: {
      enabled: false
    }
}

export default ChartComparePanel;
