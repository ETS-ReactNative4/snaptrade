import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const PeSelectBoxUI = ({selectedPEId, onPEChange}) =>
  <Form inline>
    <small>P/E<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selectedPEId} onChange={onPEChange}>
    <option value="-1">All</option>
  <option value="Positive P/E"> Positive P/E </option>
  <option value="Negative P/E"> Negative P/E </option>

    </select>
    </FormGroup>
  </Form>

export default PeSelectBoxUI;