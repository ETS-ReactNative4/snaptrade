import React from 'react';
import { Glyphicon, Popover, OverlayTrigger } from 'react-bootstrap';
import SpinnerUI from '../SpinnerUI.js'
import TickerPanel from '../../tickerfolded/TickerPanel.js';
import Format from '../../common/Format.js'
import DataCellUI from './DataCellUI.js'
import TickerCellUI from './TickerCellUI.js'
import HeaderCellSortUI from './HeaderCellSortUI.js'
import ValueChangeCellUI from './ValueChangeCellUI.js'
import TickerPriceQtyPopoverUI from './TickerPriceQtyPopoverUI.js'

// TickerScannerTableUI AlertTableHeaderUI GainTableHeaderUI WatchListTableUI SimilarStocksPanelUI
const MainTickerTableUI = ({context, tickerList, columnList, narrow,
    // todo
    onRowTickerClick, onRefreshClick,
    // sort
    sortColumn, sortOrder, onSort,
    // expand/collapse
    onSignalExpand, onSignalCollapse,
    // watchList
    filteringTagObj, embeddableTagUuid, onDeleteWatchlistTickerSubmit, onShowTagsModal, onShowPriceQtyModal
    }) =>
  <div className="table-responsive">
    <p className='text-right small'>
      {
        onRefreshClick &&
        <span className='glyphicon glyphicon-refresh' style={{fontSize: 20, cursor: 'pointer', color: '#1997c6'}} onClick={onRefreshClick}></span>
      }
      &nbsp; &nbsp; &nbsp; &nbsp;
      Price and volume as of {context.runTime}
    </p>
    <table className="table table-hover">
      <MainTickerTableHeaderUI
        context={context}
        columnList={columnList}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={onSort}
        filteringTagObj={filteringTagObj}
        embeddableTagUuid={embeddableTagUuid}
      />
      {
        !tickerList &&
        <tbody><tr><td colSpan={columnList.size + (columnList.has('is_watchlist') ? 5 : 5)}>
          <SpinnerUI />
          </td></tr></tbody>
      }
      {
        tickerList && tickerList.length == 0 &&
        <tbody><tr><td colSpan={columnList.size + (columnList.has('is_watchlist') ? 5 : 5)}>
          No data
        </td></tr></tbody>
      }

      {
        tickerList && tickerList.length > 0 &&
        tickerList.map((ticker, i) =>
          <tbody key={i}>
            <MainTickerTableRowUI
              context={context}
              item={ticker}
              columnList={columnList}
              onRowTickerClick={onRowTickerClick}
              onSignalExpand={onSignalExpand}
              onSignalCollapse={onSignalCollapse}
              filteringTagObj={filteringTagObj}
              embeddableTagUuid={embeddableTagUuid}
              onDeleteWatchlistTickerSubmit={onDeleteWatchlistTickerSubmit}
              onShowTagsModal={onShowTagsModal}
              onShowPriceQtyModal={onShowPriceQtyModal}
          />
            { ticker.signalList &&
              <TickerDetailsRowUI
                context={context}
                columnList={columnList}
                narrow={narrow}
                filteringTagObj={filteringTagObj}
                ticker={ticker.ticker}
                signalList={ticker.signalList}
              />
            }
          </tbody>
        )
      }
    </table>
  </div>

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

