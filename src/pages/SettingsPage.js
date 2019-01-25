import React, { Component } from 'react';
import SettingsPageUI from './SettingsPageUI.js';
import { withRouter } from 'react-router';

class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SettingsPageUI
        context={this.props.context}
      />
    );
  }

}

export default withRouter(SettingsPage);
