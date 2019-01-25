import React, { Component } from 'react';
import WatchlistTickersUI from './WatchlistTickersUI.js'
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';
import watchlist_sectors from '../../apiclient/watchlist/watchlist_sectors.js';
import signup_message from '../../apiclient/users/signup_message.js';

class WatchlistTickers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      tickers: '', // comma separated
      sectorIds: '', // comma separated
      signUpMessage: null,
      successMessage: '',
      errorMessage: '',
    };
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSectorIdChange = this.handleSectorIdChange.bind(this);
    this.handleAddTickersClick = this.handleAddTickersClick.bind(this);
    this.handleAddTickersCallback = this.handleAddTickersCallback.bind(this);
    this.handleAddSectorsCallback = this.handleAddSectorsCallback.bind(this);
    this.signUpMessageCallback = this.signUpMessageCallback.bind(this);
  }

  render() {
    if (this.props.accessToken && !this.state.signUpMessage)
      signup_message.get(this.signUpMessageCallback, this.props.accessToken)
    return (
      <WatchlistTickersUI
        sectorList={this.props.sectorList}
        tickers={this.state.tickers}
        signUpMessage={this.state.signUpMessage}
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        onTickerChange={this.handleTickerChange}
        onSectorIdChange={this.handleSectorIdChange}
        onWatchTickersClick={this.handleAddTickersClick}
      />
    );
  }

  signUpMessageCallback(response) {
    this.setState({ signUpMessage : response.message })
  }

  /*
  componentWillReceiveProps(props) {
    if (props.clickedTicker && props.clickedTicker !== this.state.tickers) {
      console.log(props.clickedTicker);
      let tickers = this.state.tickers;
      tickers += (tickers ? (',' + props.clickedTicker) : props.clickedTicker);
      this.setState({tickers : tickers})
    }
  }
  */

  handleAddTickersClick(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }

    this.setState({errorMessage: '', isLoading: true})
    watchlist_tickers.post(this.handleAddTickersCallback, this.state.tickers)
  }

  handleAddTickersCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }
    this.setState({isLoading: false, successMessage : response.success})

    watchlist_sectors.post(this.handleAddSectorsCallback, this.state.sectorIds)
  }

  handleAddSectorsCallback(response) {

  }

  getErrors() {
    let q = [];
    if (!this.state.tickers)
      q.push('One or more ticker')
    if (!this.state.sectorIds)
      q.push('One or more sector')

    switch (q.length) {
      case 0:
        break;
      case 1:
        return q[0] + ' is required'
      default:
        return q.join(', ') + ' are required'
    }
  }

  handleTickerChange(e) {
    console.log(e.target.value)
    this.setState({ tickers: e.target.value });
  }

  handleSectorIdChange(e) {
    var sectorIds = [];
    for (var i = 0; i < e.target.length; i++) {
      if (e.target.options[i].selected)
        sectorIds.push(e.target.options[i].value);
    }
    this.setState({ sectorIds: sectorIds.join() });
    console.log(sectorIds.join());
  }
}

export default WatchlistTickers;
