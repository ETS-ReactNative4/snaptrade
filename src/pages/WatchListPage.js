import React, { Component } from 'react';
import WatchListPageUI from './WatchListPageUI.js';
import { withRouter } from 'react-router';

class WatchListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker : '',
      sectorId : '-1',
      sectorList : [{}],
    };
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSectorChange = this.handleSectorChange.bind(this);
  }

  render() {
    return (
      <WatchListPageUI
        context={this.props.context}
        anonymous={this.props.anonymous}
        runTime={this.props.runTime}
        ticker={this.state.ticker}
        sectorId={this.state.sectorId}
        sectorList={this.state.sectorList}
        onSectorChange={this.handleSectorChange}
        onTickerChange={this.handleTickerChange}

        embeddableTagUuid={this.props.match.params.tag}
      />
    );
  }

  componentWillMount() {
  }

  handleTickerChange(event) {
    /*
    event.preventDefault();
    console.log('selected ticker=' + event.target.value)
    this.setState({ticker: event.target.value});
    this.setState({sectorId: '-1'});
    this.setState({priceRange: '-1', minPrice: 0, maxPrice: 999999});
    this.setState({volumeRange: '-1', minVolume: 0, maxVolume: 99999999});
    */
  }

  handleSectorChange(event) {
    /*
    event.preventDefault();
    console.log('selected sectorId=' + event.target.value)
    this.setState({sectorId: event.target.value});
    this.setState({ticker: ''});
    // this.setState({priceRange: '-1', minPrice: 0, maxPrice: 999999});
    // this.setState({volumeRange: '-1', minVolume: 0, maxVolume: 99999999});
    */
  }
}

export default withRouter(WatchListPage);
