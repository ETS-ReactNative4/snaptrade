import React from 'react';
import { Glyphicon,Table, Popover, OverlayTrigger } from 'react-bootstrap';
import TickerPanel from '../tickerfolded/TickerPanel.js';
import Format from '../common/Format.js'
import HeaderCellSortUI from '../widgets/table/HeaderCellSortUI.js'
import TickerCellUI from '../widgets/table/TickerCellUI.js'

const WatchListTableUI = ({anonymous, runTime, filteringTagObj, watchList,
    onRowTickerClick, onDeleteWatchlistTickerSubmit, onShowTagsModal, onSignalExpand, onSignalCollapse,
    sortColumn, sortOrder, onSort,
    embeddableTagUuid}) =>
  <Table>
    <WatchListTableHeaderUI
      runTime={runTime}
      filteringTagObj={filteringTagObj}
      sortColumn={sortColumn}
      sortOrder={sortOrder}
      onSort={onSort}
      embeddableTagUuid={embeddableTagUuid}
    />
    {
      watchList.map((watch, i) =>
        <tbody key={i}>
          <WatchListTableRowUI
            filteringTagObj={filteringTagObj}
            item={watch}
            onRowTickerClick={onRowTickerClick}
            onDeleteWatchlistTickerSubmit={onDeleteWatchlistTickerSubmit}
            onShowTagsModal={onShowTagsModal}
            onSignalExpand={onSignalExpand}
            onSignalCollapse={onSignalCollapse}
            embeddableTagUuid={embeddableTagUuid}
          />
          { watch.signalList &&
            <WatchListTableSignalRowUI
              anonymous={anonymous}
              filteringTagObj={filteringTagObj}
              ticker={watch.ticker}
              signalList={watch.signalList}
            />
          }
        </tbody>
      )
    }
  </Table>

  const tooltips = {
       remove: (<Popover id="remove"><span>Remove the ticker from watchlist</span></Popover>),
       tag: (<Popover id="tag"><span>Group a set of Tickers with a label.  The Tags will appear next to "All" link at the top. Sample tags: Owned, Bluechip, penny_stock</span></Popover>),
       signal_strength: (<Popover id="signal_strength"><span>Bullish - up arrow, green<br/>Bearish - down arrow, red<br/><br/>Strong - 3 arrows<br/>Medium - 2 arrows<br/>Weak - 1 arrow</span></Popover>),
       alert_day: (<Popover id="alert_day"><span>First date the technical indicator/signal fired. (Number of trading days passed since then)</span></Popover>),
       last_price: (<Popover id="last_price"><span>Price based on latest quote from today</span></Popover>),
       chg: (<Popover id="chg"><span>Change in price compared to price from last day</span></Popover>),
       chg_pct: (<Popover id="chg_pct"><span>Percentage gain/loss based on change price</span></Popover>),
       gains: (<Popover id="gains"><span>Change in price since technical signal alerted</span></Popover>),
       off_from_52: (<Popover id="off_from_52"><span>% off from 52 weeks highest price</span></Popover>),
       vol: (<Popover id="vol"><span>Volume based on latest quote from today</span></Popover>),
       current_vol: (<Popover id="last_day_vol"><span>Current trading day real-time volume and % gain compared to 30d avg volume based on projected EOD volume</span></Popover>),
       vol_chg_over_avg: (<Popover id="vol_chg_over_avg"><span>Projected end of day volume compared with 30day average volume</span></Popover>),
       chg_3d: (<Popover id="chg_3d"><span>Change in price in the last 3 days excluding current day</span></Popover>),
       avg_vol_chg_3d: (<Popover id="avg_vol_chg_3d"><span>% Change in avg volume(30d) in the last 3 days excluding current day</span></Popover>),
       chg_watchlist: (<Popover id="chg_watchlist"><span>% Change in price since added to watch list</span></Popover>),
   };

const WatchListTableHeaderUI = ({filteringTagObj, runTime, sortColumn, sortOrder, onSort, embeddableTagUuid}) =>
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
          {' '}<strong>Ticker</strong>
        </a>
      </th>

      <th className='text-right'>
        <strong>Current Price</strong>
        <br/>
        <span className='text-nowrap'>
          {runTime} {' '}
        </span>
      </th>

      <HeaderCellSortUI
        label1='Chg'
        columnCode='price_increase_over_last_day' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      <HeaderCellSortUI
        label1='Chg %'
        columnCode='price_pct_increase_over_last_day' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

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

      <th className='text-right text-nowrap hide'>
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

      <HeaderCellSortUI
        label1='Off 52wks high'
        columnCode='pct_diff_from_52weeks_high' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

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
        <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={tooltips.current_vol}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>

      <HeaderCellSortUI
        label1='Market Cap'
        columnCode='market_cap' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      <HeaderCellSortUI
        label1='PE Ratio'
        columnCode='price_to_earnings' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      <HeaderCellSortUI
        label1='14d RSI'
        columnCode='rsi_14_day' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      <th className='text-left' style={{'width': '1%'}}>Signal{' '}
        <span className='text-nowrap'>Strength{' '}
          <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.signal_strength}>
            <Glyphicon glyph="info-sign" className='text-muted' />
          </OverlayTrigger>
        </span>
      </th>

      <th className='text-left'>Latest Signal</th>

      {
      (filteringTagObj == null || filteringTagObj.owner === 'self') && !embeddableTagUuid &&
      <th className='text-center'>
        Remove
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.remove}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
    }

    {
      (filteringTagObj == null || filteringTagObj.owner === 'self') && !embeddableTagUuid &&
      <th className='text-center'>
        Tag
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.tag}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
      </th>
    }

    </tr>
  </tbody>

