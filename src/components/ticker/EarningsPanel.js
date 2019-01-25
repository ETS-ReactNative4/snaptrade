import React, { Component } from 'react';
import EarningsPanelUI from './EarningsPanelUI.js';
import tickers_fundamentals from '../../apiclient/tickers/tickers_fundamentals.js';

class EarningsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : this.props.ticker,
      ebtList : [],
      noData : false
    };
    this.getFundamentalsCallback = this.getFundamentalsCallback.bind(this);
  }

  render() {
    return (
      <div>
        <EarningsPanelUI
          ebtList={this.state.ebtList}
          options={options}
          noData={this.state.noData}
        />
      </div>
    );
  }

  componentWillMount() {
    tickers_fundamentals.get(this.getFundamentalsCallback, this.props.ticker);
  }

  getFundamentalsCallback(response, ticker) {
    // let ebtList = response.map(item => (Number(item.ebt_formatted.slice(0, -1))))
    let ebtList = response.map(item => (item.ebt))
    let epsList = response.map(item => (item.eps))
    let revList = response.map(item => (item.revenue))
    let xAxix = response.map(item => (item.qtr))

    if (!ebtList.length && !epsList.length && !revList.length) {
      this.setState({noData : true})
      return;
    }

    options.series[0].data = revList;
    options.series[1].data = ebtList;
    options.series[2].data = epsList;
    options.xAxis.categories = xAxix;
    console.log(options);
    this.setState({ ticker: ticker, ebtList : response})
  }
}

const options = {
  chart: {
    height: 320
  },
  title: {
    text: null
  },
  series: [
    {
      name: 'Revenue',
      color: '#669900',
      data: []
    },
    {
      name: 'EBT',
      color: '#00bbFF',
      data: []
    },
    {
      name: 'EPS',
      color: '#bb0099',
      yAxis: 1,
      data: []
    }
  ],
  xAxis: {
    categories: []
  },
  yAxis: [
    {
      title: {
        text: ''
      },
      labels: {
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
    { // Secondary yAxis
      title: {
          text: '',
      },
      opposite: true
    }
  ],
  legend: {
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

export default EarningsPanel;
