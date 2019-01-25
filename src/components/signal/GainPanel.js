import React, { Component } from 'react';
import GainPanelUI from './GainPanelUI.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import gains from '../../apiclient/gains.js';
import signals_tickers from '../../apiclient/signals_tickers.js';
import gains_tickers from '../../apiclient/gains_tickers.js';
import gains_sectors from '../../apiclient/gains_sectors.js';

/**
 * title
 */
class GainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      gainList: null,
    };
    this.getGainsCallback = this.getGainsCallback.bind(this);
    this.getTickersCallback = this.getTickersCallback.bind(this);
    this.getTickerSignalsCallback = this.getTickerSignalsCallback.bind(this);
    // this.getTickerChartCallback = this.getTickerChartCallback.bind(this);

    this.handleRowSignalClick = this.handleRowSignalClick.bind(this);
    this.handleRowSignalClickCallback = this.handleRowSignalClickCallback.bind(this);
    this.handleRowWatchClick = this.handleRowWatchClick.bind(this);
    this.handleRowWatchClickCallback = this.handleRowWatchClickCallback.bind(this);
  }

  /* https://codereviewvideos.com/course/pagination-filtering-and-sorting/video/react-pagination-part-1 */
  render() {
    return (
      <GainPanelUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        isLoading={this.state.isLoading}
        gainList={this.state.gainList}
        runDate={this.props.runDate}
        runTime={this.props.runTime}

        ageRangeList={this.props.ageRangeList}
        selectedAgeRangeId={this.props.selectedAgeRangeId}

        onAgeRangeChange={this.props.onAgeRangeChange}
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
      />
    );
  }

  componentWillReceiveProps(props) {
    if (!props.filtersUpdated)
      return;

    console.log("gains", props);

    gains.get(this.getGainsCallback,
      props.ticker, props.sectorId,
      props.minPrice, props.maxPrice,
      props.minVolume, props.maxVolume,
      props.maxAge)

    return;

    if (props.ticker) {
      gains_tickers.get(this.getGainsCallback, props.ticker, props.maxAge);
      return;
    }

    if (props.selectedSectorId !== -1) {
      gains_sectors.get(this.getGainsCallback, props.selectedSectorId,
        props.minPrice, props.maxPrice,
        props.minVolume, props.maxVolume,
        props.maxAge)
      return;
    }

    gains.get(this.getGainsCallback, props.minPrice, props.maxPrice,
      props.minVolume, props.maxVolume, props.maxAge)
  }

  getGainsCallback(gainList) {
    this.setState({gainList: gainList, isLoading: false});
  }

  handleRowSignalClick(event) {
    // without preventDefault the panel collapses
    event.preventDefault()
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)

    if (this.removeSignalListIfPresent(ticker)) {
      console.log('removed')
      return;
    }

    signals_tickers.get(this.handleRowSignalClickCallback, ticker)

    /*
    const url = Constants. A P I_URL + '/signals/tickers/' + ticker
    console.log(url)
    fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json);
      this.addSignalList(json, ticker)
    });
    */
  }

  handleRowSignalClickCallback(signalList, ticker) {
    let gainList = this.state.gainList;
    gainList.forEach((gain) => {
      if (gain.ticker === ticker) {
        gain.signalList = signalList
      }
    })
    this.setState({gainList: gainList});
  }

  getTickersCallback(json, ticker) {
    let gainList = this.state.gainList;
    gainList.forEach((gain) => {
      if (gain.ticker === ticker) {
        gain.tickerInfo = json[0]
      }
    })
    this.setState({gainList: gainList});
  }

   getTickerSignalsCallback(json, ticker) {
    let gainList = this.state.gainList;
    gainList.forEach((gain) => {
      if (gain.ticker === ticker) {
        gain.signalList = json
      }
    })
    this.setState({gainList: gainList});
  }

  /*
  getTickerChartCallback(json, ticker) {
    var dataTable = anychart.data.table('date');
    dataTable.addData(json);

    var stockData = anychart.stock();
    var firstPlot = stockData.plot(0);
    firstPlot.area(dataTable.mapAs({'value': 'close'})).name(ticker);
    stockData.scroller().area(dataTable.mapAs({'value': 'volume'}));

    let gainList = this.state.gainList;
    gainList.forEach((gain) => {
      if (gain.ticker === ticker) {
        gain.stockData = json
      }
    })
    this.setState({gainList: gainList});
  }
  */

  handleRowWatchClick(event) {
    event.preventDefault()
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)
    watchlist_tickers.post(this.handleRowWatchClickCallback, ticker)
  }

  handleRowWatchClickCallback(response, ticker) {
    let gainList = this.state.gainList;
    gainList.forEach((gain) => {
      if (gain.ticker === ticker) {
        // gain.is_in_watchlist = 1
      }
    })
    this.setState({gainList : gainList});
  }

  removeSignalListIfPresent(ticker) {
    let gainList = this.state.gainList;
    let removedCurrentTicker = false
    gainList.forEach((gain) => {
      if (gain.signalList) {
        delete gain.signalList
        delete gain.stockData
        delete gain.tickerInfo
        this.setState({gainList: gainList});
        if (gain.ticker === ticker)
          removedCurrentTicker = true
      }
    })
    return removedCurrentTicker
  }

}

export default GainPanel;
