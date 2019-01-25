import React, { Component } from 'react';
import MegaphonePanelUI from './MegaphonePanelUI.js';
import { withRouter } from 'react-router';
import megaphone from '../../apiclient/megaphone.js';

class MegaphonePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
    };
    this.getMegafoneCallback = this.getMegafoneCallback.bind(this);
  }

  render() {
    return (
      <MegaphonePanelUI
        message={this.state.message}
      />
    );
  }

  componentWillMount() {
    megaphone.get(this.getMegafoneCallback, this.props.page)
  }

  getMegafoneCallback(json) {
    this.setState({
      message: json.message
    });
  }

}

export default withRouter(MegaphonePanel);
