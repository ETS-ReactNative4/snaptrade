import React, { Component } from 'react';
import SignInSignUpPageUI from './SignInSignUpPageUI.js';
import { withRouter } from 'react-router';

class SignInSignUpPage extends Component {
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
      <SignInSignUpPageUI
        context={this.props.context}
        signUp={this.state.signUp}
        forgotpwd={this.state.forgotpwd}
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

export default withRouter(SignInSignUpPage);
