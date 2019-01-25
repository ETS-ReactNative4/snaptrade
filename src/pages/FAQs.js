import React, { Component } from 'react';
import FAQsUI from './FAQsUI.js';
import { withRouter } from 'react-router';

class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <FAQsUI
        anonymous={this.props.anonymous}
      />
    );
  }

}

export default withRouter(FAQs);
