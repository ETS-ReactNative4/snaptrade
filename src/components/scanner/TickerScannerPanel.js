import React, { Component } from 'react';
import TickerScannerPanelUI from './TickerScannerPanelUI.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import tickers_scanner from '../../apiclient/tickers/tickers_scanner.js';
import tickers_scannertags from '../../apiclient/tickers/tickers_scannertags.js';
import scanner_tags from '../../apiclient/tickers/scanner_tags.js';
import signals_tickers from '../../apiclient/signals_tickers.js';

class TickerScannerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList : null,
      filteredTickerList : null,
      // values passed to apis
      sectorId : null,
      PEId : '',
      MarketCapId : null,
      PriceId : null,
      PriceLevelId : null,
      // values in ui
      selectedSectorId : null,
      selectedMarketCapId : null,
      selectedPEId : null,
      selectedPriceId : null,
      selectedPriceLevelId : null,
      selected3daysTrendId : null,
      trend : 'bullish',

      tagObjList_scanner : [{}],
      filteringTagObj_scanner : null,
    };

    this.getTickersCallback = this.getTickersCallback.bind(this);

    this.handleRowTickerClick = this.handleRowTickerClick.bind(this);
    this.handleRowTickerClickCallback = this.handleRowTickerClickCallback.bind(this);
    this.handleRowWatchClick = this.handleRowWatchClick.bind(this);
    this.handleRowWatchClickCallback = this.handleRowWatchClickCallback.bind(this);
    // filters
    this.handleSectorChange = this.handleSectorChange.bind(this);
    this.handleMarketCapChange = this.handleMarketCapChange.bind(this);
    this.handlePEChange = this.handlePEChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handlePriceLevelChange = this.handlePriceLevelChange.bind(this);
    this.handle3daysTrendChange = this.handle3daysTrendChange.bind(this);

    this.getScannerTagsCallback = this.getScannerTagsCallback.bind(this);
    this.handleFilterByTagClick_scanner = this.handleFilterByTagClick_scanner.bind(this);
  }

  render() {
    return (
        <TickerScannerPanelUI
          context={this.props.context}
          anonymous={this.props.anonymous}
          tickerList={this.state.filteredTickerList}
          onRowTickerClick={this.handleRowTickerClick}
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
          onSectorChange={this.handleSectorChange}
          // market cap filter
          selectedMarketCapId={this.state.selectedMarketCapId}
          onMarketCapChange={this.handleMarketCapChange}
          // PE filter
          selectedPEId={this.state.selectedPEId}
          onPEChange={this.handlePEChange}
          //Price filter
          selectedId={this.state.selectedId}
          onPriceChange={this.handlePriceChange}
          //Price Level filter
          selectedPriceLevelId={this.state.selectedPriceLevelId}
          onPriceLevelChange={this.handlePriceLevelChange}
          //3days Trend filter
          selected3daysTrendId={this.state.selected3daysTrendId}
          on3daysTrendChange={this.handle3daysTrendChange}

          filteringTagObj_scanner={this.state.filteringTagObj_scanner}
          tagObjList_scanner={this.state.tagObjList_scanner}
          onFilterByTagClick_scanner={this.handleFilterByTagClick_scanner}
        />
      );
    }

  componentWillReceiveProps(props) {
      this.setState({showHelp: props.context.showHelp});
  }

  componentWillUnMount() {
    this.props.context.showHelp = false;
  }

  componentWillMount() {
    this.props.context.showHelp = false;
    if (this.props.tag)
    {
     this.setState({
      filteringTagObj_scanner: this.props.tag
     });
      tickers_scannertags.get(this.getTickersCallback, this.props.tag)
    }
    else
      tickers_scanner.get(this.getTickersCallback)
    scanner_tags.get(this.getScannerTagsCallback)
  }

  getScannerTagsCallback(json) {
    this.setState({tagObjList_scanner: json})
  }

  handleFilterByTagClick_scanner(event) {
    event.preventDefault()
    let tag = event.target.getAttribute('data-tag');
    this.setState({
      filteringTagObj_scanner: tag,
      tickerList: null,
      filteredTickerList: null
    });
    tickers_scannertags.get(this.getTickersCallback, tag)
  }

  getTickersCallback(tickerList) {
    tickerList.forEach((ticker) => {
      // ticker.is_in_watchlist = 0;
    })
    this.setState({
      tickerList: tickerList,
      filteredTickerList: tickerList,
    });
  }

  handleRowTickerClick(event) {
    // without preventDefault the panel collapses
    event.preventDefault()
    console.log(event.target)
    let ticker = event.target.getAttribute('data-ticker')
    console.log(ticker)

    if (this.removeSignalListIfPresent(ticker)) {
      console.log('removed')
      return;
    }

    signals_tickers.get(this.handleRowTickerClickCallback, ticker)
  }

  handleRowTickerClickCallback(signalList, selectedTicker, id) {
    let tickerList = this.state.filteredTickerList;
    console.log(selectedTicker);
    tickerList.forEach((ticker) => {
      if (ticker.ticker === selectedTicker) {
        console.log('here');
        ticker.signalList = signalList
      }
    })
    this.setState({filteredTickerList: tickerList});
  }

  removeSignalListIfPresent(origTicker) {
    let tickerList = this.state.tickerList;
    let filteredTickerList = this.state.filteredTickerList;
    let removedCurrentTicker = false
    tickerList.forEach((ticker) => {
      if (ticker.signalList) {
        delete ticker.signalList
        delete ticker.stockData
        delete ticker.tickerInfo
        this.setState({filteredTickerList: tickerList});
        if (ticker.ticker === origTicker)
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
    let tickerList = this.state.tickerList;
    let filteredTickerList = this.state.filteredTickerList;
    tickerList.forEach((signal) => {
      if (signal.ticker === ticker) {
        // signal.is_in_watchlist = 1
      }
    })
    filteredTickerList.forEach((signal) => {
      if (signal.ticker === ticker) {
        // signal.is_in_watchlist = 1
      }
    })
    this.setState({
      tickerList : tickerList,
      filteredTickerList: filteredTickerList
    });
  }

  handle3daysTrendChange(event) {
    event.preventDefault();
    console.log('selected3daysTrendId', event.target.value)
    this.setState({
      selected3daysTrendId: event.target.value,
    });

    this.filterAll(event.target.value, this.state.selectedPEId, this.state.PEId, this.state.selectedMarketCapId, this.state.MarketCapId, this.state.sectorId, this.state.selectedPriceId,this.state.PriceId,this.state.selectedPriceLevelId,this.state.PriceLevelId);

  }

  handlePEChange(event) {
    event.preventDefault();
    console.log('selectedPEId', event.target.value)
    let PEId = event.target.value === '-1' ? null : event.target.value;
    this.setState({
      selectedPEId: event.target.value,
      PEId: PEId,
    });
     this.filterAll(this.state.selected3daysTrendId, event.target.value, PEId, this.state.selectedMarketCapId, this.state.MarketCapId, this.state.sectorId, this.state.selectedPriceId,this.state.PriceId,this.state.selectedPriceLevelId,this.state.PriceLevelId);
  }

  handleMarketCapChange(event) {
    event.preventDefault();
    console.log('selectedMarketCapId', event.target.value)
    let MarketCapId = event.target.value === '-1' ? null : event.target.value;
    this.setState({
      selectedMarketCapId: event.target.value,
      MarketCapId: MarketCapId,
    });
    this.filterAll(this.state.selected3daysTrendId, this.state.selectedPEId, this.state.PEId, event.target.value, MarketCapId, this.state.sectorId, this.state.selectedPriceId,this.state.PriceId,this.state.selectedPriceLevelId,this.state.PriceLevelId);
  }

  handleSectorChange(event) {
    event.preventDefault();
    console.log('selectedSectorId', event.target.value)
    let sectorId = event.target.value === '-1' ? null : parseInt(event.target.value);
    this.setState({
      sectorId : sectorId,
      selectedSectorId: event.target.value,
    });
    this.filterAll(this.state.selected3daysTrendId, this.state.selectedPEId, this.state.PEId, this.state.selectedMarketCapId, this.state.MarketCapId, sectorId, this.state.selectedPriceId,this.state.PriceId,this.state.selectedPriceLevelId,this.state.PriceLevelId);
  }

  handlePriceChange(event) {
    event.preventDefault();
    let PriceId = event.target.value === '-1' ? null : event.target.value;
    this.setState({
      selectedPriceId: event.target.value,
      PriceId: PriceId,
    });
    console.log('selectedPriceId', event.target.value)
   this.filterAll(this.state.selected3daysTrendId, this.state.selectedPEId, this.state.PEId, this.state.selectedMarketCapId, this.state.MarketCapId, this.state.sectorId, event.target.value, PriceId,this.state.selectedPriceLevelId,this.state.PriceLevelId);

  }

  handlePriceLevelChange(event) {
    event.preventDefault();
    console.log('selectedPriceLevelId', event.target.value)
    let PriceLevelId = event.target.value === '-1' ? null : event.target.value;
    this.setState({
      selectedPriceLevelId: event.target.value,
      PriceLevelId: PriceLevelId,
    });
    this.filterAll(this.state.selected3daysTrendId, this.state.selectedPEId, this.state.PEId, this.state.selectedMarketCapId, this.state.MarketCapId, this.state.sectorId, this.state.selectedPriceId,this.state.PriceId, event.target.value, PriceLevelId);

  }

  filterAll(three_days_trend_bucket, PE_bucket, PEId, market_cap_bucket, MarketCapId, sectorId, price_bucket, PriceId, price_level_bucket, PriceLevelId) {

    let tickerList = this.state.tickerList;
    let filteredTickerList = [];

    tickerList.forEach((ticker) => {
      if (ticker.sector_id === sectorId || sectorId === null) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
        tickerList = filteredTickerList;
      }
    })
    console.log(tickerList);


if(three_days_trend_bucket != null) {
 filteredTickerList = [];
  if(three_days_trend_bucket == 'Rising') {
    tickerList.forEach((ticker) => {
      if (ticker.price_pct_increase_over_3days >= 0 ) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
  }
  else if(three_days_trend_bucket == 'Falling') {
    tickerList.forEach((ticker) => {
      if (ticker.price_pct_increase_over_3days < 0 ) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
  }
  else {
    tickerList.forEach((ticker) => {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
    })
  }
  tickerList = filteredTickerList;
  console.log(tickerList);
}

 if(PE_bucket !== null) {
   filteredTickerList = [];
      tickerList.forEach((ticker) => {
      if (ticker.PE_bucket === PE_bucket || PEId === null) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
   tickerList = filteredTickerList;
   console.log(tickerList);
 }

  if(market_cap_bucket != null) {
     filteredTickerList = [];
      tickerList.forEach((ticker) => {
      if (ticker.market_cap_bucket === market_cap_bucket || MarketCapId === null) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
    tickerList = filteredTickerList;
    console.log(tickerList);
 }

 if(price_bucket != null) {
   filteredTickerList = [];
    tickerList.forEach((ticker) => {
      if (ticker.price_bucket === price_bucket || PriceId === null) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
    tickerList = filteredTickerList;
    console.log(tickerList);
 }

 if(price_level_bucket != null) {
   filteredTickerList = [];
    tickerList.forEach((ticker) => {
      if (ticker.price_level_bucket === price_level_bucket || PriceLevelId === null) {
        console.log(ticker.comp_name);
        filteredTickerList.push(ticker)
      }
    })
    tickerList = filteredTickerList;
    console.log(tickerList);
 }
    this.setState({filteredTickerList: filteredTickerList});
  }

}

export default TickerScannerPanel;
