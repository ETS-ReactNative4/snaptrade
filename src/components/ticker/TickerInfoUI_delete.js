import React from 'react';
import Format from '../common/Format.js';
import {Grid, Row, Col, Panel} from 'react-bootstrap';

const TickerInfoUI = ({tickerInfo}) =>

  <div>
  <h3>Summary</h3>

<Grid className="tickerTbl">
  <Row className="show-grid">
      <Col><span className="tickerLabel">Time:</span>{tickerInfo.realtime_trade_date_formatted}, {tickerInfo.realtime_trade_time_formatted}</Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Price:</span>Current: {tickerInfo.close}, Hi: {tickerInfo.realtime_high}, Low: {tickerInfo.realtime_low}, Open: {tickerInfo.realtime_open}</Col>
  </Row>
  <Row className="show-grid">
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
  <Row className="show-grid">
      <Col><span className="tickerLabel">52 Week range:</span>{tickerInfo.low_price_52week} - {tickerInfo.high_price_52week}, 14 Day RSI: {tickerInfo.rsi_14_day}{"\n"}
    <span className={tickerInfo.rsi_14_day >= 80 ? 'text-danger' : 'text'}>
      {tickerInfo.rsi_14_day >= 80 ? '(Overbought)':''} {tickerInfo.rsi_14_day <= 20 ? '(Oversold)':''}
    </span><br/>
    <small>excluding todays price</small></Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Volume:</span>{tickerInfo.volume_formatted}</Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Volume Gains:</span><span className={tickerInfo.volume_pct_increase_over_avg < 0 ? 'text-danger' : 'text-success'}>
       {Format.percent(tickerInfo.volume_pct_increase_over_avg)}
      </span><br/>
      <small>Based on projected EOD vol compared to 30d Avg</small></Col>
  </Row>
  <Row className="show-grid">
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
      <Col><span className="tickerLabel">Market Cap:</span>{tickerInfo.market_cap}, Stock Exchange: {tickerInfo.stock_exchange}</Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Price to Earnings:</span>{tickerInfo.price_to_earnings >0 ? tickerInfo.price_to_earnings : 'NA'},
      Is in SP 500? {tickerInfo.is_sp_500 === 'N' ? 'No': 'Yes'}</Col>
  </Row>
  <Row className="show-grid">
      <Col><span className="tickerLabel">Sector:</span>{tickerInfo.sector}, {tickerInfo.industry}</Col>
  </Row>
</Grid>


</div>

export default TickerInfoUI;
