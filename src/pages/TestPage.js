import React, { Component } from 'react';
// import TestPageUI from './TestPageUI.js';
import { withRouter } from 'react-router';

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1 : [[1362133360000,25],[1362136955000,14],[1362140579000,35],[1362144175000,21],[1362146967000,15],[1362150567000,16],[1362154351000,15],[1362157951000,12],[1362161559000,16],[1362164400000,11],[1362171600000,15],[1362174626000,18]],
      data2 : [[1362133360000,12],[1362136955000,10],[1362140579000,30],[1362144175000,18],[1362146967000,10],[1362150567000,10],[1362154351000,10],[1362157951000,8],[1362161559000,11],[1362164400000,5],[1362171600000,10],[1362174626000,14]]
    }
  }

  render() {
    return (
      <div>
      {/*
      <TestPageUI
        data1={this.state.data1}
        data2={this.state.data2} />
      */}
      </div>
    );
  }

}

export default withRouter(TestPage);
