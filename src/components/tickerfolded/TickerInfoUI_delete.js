import React from 'react';
import Format from '../common/Format.js';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import ToolTipUI from '../widgets/ToolTipUI.js'
import ValueChangeUI from '../widgets/ValueChangeUI.js'

const TickerInfoUI = ({tickerInfo}) =>
<div>

<Grid style={{'width':'auto'}}>
  <Row>
      <Col><span className="tickerLabel">Price Gains:</span>1d{': '}
      <span className={tickerInfo.price_pct_increase_over_last_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(tickerInfo.price_pct_increase_over_last_day)}
      </span>,{' '}
      3d{': '}
      <span className={tickerInfo.price_pct_increase_over_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(tickerInfo.price_pct_increase_over_3days)}
      </span>,{' '}
      7d{': '}
      <span className={tickerInfo.gain_price_percentage_7days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(tickerInfo.gain_price_percentage_7days)}
      </span>,{' '}
      14d{': '}
      <span className={tickerInfo.price_pct_increase_over_14days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(tickerInfo.price_pct_increase_over_14days)}
      </span><br/>
      <small>excluding todays price</small></Col>
  </Row>
  <Row className="show-grid hide">
      <Col><span className="tickerLabel">52 Week range:</span>{tickerInfo.low_price_52week} - {tickerInfo.high_price_52week}, 14 Day RSI: {tickerInfo.rsi_14_day}{"\n"}
    <span className={tickerInfo.rsi_14_day >= 80 ? 'text-danger' : 'text'}>
      {tickerInfo.rsi_14_day >= 80 ? '(Overbought)':''} {tickerInfo.rsi_14_day <= 20 ? '(Oversold)':''}
    </span><br/>
    <small>excluding todays price</small></Col>
  </Row>
  <Row className="show-grid hide">
      <Col><span className="tickerLabel">Average Vol(30d):</span>{tickerInfo.avg_volume_30_formatted}, Avg Vol Trend:
        3d: <span className={tickerInfo.gain_avg_volume_percentage_3days < 0 ? 'text-danger' : 'text-success'}>
         {Format.percent(tickerInfo.gain_avg_volume_percentage_3days)}
       </span>,
       7d: <span className={tickerInfo.gain_avg_volume_percentage_7days < 0 ? 'text-danger' : 'text-success'}>
         {Format.percent(tickerInfo.gain_avg_volume_percentage_7days)}
       </span><br/>
       <small>
         Calculated comparing 30day avg volume of today with 3d or 7d before
       </small></Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Stock Exchange:</span>{tickerInfo.stock_exchange}</Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel"> Is in SP 500?</span>{tickerInfo.is_sp_500 === 'N' ? 'No': 'Yes'}</Col>
  </Row>
  <Row className="show-grid">
      <Col><a href={'/ticker/' + tickerInfo.ticker} className="btn btn-primary">View More Details</a><br/></Col>
  </Row>
</Grid>


</div>

const RowUI = ({label, tooltipId, tooltip, children, nodetails}) =>
  <tbody>
  {
    !nodetails &&
    <tr>
      <td className="text-nowrap" style={{verticalAlign: 'top'}}>
        {label}
        {
          tooltip &&
          <span>{' '}
            <ToolTipUI tooltipId={tooltipId} tooltip={tooltip} />
          </span>
        }
      </td>
      <td style={{width:'15px'}}></td>
      <td className="text-right text-nowrap">{children}</td>
    </tr>
  }
  </tbody>

export default TickerInfoUI;
