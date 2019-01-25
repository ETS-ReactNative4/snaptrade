import React, { Component } from 'react';
import TickerPageUI from './TickerPageUI.js';
import { withRouter } from 'react-router';

class TickerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : null,
      intraDay : false,
      indicator : null
    };
    this.handleIntraDayClick = this.handleIntraDayClick.bind(this);
    this.handleDailyChartClick = this.handleDailyChartClick.bind(this);
    this.handleShow50dSMAClick = this.handleShow50dSMAClick.bind(this);
    this.handleShow100dSMAClick = this.handleShow100dSMAClick.bind(this);
    this.handleShow50dEMAClick = this.handleShow50dEMAClick.bind(this);
    this.handleShow100dEMAClick = this.handleShow100dEMAClick.bind(this);
    this.handleShowMACDClick = this.handleShowMACDClick.bind(this);
    this.handleShowRSIClick = this.handleShowRSIClick.bind(this)
    this.handleShowCandlestickClick = this.handleShowCandlestickClick.bind(this);
  }

  render() {
    let ticker = this.props.match.params.ticker;
    let tickerListStr = localStorage.getItem("tickerList");
    if (tickerListStr) {
      let tickerArray = tickerListStr.split(',');
      let newTickerArray = [ ticker ];
      for (var i = 0; i < tickerArray.length && i < 20; i++) {
        if (tickerArray[i] == ticker)
          continue
        newTickerArray.push(tickerArray[i])
      }
      console.log(newTickerArray.join(','));
      localStorage.setItem("tickerList", newTickerArray.join(','));
    }
    else {
      localStorage.setItem("tickerList", ticker);
    }
    // localStorage.removeItem("tickerList");


    return (
      <TickerPageUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        justLoggedOut={this.props.justLoggedOut}
        justSignedUp={this.props.justSignedUp}
        sectorList={this.props.sectorList}
        clickedTicker={this.props.clickedTicker}
        accessToken={this.props.accessToken}

        ticker={ticker}
        intraDay={this.state.intraDay}
        onIntraDayClick={this.handleIntraDayClick}
        onDailyChartClick={this.handleDailyChartClick}

        indicator={this.state.indicator}
        onShow50dSMAClick={this.handleShow50dSMAClick}
        onShow100dSMAClick={this.handleShow100dSMAClick}
        onShow50dEMAClick={this.handleShow50dEMAClick}
        onShow100dEMAClick={this.handleShow100dEMAClick}
        onShowMACDClick={this.handleShowMACDClick}
        onShowRSIClick={this.handleShowRSIClick}
        onShowCandlestickClick={this.handleShowCandlestickClick}
      />
    );
  }

  handleIntraDayClick(event) {
    event.preventDefault()
    this.setState({intraDay: true});
  }

  handleDailyChartClick(event) {
    event.preventDefault()
    this.setState({intraDay: false});
  }

  handleShow50dSMAClick(event) {
    event.preventDefault()
    if (this.state.indicator == '50dsma')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : '50dsma' })
    }
  }

  handleShow100dSMAClick(event) {
    event.preventDefault()
    if (this.state.indicator == '100dsma')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : '100dsma' })
    }
  }

  handleShow50dEMAClick(event) {
    event.preventDefault()
    if (this.state.indicator == '50dema')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : '50dema' })
    }
  }

  handleShow100dEMAClick(event) {
    event.preventDefault()
    if (this.state.indicator == '100dema')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : '100dema' })
    }
  }

  handleShowMACDClick(event) {
    event.preventDefault()
    if (this.state.indicator == 'macd')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : 'macd' })
    }
  }

  handleShowRSIClick(event) {
    event.preventDefault()
    if (this.state.indicator == 'rsi')
      this.setState({ indicator : null })
    else {
      this.setState({ indicator : 'rsi' })
    }
  }

    handleShowCandlestickClick(event) {
      event.preventDefault()
      console.log('candlestick');
      if (this.state.indicator == 'candlestick')
        this.setState({ indicator : null })
      else {
        this.setState({ indicator : 'candlestick' })
      }
    }
}

export default withRouter(TickerPage);
