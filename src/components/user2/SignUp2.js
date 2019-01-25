import React, { Component } from 'react';
import SignUpUI2 from './SignUpUI2.js'
import Validate from '../common/Validate.js'
import Constants from '../common/Constants.js';
import login from '../../apiclient/users/login.js';
import signup from '../../apiclient/users/signup.js';

/**
 * title
 */
class SignUp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      userName: '',
      email: '',
      password: '',
      referrer: null,
      otherRef: null,
      showOther: false,
      successMessage: '',
      errorMessage: '',
    };
    this.handleUserNameEdit = this.handleUserNameEdit.bind(this);
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handlePasswordEdit = this.handlePasswordEdit.bind(this);
    this.handleReferrerChange = this.handleReferrerChange.bind(this);
    this.handleRefOtherEdit = this.handleRefOtherEdit.bind(this);
    this.handleSignUpFormSubmit = this.handleSignUpFormSubmit.bind(this);
    this.signUpFormSubmitCallback = this.signUpFormSubmitCallback.bind(this);
  }

  render() {
    return (
      <SignUpUI2
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        onUserNameEdit={this.handleUserNameEdit}
        onEmailEdit={this.handleEmailEdit}
        onPasswordEdit={this.handlePasswordEdit}
        onReferrerChange={this.handleReferrerChange}
        onRefOtherEdit={this.handleRefOtherEdit}
        showOther={this.state.showOther}
        onSignUpFormSubmit={this.handleSignUpFormSubmit}
        onSignInClick={this.props.onSignInClick}
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

    console.log(this.state.otherRef);

    let referrer = this.state.referrer === 'other' ? this.state.otherRef : this.state.referrer
    signup.post(this.signUpFormSubmitCallback,
      this.state.email, this.state.userName,
      this.state.password, null, referrer)
  }

  signUpFormSubmitCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }

    this.setState({isLoading: false, successMessage : response.success})
    this.props.context.onSignUp(this.state.userName, response.access_token);
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

  handleReferrerChange(e) {
    if (e.target.value === 'other')
      this.setState({referrer: e.target.value, showOther: true})
    else
      this.setState({ referrer: e.target.value, showOther: false });
  }

  handleRefOtherEdit(e) {
    this.setState({ otherRef: e.target.value });
  }

}

export default SignUp2;
