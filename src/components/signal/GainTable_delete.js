import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import GainTableUI from './GainTableUI.js';

class GainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1, // current highlighted page
    };
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
  }

  render() {
    var rows = [];
    var pages = Math.ceil(this.props.gainList.length/10);
    var rowsPerPage = 10;
    for (var i = (this.state.activePage-1)*rowsPerPage; i < this.state.activePage*rowsPerPage && i < this.props.gainList.length; i++) {
      rows.push(this.props.gainList[i]);
    }

    return (
      <div>
        <GainTableUI
          anonymous={this.props.anonymous}
          gainList={rows}
          runTime={this.props.runTime}
          onRowSignalClick={this.props.onRowSignalClick}
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
            onSelect={this.handlePaginationSelect}
          />
        </div>
      </div>
    );
  }

  /*
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }
  */

  handlePaginationSelect(eventKey) {
    console.log(eventKey);
    this.setState({activePage: eventKey});
  }

}

export default GainTable;
