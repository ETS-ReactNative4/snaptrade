import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const MarketCapSelectBoxUI = ({selectedMarketCapId, onMarketCapChange}) =>
  <Form inline>
    <small>Market Cap<br/></small>
    <FormGroup controlId="sl_sector_select">
    <select className='form-control' value={selectedMarketCapId} onChange={onMarketCapChange}>
    <option value="-1">All</option>
  <option value="Large Cap"> Large Cap </option>
  <option value="Small Cap"> Small Cap </option>
  <option value="Mid Cap"> Mid Cap </option>

    </select>
    </FormGroup>
  </Form>

export default MarketCapSelectBoxUI;
