import React from 'react';
import { Glyphicon,Table, Popover, OverlayTrigger } from 'react-bootstrap';
import TickerPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'
import HeaderCellSortUI from '../widgets/table/HeaderCellSortUI.js'
import HeaderCellUI from '../widgets/table/HeaderCellUI.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'
import TickerCellUI from '../widgets/table/TickerCellUI.js'
import DataCellUI from '../widgets/table/DataCellUI.js'

const TickerScannerTableUI = ({anonymous, tickerList, onRowTickerClick,
  onTickerFold, onTickerUnfold, onRowWatchClick, onScrollToSignUp,
  sortColumn, sortOrder, onSort, runTime}) =>
  <Table>
    <ScannerTableHeaderUI
      anonymous={anonymous}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSort={onSort}
      runTime={runTime}
    />
    {
      tickerList.map((ticker, i) =>
        <tbody key={i}>
          <ScannerTableRowUI
            anonymous={anonymous}
            ticker={ticker}
            onRowTickerClick={onRowTickerClick}
            onRowWatchClick={onRowWatchClick}
            onScrollToSignUp={onScrollToSignUp}
          />
          { ticker.signalList &&
            <ScannerTableSignalRowUI
              anonymous={anonymous}
              ticker={ticker}
              signalList={ticker.signalList}
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


const ScannerTableHeaderUI = ({anonymous,
  sortColumn, sortOrder, onSort,
  runTime}) =>
  <tbody>
    <tr>
      <HeaderCellSortUI
        label1='Ticker'
        columnCode='ticker' align='text-left'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
      <HeaderCellUI label1='Company' align='text-left' />
      <HeaderCellUI label1='Last Day' label2='Price' align='text-right' />
      <HeaderCellUI label1='Last Day' label2='% Chg' align='text-right' />
      <HeaderCellUI label1='3d Chg%' align='text-right' />
      <HeaderCellUI label1='Last Day' label2='Volume' align='text-right' />
      <HeaderCellUI label1='P/E' align='text-right' />
      <HeaderCellUI label1='Market Cap' align='text-right' />
      <HeaderCellUI label1='Watch' align='text-center' />
    </tr>
  </tbody>

const ScannerTableRowUI = ({anonymous, ticker, onRowTickerClick,
  onRowWatchClick, onScrollToSignUp}) =>
  <tr>
    <TickerCellUI ticker={ticker.ticker} id={ticker.ticker}
      signalList={ticker.signalList} onRowTickerClick={onRowTickerClick} />
    <DataCellUI
      value={ticker.comp_name}
      details={ticker.sector}
    />
    <ValueChangeCellUI value={ticker.close}
    />
    <ValueChangeCellUI changePercent={ticker.price_pct_increase_over_last_day}/>

    <ValueChangeCellUI changePercent={ticker.price_pct_increase_over_3days}
    />
    <DataCellUI align='text-right' value={ticker.formatted_volume} />
    <DataCellUI align='text-right' value={ticker.price_to_earnings} />
    <DataCellUI align='text-right' value={ticker.formatted_market_cap} />

    <td className='text-center'>
      { anonymous &&
        <a href='#signup' onClick={onScrollToSignUp}>
        <Glyphicon glyph="plus" data-ticker={ticker} /></a>
      }
      { !anonymous && ticker.is_in_watchlist === 0 &&
        <a href='#watch' onClick={onRowWatchClick}>
        <Glyphicon glyph="plus" data-ticker={ticker} /></a>
      }
      { !anonymous && ticker.is_in_watchlist !== 0 &&
        <Glyphicon glyph="ok" />
      }
    </td>
  </tr>

  const ScannerTableSignalRowUI = ({ signalList, anonymous, ticker }) =>
    <tr>
      <td colSpan='13'>
        <TickerPanel
          anonymous={anonymous}
          collapsed='true'
          ticker={ticker.ticker}
        />
      </td>
    </tr>

export default TickerScannerTableUI;
