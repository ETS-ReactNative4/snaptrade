import React from 'react';
import { Button,FormGroup,FormControl,Alert } from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js'

const SignInUI2 = props =>
  <PanelUI title='Login'>
    <div>
      { props.errorMessage &&
        <Alert bsStyle="danger">{props.errorMessage}
        </Alert>
      }
      <FormGroup controlId="formUserName">
        {/*validationState={this.getValidationState()}*/}
        <FormControl placeholder="Nickname" type="text" onChange={props.onUserNameEdit} />
        <FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="formPassword">
        {/*validationState={this.getValidationState()}*/}
        <FormControl placeholder="Password" type="password" onChange={props.onPasswordEdit} />
        <FormControl.Feedback />
      </FormGroup>
    </div>

    <p className='pull-right'>
      <button className='btn btn-primary' onClick={props.onSignInFormPost}>Login</button>
    </p>
    <p className='clearfix'></p>

    <p>
      <a href='#' onClick={props.onSignUpClick}>Not signed up? Sign up here</a>
    </p>
    <div>
      <a href='#' onClick={props.onPasswordClick}>Forgot password?</a>
    </div>
  </PanelUI>

export default SignInUI2;
