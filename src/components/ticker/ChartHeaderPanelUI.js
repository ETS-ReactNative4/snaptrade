import React from 'react';
import {Button} from 'react-bootstrap';
import Format from '../common/Format.js'
import LikePanel from './LikePanel.js';

const ChartHeaderPanelUI = ({
                                context, anonymous, ticker, tickerInfo, signalList, intraDay, onShareClick, onIntraDayClick, onDailyChartClick,
                                indicator, onShow50dSMAClick, onShow100dSMAClick, onShow50dEMAClick, onShow100dEMAClick, onShowMACDClick, onShowRSIClick, onShowCandlestickClick
                            }) =>

    <div>
        <a name="Pricechangesincelastearnings"/>
        <div className="tag-container pull-left">
            <div className={intraDay ? 'tag' : 'tag selected'}><a href='#' onClick={onDailyChartClick}>Daily Chart</a>
            </div>
            <div className={intraDay ? 'tag selected' : 'tag'}><a href='#' onClick={onIntraDayClick}>Intraday</a></div>
        </div>
        <div className='tag-container pull-right'>{context.latestSignal}</div>
        {/*
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation" className={intraDay ? '':'active'}>
          <a href="#dailyChart" onClick={onDailyChartClick} role="tab" data-toggle="tab">Daily Chart</a>
        </li>
        <li role="presentation" className={intraDay ? 'active':''}>
          <a href="#intraDay" onClick={onIntraDayClick} role="tab" data-toggle="tab">Intraday</a>
        </li>
      </ul>
      */}

        <div className='clearfix' style={{'marginTop': '10px'}}></div>

        {
            !intraDay &&
            <div className="tag-container">
                <div className={indicator === '50dsma' ? 'tag selected' : 'tag'}><a href='#'
                                                                                    onClick={onShow50dSMAClick}>50d
                    SMA</a></div>
                <div className={indicator === '100dsma' ? 'tag selected' : 'tag'}><a href='#'
                                                                                     onClick={onShow100dSMAClick}>100d
                    SMA</a></div>
                <div className={indicator === '50dema' ? 'tag selected' : 'tag'}><a href='#'
                                                                                    onClick={onShow50dEMAClick}>50d
                    EMA</a></div>
                <div className={indicator === '100dema' ? 'tag selected' : 'tag'}><a href='#'
                                                                                     onClick={onShow100dEMAClick}>100d
                    EMA</a></div>
                <div className={indicator === 'candlestick' ? 'tag selected' : 'tag'}><a href='#'
                                                                                         onClick={onShowCandlestickClick}>Candlestick</a>
                </div>
                {/*
          <button  style={{'marginRight': '10px'}} className="btn btn-primary" onClick={onShowRSIClick}>RSI</button>
          */}
                <div className={indicator === 'macd' ? 'tag selected' : 'tag'}><a href='#'
                                                                                  onClick={onShowMACDClick}>MACD</a>
                </div>
            </div>
        }
        <div className='clearfix' style={{'marginTop': '5px'}}></div>
    </div>

export default ChartHeaderPanelUI;
