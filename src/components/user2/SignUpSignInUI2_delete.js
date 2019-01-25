import React from 'react';
import SignUp from './SignUp2.js';
import SignIn from './SignIn2.js';
import ForgotPasswordPanel from './ForgotPasswordPanel.js';
import {Panel, Button} from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js';

const SignUpSignInUI2 = ({signUp, forgotpwd, sectorList, clickedTicker,
    onSignUpClick, onSignInClick, onPasswordClick, onLogin, onSignUp}) =>
  <div className="signinwidg">
    {
      !forgotpwd && signUp &&
      <PanelUI title='Sign Up'>
        <SignUp sectorList={sectorList} clickedTicker={clickedTicker} onSignUp={onSignUp} />
        <Button bsStyle="link" onClick={onSignInClick} className="pull-right">Already signed up? Login here</Button>
      </PanelUI>
    }
    { !forgotpwd && !signUp &&
      <PanelUI title='Login'>
        <SignIn  onLogin={onLogin} />
        <Button bsStyle="link" onClick={onSignUpClick} className="pull-right">Not signed up? Sign up here</Button>
        <Button bsStyle="link" onClick={onPasswordClick} className="pull-right">Forgot password?</Button>
      </PanelUI>
    }
    {
      forgotpwd &&
      <PanelUI title='Forgot Password'>
        <ForgotPasswordPanel sectorList={sectorList} clickedTicker={clickedTicker} onSignUp={onSignUp} />
        <Button bsStyle="link" onClick={onSignInClick} className="pull-right">Received password? Login here</Button>
      </PanelUI>
    }
  </div>

export default SignUpSignInUI2;
