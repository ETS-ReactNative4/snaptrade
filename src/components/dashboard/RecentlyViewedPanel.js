import React, { Component } from 'react';
import PanelTickerTable from '../widgets/panel/PanelTickerTable.js';
import tickers_list from '../../apiclient/tickers/tickers_list.js';

class RecentlyViewedPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList : null,
    };
    this.getTickerListCallback = this.getTickerListCallback.bind(this);
    this.handleRemoveTicker = this.handleRemoveTicker.bind(this);
    this.reload = this.reload.bind(this);
  }

  render() {
    return (
      <PanelTickerTable
        context={this.props.context}
        title='Recently Viewed'
        noDataMsg='No ticker to display'
        tickerList={this.state.tickerList}
        onRemoveTicker={this.handleRemoveTicker}
        wide={this.props.wide}
        popoverPlacement='left'
        columnList={new Set(['volume_formatted', 'volume_pct_increase_over_avg', 'high'])}
      />
    );
  }

  componentWillMount() {
    let tickerListStr = localStorage.getItem("tickerList");
    if (!tickerListStr) {
      this.setState({ tickerList: [] });
      return;
    }
    tickers_list.get(this.getTickerListCallback, tickerListStr);
  }

  getTickerListCallback(json, tickerListStr) {
    let tickerList = json
    if ('watchList' in this.props.context) {
      let watchList = this.props.context.watchList
      tickerList.map((ticker) => {
        watchList && watchList.map((watch) => {
          if (watch.ticker === ticker.ticker)
            ticker.is_in_watchlist = true
        })
      })
    }
    console.log('recently viewed', tickerList);
    this.setState({
      tickerList: tickerList,
    });
    // setTimeout(this.reload, 5000*60)
  }

  reload() {
    let tickerListStr = localStorage.getItem("tickerList");
    tickers_list.get(this.getTickerListCallback, tickerListStr);
  }

  handleRemoveTicker(event) {
    event.preventDefault();
    event.stopPropagation();
    let ticker = event.target.getAttribute('data-ticker')

    let tickerListStr = localStorage.getItem("tickerList");
    if (!tickerListStr) {
      this.setState({ tickerList: [] });
      return;
    }
    //console.log(tickerListStr)

    let tickerArray = tickerListStr.split(',');
    let index = -1;
    for (var i = 0; i < tickerArray.length; i++) {
      if (tickerArray[i].toLowerCase() == ticker.toLowerCase())
        index = i;
    }

    if (index > -1)
      tickerArray.splice(index, 1);

    //console.log(tickerArray.join(','));
    localStorage.setItem("tickerList", tickerArray.join(','));
    if (tickerArray.length > 0)
      tickers_list.get(this.getTickerListCallback, tickerArray.join(','));
    else
      this.setState({ tickerList: [] });
  }

}

export default RecentlyViewedPanel;
