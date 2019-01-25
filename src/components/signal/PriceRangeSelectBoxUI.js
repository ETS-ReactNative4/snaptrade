import React from 'react';
import { Form,FormGroup } from 'react-bootstrap';

const PriceRangeSelectBoxUI = ({priceRangeList, selectedPriceRangeId, onPriceRangeChange}) =>
  <Form inline>
  <small>Price<br/></small>
  <FormGroup controlId="sl_price_range_select">
  <select className='form-control' value={selectedPriceRangeId} onChange={onPriceRangeChange}>
  <option value="-1">All</option>
  {
    priceRangeList.map((priceRange, i) =>
      <option
        value={priceRange.id} key={i}
        data-min-price={priceRange.min_price}
        data-max-price={priceRange.max_price}
      >
        {priceRange.display}
      </option>
    )
  }
  </select>
  </FormGroup>
  </Form>

export default PriceRangeSelectBoxUI;
