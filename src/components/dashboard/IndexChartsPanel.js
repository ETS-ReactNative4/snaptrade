import React, { Component } from 'react';
import IndexChartsPanelUI from './IndexChartsPanelUI.js';

import index_prices from '../../apiclient/index_prices.js';

class IndexChartsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexList : [{}],
    };
    this.getIndexChartsCallback = this.getIndexChartsCallback.bind(this);
  }

  render() {
    return (
      <IndexChartsPanelUI
        indexList={this.state.indexList}
      />
    );
  }

  componentWillMount() {
    index_prices.get(this.getIndexChartsCallback)
  }

  getIndexChartsCallback(json) {
    this.setState({
      indexList: json,
    });
  }

}

export default IndexChartsPanel;
