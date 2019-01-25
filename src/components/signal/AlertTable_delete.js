import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import AlertTableUI from './AlertTableUI.js';

class AlertTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1, // current highlighted page
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  render() {
    var rows = [];
    var pages = Math.ceil(this.props.signalList.length/10);
    var rowsPerPage = 10;
    for (var i = (this.state.activePage-1)*rowsPerPage; i < this.state.activePage*rowsPerPage && i < this.props.signalList.length; i++) {
      rows.push(this.props.signalList[i]);
    }

    return (
      <div>
        <AlertTableUI
          anonymous={this.props.anonymous}
          runTime={this.props.runTime}
          signalList={rows}
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

export default AlertTable;
