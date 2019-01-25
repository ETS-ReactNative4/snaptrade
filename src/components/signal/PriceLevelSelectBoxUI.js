import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const PriceSelectBoxUI = ({selectedPriceLevelId, onPriceLevelChange}) =>
  <Form inline>
    <small>Price Level<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selectedPriceLevelId} onChange={onPriceLevelChange}>
    <option value="-1">All</option>
  <option value="Close to 52Wk Hi"> Close to 52Wk Hi </option>
  <option value="Close to 52Wk Low"> Close to 52Wk Low </option>
  <option value="Middle of the price range"> Middle of the price range </option>
    </select>
    </FormGroup>
  </Form>

export default PriceSelectBoxUI;