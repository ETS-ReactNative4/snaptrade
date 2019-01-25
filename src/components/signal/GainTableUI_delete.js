import React from 'react';
import { Glyphicon,Table } from 'react-bootstrap'
import {Popover, OverlayTrigger} from 'react-bootstrap';
import ChartPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'
import TickerCellUI from '../widgets/table/TickerCellUI.js'

const GainTableUI = ({anonymous, runTime, gainList, onRowSignalClick, onRowWatchClick, onScrollToSignUp,
    sortColumn, sortOrder, onSort }) =>
  <Table responsive>
      <GainTableHeaderUI
        anonymous={anonymous}
        runTime={runTime}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={onSort}
      />
      {
        gainList.map((gain, i) =>
          <tbody key={i}>
            <GainTableRowUI
              anonymous={anonymous}
              rownum={i}
              gain={gain}
              onRowSignalClick={onRowSignalClick}
              onRowWatchClick={onRowWatchClick}
              onScrollToSignUp={onScrollToSignUp}
            />
            { gain.signalList &&
              <GainTableSignalRowUI
                anonymous={anonymous}
                ticker={gain.ticker}
                signalList={gain.signalList}
              />
            }
          </tbody>
        )
      }
  </Table>

  const tooltips = {
       alert_day: (<Popover id="alert_day"><span>First date the technical indicator/signal fired. (Number of trading days passed since then)</span></Popover>),
       last_price: (<Popover id="last_price"><span>Price based on latest quote from today</span></Popover>),
       chg: (<Popover id="chg"><span>Change in price compared to price from last day</span></Popover>),
       chg_pct: (<Popover id="chg_pct"><span>Percentage gain/loss based on change price</span></Popover>),
       gains: (<Popover id="gains"><span>Change in price since technical signal alerted</span></Popover>),
       vol: (<Popover id="vol"><span>Volume based on latest quote from today</span></Popover>),
       current_vol: (<Popover id="last_day_vol"><span>Current trading day real-time volume and % gain compared to 30d avg volume based on projected EOD volume</span></Popover>),
       vol_chg_over_avg: (<Popover id="vol_chg_over_avg"><span>Projected end of day volume compared with 30day average volume</span></Popover>),
       chg_3d: (<Popover id="chg_3d"><span>Change in price in the last 3 days excluding current day</span></Popover>),
       avg_vol_chg_3d: (<Popover id="avg_vol_chg_3d"><span>% Change in avg volume(30d) in the last 3 days excluding current day</span></Popover>),
       watch: (<Popover id="watch"><span>Add this stock to your watchlist. Click watchlist menu link from top right.</span></Popover>),
   };

const GainTableHeaderUI = ({anonymous, runTime,
    sortColumn, sortOrder, onSort }) =>
  <tbody>
    <tr>
      <th className='text-left text-nowrap'>
        <a href='#sort' onClick={onSort} data-column='ticker' data-order={sortOrder}>
          {
            sortColumn === 'ticker' && sortOrder === 'asc' &&
            <Glyphicon glyph="chevron-down" className='text-muted' />
          }
          {
            sortColumn === 'ticker' && sortOrder === 'desc' &&
            <Glyphicon glyph="chevron-up" className='text-muted' />
          }
          {' '}Ticker
        </a>
      </th>

      <th className='text-left'>Company</th>

      <th className='text-right text-nowrap'>
        Alert Date{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.alert_day}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <th className='text-right text-nowrap'>
        <a href='#sort' onClick={onSort} data-column='gain_percentage_from_signal_date' data-order={sortOrder}>
          {
            sortColumn === 'gain_percentage_from_signal_date' && sortOrder === 'asc' &&
            <Glyphicon glyph="chevron-down" className='text-muted' />
          }
          {
            sortColumn === 'gain_percentage_from_signal_date' && sortOrder === 'desc' &&
            <Glyphicon glyph="chevron-up" className='text-muted' />
          }
          {' '}Gain%
        </a>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.gains}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      {/*}
      <th className='text-right'>
        Last Price<br/>
          <span className='text-nowrap'> {runTime}{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.last_price}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
        </span>
      </th>
      */}

      <th className='text-right' style={{'width': '1%'}}>
        <a href='#sort' onClick={onSort} data-column='gain_percentage_from_past_day' data-order={sortOrder}>
          <span className='text-nowrap' onClick={onSort} data-column='gain_percentage_from_past_day' data-order={sortOrder}>
            {
              sortColumn === 'gain_percentage_from_past_day' && sortOrder === 'asc' &&
              <Glyphicon glyph="chevron-down" className='text-muted' />
            }
            {
              sortColumn === 'gain_percentage_from_past_day' && sortOrder === 'desc' &&
              <Glyphicon glyph="chevron-up" className='text-muted' />
            }
            {' '}Current Price
          </span><br/>
          <span className='text-nowrap' onClick={onSort} data-column='gain_percentage_from_past_day' data-order={sortOrder}>
            {runTime}{' '}
          </span>
          <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.last_price}>
            <Glyphicon glyph="info-sign" className='text-muted' />
          </OverlayTrigger>
        </a>
      </th>

      <th className='text-right text-nowrap'>
        <a href='#sort' onClick={onSort} data-column='price_pct_increase_over_3days' data-order={sortOrder}>
          {
            sortColumn === 'price_pct_increase_over_3days' && sortOrder === 'asc' &&
            <Glyphicon glyph="chevron-down" className='text-muted' />
          }
          {
            sortColumn === 'price_pct_increase_over_3days' && sortOrder === 'desc' &&
            <Glyphicon glyph="chevron-up" className='text-muted' />
          }
          {' '}3d Chg%
        </a>
      </th>

      <th className='text-right text-nowrap'>
        <a href='#sort' onClick={onSort} data-column='price_pct_increase_over_14days' data-order={sortOrder}>
          {
            sortColumn === 'price_pct_increase_over_14days' && sortOrder === 'asc' &&
            <Glyphicon glyph="chevron-down" className='text-muted' />
          }
          {
            sortColumn === 'price_pct_increase_over_14days' && sortOrder === 'desc' &&
            <Glyphicon glyph="chevron-up" className='text-muted' />
          }
          {' '}14d Chg%
        </a>
      </th>

      {/*
      <th className='text-right text-nowrap'>
        Chg (3d){' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.chg_3d}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
      */}

      {/*
      <th className='text-right text-nowrap'>
        Chg*{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.chg}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <th className='text-right text-nowrap'>
        Chg%{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.chg_pct}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
      */}

      <th className='text-right'>
        <a href='#sort' onClick={onSort} data-column='volume_pct_increase_over_avg' data-order={sortOrder}>
          <span className='text-nowrap' onClick={onSort} data-column='volume_pct_increase_over_avg' data-order={sortOrder}>
            {
              sortColumn === 'volume_pct_increase_over_avg' && sortOrder === 'asc' &&
              <Glyphicon glyph="chevron-down" className='text-muted' />
            }
            {
              sortColumn === 'volume_pct_increase_over_avg' && sortOrder === 'desc' &&
              <Glyphicon glyph="chevron-up" className='text-muted' />
            }
            {' '}Current
          </span><br/>
          Vol
        </a>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.current_vol}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      {/*
      <th className='text-right text-nowrap'>
        Vol{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.vol}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <th className='text-right text-nowrap'>
        Vol Chg%{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.vol_chg_over_avg}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
      */}

      <th className='text-right'>
        <a href='#sort' onClick={onSort} data-column='gain_avg_volume_percentage_3days' data-order={sortOrder}>
          <span className='text-nowrap' onClick={onSort} data-column='gain_avg_volume_percentage_3days' data-order={sortOrder}>
            {
              sortColumn === 'gain_avg_volume_percentage_3days' && sortOrder === 'asc' &&
              <Glyphicon glyph="chevron-down" className='text-muted' />
            }
            {
              sortColumn === 'gain_avg_volume_percentage_3days' && sortOrder === 'desc' &&
              <Glyphicon glyph="chevron-up" className='text-muted' />
            }
            {' '}3d Avg Vol
          </span><br/>
          Chg%
        </a>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.avg_vol_chg_3d}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <th className='text-right text-nowrap' style={{'width': '1%'}}>
        Watch{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.watch}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
    </tr>
  </tbody>

