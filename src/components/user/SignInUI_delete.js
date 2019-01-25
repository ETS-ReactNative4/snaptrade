import React from 'react';
import { Button,FormGroup,FormControl,Alert } from 'react-bootstrap';

const SignInUI = props =>
  <form>
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

    <div className='clearfix'></div>

  	<div>
  	  <FormGroup>
  	    <Button bsStyle="primary" className='pull-right' onClick={props.onSignInFormPost}>Login</Button>
  	  </FormGroup>
  	</div>
  </form>

export default SignInUI;
