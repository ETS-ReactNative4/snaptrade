import React from 'react';
import Constants from '../common/Constants.js';
import { OverlayTrigger, Table, Popover, Tooltip } from 'react-bootstrap'

const TickerPopoverUI = ({ticker, company_name, placement, is_news_today, latest_news_title}) =>
  <span>
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={placement ? placement : "right"}
      overlay={
        <Popover id={ticker} title={company_name ? company_name : ticker} bsClass='ticker popover'>
        <img src={ Constants.CHART_IMG_URL + ticker + '.png'} style={{maxWidth: '360px'}} />
        </Popover>
      }
      >
      <span>
      {/*
      <a href={'/ticker/' + ticker}>
      </a>
      */}
      {ticker}
      </span>
    </OverlayTrigger>
    {
      latest_news_title &&
      <OverlayTrigger trigger={['hover', 'focus']} placement={"top"} overlay=
          {<Popover id="news_tooltip">{latest_news_title}</Popover>}
        >
        <span className='text-muted'>{' '}<span className='glyphicon glyphicon-star'></span></span>
      </OverlayTrigger>
    }
  </span>

export default TickerPopoverUI;