const GainTableRowUI = ({anonymous, gain, onRowSignalClick, onRowWatchClick, onScrollToSignUp, rownum}) =>
  <tr>
    <TickerCellUI ticker={gain.ticker}
      signalList={gain.signalList} onRowTickerClick={onRowSignalClick} />

    <td className='text-left'>{gain.comp_name}
      <br/><small className='text-right'>{gain.sector}</small>
    </td>

    <td className='text-right'>
      {gain.first_signal_date}<br/><small>({gain.days_passed} days)</small>
    </td>

    <td className='text-right'>
      <span className={gain.gain_percentage_from_signal_date < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.gain_percentage_from_signal_date)}
      </span>
    </td>

    <td className='text-right'>${gain.close_formatted !== '0' && gain.close_formatted !== ' ' ? gain.close_formatted : 'NA'}<br/>
      <small className={gain.gain_percentage_from_past_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.gain_percentage_from_past_day)}
      </small>
    </td>

    <td className='text-right'>
      <span className={gain.price_pct_increase_over_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.price_pct_increase_over_3days)}
      </span>
    </td>

    <td className='text-right'>
      <span className={gain.price_pct_increase_over_14days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.price_pct_increase_over_14days)}
      </span>
    </td>

    {/*
    <td className='text-right'>
      ${gain.close > 0 ? gain.close_formatted : 'NA'}
    </td>

    <td className='text-right'>
      <span className={gain.gain_from_past_day < 0 ? 'text-danger' : 'text-success'}>
        {gain.gain_from_past_day}
      </span>
    </td>

    <td className='text-right'>
      <span className={gain.gain_percentage_from_past_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.gain_percentage_from_past_day)}
      </span>
    </td>
    */}

    {/*
    <td className='text-right'>
      {gain.volume_formatted !== 0 ? gain.volume_formatted : 'NA'}
    </td>
    */}

    <td className='text-right'>{gain.volume_formatted !== '0' && gain.volume_formatted !== ' ' ? gain.volume_formatted : 'NA'}<br/>
      <small className={gain.volume_pct_increase_over_avg < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.volume_pct_increase_over_avg)}
      </small>
    </td>

    <td className='text-right'>
      <span className={gain.gain_avg_volume_percentage_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(gain.gain_avg_volume_percentage_3days)}
      </span>
    </td>

    <td className='text-center'>
      { anonymous &&
        <a href='#signup' onClick={onScrollToSignUp}>
        <Glyphicon glyph="plus" data-rownum={rownum} data-ticker={gain.ticker} /></a>
      }
      { !anonymous && gain.is_in_watchlist === 0 &&
        <a href='#watch' onClick={onRowWatchClick}>
        <Glyphicon glyph="plus" data-rownum={rownum} data-ticker={gain.ticker} /></a>
      }
      { !anonymous && gain.is_in_watchlist !== 0 &&
        <Glyphicon glyph="ok" />
      }
    </td>
  </tr>

const GainTableSignalRowUI = ({ signalList, anonymous, ticker }) =>
  <tr>
    <td colSpan='13'>
      <ChartPanel
        anonymous={anonymous}
        collapsed='true'
        ticker={ticker}
      />
    </td>
  </tr>

export default GainTableUI;
