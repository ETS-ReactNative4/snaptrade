import React, { Component } from 'react';
import SignUpUI from './SignUpUI.js'
import Validate from '../common/Validate.js'
import Constants from '../common/Constants.js';
import login from '../../apiclient/users/login.js';
import signup from '../../apiclient/users/signup.js';

/**
 * title
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      userName: '',
      email: '',
      password: '',
      invCode: null,
      successMessage: '',
      errorMessage: '',
    };
    this.handleUserNameEdit = this.handleUserNameEdit.bind(this);
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handlePasswordEdit = this.handlePasswordEdit.bind(this);
    this.handleInvCodeEdit = this.handleInvCodeEdit.bind(this);
    this.handleSignUpFormSubmit = this.handleSignUpFormSubmit.bind(this);
    this.signUpFormSubmitCallback = this.signUpFormSubmitCallback.bind(this);
  }

  render() {
    return (
      <SignUpUI
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        onUserNameEdit={this.handleUserNameEdit}
        onEmailEdit={this.handleEmailEdit}
        onPasswordEdit={this.handlePasswordEdit}
        onInvCodeEdit={this.handleInvCodeEdit}
        onSignUpFormSubmit={this.handleSignUpFormSubmit}
      />
    );
  }

  handleSignUpFormSubmit(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }

    this.setState({errorMessage: '', isLoading: true})
    signup.post(this.signUpFormSubmitCallback,
      this.state.email, this.state.userName,
      this.state.password, this.state.invCode)
  }

  signUpFormSubmitCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }

    this.setState({isLoading: false, successMessage : response.success})
    this.props.onSignUp(this.state.userName, response.access_token)
  }

  getErrors() {
    let q = [];
    if (!this.state.userName )
      q.push('Nickname')
    if (!this.state.email )
      q.push('Email')
    if (!this.state.password)
      q.push('Password')

    switch (q.length) {
      case 0:
        break;
      case 1:
        return q[0] + ' is required'
      default:
        return q.join(', ') + ' are required'
    }

    if (!Validate.email(this.state.email))
      return "Email is invalid"
  }

  handleUserNameEdit(e) {
    this.setState({ userName: e.target.value });
  }

  handleEmailEdit(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordEdit(e) {
    this.setState({ password: e.target.value });
  }

  handleInvCodeEdit(e) {
    this.setState({ invCode: e.target.value });
  }

}

export default SignUp;
