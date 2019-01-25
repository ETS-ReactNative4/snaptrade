 import React, { Component } from 'react';
import { withRouter } from 'react-router';
import HomePanelUI from './HomePanelUI.js';
import Validate from '../common/Validate.js';
import users_waitlist from '../../apiclient/users/users_waitlist.js';
import users_queue_count from '../../apiclient/users/users_queue_count.js';
import users_queue_invite from '../../apiclient/users/users_queue_invite.js';
import users_queue_email from '../../apiclient/users/users_queue_email.js';

class HomePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      email: '',
      successMessage: '',
      errorMessage: '',
      waitlistCount: null,
      invite_code: '',
      t: 0,
      x: 0,
    };
    this.handleEmailEdit = this.handleEmailEdit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormSubmitCallback = this.handleFormSubmitCallback.bind(this);
    this.getUserQueueCountCallback = this.getUserQueueCountCallback.bind(this);
    this.getUserQueueEmailCallback = this.getUserQueueEmailCallback.bind(this);
    this.postUserQueueEmailCallback = this.postUserQueueEmailCallback.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  render() {
    return (
  
        <HomePanelUI
        email={this.state.email}      
        successMessage={this.state.successMessage}
        errorMessage={this.state.errorMessage}       
        onEmailEdit={this.handleEmailEdit}        
        onEmailSubmit={this.handleFormSubmit}     
        waitlistCount={this.state.waitlistCount} 
        x={this.state.x}
      />
    );
  }

  componentWillMount() {
    users_queue_count.get(this.getUserQueueCountCallback);
    let d = new Date();
    this.setState({t: d.getTime()});
    let t= d.getTime() % 3 + 1;
    this.setState({ x: t });
    console.log(d.getTime());
    console.log(t);
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

    let successMessage = this.state.successMessage;
    
    users_waitlist.post(this.handleFormSubmitCallback, email)
     
  }

  handleFormSubmitCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }

    this.setState({isLoading: false, successMessage : response.success})
    setTimeout(this.clearForm, 30000)
    let email = this.state.email.trim()
    users_queue_email.get(this.getUserQueueEmailCallback, email)
  }

  getUserQueueEmailCallback(response) {
    if (response.error) {
      this.setState({isLoading: false, errorMessage : response.error})
      return;
    }

    this.setState({isLoading: false, successMessage : response.success, invite_code: response.invite_code})

    let email = this.state.email.trim()

    this.props.history.push({
     pathname: '/secondpage',
     search: '?email=' + email,
     state: { detail: this.state.waitlistCount,
     email: email,
     invite_code: this.state.invite_code}
     })
    setTimeout(this.clearForm, 30000)

    users_queue_email.post(this.postUserQueueEmailCallback, this.state.invite_code, this.state.x, this.state.email)

  }

    postUserQueueEmailCallback(response) {
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
      successMessage : null,
      errorMessage : null
    })
  }

  handleEmailEdit(e) {
    this.setState({ email: e.target.value });
    let email = this.state.email.trim()
    
  }

}

export default withRouter(HomePanel);
