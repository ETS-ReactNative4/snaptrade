import React, { Component } from 'react';
import TickerScannerPageUI from './TickerScannerPageUI.js';
import { withRouter } from 'react-router';
import sectors from '../apiclient/sectors.js';

class TickerScannerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectorList : [],
    };
    this.getSectorsCallback = this.getSectorsCallback.bind(this);
  }

  render() {
    let tag = this.props.match.params.tag
    if (!tag) {
      window.location = '/scanner/technology'
      return
    }

    return (
      <TickerScannerPageUI
        context={this.props.context}
        tag={this.props.match.params.tag}
        sectorList={this.state.sectorList}
      />
    );
  }

  componentWillMount() {
    sectors.get(this.getSectorsCallback);
  }

  getSectorsCallback(sectorList) {
    this.setState({sectorList: sectorList});
  }
}

export default withRouter(TickerScannerPage);
