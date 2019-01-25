import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { DotLoader } from 'react-spinners';
import PanelTickerTable from '../widgets/panel/PanelTickerTable.js';
import watchlist_recommendation from '../../apiclient/watchlist/watchlist_recommendation.js';

class RecommendationPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      aggressiveList : null,
      communityList : null,
      conservativeList : null,
      dividendList : null,
      pennyList : null,
      losersList : null,
      moverList : null,
      recommnedationList : {},
    };
    this.getRecommendationCallback = this.getRecommendationCallback.bind(this);
    this.reload = this.reload.bind(this);
  }

  render() {
    return (
      <div>
        <PanelTickerTable
          context={this.props.context}
          title='Recent Earnings'
          noDataMsg='No ticker to display'
          detailLink='/scanner/recent_earnings'
          tickerList={this.state.recommnedationList['recent_earnings']}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Upcoming Earnings'
          noDataMsg='No ticker to display'
          detailLink='/scanner/upcoming_earnings'
          tickerList={this.state.recommnedationList['upcoming_earnings']}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Community'
          noDataMsg='No ticker to display'
          detailLink='/scanner/community'
          tickerList={this.state.communityList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Top Movers'
          noDataMsg='No ticker to display'
          tickerList={this.state.moverList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Top Losers'
          noDataMsg='No ticker to display'
          tickerList={this.state.losersList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Conservative'
          noDataMsg='No ticker to display'
          detailLink='/scanner/high_gainer_conservative'
          tickerList={this.state.conservativeList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Dividend'
          noDataMsg='No ticker to display'
          detailLink='/scanner/dividend_paying'
          tickerList={this.state.dividendList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='Penny Stocks'
          noDataMsg='No ticker to display'
          detailLink='/scanner/high_gainer_penny_stocks'
          tickerList={this.state.pennyList}
        />
        <PanelTickerTable
          context={this.props.context}
          title='52 Week High'
          noDataMsg='No ticker to display'
          detailLink='/scanner/52_weeks_high'
          tickerList={this.state.recommnedationList['52_weeks_high']}
        />
        <PanelTickerTable
          context={this.props.context}
          title='52 Week Low'
          noDataMsg='No ticker to display'
          detailLink='/scanner/52_weeks_low'
          tickerList={this.state.recommnedationList['52_weeks_low']}
        />
      </div>
    );
  }

  /*
  componentWillReceiveProps(props) {
    if (props.context && 'watchList' in this.props.context) {
      watchlist_recommendation.get(this.getRecommendationCallback)
    }
  }
  */

  componentWillMount() {
    watchlist_recommendation.get(this.getRecommendationCallback)
  }

  getRecommendationCallback(recommnedationList) {
    if ('watchList' in this.props.context) {
      let watchList = this.props.context.watchList
      for (var key in recommnedationList) {
        if (!recommnedationList.hasOwnProperty(key)) continue
        let tickerList = recommnedationList[key]
        if (!Array.isArray(tickerList)) continue
        tickerList.map((ticker) => {
          watchList && watchList.map((watch) => {
            if (watch.ticker === ticker.ticker)
              ticker.is_in_watchlist = true
          })
        })
      }
    }
    this.setState({
      aggressiveList: recommnedationList.aggressive,
      communityList : recommnedationList.community,
      conservativeList : recommnedationList.conservative,
      dividendList : recommnedationList.dividend,
      pennyList : recommnedationList.rows_aggressive_penny,
      losersList : recommnedationList.top_losers,
      moverList : recommnedationList.top_movers,
      recommnedationList : recommnedationList,
      isLoading : false
    });
    // setTimeout(this.reload, 5000*60)
  }

  reload() {
    watchlist_recommendation.get(this.getRecommendationCallback)
  }

}

const loaderCont = {
  height : '320px',
  padding : '60px',
  margin : 'auto'
}


export default withRouter(RecommendationPanel);
