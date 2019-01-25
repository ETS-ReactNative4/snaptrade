import React, { Component } from 'react';
import FeedbackModalUI from './FeedbackModalUI.js';
import users_feedbacks from '../../apiclient/users/users_feedbacks.js';

class FeedbackModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page : null,
      feedbackType : '-1',
      feedback : null,
      successMsg : null
    };

    this.handleFeedbackInputChange = this.handleFeedbackInputChange.bind(this);
    this.handleFeedbackTypeChange = this.handleFeedbackTypeChange.bind(this);
    this.handleSendFeedbackClick = this.handleSendFeedbackClick.bind(this);
    this.sendFeedbackCallback = this.sendFeedbackCallback.bind(this);
    this.clearAll = this.clearAll.bind(this)
  }

  render() {
    return (
        <FeedbackModalUI
          showFeedbackModal={this.props.showFeedbackModal}
          onHideFeedbackModal={this.props.onHideFeedbackModal}
          onFeedbackInputChange={this.handleFeedbackInputChange}
          onFeedbackTypeChange={this.handleFeedbackTypeChange}
          onSendFeedbackClick={this.handleSendFeedbackClick}
          successMsg={this.state.successMsg}
        />
    );
  }

  handleFeedbackInputChange(event) {
    console.log(event.target.value);
    this.setState({feedback : event.target.value})
  }

  handleFeedbackTypeChange(event) {
    console.log(event.target.value);
    this.setState({feedbackType : event.target.value})
  }

  handleSendFeedbackClick(event) {
    event.preventDefault();
    users_feedbacks.post(this.sendFeedbackCallback,
      this.state.page, this.state.feedbackType, this.state.feedback)
  }

  sendFeedbackCallback(status) {
    this.setState({successMsg : status.success})
    setTimeout(this.clearAll, 4000)
  }

  clearAll() {
    this.setState({
      feedback : null,
      feedbackType : null,
      successMsg : null
    })
    this.props.onHideFeedbackModal();
  }

}

export default FeedbackModal;
