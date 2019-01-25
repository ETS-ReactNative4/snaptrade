import React, { Component } from 'react';
import SignalPanelUI from './SignalPanelUI.js';
import signals from '../../apiclient/signals.js';
import signals_tickers from '../../apiclient/signals_tickers.js';

class SignalPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signalList : [],
    };
    this.getSignalsCallback = this.getSignalsCallback.bind(this);
  }

  render() {
    return (
      <SignalPanelUI
        signalList={this.state.signalList}
      />
    );
  }

  
  componentWillMount() {
    signals.get(this.getSignalsCallback, this.props.ticker)
  }

  getSignalsCallback(signalList, ticker) {
    this.props.context.latestSignal = signalList[0].run_date_formatted + '  ' + signalList[0].rule_name_original
    this.props.context.onContextChange(this.props.context)
    this.setState({signalList: signalList, isLoading: false});
  }

}

export default SignalPanel;