const MainTickerTableHeaderUI = ({context, columnList, sortColumn, sortOrder, onSort,
  filteringTagObj, embeddableTagUuid}) =>
  <tbody>
    <tr>
      <HeaderCellSortUI
        label1='Ticker'
        columnCode='ticker' align='text-left'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      {
        columnList.has('name') &&
        <HeaderCellSortUI label1='Company' align='text-left' />
      }

      {
        columnList.has('sector') &&
        <HeaderCellSortUI label1='Sector' align='text-left' />
      }

      <HeaderCellSortUI label1='Price' align='text-right' />

      <HeaderCellSortUI label1='Change' align='text-right' />

      <HeaderCellSortUI
        label1='Chg%'
        columnCode='price_pct_increase_over_last_day' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />

      {
        columnList.has('3d_change_pct') &&
        <HeaderCellSortUI
          label1='3d Chg%'
          columnCode='price_pct_increase_over_3days' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      {
        columnList.has('14d_change_pct') &&
        <HeaderCellSortUI
        label1='14d Chg%'
        columnCode='price_pct_increase_over_14days' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
      }

      {
        columnList.has('off_52wk_high') &&
        <HeaderCellSortUI
        label1='Off 52wk' label2='High%'
        columnCode='pct_diff_from_52weeks_high' align='text-right'
        onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
      />
      }

      {
        columnList.has('volume') &&
        <HeaderCellSortUI label1='Volume' align='text-right'
          columnCode='volume' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      {
        columnList.has('volume_chg') &&
        <HeaderCellSortUI
          label1='Vol Chg%'
          columnCode='volume_pct_increase_over_avg' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
          tooltip={<Popover id="last_vol">
          <span>Based on projected EOD volume compared to 30d average</span></Popover>}
        />
      }

      {
        columnList.has('market_cap') &&
        <HeaderCellSortUI
          label1='Market Cap' columnCode='market_cap' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      {
        columnList.has('pe_ratio') &&
        <HeaderCellSortUI
          label1='PE Ratio' columnCode='price_to_earnings' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      {
        columnList.has('14d_rsi') &&
        <HeaderCellSortUI
          label1='14d RSI' columnCode='rsi_14_day' align='text-right'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      {
        columnList.has('signal_strength') &&
        <HeaderCellSortUI label1='Signal' label2='Strength' align='text-left'
          tooltip={<Popover id="signal_strength"><span>Bullish - up arrow, green<br/>Bearish - down arrow, red<br/><br/>Strong - 3 arrows<br/>Medium - 2 arrows<br/>Weak - 1 arrow</span></Popover>} />
      }

      {
        columnList.has('signal_name') &&
        <HeaderCellSortUI label1='Technical Signal' align='text-left'
          tooltip={<Popover id="technical_signal"><span>Technical signal that was matched with the price/volume action based on last day price/volume</span></Popover>} />
      }

      {
        columnList.has('latest_signal_date') &&
        <HeaderCellSortUI label1='Signal Date' align='text-right'
          tooltipId='latest_signal_date' tooltip2='Last date the technical signal was fired' />
      }

      {
        columnList.has('first_signal_date') &&
        <HeaderCellSortUI label1='Signal Date' align='text-right'
          tooltipId='first_signal_date' tooltip2='First date the technical signal was fired' />
      }

      {
        columnList.has('signal_gain') &&
        <HeaderCellSortUI label1='Gain%' align='text-right'
          columnCode='gain_percentage_from_signal_date'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
          tooltipId='signal_gain' tooltip2='Price change since the technical signal was fired' />
      }

      {
        columnList.has('trade_status') &&
        <th className='text-right'>Trade<br/>Status {' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.trade_status}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
        </th>
      }

      {
        columnList.has('comments') &&
        <HeaderCellSortUI label1='Comments' align='text-left' />
      }

      {
        columnList.has('target_buy_price') &&
        <HeaderCellSortUI label1='Target Buy' label2='Price' align='text-right' />
      }

      {
        columnList.has('buy_price') &&
        <th className='text-right'>Buy Price</th>
      }

      {
        columnList.has('buy_date') &&
        <th className='text-right'>Buy Date</th>
      }

      {
        columnList.has('sale_price') &&
        <th className='text-right'>Sale Price</th>
      }

      {/* <th className='text-right'>Sale Date</th> */}

      {
        columnList.has('gain_pct') &&
        <th className='text-right'>Gain %{' '}
        <OverlayTrigger trigger={['hover', 'focus']}  placement="top" overlay={tooltips.gain_pct_txn}>
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
        </th>
      }

      {
        columnList.has('like') &&
        <HeaderCellSortUI label1='Community' label2='Sentiment' align='text-right' />
      }

      {
        !columnList.has('is_watchlist') &&
        !context.anonymous &&
        <th className='text-center'>Watch</th>
      }

      {/*
        columnList.has('is_watchlist') &&
        !context.anonymous &&
        <th className='text-center'>$</th>
      */}

      {
        columnList.has('is_watchlist') &&
        !context.anonymous &&
        <th className='text-center'>Remove</th>
      }

      {
        columnList.has('is_watchlist') &&
        !context.anonymous &&
        <HeaderCellSortUI label1='Tag' align='text-center'
          tooltipId='tag' tooltip2='Tag stocks with labels, e.g., owned, bluechip, penny_stock, etc' />
      }
    </tr>
  </tbody>

const MainTickerTableRowUI = ({context, item, columnList, onRowTickerClick,
  onSignalExpand, onSignalCollapse,
  filteringTagObj, embeddableTagUuid, onDeleteWatchlistTickerSubmit, onShowTagsModal, onShowPriceQtyModal}) =>
  <tr data-ticker={item.ticker} onClick={onRowTickerClick}>
    <TickerCellUI
    ticker={item.ticker}
    signalList={item.signalList}
    is_recently_added_to_watchlist={item.is_recently_added_to_watchlist === 'new'}
    has_signal_today={item.has_signal_today > 0}
    is_price_alert={item.is_price_alert == 'yes'}
    is_earnings_close={item.is_earnings_close == 'yes'}
    next_earning_date={item.next_earning_date}
    onRowTickerClick={onRowTickerClick} />

    {
      columnList.has('name') &&
      <DataCellUI value={item.company_name} />
    }

    {
      columnList.has('sector') &&
      <DataCellUI value={item.sector} />
    }

    <ValueChangeCellUI value={item.close_formatted} />

    <ValueChangeCellUI change={item.price_increase_over_last_day} />

    <ValueChangeCellUI changePercent={item.price_pct_increase_over_last_day} />

    {
      columnList.has('3d_change_pct') &&
      <ValueChangeCellUI changePercent={item.price_pct_increase_over_3days} />
    }

    {
      columnList.has('14d_change_pct') &&
      <ValueChangeCellUI changePercent={item.price_pct_increase_over_14days} />
    }

    {
      columnList.has('off_52wk_high') &&
      <td className='text-right'>
        {Format.value(item.pct_diff_from_52weeks_high || 0)}%
        {/*<ValueChangeCellUI changePercent={item.pct_diff_from_52weeks_high} />*/}
      </td>
    }

    {
      columnList.has('volume') &&
      <DataCellUI value={item.volume_formatted} align='text-right' />
    }

    {
      columnList.has('volume_chg') &&
      <ValueChangeCellUI changePercent={item.volume_pct_increase_over_avg} />
    }

    {
      columnList.has('market_cap') &&
      <DataCellUI align='text-right' value={item.market_cap_formatted} />
    }

    {
      columnList.has('pe_ratio') &&
      <DataCellUI value={item.price_to_earnings} align='text-right' />
    }

    {
      columnList.has('14d_rsi') &&
      <DataCellUI value={item.rsi_14_day} align='text-right' />
    }

    {
      columnList.has('signal_strength') &&
      <td className='text-left'>
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
    }

    {
      columnList.has('signal_name') &&
      <td className='text-left' style={{width: '15%'}}>
        <span style={{whiteSpace: 'nowrap'}}>
        {item.signal_name}
        {' '}
        <OverlayTrigger trigger={['hover', 'focus']} placement="top"
          overlay={<Popover id={item.signal_name}>{item.signal_description}</Popover>} >
          <Glyphicon glyph="info-sign" className='text-muted' />
        </OverlayTrigger>
        </span>
      </td>
    }

    {
      columnList.has('latest_signal_date') &&
      <DataCellUI value={item.latest_signal_date} align='text-right' />
    }

    {
      columnList.has('first_signal_date') &&
      <DataCellUI value={item.first_signal_date + ', ' + item.days_passed + ' days'} align='text-right' />
    }

    {
      columnList.has('signal_gain') &&
      <ValueChangeCellUI changePercent={item.gain_percentage_from_signal_date} />
    }

    {
      columnList.has('trade_status') &&
      <td className='text-right'>{item.status}</td>
    }

    {
      columnList.has('comments') &&
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
    }

    {
      columnList.has('target_buy_price') &&
      <td className='text-right'>{item.target_buy_price}</td>
    }

    {
      columnList.has('buy_price') &&
      <td className='text-right'>
      {Format.float(item.buy_price)}
      </td>
    }

    {
      columnList.has('buy_date') &&
      <td className='text-right'>{item.buy_date}</td>
    }

    {
      columnList.has('sale_price') &&
      <td className='text-right'>{item.sale_price}</td>
    }

    {/*<td className='text-right'>{item.sale_date}</td> */}

    {
      columnList.has('gain_pct') &&
      <td className='text-right'>
        <span className={item.gain_percentage_txn < 0 ? 'text-danger' : 'text-success'}>
          <strong>
            {item.gain_percentage_txn}
            </strong>
        </span>
      </td>
    }

    {
      columnList.has('like') &&
      <td className='text-right'>
        <Glyphicon glyph="thumbs-up" className='text-muted' />
        {item.up_count}{' '}
        <Glyphicon glyph="thumbs-down" className='text-muted' />
          {item.down_count}
      </td>
    }

    {/*
      columnList.has('is_watchlist') &&
      (filteringTagObj == null || filteringTagObj.owner === 'self') && !embeddableTagUuid &&
      <td className='text-center'>
        <a href='#priceQty' onClick={onShowPriceQtyModal}>
        <Glyphicon glyph="usd" data-ticker={item.ticker} /></a>
      </td>
    */}

    {
      !columnList.has('is_watchlist') &&
      !context.anonymous &&
      <td className='text-center text-muted'>
        { item.is_in_watchlist &&
          <span className="glyphicon glyphicon-ok"></span>
        }
        { ! item.is_in_watchlist && !context.anonymous &&
          <a href='#watch'  data-ticker={item.ticker} onClick={context.onWatchTicker}>
            <span className="glyphicon glyphicon-plus" data-ticker={item.ticker} onClick={context.onWatchTicker}></span>
          </a>
        }
      </td>
    }

    {
      columnList.has('is_watchlist') &&
      (filteringTagObj == null || filteringTagObj.owner === 'self') && !embeddableTagUuid &&
      <td className='text-center'>
        <a href='#remove' onClick={onDeleteWatchlistTickerSubmit}>
        <Glyphicon glyph="remove" data-ticker={item.ticker} /></a>
      </td>
    }

    {
      columnList.has('is_watchlist') &&
      (filteringTagObj == null || filteringTagObj.owner === 'self')  && !embeddableTagUuid &&
      <td className='text-center'>
        <a href='#tag' onClick={onShowTagsModal}>
        <Glyphicon glyph="tag" data-ticker={item.ticker} /></a>
      </td>
    }

  </tr>

const TickerDetailsRowUI = ({ signalList, context, columnList, narrow, is_watchlist, ticker, filteringTagObj }) =>
  <tr>
    <td colSpan={columnList.size + (is_watchlist ? 5 : 5)}>
      <TickerPanel
        context={context}
        collapsed='true'
        ticker={ticker}
        narrow={narrow}
      />

    </td>
  </tr>

export default MainTickerTableUI;
