import React, { Component } from 'react';
import SignUpSignInUI from './SignUpSignInUI.js';

class SignUpSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // signUp: !this.props.justLoggedOut
      signUp: false
    }
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.clear = this.clear.bind(this)
  }

  render() {
    return (
      <SignUpSignInUI
        signUp={this.state.signUp}
        sectorList={this.props.sectorList}
        clickedTicker={this.props.clickedTicker}
        onSignUpClick={this.handleSignUpClick}
        onSignInClick={this.handleSignInClick}
      />
    );
  }

  handleSignInClick() {
    this.setState({signUp: false});
  }

  handleSignUpClick() {
    this.setState({signUp: true});
  }

    clear() {
    this.setState({
      signUp: null

    })

  }


}

export default SignUpSignIn;
