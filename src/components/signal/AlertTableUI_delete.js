import React from 'react';
import { Glyphicon,Table, Popover, OverlayTrigger } from 'react-bootstrap';
import TickerPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'
import TickerCellUI from '../widgets/table/TickerCellUI.js'

const AlertTableUI = ({anonymous, signalList,
  onRowSignalClick, onRowWatchClick, onScrollToSignUp,
  sortColumn, sortOrder, onSort, runTime}) =>
  <Table responsive>
    <AlertTableHeaderUI
      anonymous={anonymous}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSort={onSort}
      runTime={runTime}
    />
    {
      signalList.map((signal, i) =>
        <tbody key={i}>
          <AlertTableRowUI
            anonymous={anonymous}
            rownum={i}
            signal={signal}
            onRowSignalClick={onRowSignalClick}
            onRowWatchClick={onRowWatchClick}
            onScrollToSignUp={onScrollToSignUp}
          />
          { signal.signalList &&
            <SignalTableSignalRowUI
              anonymous={anonymous}
              ticker={signal.ticker}
              signalList={signal.signalList}
            />
          }
        </tbody>
      )
    }
  </Table>

const tooltips = {
  signal_strength: (<Popover id="signal_strength"><span>Bullish - up arrow, green<br/>Bearish - down arrow, red<br/><br/>Strong - 3 arrows<br/>Medium - 2 arrows<br/>Weak - 1 arrow</span></Popover>),
  technical_signal: (<Popover id="technical_signal"><span>Technical signal that was matched with the price/volume action based on last day price/volume</span></Popover>),
  last_day_price: (<Popover id="last_day_price"><span>Last day EOD(end of the day) price.  Same as current price column after 5:30pm </span></Popover>),
  last_day_vol: (<Popover id="last_day_vol"><span>Last Day EOD Volume</span></Popover>),
  current_vol: (<Popover id="last_day_vol"><span>Current trading day real-time volume and % gain compared to 30d avg volume based on projected EOD volume</span></Popover>),
  last_price: (<Popover id="last_price"><span>Current day price (upto 5 minutes delayed)</span></Popover>),
  chg_pct: (<Popover id="last_price"><span>Gain(loss) in price in the the last 3 days/14 days as of last day</span></Popover>),
  vol_chg_pct: (<Popover id="last_price"><span>Gain(loss) in average 30day volume during last 3 days/14 days as of last day</span></Popover>),
  watch: (<Popover id="last_price"><span>Add to your watchlist (requires login)</span></Popover>),
};


const AlertTableHeaderUI = ({anonymous,
  sortColumn, sortOrder, onSort,
  runTime}) =>
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

      <th className='text-left' style={{'width': '1%'}}>Signal{' '}
        <span className='text-nowrap'>Strength{' '}
          <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.signal_strength}>
            <Glyphicon glyph="info-sign" className='text-muted' />
          </OverlayTrigger>
        </span>
      </th>

      <th className='text-left text-nowrap' style={{'width': '1%'}}>Technical Signal{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.technical_signal}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <th className='text-right'>
        <a href='#sort' onClick={onSort} data-column='price_gain_percentage' data-order={sortOrder}>
          <span className='text-nowrap' onClick={onSort} data-column='price_gain_percentage' data-order={sortOrder}>
            {
              sortColumn === 'price_gain_percentage' && sortOrder === 'asc' &&
              <Glyphicon glyph="chevron-down" className='text-muted' />
            }
            {
              sortColumn === 'price_gain_percentage' && sortOrder === 'desc' &&
              <Glyphicon glyph="chevron-up" className='text-muted' />
            }
            {' '}Last Day
          </span><br/>
          Price
        </a>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.last_day_price}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

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

      <th className='text-right'>
        <a href='#sort' onClick={onSort} data-column='volume_gain_percentage' data-order={sortOrder}>
          <span className='text-nowrap' onClick={onSort} data-column='volume_gain_percentage' data-order={sortOrder}>
            {
              sortColumn === 'volume_gain_percentage' && sortOrder === 'asc' &&
              <Glyphicon glyph="chevron-down" className='text-muted' />
            }
            {
              sortColumn === 'volume_gain_percentage' && sortOrder === 'desc' &&
              <Glyphicon glyph="chevron-up" className='text-muted' />
            }
            {' '}Last Day
          </span><br/>
          Vol
        </a>{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.last_day_vol}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

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

      <th className='text-right text-nowrap' style={{'width': '1%'}}>Watch{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.watch}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

    </tr>
  </tbody>

