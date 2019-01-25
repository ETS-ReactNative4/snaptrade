import React from 'react';
import Format from '../common/Format.js';
import {Row, Col, Panel, Button} from 'react-bootstrap';
import PanelUI from '../widgets/panel/PanelUI.js'
import LikePanel from './LikePanel.js';
import ToolTipUI from '../widgets/ToolTipUI.js'
import ValueChangeUI from '../widgets/ValueChangeUI.js'
import {now} from 'moment';

const SummaryPanelUI = ({context, ticker, tickerInfo, thourslabel, details, onWatchClick, onMoreClick, onLessClick, narrow}) =>
    <div>
        <a name="Price"/>
        <h3 className='pull-left' style={{textTransform: 'uppercase', marginTop: 0}}>
            <strong>{tickerInfo ? (tickerInfo.company_name + ' (' + ticker + ')') : ticker}</strong>
        </h3>
        <div className='pull-right'>
            <div style={{'display': 'inline-block', marginTop: 5}}>
                <LikePanel anonymous={context.anonymous} ticker={ticker}/>
            </div>
            <div style={{display: 'inline-block', width: '20px'}}></div>
            {
                !context.anonymous && tickerInfo && !tickerInfo.is_in_watchlist &&
                <a href='#watch' className='btn btn-primary' onClick={onWatchClick} data-ticker={ticker}>
                    Add to Watchlist
                </a>
            }
            {
                !context.anonymous && tickerInfo && tickerInfo.is_in_watchlist &&
                <span className='button-muted'>In Watch List</span>
            }
        </div>
        <div className='clearfix'/>
        {
            tickerInfo &&
            <div className="row" style={{marginTop: '15px'}}>
                <div className="col-xs-4">
                    <div style={{fontSize: "32px", marginTop: -10}}>
                        <strong style={{lineHeight: 1}}>{Format.value(tickerInfo.close)}</strong>
                    </div>
                    <div style={{fontSize: "24px", marginTop: -10}}>
                        <strong>
                            <ValueChangeUI
                                change={tickerInfo.price_increase_over_last_day}
                                changePercent={tickerInfo.price_pct_increase_over_last_day}
                            />
                        </strong>
                    </div>
                    <div
                        className={context.path.match('/ticker/') && tickerInfo.is_market_hours == '1' ? 'text-muted' : 'text-muted pad-top'}>
                        {tickerInfo.trade_date_formatted}, {tickerInfo.trade_time_formatted}
                    </div>
                    <div style={{fontSize: "18px", marginTop: 0}}
                         className={context.path.match('/ticker/') && thourslabel != "" ? 'visible' : 'hidden'}>
                        <strong style={{lineHeight: 1}}>{Format.value(tickerInfo.off_market_price)}</strong>
                    </div>
                    <div style={{fontSize: "18px", marginTop: -2}}
                         className={context.path.match('/ticker/') && thourslabel != "" ? 'visible' : 'hidden'}>
                        <strong>
                            <ValueChangeUI
                                change={tickerInfo.off_market_price_change}
                                changePercent={tickerInfo.off_market_price_change_pct}
                            />
                        </strong>
                    </div>
                    <div
                        className={context.path.match('/ticker/') && thourslabel != "" ? 'text-muted small-light visible' : 'text-muted small-light hidden'}>
                        {thourslabel}
                    </div>
                </div>

                <div className="row" className="col-xs-8">
                    <div className="col-xs-12 col-sm-6">
                        <table style={{width: '100%'}}>
                            <RowUI
                                label='Range'>{Format.value(tickerInfo.low)} - {Format.value(tickerInfo.high)}</RowUI>
                            <RowUI
                                label='52 week'>{Format.value(tickerInfo.low_price_52week)} - {Format.value(tickerInfo.high_price_52week)}</RowUI>
                            <RowUI label='Open'>{Format.value(tickerInfo.open)}</RowUI>
                            <RowUI label='Volume'>{tickerInfo.volume_formatted}</RowUI>
                            <RowUI label='30d Avg Vol'>{tickerInfo.avg_volume_30_formatted}</RowUI>
                            <RowUI label='Vol Chg' tooltipId='vol'
                                   tooltip='Based on projected EOD volume compared to 30d average'>
                                <ValueChangeUI changePercent={tickerInfo.volume_pct_increase_over_avg}/>
                            </RowUI>

                            <RowUI label='Avg Vol Trend' nodetails={!details}>
                                3d: <span
                                className={tickerInfo.gain_avg_volume_percentage_3days < 0 ? 'text-danger' : 'text-success'}>{Format.percent(tickerInfo.gain_avg_volume_percentage_3days)}</span>,{' '}
                                7d: <span
                                className={tickerInfo.gain_avg_volume_percentage_7days < 0 ? 'text-danger' : 'text-success'}>{Format.percent(tickerInfo.gain_avg_volume_percentage_7days)}</span><br/>
                                <small>(Calculated comparing 30day avg volume<br/>of today with 3d or 7d before)</small>
                            </RowUI>
                        </table>
                    </div>

                    <div className="col-xs-12 col-sm-6">
                        <table style={{width: '100%'}}>
                            <RowUI
                                label='PE Ratio'>{tickerInfo.price_to_earnings > 0 ? tickerInfo.price_to_earnings : '-'}</RowUI>
                            <RowUI label='EPS'>{tickerInfo.latest_eps > 0 ? tickerInfo.latest_eps : '-'}</RowUI>
                            <RowUI
                                label='Dividend'>{tickerInfo.dividend_amount > 0 ? tickerInfo.dividend_amount : '-'}</RowUI>
                            <RowUI label='14 Day RSI' tooltipId='rsi'
                                   tooltip='Excluding todays price'>{tickerInfo.rsi_14_day}
                                {/*
                <span className={tickerInfo.rsi_14_day >= 80 ? 'text-danger' : 'text'}>
                  {tickerInfo.rsi_14_day >= 80 ? '(Overbought)':''}
                </span>
                */}
                            </RowUI>
                            <RowUI label='Mkt cap'>{tickerInfo.market_cap}</RowUI>
                            <RowUI label='Next Earnings'>{tickerInfo.next_earnings_date}</RowUI>
                        </table>
                    </div>
                </div>
            </div>

            /* ! details && <a href='#' onClick={onMoreClick}>More</a> }
            { details && <a href='#' onClick={onLessClick}>Less</a> */
        }
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
                        <ToolTipUI tooltipId={tooltipId} tooltip={tooltip}/>
          </span>
                }
            </td>
            <td style={{width: '15px'}}></td>
            <td className="text-right text-nowrap">{children}</td>
        </tr>
    }
    </tbody>

const ActionBoxUI = (context, ticker, tickerInfo, onWatchClick) =>
    <div style={{'display': 'inline-block'}}>
        <div style={{'display': 'inline-block'}}>
            <LikePanel anonymous={context.anonymous} ticker={ticker}/>
        </div>
        <div style={{display: 'inline-block', width: '20px'}}></div>
        {
            !context.anonymous && tickerInfo && tickerInfo.is_in_watchlist === 0 &&
            <a href='#watch' className='button-muted' onClick={onWatchClick} data-ticker={ticker}>
                Add to Watchlist
            </a>
        }
        {
            !context.anonymous && tickerInfo && tickerInfo.is_in_watchlist !== 0 &&
            <span className='button-muted'>In Watch List</span>
        }
    </div>

export default SummaryPanelUI;
