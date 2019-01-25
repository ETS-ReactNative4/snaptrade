import React from 'react';
import Constants from '../../common/Constants.js';
import { Glyphicon, OverlayTrigger, Table, Popover } from 'react-bootstrap'

/*
const TickerPopoverUI = ({ticker}) =>
  <a href={'/ticker/' + ticker}>{ticker}</a>
*/

const TickerPriceQtyPopoverUI = ({ticker, company_name}) =>
  <OverlayTrigger
    trigger={['click']}
    placement='left'
    overlay={
      <Popover id={ticker} title={company_name ? company_name : ticker} bsClass='ticker popover'>
      <img src={ Constants.CHART_IMG_URL + ticker + '.png'} style={{maxWidth: '360px'}} />
      </Popover>
    }
    >
    <Glyphicon glyph="usd" data-ticker={ticker} />
  </OverlayTrigger>

export default TickerPriceQtyPopoverUI;
