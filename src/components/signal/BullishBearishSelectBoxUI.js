import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const BullishBearishSelectBoxUI = ({trend, onTrendChange}) =>
  <Form inline>
    <small>Trend<br/></small>
    <FormGroup controlId="sl_trend_select">
    <select className='form-control' value={trend} onChange={onTrendChange}>
      <option value="bullish">Bullish</option>
      <option value="bearish">Bearish</option>
    </select>
    </FormGroup>
  </Form>

export default BullishBearishSelectBoxUI;
