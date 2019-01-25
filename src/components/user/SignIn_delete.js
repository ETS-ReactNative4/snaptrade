import React, { Component } from 'react';
import SignInUI from './SignInUI.js'
import login from '../../apiclient/users/login.js';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      userName: '',
      email: '',
      password: ''
    };
    this.handleLogin = this.handleLogin.bind(this);
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
        onSignInFormPost={this.handleSignInFormPost} />
    );
  }


    handleLogin(userName, accessToken) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("accessToken", accessToken);
    console.log(accessToken)
   // this.headerRef.scrollIntoView({ behavior: "smooth" });
  }

  getValidationState() {
    const length = '';
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleUserNameChange(e) {
    console.log(e.target.value)
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
   // login.post(this.signInFormPostCallback, this.state.userName, response.access_token)
    this.props.context.onSignIn(this.state.userName, response.access_token)
   // this.handleLogin(this.state.userName, response.access_token)
  }

  getErrors() {
    if (!this.state.userName && !this.state.password)
      return "Nickname and Password are required"
    if (!this.state.userName )
      return "Nickname is Required"
    if (!this.state.password)
      return "Password is required"
    // if (!Validate.email(this.state.email))
    //   return "Email is invalid"
  }
}

export default SignIn;
