import React, { Component } from 'react';
import ForgotPasswordPanelUI from './ForgotPasswordPanelUI.js'
import forget_pwd from '../../apiclient/users/forget_pwd.js';

class ForgotPasswordPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      email: '',
    };
    this.handleEmailEdit = this.handleEmailEdit.bind(this)
    this.handlePasswordFormPost = this.handlePasswordFormPost.bind(this)
    this.passwordFormPostCallback = this.passwordFormPostCallback.bind(this)
  }

  render() {
    return (
      <ForgotPasswordPanelUI
        errorMessage={this.state.errorMessage}
        onEmailEdit={this.handleEmailEdit}
        onPasswordFormPost={this.handlePasswordFormPost}
        onSignInClick={this.props.onSignInClick} />
    );
  }

  handleEmailEdit(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordFormPost(e) {
    e.preventDefault()
    let errors = this.getErrors()
    if (errors) {
      this.setState({errorMessage: errors})
      return;
    }
    this.setState({errorMessage: '', isLoading: true});
    forget_pwd.post(this.passwordFormPostCallback, this.state.email)
  }

  passwordFormPostCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }
    this.setState({isLoading: false, errorMessage : response.msg})
  }

  getErrors() {
    if (!this.state.email )
      return "Email is Required"
  }
}

export default ForgotPasswordPanel;
