import React, { Component } from 'react';
import SignInUI from './SignInUI2.js'
import login from '../../apiclient/users/login.js';

class SignIn2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      userName: '',
      email: '',
      password: ''
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleEmailEdit = this.handleEmailEdit.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSignInFormPost = this.handleSignInFormPost.bind(this)
    this.signInFormPostCallback = this.signInFormPostCallback.bind(this)
  }

  render() {
    return (
      <SignInUI
        errorMessage={this.state.errorMessage}
        onUserNameEdit={this.handleUserNameChange}
        onEmailEdit={this.handleEmailEdit}
        onPasswordEdit={this.handlePasswordChange}
        onSignInFormPost={this.handleSignInFormPost}
        onSignUpClick={this.props.onSignUpClick}
        onPasswordClick={this.props.onPasswordClick} />
    );
  }

  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  handleEmailEdit(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSignInFormPost(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }
    this.setState({errorMessage: '', isLoading: true});
    login.post(this.signInFormPostCallback, this.state.userName, this.state.password)
  }

  signInFormPostCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }
    this.setState({isLoading: false})
    this.props.context.onSignIn(this.state.userName, response.access_token);
  }

  getErrors() {
    if (!this.state.userName && !this.state.password)
      return "Nickname and Password are required"
    if (!this.state.userName )
      return "Nickname is Required"
    if (!this.state.password)
      return "Password is required"
  }
}

export default SignIn2;
