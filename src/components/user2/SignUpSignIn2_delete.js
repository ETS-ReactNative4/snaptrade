import React, { Component } from 'react';
import SignUpSignInUI from './SignUpSignInUI2.js';

class SignUpSignIn2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUp: false,
      forgotpwd: false
    }
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
  }

  render() {
    return (
      <SignUpSignInUI
        context={this.props.context}
        signUp={this.state.signUp}
        forgotpwd={this.state.forgotpwd}
        sectorList={this.props.sectorList}
        clickedTicker={this.props.clickedTicker}
        onSignUpClick={this.handleSignUpClick}
        onSignInClick={this.handleSignInClick}
        onPasswordClick={this.handlePasswordClick}
      />
    );
  }

  handleSignInClick() {
    this.setState({signUp: false, forgotpwd: false});
  }

  handleSignUpClick() {
    this.setState({signUp: true});
  }

  handlePasswordClick() {
    this.setState({forgotpwd: true});
  }

}

export default SignUpSignIn2;
