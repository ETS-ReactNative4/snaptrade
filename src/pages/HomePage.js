import React, { Component } from 'react';
import HomePageUI from './HomePageUI.js';
import { withRouter } from 'react-router';
import HomePanel from '../components/user/HomePanel.js'


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {

    return (
      <HomePanel />

    );
  }



}

export default withRouter(HomePage);
