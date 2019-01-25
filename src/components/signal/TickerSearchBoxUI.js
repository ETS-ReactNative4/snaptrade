import React from 'react';
import { Form } from 'react-bootstrap';

const TickerSearchBoxUI = ({ticker, onTickerChange}) =>
  <Form inline>
    <small>Ticker<br/></small>
    <input type="text" id="sl_ticker_search"
      className="form-control"
      value={ticker}
      onChange={onTickerChange} />
    {' '}
  </Form>

export default TickerSearchBoxUI;
