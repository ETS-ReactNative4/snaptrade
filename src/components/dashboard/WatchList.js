import React, { Component } from 'react';
import PanelTickerTable from '../widgets/panel/PanelTickerTable.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchList : null,
    };
  }

  render() {
    return (
      <PanelTickerTable
        context={this.props.context}
        title='Watch List'
        noDataMsg='No ticker to display'
        tickerList={this.props.context.watchList}
        onRemoveTicker={this.props.context.onRemoveTicker}
        anonymousMsg={<h4><a href='/login'>Login or sign up</a></h4>}
        detailLink='/watchlist'
        isWatchlist={true}
        popoverPlacement='left'
        columnList={new Set([])}
      />
    );
  }

  /*
  componentWillReceiveProps(props) {
    if (! 'watchList' in props.context || !props.context.watchList)
      return;
    if (this.state.watchList !== null && props.context.watchList.length === this.state.watchList.length)
      return;
    this.setState({watchList : props.context.watchList, sortColumn : null, sortOrder : null})
    // setTimeout(this.reload, 5000*60)
  }
  */
}

export default WatchList;