/*    <td className='text-left'><Link to={`/ticker/${item.ticker}`}>{item.ticker}</Link></td>
*/

const WatchListTableRowUI = ({item, filteringTagObj, onRowTickerClick, onDeleteWatchlistTickerSubmit, onShowTagsModal,
    embeddableTagUuid}) =>
  <tr>
    <TickerCellUI
      ticker={item.ticker}
      signalList={item.signalList}
      is_recently_added_to_watchlist={item.is_recently_added_to_watchlist === 'new'}
      has_signal_today={item.has_signal_today > 0}
      is_price_alert={item.is_price_alert == 'yes'}
      is_earnings_close={item.is_earnings_close == 'yes'}
      next_earning_date={item.next_earning_date}
      onRowTickerClick={onRowTickerClick}
    />

    <td className='text-right'>
      <strong>
        {item.close !== '0' && item.close_formatted !== ' ' ? item.close_formatted : 'NA'}
      </strong>
    </td>

    <td className='text-right'>
      <span className={item.price_increase_over_last_day  < 0 ? 'text-danger' : 'text-success'}>
        <strong>{item.price_increase_over_last_day}</strong>
      </span>
    </td>

    <td className='text-right'>
      <span className={item.price_pct_increase_over_last_day < 0 ? 'text-danger' : 'text-success'}>
        <strong>{Format.percent(item.price_pct_increase_over_last_day)}</strong>
      </span>
    </td>

    <td className='text-right'>
      <span className={item.price_pct_increase_over_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(item.price_pct_increase_over_3days)}
      </span>
    </td>

    <td className='text-right hide'>
      <span className={item.price_pct_increase_over_14days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(item.price_pct_increase_over_14days)}
      </span>
    </td>
    {/*}
    <td className='text-right'>
        <span className={item.realtime_gain_since_added_to_watchlist < 0 ? 'text-danger' : 'text-success'}>
          {Format.percent(item.realtime_gain_since_added_to_watchlist)}
        </span>
    </td>
    */}
    <td className='text-right'>
      <span>
        {item.pct_diff_from_52weeks_high}%
      </span>
    </td>


    <td className='text-right'>{item.volume !== '0' && item.volume_formatted !== ' ' ? item.volume_formatted : 'NA'}{' '}
      <br/>
      <small className={item.volume_pct_increase_over_avg < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(item.volume_pct_increase_over_avg)}
      </small>
    </td>
{/*
    <td className='text-right'>
      <span className={item.gain_avg_volume_percentage_3days < 0 ? 'text-danger' : 'text-success'}>
        {Format.percent(item.gain_avg_volume_percentage_3days)}
      </span>
    </td>
*/}
    <td className='text-right'>{item.market_cap_formatted}</td>
    <td className='text-right'>{item.price_to_earnings}</td>
    <td className='text-right'>
      <span className={item.rsi_14_day >= 70 ? 'text-danger' : (item.rsi_14_day <= 30 ? 'text-success' : 'text-left')}>
        {item.rsi_14_day}
      </span>
    </td>
    <td className='text-left'>
      {/*
        <span className={item.trend == 'bullish' ? 'text-success text-right' : 'text-danger'}>
          {item.signal_strength} {item.trend} <span className='glyphicon glyphicon-star'></span>
        </span>
      */}
      {
        item.trend === 'bullish' &&
        <span className='text-success'>
          <span className='glyphicon glyphicon-arrow-up'></span>
          {item.signal_strength==='medium' && <span className='glyphicon glyphicon-arrow-up'></span>}
          {item.signal_strength==='strong' && <span>
            <span className='glyphicon glyphicon-arrow-up'></span><span className='glyphicon glyphicon-arrow-up'></span>
          </span>}
        </span>
      }
      {
        item.trend === 'bearish' &&
        <span className='text-danger'>
          <span className='glyphicon glyphicon-arrow-down'></span>{' '}
          {item.signal_strength==='medium' && <span className='glyphicon glyphicon-arrow-down'></span>}
          {item.signal_strength==='strong' && <span>
            <span className='glyphicon glyphicon-arrow-down'></span>{' '}<span className='glyphicon glyphicon-arrow-down'></span>
          </span>}
        </span>
      }
    </td>


    <td className='text-left text-nowrap'>
    {item.latest_signal}
    <br/>
    <small>{item.latest_signal_date}</small>
    {' '}
      <OverlayTrigger
        trigger={['hover', 'focus']}
        placement="top"
        overlay={
          <Popover id={item.watchlist_id}>{item.latest_signal_desc}</Popover>
        }
      >
        <Glyphicon glyph="info-sign" className='text-muted' />
      </OverlayTrigger>

    </td>

    {
    (filteringTagObj == null || filteringTagObj.owner === 'self') && !embeddableTagUuid &&
    <td className='text-center'>
      <a href='#remove' onClick={onDeleteWatchlistTickerSubmit}>
      <Glyphicon glyph="remove" data-ticker={item.ticker} /></a>
    </td>
  }

  {
    (filteringTagObj == null || filteringTagObj.owner === 'self')  && !embeddableTagUuid &&
    <td className='text-center'>
      <a href='#tag' onClick={onShowTagsModal}>
      <Glyphicon glyph="tag" data-ticker={item.ticker} /></a>
    </td>
  }

  </tr>

  const WatchListTableSignalRowUI = ({ anonymous, filteringTagObj, signalList, ticker }) =>
    <tr>
      <td colSpan={(filteringTagObj == null || filteringTagObj.owner.owner === 'self') ? '16' : '15'}>
        <TickerPanel
          anonymous={anonymous}
          collapsed='true'
          ticker={ticker}
        />
      </td>
    </tr>

export default WatchListTableUI;
