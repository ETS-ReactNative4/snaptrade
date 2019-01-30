import React, { Component } from 'react';
import PriceAlertPanelUI from './PriceAlertPanelUI.js';
import watchlist_alert_ticker from '../../apiclient/watchlist/watchlist_alert_ticker.js';
import watchlist_alert_tickers from '../../apiclient/watchlist/watchlist_alert_tickers.js'

class PriceAlertPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: '',
      isChecked: '',
      ticker: '',
      buyprice: '',
      sellprice: '',
        tickerList:[],
      tradetype: '',
      errorMessage: '',
      isLoading: '',
      successMessage: '',
      alertList: null
    };

    this.handletoggleChange = this.handletoggleChange.bind(this);
    this.handleBuyPrice = this.handleBuyPrice.bind(this);
    this.handleSellPrice = this.handleSellPrice.bind(this);
    this.handleTradeType = this.handleTradeType.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.publishCallBack = this.publishCallBack.bind(this);
    this.watchlistAlertTickersCallback = this.watchlistAlertTickersCallback.bind(this)
    this.handleRemoveAlert = this.handleRemoveAlert.bind(this)
    this.removeAlertCallback = this.removeAlertCallback.bind(this)
  }

  render() {

    return (
      <PriceAlertPanelUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        toggleChange={this.handletoggleChange}
        tickerList={this.state.tickerList}
        isChecked={this.state.isChecked}
        onBuyPriceEdit={this.handleBuyPrice}
        onSellPriceEdit={this.handleSellPrice}
        onTradeTypeEdit={this.handleTradeType}
        onPublish={this.handlePublish}
        errorMessage={this.state.errorMessage}
        successMessage={this.state.successMessage}
        tickerInfo={this.props.tickerInfo}
        alertList={this.state.alertList}
        onRemoveAlert={this.handleRemoveAlert}
       />
    );
  }

  componentWillMount() {
    if (!this.props.context.anonymous) {
      watchlist_alert_tickers.get(this.watchlistAlertTickersCallback)
    }
  }

  componentWillReceiveProps(props) {
    console.log(props.ticker);
    this.setState({ticker: props.ticker});
  }


 handleBuyPrice(e) {
    console.log(e.target.value)
    this.setState({ buyprice: e.target.value });
  }

  handleSellPrice(e) {
  	console.log(e.target.value)
    this.setState({ sellprice: e.target.value });
  }

  handleTradeType(e){
  	console.log(e.target.value)
    this.setState({ tradetype: e.target.value });
  }

  handletoggleChange(e){
  	this.setState({ isChecked: !this.state.isChecked });

  	if(this.state.isChecked=='' || this.state.isChecked==false)
  	{
  		this.state.check='1';
  	}
  	else
  	{
  		this.state.check='0';
  	}

  	console.log(this.state.check);
  }

  handlePublish(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }

    console.log(e.target.value);
    this.setState({errorMessage: '', isLoading: true});
    watchlist_alert_ticker.post(this.publishCallBack, this.state.ticker, this.state.buyprice, this.state.sellprice);
  }

 publishCallBack(response){
  console.log(response);
  this.setState({successMessage: response.success, errorMessage: response.error})
  watchlist_alert_tickers.get(this.watchlistAlertTickersCallback)
 }

  getErrors() {
    if (!this.state.buyprice && !this.state.sellprice)
      return "At least one price is required"
    // if (!this.state.buyprice )
    //  return "BuyPrice is Required"
    // if (!this.state.sellprice)
    //  return "SellPrice is required"
  }

  watchlistAlertTickersCallback(tickerList) {
    console.log('alertlist', tickerList);
    this.setState({tickerList})
    if ('watchList' in this.props.context) {
      let watchList = this.props.context.watchList
        tickerList.length > 0 && tickerList.map((ticker) => {
        watchList && watchList.map((watch) => {
          if (watch.ticker === ticker.ticker)
            ticker.is_in_watchlist = true
        })
      })
    }
    console.log('alertlist', tickerList);

    this.setState({alertList: tickerList})
  }

  handleRemoveAlert(event) {
    event.preventDefault();
    event.stopPropagation();
    let ticker = event.target.getAttribute('data-ticker')

    watchlist_alert_ticker.delete(this.removeAlertCallback, ticker);
  }

  removeAlertCallback() {
    watchlist_alert_tickers.get(this.watchlistAlertTickersCallback)
  }

}



export default PriceAlertPanel;
