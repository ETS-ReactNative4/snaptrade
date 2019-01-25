import React from 'react';
import PageUI from '../components/widgets/PageUI.js';
import PanelUI from '../components/widgets/panel/PanelUI.js';
import SignUp2 from '../components/user2/SignUp2.js';
import SignIn2 from '../components/user2/SignIn2.js';
import ForgotPasswordPanel from '../components/user2/ForgotPasswordPanel.js';

const SignInSignUpPageUI = ({context, signUp, forgotpwd,
    onSignUpClick, onSignInClick, onPasswordClick}) =>
  <PageUI>
    <div className='col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4'>
      {
        !forgotpwd && !signUp &&
        <SignIn2
          context={context}
          onSignUpClick={onSignUpClick}
          onPasswordClick={onPasswordClick} />
      }
      {
        !forgotpwd && signUp &&
        <SignUp2
          context={context}
          onSignInClick={onSignInClick} />
      }
      {
        forgotpwd &&
        <ForgotPasswordPanel
          context={context}
          onSignInClick={onSignInClick}/>
      }
    </div>
  </PageUI>

export default SignInSignUpPageUI;
