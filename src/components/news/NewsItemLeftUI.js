import React from 'react';
import { DotLoader } from 'react-spinners';
import PanelUI from '../widgets/panel/PanelUI.js'
import { Link } from "react-router-dom";
import { OverlayTrigger, Popover } from 'react-bootstrap'
import Constants from '../common/Constants.js';
import ValueChangeUI from '../widgets/ValueChangeUI.js'

const NewsItemLeftUI = ({item, showTicker, smallImage}) =>
  <div className="col-sm-3" style={{paddingRight: '5px'}}>
    <h4>
      {
        showTicker &&
        <span>
          <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={<Popover id='tooltipId'><span>{item.company_name}</span></Popover>}>
            <a href={'/ticker/' + item.ticker}>{item.ticker}</a>
          </OverlayTrigger>
          {' '}
          <small><ValueChangeUI changePercent={item.price_pct_increase_over_last_day} /></small>
        </span>
      }
    </h4>
    <img src={'https://s3.amazonaws.com/img-snaptrade-us' + item.image_file_link}
      className="img-responsive img-rounded news-pic"
      style={{width: (smallImage && 100)}}
    />
  </div>

export default NewsItemLeftUI;
