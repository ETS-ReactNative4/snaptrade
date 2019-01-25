import React, { Component } from 'react';
import AlertPanelUI from './AlertPanelUI.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import signals from '../../apiclient/signals.js';
import signals_tickers from '../../apiclient/signals_tickers.js';

class AlertPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      signalList: null,
      trend: 'bullish',
    };

    this.getSignalsCallback = this.getSignalsCallback.bind(this);

    this.handleRowSignalClick = this.handleRowSignalClick.bind(this);
    this.handleRowSignalClickCallback = this.handleRowSignalClickCallback.bind(this);
    this.handleRowWatchClick = this.handleRowWatchClick.bind(this);
    this.handleRowWatchClickCallback = this.handleRowWatchClickCallback.bind(this);
    // trend filter
    this.handleTrendChange = this.handleTrendChange.bind(this);
  }

  render() {
    return (
      <AlertPanelUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        isLoading={this.state.isLoading}
        signalList={this.state.signalList}
        runDate={this.props.runDate}
        runTime={this.props.runTime}
        ruleList={this.props.ruleList}
        selectedRuleId={this.props.selectedRuleId}
        onRuleChange={this.props.onRuleChange}
        onRowSignalClick={this.handleRowSignalClick}
        onRowWatchClick={this.handleRowWatchClick}
        onScrollToSignUp={this.props.onScrollToSignUp}
        // price filter
        priceRangeList={this.props.priceRangeList}
        selectedPriceRangeId={this.props.selectedPriceRangeId}
        onPriceRangeChange={this.props.onPriceRangeChange}
        // volume filter
        volumeRangeList={this.props.volumeRangeList}
        selectedVolumeRangeId={this.props.selectedVolumeRangeId}
        onVolumeRangeChange={this.props.onVolumeRangeChange}
        // sector filter
        sectorList={this.props.sectorList}
        selectedSectorId={this.props.selectedSectorId}
        onSectorChange={this.props.onSectorChange}
        // trend
        trend={this.state.trend}
        onTrendChange={this.handleTrendChange}
      />
    );
  }

  componentWillMount() {
    this.props.context.showHelp = false;
  }



  componentWillReceiveProps(props) {
    this.setState({ showHelp: props.context.showHelp });
    if (!props.filtersUpdated)
      return;

    console.log("alert", props);

    signals.get(this.getSignalsCallback,
      props.ticker, props.sectorId,
      props.minPrice, props.maxPrice,
      props.minVolume, props.maxVolume,
      props.ruleId, this.state.trend)
  }

  getSignalsCallback(signalList, ticker) {
    this.setState({ signalList: signalList, isLoading: false });
  }

  handleRowSignalClick(event) {
    // without preventDefault the panel collapses
    event.preventDefault()
    console.log(event.target)
    let id = parseInt(event.target.getAttribute('data-id'))
    let ticker = event.target.getAttribute('data-ticker')
    console.log(id, ticker)

    if (this.removeSignalListIfPresent(ticker)) {
      console.log('removed')
      return;
    }

    signals_tickers.get(this.handleRowSignalClickCallback, ticker, null, id)
  }

  handleRowSignalClickCallback(oldSignalList, ticker, id) {
    let signalList = this.state.signalList;
    console.log(id);
    signalList.forEach((signal) => {
      console.log(signal.id);
      if (signal.id === id) {
        console.log('here');
        signal.signalList = oldSignalList
      }
    })
    this.setState({ signalList: signalList });
  }

  removeSignalListIfPresent(ticker) {
    let signalList = this.state.signalList;
    let removedCurrentTicker = false
    signalList.forEach((signal) => {
      if (signal.signalList) {
        delete signal.signalList
        delete signal.stockData
        delete signal.tickerInfo
        this.setState({ signalList: signalList });
        if (signal.ticker === ticker)
          removedCurrentTicker = true
      }
    })
    return removedCurrentTicker
  }

  handleRowWatchClick(event) {
    event.preventDefault()
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)
    watchlist_tickers.post(this.handleRowWatchClickCallback, ticker)
  }

  handleRowWatchClickCallback(response, ticker) {
    let signalList = this.state.signalList;
    signalList.forEach((signal) => {
      if (signal.ticker === ticker) {
        // signal.is_in_watchlist = 1
      }
    })
    this.setState({ signalList: signalList });
  }

  handleTrendChange(e) {
    console.log(e.target.value);
    this.setState({ trend: e.target.value })
    signals.get(this.getSignalsCallback,
      this.props.ticker, this.props.sectorId,
      this.props.minPrice, this.props.maxPrice,
      this.props.minVolume, this.props.maxVolume,
      null, e.target.value)
  }

}

export default AlertPanel;
