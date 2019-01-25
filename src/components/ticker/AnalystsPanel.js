import React, { Component } from 'react';
import AnalystsPanelUI from './AnalystsPanelUI.js';
import tickers_analyst_ratings from '../../apiclient/tickers/tickers_analyst_ratings.js';

class AnalystsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : true,
      ticker : this.props.ticker,
      ratings : null,
      noData : false
    };
    this.getRatingsCallback = this.getRatingsCallback.bind(this);
  }

  render() {
    return (
      <div>
        <AnalystsPanelUI
          options={options}
          noData={this.state.noData}
        />
      </div>
    );
  }

  componentWillMount() {
    tickers_analyst_ratings.get(this.getRatingsCallback, this.props.ticker);
  }

  getRatingsCallback(response, ticker) {
    if (!response.analyst_rating_strong_buys && !response.analyst_rating_buys && !response.analyst_rating_holds
      && !response.analyst_rating_sells && !response.analyst_rating_strong_sells) {
      this.setState({noData : true})
      return;
    }

    let data = [
      {name : 'Strong buy', y : response.analyst_rating_strong_buys},
      {name : 'Buy', y : response.analyst_rating_buys},
      {name : 'Hold', y : response.analyst_rating_holds},
      {name : 'Sell', y : response.analyst_rating_sells},
      {name : 'Strong sell', y : response.analyst_rating_strong_sells},
    ]
    options.series[0].data = data
    this.setState({ ticker: ticker, ratings : response})
  }

}

const options = {
  chart: {
    height: 280,
    type: 'pie'
  },
  title: {
    text: null
  },
  series: [{
    data: []
  }],
  plotOptions: {
       pie: {
           dataLabels: {
               format: '{point.name}<br/>{point.y} ({point.percentage:.1f} %)',
               color: '#ddd'
           }
       }
   },
   exporting: {
     enabled: false
   }
}

export default AnalystsPanel;
