import React, { Component } from 'react';
import HeaderPanelUI from './HeaderPanelUI.js';
import { withRouter } from 'react-router';
import tickers_search from '../../apiclient/tickers/tickers_search.js';
import {Highlighter} from 'react-bootstrap-typeahead'; // ES2015

class HeaderPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedTicker: '',
      typed: false,
      showHelp: "0",
      searchOptions: []
    };
    this.handleSearchedTickerChange = this.handleSearchedTickerChange.bind(this);
    this.handleTickerSearch = this.handleTickerSearch.bind(this);
    this.handleHelpClick = this.handleHelpClick.bind(this);
    this.handleResetHelp = this.handleResetHelp.bind(this);
    // search
    this.handleTypeaheadSearch = this.handleTypeaheadSearch.bind(this);
    this.typeaheadSearchCallback = this.typeaheadSearchCallback.bind(this);
    this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
    this.handleTypeaheadSearchSelected = this.handleTypeaheadSearchSelected.bind(this);
  }

  render() {
    return (
      <HeaderPanelUI
        context={this.props.context}
        onSearchedTickerChange={this.handleSearchedTickerChange}
        onTickerSearch={this.handleTickerSearch}
        ticker={this.props.match.params.ticker}
        typedTicker={this.state.typedTicker}
        typed={this.state.typed}
        // typeahes search
        searchOptions={this.state.searchOptions}
        onTypeaheadSearch={this.handleTypeaheadSearch}
        renderMenuItemChildren={this.renderMenuItemChildren}
        onTypeaheadSearchSelected={this.handleTypeaheadSearchSelected}
        //
        onHelpClick={this.handleHelpClick}
        resetHelp={this.handleResetHelp}
      />
    );
  }

  componentWillMount(props) {
    this.props.context.showHelp = false;
  }



  componentWillReceiveProps(props) {
    this.setState({ showHelp: props.context.showHelp });
  }

  handleSearchedTickerChange(event) {
    event.preventDefault()
    console.log(event.target.value)
    this.setState({
      typedTicker: event.target.value.toUpperCase(),
      typed: true
    });
  }

  handleTickerSearch(event) {
    event.preventDefault();
    let ticker = this.state.typedTicker.trim()
    console.log(ticker)
    if (ticker)
      window.location = "/ticker/" + ticker;
    //  this.props.history.push("/ticker/" + ticker.toUpperCase());
  }

  handleHelpClick(event){
    this.props.context.showHelp = !this.props.context.showHelp
    this.props.context.onContextChange(this.props.context)
    console.log("=============HEADER PANEL showHelp================"+this.props.context.showHelp);
  }

  handleResetHelp(event){
    this.props.context.showHelp = false;
  }

  handleTypeaheadSearch(query) {
    this.setState({typeaheadLoading: true});
    tickers_search.get(this.typeaheadSearchCallback, query)
  }

  typeaheadSearchCallback(json, query) {
    this.setState({
      typeaheadLoading: false,
      searchOptions: json.map((item, i) => {
        return {
          label: item.ticker,
          ticker: item.ticker,
          company: item.company
        }
      }),
    });
  }

  renderMenuItemChildren(option, props, index) {
    return [
      <Highlighter key="ticker" search={props.text}>
        {option.ticker}
      </Highlighter>,
      <div>
          <small>{option.company}</small>
      </div>,
    ];
  }

  handleTypeaheadSearchSelected(selected) {
    console.log('here', selected);
    window.location = `/ticker/${selected[0].ticker}`
  }
}

export default withRouter(HeaderPanel);
