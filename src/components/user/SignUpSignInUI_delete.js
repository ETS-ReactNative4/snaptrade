import React from 'react';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import {Panel, Button} from 'react-bootstrap';

//import { Modal, Button } from 'react-bootstrap';

/*
const SignUpSignInUI = ({signUp, sectorList, clickedTicker,
    onSignUpClick, onSignInClick, onLogin, onSignUp, showSignUpSignInModal, onHideSignUpSignInModal}) =>
  <Modal show={showSignUpSignInModal} onHide={onHideSignUpSignInModal} style={{marginTop:"80px"}}>

    <Modal.Header closeButton>
      <Modal.Title>Sign Up to Track Signals in Your Watch List</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="form-group" style={{'marginTop':'20px'}}>
       {
          signUp &&
          <SignUp sectorList={sectorList} clickedTicker={clickedTicker} onSignUp={onSignUp} /> }
       { !signUp && <SignIn onLogin={onLogin} /> }

       { signUp &&
         <div>
           <Button bsStyle="link" onClick={onSignInClick}>Already signed up? Login here</Button>
        </div>
       }
       { ! signUp &&
         <div>
           <Button bsStyle="link" onClick={onSignUpClick}>Not signed up? Sign up here</Button>
        </div>
       }
      </div>
    </Modal.Body>
  </Modal>

*/

const SignUpSignInUI = ({signUp, sectorList, clickedTicker,
    onSignUpClick, onSignInClick, onLogin, onSignUp}) =>
  <Panel header='Sign In to Track Signals in Your Watch List' id="signuppanel">
    {
      signUp &&
      <SignUp sectorList={sectorList} clickedTicker={clickedTicker} onSignUp={onSignUp} /> }
    { !signUp && <SignIn  onLogin={onLogin} /> }

    { signUp &&
      <div className='col-xs-12'>
        <Button bsStyle="link" onClick={onSignInClick}>Already signed up? Login here</Button>
      </div>
    }
    { ! signUp &&
      <div className='col-xs-12'>
        <Button bsStyle="link" onClick={onSignUpClick}>Not signed up? Sign up here</Button>
      </div>
    }
  </Panel>


export default SignUpSignInUI;
