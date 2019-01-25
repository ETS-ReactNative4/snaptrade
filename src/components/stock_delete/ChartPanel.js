import React, { Component } from 'react';
import ChartPanelUI from './ChartPanelUI.js';

class ChartPanel extends Component {
  render() {
    return (
      <ChartPanelUI ticker={this.props.ticker}/>
    );
  }
}

export default ChartPanel;
