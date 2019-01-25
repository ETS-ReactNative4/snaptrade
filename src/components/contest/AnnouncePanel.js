import React, { Component } from 'react';
import AnnouncePanelUI from './AnnouncePanelUI.js'
import Validate from '../common/Validate.js'
import users_waitlist from '../../apiclient/users/users_waitlist.js';
import users_queue_count from '../../apiclient/users/users_queue_count.js';
import users_queue_invite from '../../apiclient/users/users_queue_invite.js';

class AnnouncePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      email: '',
      promoCode: '',
      category: '',
      successMessage: '',
      errorMessage: '',
      // invite
      inviteEmailFrom: '',
      inviteEmailTo: '',
      inviteSuccess: '',
      inviteError: '',
      //
      waitlistCount: null
    };
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handlePromoCodeEdit = this.handlePromoCodeEdit.bind(this);
    this.handleEquityClick = this.handleEquityClick.bind(this);
    this.handleCryptoClick = this.handleCryptoClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormSubmitCallback = this.handleFormSubmitCallback.bind(this);
    this.getUserQueueCountCallback = this.getUserQueueCountCallback.bind(this);
    this.clearForm = this.clearForm.bind(this)
    // invite
    this.handleInviteEmailFromEdit = this.handleInviteEmailFromEdit.bind(this);
    this.handleInviteEmailToEdit = this.handleInviteEmailToEdit.bind(this);
    this.handleInviteFormSubmit = this.handleInviteFormSubmit.bind(this);
    this.handleInviteFormCallback = this.handleInviteFormCallback.bind(this);

  }

  render() {
    return (
      <AnnouncePanelUI
        email={this.state.email}
        promoCode={this.state.promoCode}
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}
        onEquityClick={this.handleEquityClick}
        onCryptoClick={this.handleCryptoClick}
        onEmailEdit={this.handleEmailEdit}
        onPromoCodeEdit={this.handlePromoCodeEdit}
        onEmailSubmit={this.handleFormSubmit}
        contestInfo={this.props.contestInfo}
        waitlistCount={this.state.waitlistCount}
        // invite
        inviteEmailFrom={this.state.inviteEmailFrom}
        inviteEmailTo={this.state.inviteEmailTo}
        inviteSuccess={this.state.inviteSuccess}
        inviteError={this.state.inviteError}
        onInviteEmailFromEdit={this.handleInviteEmailFromEdit}
        onInviteEmailToEdit={this.handleInviteEmailToEdit}
        onInviteFormSubmit={this.handleInviteFormSubmit}
      />
    );
  }

  componentWillMount() {
    // users_queue_count.get(this.getUserQueueCountCallback);
  }

  getUserQueueCountCallback(response) {
    this.setState({waitlistCount : response.waitlist_count})
  }

  handleFormSubmit(e) {
    e.preventDefault()
    console.log('ss');
    let email = this.state.email.trim()
    if (!email)
      return;
    if (!Validate.email(this.state.email)) {
      this.setState({errorMessage: "Email is invalid"})
      return;
    }

    this.setState({errorMessage: '', isLoading: true})
    users_waitlist.post(this.handleFormSubmitCallback, email,
      this.state.category, this.state.promoCode)
  }

  handleFormSubmitCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }

    this.setState({isLoading: false, successMessage : response.success})
    setTimeout(this.clearForm, 30000)
  }

  clearForm() {
    this.setState({
      email : '',
      promoCode : '',
      successMessage : null,
      errorMessage : null
    })
  }

  handleEmailEdit(e) {
    this.setState({ email: e.target.value });
  }

  handlePromoCodeEdit(e) {
    this.setState({ promoCode: e.target.value });
  }

  handleEquityClick(e) {
    this.setState({category: 'equity'})
  }

  handleCryptoClick(e) {
    this.setState({category: 'crypto'})
  }

  handleInviteEmailFromEdit(e) {
    this.setState({inviteEmailFrom: e.target.value})
  }

  handleInviteEmailToEdit(e) {
    this.setState({inviteEmailTo: e.target.value})
  }

  handleInviteFormSubmit(e) {
    e.preventDefault()
    console.log('tt');
    let inviteEmailFrom = this.state.inviteEmailFrom.trim()
    let inviteEmailTo = this.state.inviteEmailTo.trim()
    if (!inviteEmailFrom || !inviteEmailTo)
      return;

    if (!Validate.email(inviteEmailFrom) ||
      !Validate.email(inviteEmailTo)) {
      this.setState({inviteError: "Email is invalid"})
      return;
    }

    this.setState({inviteError: ''})
    users_queue_invite.post(this.handleInviteFormCallback, inviteEmailFrom,
      inviteEmailTo)
  }

  handleInviteFormCallback(response) {
    if (response.error) {
      this.setState({inviteError : response.error})
      return;
    }

    this.setState({inviteSuccess : response.success})
    setTimeout(this.clearForm, 30000)
  }
}

export default AnnouncePanel;
