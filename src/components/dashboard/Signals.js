import React, { Component } from 'react';
import SignalsUI from './SignalsUI.js';

import signals from '../../apiclient/signals.js';

class Signals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signalList : [{}],
    };
    this.getSignalsCallback = this.getSignalsCallback.bind(this);
  }

  render() {
    return (
      <div>
        <SignalsUI
          signalList={this.state.signalList}
        />
      </div>
    );
  }

  componentWillMount() {
    signals.get(this.getSignalsCallback)
  }

  getSignalsCallback(signalList) {
    this.setState({signalList: signalList,});
  }

}

export default Signals;
