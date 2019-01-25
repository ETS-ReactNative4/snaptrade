import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const ThreeDaysTrendSelectBoxUI = ({selected3daysTrendId, on3daysTrendChange}) =>
  <Form inline>
    <small>3d Trend<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selected3daysTrendId} onChange={on3daysTrendChange}>
    <option value="-1">All</option>
    <option value="Rising"> Rising </option>
    <option value="Falling"> Falling </option>
    </select>
    </FormGroup>
  </Form>

export default ThreeDaysTrendSelectBoxUI;
