import React from 'react';
import { Button,FormGroup,FormControl,ControlLabel,Alert, Radio } from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js'

const SignUpUI2 = ({successMessage, errorMessage,
    onUserNameEdit, onEmailEdit, onPasswordEdit, showOther, onReferrerChange, onRefOtherEdit, onInvCodeEdit,
    onSignUpFormSubmit, onSignInClick}) =>
  <PanelUI title='Sign Up'>
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
      <FormGroup controlId="formReferrer">
        Where did you here from us?<br/>
        <Radio name="radioGroup" inline value='youtube' onChange={onReferrerChange}>
          YouTube
        </Radio>{' '}
        <Radio name="radioGroup" inline value='facebook' onChange={onReferrerChange}>
          Facebook
        </Radio>{' '}
        <Radio name="radioGroup" inline value='google' onChange={onReferrerChange}>
          Google
        </Radio>{' '}
        <Radio name="radioGroup" inline value='reddit' onChange={onReferrerChange}>
          Reddit
        </Radio>{' '}
        <Radio name="radioGroup" inline value='other' onChange={onReferrerChange}>
          Other
        </Radio>
      </FormGroup>
      {
        showOther &&
        <FormGroup controlId="formRefOther">
          <FormControl type="text" onChange={onRefOtherEdit} />
        </FormGroup>
      }
    </div>

    <p className='pull-right'>
  	    <button className='btn btn-primary' onClick={onSignUpFormSubmit}>Sign Up</button>
  	</p>
    <p className='clearfix'></p>

    <div>
      <a href='#' onClick={onSignInClick}>Already signed up? Login here</a>
    </div>

  </PanelUI>

export default SignUpUI2;
