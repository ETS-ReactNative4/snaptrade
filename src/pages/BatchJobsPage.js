import React, { Component } from 'react';
import batch_jobs from '../apiclient/intranet_batch_jobs.js';
import BatchJobsPageUI from './BatchJobsPageUI.js'

class BatchJobsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: null
    };
    this.getBatchJobs = this.getBatchJobs.bind(this);
  }

  render() {
    return (
      <BatchJobsPageUI itemList={this.state.itemList} />
    );
  }

  componentWillMount() {
    batch_jobs.get(this.getBatchJobs)
  }

  getBatchJobs(json) {
    this.setState({itemList: json})
  }

}

export default BatchJobsPage;
