import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const PriceSelectBoxUI = ({selectedPriceId, onPriceChange}) =>
  <Form inline>
    <small>Price<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selectedPriceId} onChange={onPriceChange}>
    <option value="-1">All</option>
  <option value="> $100"> >$100 </option>
  <option value="$50-$100"> $50-$100 </option>
  <option value="$10-$50"> $10-$50 </option>
  <option value="< $10"> less than $10 </option>
    </select>
    </FormGroup>
  </Form>

export default PriceSelectBoxUI;
