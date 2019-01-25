import React, { Component } from 'react';
import SettingsPanelUI from './SettingsPanelUI.js';
import users_me from '../../apiclient/users/me.js';
import users_me_email from '../../apiclient/users/me_email.js';
import users_me_password from '../../apiclient/users/me_password.js';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading : true,
      userInfo : {},
      isEmailEdit : false,
      isPasswordEdit : false,
    };
    this.getUserInfoCallback = this.getUserInfoCallback.bind(this);
    // email
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handleEmailUpdate = this.handleEmailUpdate.bind(this);
    this.handleEmailUpdateSubmit = this.handleEmailUpdateSubmit.bind(this);
    this.emailUpdateSubmitCallback = this.emailUpdateSubmitCallback.bind(this);
    // password
    this.handlePasswordEdit = this.handlePasswordEdit.bind(this);
    this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this);
    this.handlePasswordUpdateSubmit = this.handlePasswordUpdateSubmit.bind(this);
    this.passwordUpdateSubmitCallback = this.passwordUpdateSubmitCallback.bind(this);
  }

  render() {
    return (
      <SettingsPanelUI
        isLoading={this.state.isLoading}
        userInfo={this.state.userInfo}
        isEmailEdit={this.state.isEmailEdit}
        onEmailEdit={this.handleEmailEdit}
        onEmailUpdate={this.handleEmailUpdate}
        onEmailUpdateSubmit={this.handleEmailUpdateSubmit}
        isPasswordEdit={this.state.isPasswordEdit}
        onPasswordEdit={this.handlePasswordEdit}
        onPasswordUpdate={this.handlePasswordUpdate}
        onPasswordUpdateSubmit={this.handlePasswordUpdateSubmit}
      />
    );
  }

  componentWillMount() {
    users_me.get(this.getUserInfoCallback);
  }

  getUserInfoCallback(userInfo) {
    userInfo.password = '';
    this.setState({userInfo : userInfo});
  }

  handleEmailEdit() {
    this.setState({isEmailEdit : true})
  }

  handleEmailUpdate(e) {
    console.log(e.target.value)
    let userInfo = this.state.userInfo;
    userInfo.email = e.target.value;
    this.setState({ userInfo: userInfo });
  }

  handleEmailUpdateSubmit(e) {
    e.preventDefault();
    users_me_email.put(this.emailUpdateSubmitCallback, this.state.userInfo.email);
  }

  emailUpdateSubmitCallback() {
    this.setState({isEmailEdit : false})
  }

  handlePasswordEdit() {
    this.setState({isPasswordEdit : true})
  }

  handlePasswordUpdate(e) {
    console.log(e.target.value)
    let userInfo = this.state.userInfo;
    userInfo.password = e.target.value;
    this.setState({ userInfo: userInfo });
  }

  handlePasswordUpdateSubmit(e) {
    e.preventDefault();
    users_me_password.put(this.passwordUpdateSubmitCallback, this.state.userInfo.password);
  }

  passwordUpdateSubmitCallback() {
    this.setState({isPasswordEdit : false})
  }
}

export default SettingsPanel;
