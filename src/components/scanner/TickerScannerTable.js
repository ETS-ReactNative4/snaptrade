import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import TickerScannerTableUI from './TickerScannerTableUI.js';

class TickerScannerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1, // current highlighted page
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    var rows = [];
    var pages = Math.ceil(this.props.tickerList.length/100);
    var rowsPerPage = 100;
    for (var i = (this.state.activePage-1)*rowsPerPage; i < this.state.activePage*rowsPerPage && i < this.props.tickerList.length; i++) {
      rows.push(this.props.tickerList[i]);
    }

    return (
      <div >

        <TickerScannerTableUI
          anonymous={this.props.anonymous}
          runTime={this.props.runTime}
          tickerList={rows}
          onRowTickerClick={this.props.onRowTickerClick}
          onRowWatchClick={this.props.onRowWatchClick}
          onScrollToSignUp={this.props.onScrollToSignUp}
          // sort
          sortColumn={this.props.sortColumn}
          sortOrder={this.props.sortOrder}
          onSort={this.props.onSort}
        />

        <div className="text-center">
          <Pagination
          first last prev next
          items={pages} activePage={this.state.activePage}
          onSelect={this.handleSelect} />
        </div>
        { /*
        <Pager>
        <Pager.Item disabled previous href="#">&larr; Previous</Pager.Item>
        <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
        </Pager>
        */ }
      </div>
    );
  }

  /*
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
  */

  handleSelect(eventKey) {
    console.log(eventKey);
    this.setState({activePage: eventKey});
  }
}

export default TickerScannerTable;
