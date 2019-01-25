import React, { Component } from 'react';
import CalendarPageUI from './CalendarPageUI.js';
import { withRouter } from 'react-router';

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <CalendarPageUI
        context={this.props.context}
      />
    );
  }

}

export default withRouter(CalendarPage);
