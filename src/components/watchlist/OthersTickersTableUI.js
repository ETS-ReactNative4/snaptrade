import React from 'react';
import { Glyphicon,Table, Popover, OverlayTrigger } from 'react-bootstrap';
import TickerPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'
import TickerCellUI from '../widgets/table/TickerCellUI.js'
import HeaderCellSortUI from '../widgets/table/HeaderCellSortUI.js'
import ValueChangeCellUI from '../widgets/table/ValueChangeCellUI.js'

const OthersTickersTableUI = ({anonymous, runTime, othersTickerList,
    onRowTickerClick, onRowWatchClick, onRowSignalClick, onScrollToSignUp,
    sortColumn, sortOrder, onSort, onSignalExpand, onSignalCollapse}) =>
  <Table responsive>
    <OthersTickersTableHeaderUI
      anonymous={anonymous}
      runTime={runTime}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSort={onSort}
    />
    {
      othersTickerList.map((othersTicker, i) =>
        <tbody key={i}>
          <OthersTickersTableRowUI
            anonymous={anonymous}
            item={othersTicker}
            onRowTickerClick={onRowTickerClick}
            onRowWatchClick={onRowWatchClick}
            onRowSignalClick={onRowSignalClick}
            onScrollToSignUp={onScrollToSignUp}
            onSignalExpand={onSignalExpand}
            onSignalCollapse={onSignalCollapse}
          />
          { othersTicker.signalList &&
            <GainTableSignalRowUI
              anonymous={anonymous}
              ticker={othersTicker.ticker}
              signalList={othersTicker.signalList}
            />
          }
        </tbody>
      )
    }
  </Table>

const tooltips = {
     trade_status: (<Popover id="trade_status"><span>This section shows few swing trades from our members replicated thru paper-trades. Trade status can be Watching, Holding or Sold. Before buying it is being watched. After that when buy/sale happens status changes</span></Popover>),
     gain_pct_txn: (<Popover id="gain_pct_txn"><span>It tracks gain % after stock is bought.  After it is sold the final gain is calculated</span></Popover>),
};

let truncateString = {
        'width': '100px',
        'whiteSpace': 'nowrap',
        'overflow': 'hidden',
        'textOverflow': 'ellipsis'
}

const OthersTickersTableHeaderUI = ({anonymous, runTime,
    sortColumn, sortOrder, onSort}) =>
  <tbody>
    <tr>
      <HeaderCellSortUI
        label1='Ticker'
        columnCode='ticker' align='text-left'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
      <th className='text-right'>Trade<br/>Status {' '}
      <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.trade_status}>
        <Glyphicon glyph="info-sign" className='text-muted' />
      </OverlayTrigger>
      </th>
      <th className='text-left'>Comments</th>
      <th className='text-right'>Current Price</th>

      <HeaderCellSortUI
        label1='Chg' label2=''
        columnCode='price_pct_increase_over_last_day' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

    {/*  <HeaderCellSortUI
        label1='Chg% since added'
        columnCode='realtime_gain_since_added_to_watchlist' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
    */}
      <HeaderCellSortUI
        label1='3d Chg%'
        columnCode='price_pct_increase_over_3days' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

{/*      <HeaderCellSortUI
        label1='14d Chg%'
        columnCode='price_pct_increase_over_14days' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
*/}
      <th className='text-right'>Volume</th>
      <th className='text-right'>Target Buy<br/> Price</th>
      <th className='text-right'>Buy Price</th>
      <th className='text-right'>Buy Date</th>
      <th className='text-right'>Sale Price</th>
      {/* <th className='text-right'>Sale Date</th> */}
      <th className='text-right'>Gain %{' '}
      <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.gain_pct_txn}>
        <Glyphicon glyph="info-sign" className='text-muted' />
      </OverlayTrigger>
      </th>
      <th className='text-right'>Community<br/> Sentiment</th>

    </tr>
  </tbody>

const OthersTickersTableRowUI = ({item, onRowTickerClick, onRowWatchClick,
  onRowSignalClick, onScrollToSignUp, onSignalExpand, onSignalCollapse}) =>
  <tr>
    <TickerCellUI ticker={item.ticker}
      signalList={item.signalList} onRowTickerClick={onRowSignalClick} />



    <td className='text-right'>{item.status}</td>
    <td className='text-left'>
      {
        item.expanded &&
        <div style={{'width':'400px'}}>{item.comments}</div>
      }
      {
        item.expanded &&
        <a href='#less' onClick={onSignalCollapse} data-signal_id={item.watchlist_id}>less</a>
      }
      {
        ! item.expanded &&
        <div style={truncateString}>{item.comments}</div>
      }
      {
        item.comments && ! item.expanded &&
        <a href='#more' onClick={onSignalExpand} data-signal_id={item.watchlist_id}>more</a>
      }
    </td>

    <td className='text-right'>
    <small>{Format.value(item.close)}</small>
    </td>

    <ValueChangeCellUI change={item.price_increase_over_last_day} changePercent={item.price_pct_increase_over_last_day} />
    <ValueChangeCellUI changePercent={item.price_pct_increase_over_3days} />

    <td className='text-right'>
    {item.eod_volume_formatted !== 0 ? item.eod_volume_formatted : 'NA'} {"\n"}
    <span className={item.gain_volume_percentage < 0 ? 'text-danger' : 'text-success'}>
      <br/><small>{Format.percent(item.gain_volume_percentage)}</small>
    </span>
    </td>

    <td className='text-right'>{item.target_buy_price}</td>

    <td className='text-right'>
    {Format.float(item.buy_price)}
    </td>
    <td className='text-right'>{item.buy_date}</td>
    <td className='text-right'>{item.sale_price}</td>
    {/*<td className='text-right'>{item.sale_date}</td> */}
    <td className='text-right'>
    <span className={item.gain_percentage_txn < 0 ? 'text-danger' : 'text-success'}>
      <strong>
        {item.gain_percentage_txn}
        </strong>
    </span>
    </td>
    <td className='text-right'>
      <Glyphicon glyph="thumbs-up" className='text-muted' />
      {item.up_count}{' '}
      <Glyphicon glyph="thumbs-down" className='text-muted' />
        {item.down_count}
    </td>
  </tr>

const GainTableSignalRowUI = ({ signalList, anonymous, ticker }) =>
  <tr>
    <td colSpan='11'>

      <TickerPanel
        anonymous={anonymous}
        collapsed='true'
        ticker={ticker}
      />


    </td>
  </tr>

export default OthersTickersTableUI;
