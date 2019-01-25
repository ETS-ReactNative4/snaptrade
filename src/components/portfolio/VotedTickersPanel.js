import React, { Component } from 'react';
import VotedTickersPanelUI from './VotedTickersPanelUI.js';
import portfolio_game_vote from '../../apiclient/portfolio/portfolio_game_vote.js';
import portfolio_game_get_voted_tickers from '../../apiclient/portfolio/portfolio_game_get_voted_tickers.js';

class VotedTickersPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerList : [],
      newTickers : '',
      addTickersSuccess : null,
      addTickersError : null,
    };
    this.getVotedTickersCallback = this.getVotedTickersCallback.bind(this);
    this.refreshHistory = this.refreshHistory.bind(this);
    this.handleAddTickersEdit=this.handleAddTickersEdit.bind(this);
    this.handleAddTickersSubmit=this.handleAddTickersSubmit.bind(this);
    this.handleAddTickersCallback=this.handleAddTickersCallback.bind(this)
    this.clearForm = this.clearForm.bind(this)
  }

  render() {
    return (
      <VotedTickersPanelUI
        anonymous={this.props.anonymous}
        tickerList={this.state.tickerList}
        newTickers={this.state.newTickers}
        addTickersSuccess={this.state.addTickersSuccess}
        addTickersError={this.state.addTickersError}
        onAddTickersEdit={this.handleAddTickersEdit}
        onAddTickersSubmit={this.handleAddTickersSubmit}
      />
    );
  }

  componentWillMount() {
    portfolio_game_get_voted_tickers.get(this.getVotedTickersCallback)
    //setInterval(this.refreshHistory, 300000);
  }

  refreshHistory() {
    portfolio_game_get_voted_tickers.get(this.getVotedTickersCallback)
  }

  getVotedTickersCallback(response) {
    this.setState({
      tickerList : response,
    })
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
      portfolio_game_vote.post(this.handleAddTickersCallback, newTickers)
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
      portfolio_game_get_voted_tickers.get(this.getVotedTickersCallback)
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

export default VotedTickersPanel;
