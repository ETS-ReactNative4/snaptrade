import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PanelTickerTableUI from './PanelTickerTableUI.js'
import signals_tickers from '../../../apiclient/signals_tickers.js';

class PanelTickerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList : null,
      watchList : [],
      // sorting
      sortColumn : '',
      sortOrder : ''
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleDetail = this.handleDetail.bind(this);
  }

  render() {
    if (this.props.isWatchlist)
      ; // console.log('111 ' + (this.state.tickerList ? this.state.tickerList.length : 0));
    return (
      <PanelTickerTableUI
        context={this.props.context}
        title={this.props.title}
        noDataMsg={this.props.noDataMsg}
        detailLink={this.props.detailLink}
        tickerList={this.state.tickerList}
        onRemoveTicker={this.props.onRemoveTicker}
        onWatchTicker={this.props.context.onWatchTicker}
        sortColumn={this.state.sortColumn}
        sortOrder={this.state.sortOrder}
        onSort={this.handleSort}
        popoverPlacement={this.props.popoverPlacement}
        wide={this.props.wide}
        anonymousMsg={this.props.anonymousMsg}
        isWatchlist={this.props.isWatchlist}
        onDetail={this.handleDetail}
        columnList={this.props.columnList}
      />
    );
  }

  componentWillReceiveProps(props) {
    if (props.isWatchlist)
      ; //console.log('222 ' + (props.tickerList ? props.tickerList.length : 0));

    // not intialized; return
    if (!props.tickerList) {
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
          ticker.is_in_watchlist = false
        })
        watchList && watchList.map((watch) => {
          if (watch.ticker === ticker.ticker)
            ticker.is_in_watchlist = true
        })
      })
    }

    this.setState({'tickerList' : props.tickerList})
  }

  componentWillMount() {
    //if (this.props.isWatchlist) {
      // console.log('333 ' + (this.props.tickerList ? this.props.tickerList.length : 0));
      this.setState({'tickerList' : this.props.tickerList})
    //}
  }

  handleSort(event) {
    event.preventDefault()
    let column = event.target.getAttribute('data-column')
    let order = event.target.getAttribute('data-order')
    if (!column)
      return;
    console.log(column, order);
    let asc = ! order || order === 'desc';
    let tickerList = this.state.tickerList;
    tickerList.sort(function(a, b) {
      switch(column) {
        case 'ticker':
          return asc ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker)
        case 'price_pct_increase_over_last_day':
          return asc ? a.price_pct_increase_over_last_day - b.price_pct_increase_over_last_day : b.price_pct_increase_over_last_day - a.price_pct_increase_over_last_day
      }
    })
    this.setState({
      tickerList : tickerList,
      sortColumn : column,
      sortOrder : (asc ? 'asc' : 'desc')
    })
  }

  handleDetail(event) {
    event.preventDefault()
    let el = event.target
    let ticker = el.getAttribute('data-ticker')
    if (!ticker) {
      el = el.parentElement
      ticker = el.getAttribute('data-ticker')
    }
    if (!ticker) {
      el = el.parentElement
      ticker = el.getAttribute('data-ticker')
    }
    if (!ticker) {
      el = el.parentElement
      ticker = el.getAttribute('data-ticker')
    }
    if (!ticker) {
      el = el.parentElement
      ticker = el.getAttribute('data-ticker')
    }
    if (!ticker) {
      el = el.parentElement
      ticker = el.getAttribute('data-ticker')
    }
    console.log(ticker);
    if (ticker) {
      this.props.history.push('/ticker/' + ticker)
    }
  }

}

export default withRouter(PanelTickerTable);
