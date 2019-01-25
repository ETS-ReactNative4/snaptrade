import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import SecondPageUI from './SecondPageUI.js';


class SecondPage extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
      link  : "https://snaptrade.us?referrer_code=",
    };
    
    this.handleHomeSubmit = this.handleHomeSubmit.bind(this);
  }

  static PropTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props

    return (
      <SecondPageUI
        waitlistCount={location.state.detail}
        email={location.state.email}
        onHomeSubmit={this.handleHomeSubmit}
        link={this.state.link + location.state.invite_code}
      />
    )
  }

    handleHomeSubmit(e) {       
    this.props.history.push("/signals");  
  }
}

export default withRouter(SecondPage);
