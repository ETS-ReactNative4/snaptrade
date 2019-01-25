import React from 'react';
import { FormGroup,FormControl,Alert } from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js'

const ForgotPasswordPanelUI = props =>
 <PanelUI title='Forgot Password'>
    <div>
      { props.errorMessage &&
        <Alert bsStyle="danger">{props.errorMessage}
        </Alert>
      }
      <FormGroup controlId="formUserName">
        {/*validationState={this.getValidationState()}*/}
        <FormControl placeholder="Email" type="text" onChange={props.onEmailEdit} />
        <FormControl.Feedback />
      </FormGroup>
    </div>

  	<p className='pull-right'>
  	    <button className='btn btn-primary' onClick={props.onPasswordFormPost}>Get Password</button>
  	</p>
    <p className='clearfix'></p>

    {/*
    <div>
      <a href='#' onClick={props.onSignInClick}>Password reset done? Login here</a>
    </div>
    */}
  </PanelUI>

export default ForgotPasswordPanelUI;
