import React, { Component } from 'react';
import MainTickerTableUI from './MainTickerTableUI.js'
import signals_tickers from '../../../apiclient/signals_tickers.js';

class MainTickerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList : null,
      watchList : [],
      // sorting
      sortColumn : '',
      sortOrder : ''
    };

    this.handleRowSignalClick = this.handleRowSignalClick.bind(this);
    this.handleRowSignalClickCallback = this.handleRowSignalClickCallback.bind(this);
    //this.handleRowWatchClick = this.handleRowWatchClick.bind(this);
    //this.handleRowWatchClickCallback = this.handleRowWatchClickCallback.bind(this);
    // sort
    this.handleSort = this.handleSort.bind(this);

    this.handleSignalExpand = this.handleSignalExpand.bind(this);
    this.handleSignalCollapse = this.handleSignalCollapse.bind(this);
  }

  render() {
    return (
      <MainTickerTableUI
        context={this.props.context}
        tickerList={this.state.tickerList}
        columnList={this.props.columnList}
        narrow={this.props.narrow}

        onRowTickerClick={this.handleRowSignalClick}
        onRefreshClick={this.props.onRefreshClick}
        // sort
        sortColumn={this.state.sortColumn}
        sortOrder={this.state.sortOrder}
        onSort={this.handleSort}
        // open/close
        onSignalExpand={this.handleSignalExpand}
        onSignalCollapse={this.handleSignalCollapse}
        // watchlist-specific
        filteringTagObj={this.props.filteringTagObj}
        embeddableTagUuid={this.props.embeddableTagUuid}
        onShowTagsModal={this.props.onShowTagsModal}
        onShowPortfolioModal={this.props.onShowPortfolioModal}
        onShowPriceQtyModal={this.props.onShowPriceQtyModal}
        onDeleteWatchlistTickerSubmit={this.props.onDeleteWatchlistTickerSubmit}
      />
    );
  }

  componentWillMount() {
    if (this.props.initialSortColumn && this.props.initialSortOrder)
      this.setState({
        sortColumn: this.props.initialSortColumn,
        sortOrder: this.props.initialSortOrder
      })
  }

  componentWillReceiveProps(props) {
    // not intialized; return
    if (!props.tickerList) {
      this.setState({'tickerList' : null}) // executed when a tag is clicked, so spinner is shown
      return
    }
    // nothing changed; return
    if (this.state.tickerList && props.tickerList.length === this.state.tickerList.length &&
      'watchList' in this.props.context && props.context.watchList.length === this.state.watchList.length)
      return;

    if ('watchList' in props.context) {
      let watchList = props.context.watchList
      props.tickerList.map((ticker) => {
        watchList && watchList.map((watch) => {
          if (watch.ticker === ticker.ticker)
            ticker.is_in_watchlist = true
        })
      })
    }

    this.setState({'tickerList' : props.tickerList})
  }

  handleRowSignalClick(event) {
    // without preventDefault the panel collapses
    event.preventDefault()
    console.log(event.target)
    let tr = event.target.closest('tr')
    let ticker = tr.getAttribute('data-ticker')
    console.log(ticker)

    if (this.removeSignalListIfPresent(ticker)) {
      console.log('removed')
      return;
    }

    signals_tickers.get(this.handleRowSignalClickCallback, ticker)
  }

  handleRowSignalClickCallback(signalList, ticker) {
    let tickerList = this.state.tickerList;
    tickerList.forEach((othersTicker) => {
      if (othersTicker.ticker === ticker) {
        othersTicker.signalList = signalList
      }
    })
    this.setState({tickerList: tickerList});
  }

  removeSignalListIfPresent(ticker) {
    let tickerList = this.state.tickerList;
    let removedCurrentTicker = false
    tickerList.forEach((othersTicker) => {
      if (othersTicker.signalList) {
        delete othersTicker.signalList
        delete othersTicker.stockData
        delete othersTicker.tickerInfo
        this.setState({tickerList: tickerList});
        if (othersTicker.ticker === ticker)
          removedCurrentTicker = true
      }
    })
    return removedCurrentTicker
  }

  handleSort(event) {
    event.preventDefault()
    console.log(event.target)
    let column = event.target.getAttribute('data-column')
    let order = event.target.getAttribute('data-order')
    console.log(column, order);
    let asc = ! order || order === 'desc';
    let tickerList = this.state.tickerList;
    tickerList.sort(function(a, b) {
      switch(column) {
        case 'ticker':
          return asc ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker)
        case 'market_cap':
          return asc ? a.market_cap - b.market_cap : b.market_cap - a.market_cap
        case 'price_to_earnings':
          return asc ? a.price_to_earnings - b.price_to_earnings : b.price_to_earnings - a.price_to_earnings
        case 'rsi_14_day':
          return asc ? a.rsi_14_day - b.rsi_14_day : b.rsi_14_day - a.rsi_14_day
        // price gains
        case 'price_pct_increase_over_last_day':
          return asc ? a.price_pct_increase_over_last_day - b.price_pct_increase_over_last_day : b.price_pct_increase_over_last_day - a.price_pct_increase_over_last_day
        case 'price_pct_increase_over_3days':
          return asc ? a.price_pct_increase_over_3days - b.price_pct_increase_over_3days : b.price_pct_increase_over_3days - a.price_pct_increase_over_3days
        case 'price_pct_increase_over_14days':
          return asc ? a.price_pct_increase_over_14days - b.price_pct_increase_over_14days : b.price_pct_increase_over_14days - a.price_pct_increase_over_14days
        case 'pct_diff_from_52weeks_high':
          return asc ? a.pct_diff_from_52weeks_high - b.pct_diff_from_52weeks_high : b.pct_diff_from_52weeks_high - a.pct_diff_from_52weeks_high
        case 'gain_percentage_from_signal_date':
          return asc ? a.gain_percentage_from_signal_date - b.gain_percentage_from_signal_date : b.gain_percentage_from_signal_date - a.gain_percentage_from_signal_date
        case 'realtime_gain_since_added_to_watchlist':
          return asc ? a.realtime_gain_since_added_to_watchlist - b.realtime_gain_since_added_to_watchlist : b.realtime_gain_since_added_to_watchlist - a.realtime_gain_since_added_to_watchlist
        // volume gains
        case 'volume':
          return asc ? a.volume - b.volume : b.volume - a.volume
        case 'volume_pct_increase_over_avg':
          return asc ? a.volume_pct_increase_over_avg - b.volume_pct_increase_over_avg : b.volume_pct_increase_over_avg - a.volume_pct_increase_over_avg
      }
    })
    this.setState({
      tickerList : tickerList,
      sortColumn : column,
      sortOrder : (asc ? 'asc' : 'desc')
    })
  }

  handleSignalExpand(event) {
    event.preventDefault();
    console.log('here');
    let signalId = event.target.getAttribute('data-signal_id');
    let tickerList = this.state.tickerList;
    tickerList.forEach((signal) => {
      if (signal.watchlist_id == signalId) {
        signal.expanded = true;
      }
    })
    this.setState({tickerList : tickerList})
  }

  handleSignalCollapse(event) {
    event.preventDefault();
    console.log('here');
    let signalId = event.target.getAttribute('data-signal_id');
    let tickerList = this.state.tickerList;
    tickerList.forEach((signal) => {
      if (signal.watchlist_id == signalId) {
        signal.expanded = false;
      }
    })
    this.setState({tickerList : tickerList})
  }

}

export default MainTickerTable;
