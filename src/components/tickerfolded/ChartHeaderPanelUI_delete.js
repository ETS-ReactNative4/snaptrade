  import React from 'react';
import { Button } from 'react-bootstrap';
import Format from '../common/Format.js'

const ChartHeaderPanelUI = ({anonymous, ticker, tickerInfo, onWatchClick, onShareClick}) =>

  <div>

    <h3 className="company-name hide">{tickerInfo ? (tickerInfo.company_name + ' (' + ticker + ')') : ticker}</h3>
    <h3 className="company-name">{tickerInfo.company_name}</h3>
  </div>

export default ChartHeaderPanelUI;