const AlertTableRowUI = ({anonymous, signal, onRowSignalClick, onRowWatchClick, onScrollToSignUp, rownum}) =>
  <tr>
    <TickerCellUI ticker={signal.ticker} id={signal.id}
      signalList={signal.signalList} onRowTickerClick={onRowSignalClick} />

    <td className='text-left'>{signal.comp_name}
      <br/><small className='text-right'>{signal.sector}</small>
    </td>

    <td className='text-left'>
      {/*
        <span className={signal.trend == 'bullish' ? 'text-success text-right' : 'text-danger'}>
          {signal.signal_strength} {signal.trend} <span className='glyphicon glyphicon-star'></span>
        </span>
      */}
      {
        signal.trend === 'bullish' &&
        <span className='text-success'>
          <span className='glyphicon glyphicon-arrow-up'></span>
          {signal.signal_strength==='medium' && <span className='glyphicon glyphicon-arrow-up'></span>}
          {signal.signal_strength==='strong' && <span>
            <span className='glyphicon glyphicon-arrow-up'></span><span className='glyphicon glyphicon-arrow-up'></span>
          </span>}
        </span>
      }
      {
        signal.trend === 'bearish' &&
        <span className='text-danger'>
          <span className='glyphicon glyphicon-arrow-down'></span>{' '}
          {signal.signal_strength==='medium' && <span className='glyphicon glyphicon-arrow-down'></span>}
          {signal.signal_strength==='strong' && <span>
            <span className='glyphicon glyphicon-arrow-down'></span>{' '}<span className='glyphicon glyphicon-arrow-down'></span>
          </span>}
        </span>
      }
    </td>

    <td className='text-left'>
      {signal.rule_name}{' '}
      <OverlayTrigger trigger={['hover', 'focus']} placement="top"
        overlay={
          <Popover id={signal.rule_name}>{signal.rule_desc}</Popover>
        }
      >
        <Glyphicon glyph="info-sign" className='text-muted' />
      </OverlayTrigger>
    </td>

    <td className='text-right'>${signal.close}<br/>
      <small className={signal.price_gain_percentage < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.price_gain_percentage)}
      </small>
    </td>

    <td className='text-right'>${signal.close_formatted !== '0' && signal.close_formatted !== ' ' ? signal.close_formatted : 'NA'}<br/>
      <small className={signal.gain_percentage_from_past_day < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.gain_percentage_from_past_day)}
      </small>
    </td>

    <td className='text-right'>
      <span className={signal.price_pct_increase_over_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.price_pct_increase_over_3days)}
      </span>
    </td>

    <td className='text-right'>
      <span className={signal.price_pct_increase_over_14days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.price_pct_increase_over_14days)}
      </span>
    </td>

    <td className='text-right'>{signal.volume_formatted}<br/>
      <small className={signal.volume_gain_percentage < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.volume_gain_percentage)}
      </small>
    </td>

    <td className='text-right'>{signal.volume_formatted !== '0' && signal.volume_formatted !== ' ' ? signal.volume_formatted : 'NA'}<br/>
      <small className={signal.volume_pct_increase_over_avg < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(signal.volume_pct_increase_over_avg)}
      </small>
    </td>

    <td className='text-center'>
      { anonymous &&
        <a href='#signup' onClick={onScrollToSignUp}>
        <Glyphicon glyph="plus" data-rownum={rownum} data-ticker={signal.ticker} /></a>
      }
      { !anonymous && signal.is_in_watchlist === 0 &&
        <a href='#watch' onClick={onRowWatchClick}>
        <Glyphicon glyph="plus" data-rownum={rownum} data-ticker={signal.ticker} /></a>
      }
      { !anonymous && signal.is_in_watchlist !== 0 &&
        <Glyphicon glyph="ok" />
      }
    </td>
  </tr>

  const SignalTableSignalRowUI = ({ signalList, anonymous, ticker }) =>
    <tr>
      <td colSpan='13'>
        <TickerPanel
          anonymous={anonymous}
          collapsed='true'
          ticker={ticker}
        />
      </td>
    </tr>

export default AlertTableUI;
