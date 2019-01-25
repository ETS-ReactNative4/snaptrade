import React from 'react';
import { Button,FormGroup,FormControl,ControlLabel,Alert } from 'react-bootstrap';

const SignUpUI = ({successMessage, errorMessage,
    onUserNameEdit, onEmailEdit, onPasswordEdit, onInvCodeEdit,
    onSignUpFormSubmit}) =>
  <form>
    <div>
      { successMessage &&
        <Alert bsStyle="success">{successMessage}
        </Alert>
      }
      { errorMessage &&
        <Alert bsStyle="danger">{errorMessage}
        </Alert>
      }
      <FormGroup controlId="formNickname">
        <FormControl placeholder="Nickname" type="text" onChange={onUserNameEdit} />
      </FormGroup>
      <FormGroup controlId="formEmail">
        <FormControl placeholder="Email" type="email" onChange={onEmailEdit} />
      </FormGroup>
      <FormGroup controlId="formPassword">
        <FormControl placeholder="Password" type="password" onChange={onPasswordEdit} />
      </FormGroup>
    </div>

    <div className='clearfix'></div>


  	<div>
  	  <FormGroup>
  	    <Button bsStyle="primary" className='pull-right' onClick={onSignUpFormSubmit}>Sign Up</Button>
  	  </FormGroup>
  	</div>
  </form>

export default SignUpUI;
