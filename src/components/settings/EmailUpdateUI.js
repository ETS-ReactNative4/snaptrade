import React from 'react';
import { Button,Col,ControlLabel,Form,FormGroup,FormControl,Glyphicon } from 'react-bootstrap';

const EmailUpdateUI = ({email, isEmailEdit, onEmailEdit, onEmailUpdate, onEmailUpdateSubmit}) =>
  <Form horizontal>
		<FormGroup controlId="formHorizontalEmail">
			<Col componentClass={ControlLabel} sm={2}>
				Email
			</Col>
			<Col sm={10}>
        {
          ! isEmailEdit &&
          <p className="form-control-static">{email}
          <span style={{'marginLeft' : '20px'}}></span>
          <a href='#email' onClick={onEmailEdit}>
          <Glyphicon glyph="pencil" />
          </a>
          </p>
        }
        {
          isEmailEdit &&
  				<FormControl type="email" placeholder="Email" value={email}
            onChange={onEmailUpdate} />
        }
  			</Col>
		</FormGroup>

    {
      isEmailEdit &&
  		<FormGroup>
  			<Col smOffset={2} sm={10}>
  				<Button bsStyle="primary" type="submit" onClick={onEmailUpdateSubmit}>Update</Button>
  			</Col>
  		</FormGroup>
    }
	</Form>

export default EmailUpdateUI;
