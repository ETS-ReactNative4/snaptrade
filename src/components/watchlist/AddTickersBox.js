import React, { Component } from 'react';
import AddTickersBoxUI from './AddTickersBoxUI.js';
import watchlist_tags_tickers from '../../apiclient/watchlist/watchlist_tags_tickers.js';
import watchlist_tickers from '../../apiclient/watchlist/watchlist_tickers.js';

class AddTickersBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTickers : '',
      addTickersSuccess : null,
      addTickersError : null,
    };
    this.handleAddTickersEdit=this.handleAddTickersEdit.bind(this);
    this.handleAddTickersSubmit=this.handleAddTickersSubmit.bind(this);
    this.handleAddTickersCallback=this.handleAddTickersCallback.bind(this)

    this.clearForm = this.clearForm.bind(this)
  }

  render() {
    return (
      <AddTickersBoxUI
        newTickers={this.state.newTickers}
        addTickersSuccess={this.state.addTickersSuccess}
        addTickersError={this.state.addTickersError}
        onAddTickersEdit={this.handleAddTickersEdit}
        onAddTickersSubmit={this.handleAddTickersSubmit}
      />
    );
  }

  handleAddTickersEdit(event) {
    console.log(event.target.value);
    this.setState({
      newTickers: event.target.value.toUpperCase()
    })
  }

  handleAddTickersSubmit(event) {
    event.preventDefault();
    let newTickers = this.state.newTickers.trim()
    if (newTickers) {
      if (this.props.filteringTagObj) {
        watchlist_tags_tickers.post(this.handleAddTickersCallback,
          this.props.filteringTagObj.tag_id,
          this.state.newTickers
        )
      }
      else {
        watchlist_tickers.post(this.handleAddTickersCallback, this.state.newTickers)
      }
    }
  }

  handleAddTickersCallback(response) {
    if (response.success) {
      this.setState({
        newTickers : '',
        addTickersSuccess : response.success,
        addTickersError : null
      })
      setTimeout(this.clearForm, 6000)
      this.props.onWatchlistTickersChange();
    }

    if (response.error) {
      this.setState({
        addTickersError : response.error,
        addTickersSuccess : null
      })
    }
  }

  clearForm() {
    this.setState({
      newTickers : '',
      addTickersSuccess : null,
      addTickersError : null
    })
  }

}

export default AddTickersBox;
