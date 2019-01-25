import React from 'react';
import { Button,Col,ControlLabel,Form,FormGroup,FormControl,Glyphicon } from 'react-bootstrap';

const PasswordUpdateUI = ({password, isPasswordEdit, onPasswordEdit, onPasswordUpdate, onPasswordUpdateSubmit}) =>
  <Form horizontal>
		<FormGroup controlId="formHorizontalPassword">
			<Col componentClass={ControlLabel} sm={2}>
				Password
			</Col>
			<Col sm={10}>
        {
          ! isPasswordEdit &&
          <p className="form-control-static">********
          <span style={{'marginLeft' : '20px'}}></span>
          <a href='#password' onClick={onPasswordEdit}>
          <Glyphicon glyph="pencil" />
          </a>
          </p>
        }
        {
          isPasswordEdit &&
  				<FormControl type="password" placeholder="Password" value={password}
            onChange={onPasswordUpdate} />
        }
  			</Col>
		</FormGroup>

    {
      isPasswordEdit &&
  		<FormGroup>
  			<Col smOffset={2} sm={10}>
  				<Button bsStyle="primary" type="submit" onClick={onPasswordUpdateSubmit}>Update</Button>
  			</Col>
  		</FormGroup>
    }
	</Form>

export default PasswordUpdateUI;
