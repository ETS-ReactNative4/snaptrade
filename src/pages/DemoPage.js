import React, { Component } from 'react';
import DemoPageUI from './DemoPageUI.js';
import { withRouter } from 'react-router';

class ChartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <DemoPageUI />
    );
  }
}

export default withRouter(ChartPage);
