import React from 'react';
import { Link } from "react-router-dom";
import { DotLoader } from 'react-spinners';
import Format from '../../common/Format.js'
import PanelUI from './PanelUI.js'
import ValueChangeCellUI from '../table/ValueChangeCellUI.js'
import TickerPopoverUI from '../TickerPopoverUI.js'

const PanelTickerTableUI = ({context, title, noDataMsg, tickerList, columnList, detailLink,
    onRemoveTicker, onWatchTicker, sortColumn, sortOrder, onSort,
    popoverPlacement, wide, anonymousMsg, isWatchlist, onDetail}) =>
  <div>
    {
      !wide &&
      <h4 style={{display: 'inline-block'}}>{title}</h4>
    }
    {
      detailLink &&
      <div className='pull-right' style={{marginTop: 10}}>
      <a href={detailLink}>&raquo; More</a>
      </div>
    }

  <PanelUI title={wide ? title : ''} wide={wide} table={true}>

    <table style={{width: '100%', marginBottom: 0}} className='table table-hover'>
      {
        tickerList && tickerList.length > 0 ?
        <TableHeaderUI
          context={context}
          tickerCount={tickerList.length}
          sortColumn={sortColumn}
          sortOrder={sortOrder}
          onSort={onSort}
          onRemoveTicker={onRemoveTicker}
          onWatchTicker={onWatchTicker}
          wide={wide}
          isWatchlist={isWatchlist}
          columnList={columnList}
        /> : <h3 align="center">There is no alert for user</h3>
      }
      {
        !tickerList && (!anonymousMsg || anonymousMsg && !context.anonymous) &&
        <tbody>
        <tr><td colSpan={wide ? '' : '5'}>
        <center>
          <DotLoader />
          </center>
        </td></tr>
        </tbody>
      }
      {
        !tickerList && anonymousMsg && context.anonymous &&
        <div className="panel-body">
          {anonymousMsg}
        </div>
      }
      {
        tickerList && tickerList.length == 0 &&
        <tbody>
        <tr><td style={{borderTop: 'none'}}>
        <div className="panel-body">
          {noDataMsg}
        </div>
        </td></tr>
        </tbody>
      }
      {
        tickerList && tickerList.length > 0 &&
        tickerList.map((ticker, i) =>
          <tbody key={i}>
            <TableRowUI
              context={context}
              item={ticker}
              onRemoveTicker={onRemoveTicker}
              onWatchTicker={onWatchTicker}
              popoverPlacement={popoverPlacement}
              wide={wide}
              isWatchlist={isWatchlist}
              onDetail={onDetail}
              columnList={columnList}
            />
          </tbody>
        )
      }
    </table>
  </PanelUI>
  </div>

const TableHeaderUI = ({context, tickerCount, sortColumn, sortOrder, onSort, onRemoveTicker, onWatchTicker, wide, isWatchlist, columnList}) =>
  <tbody>
    <tr>
      {
        onSort && tickerCount > 3 &&
        <HeaderCellSortUI
          align='text-left'
          columnCode='ticker'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      { ! (onSort && tickerCount > 3) && <HeaderCellUI /> }

      { onRemoveTicker && <HeaderCellUI /> }

      <HeaderCellUI align='text-right' label='Close' />

      {
        onSort && tickerCount > 3 &&
        <HeaderCellSortUI
          align='text-right'
          columnCode='price_pct_increase_over_last_day'
          label='Chg%'
          onSort={onSort} sortColumn={sortColumn} sortOrder={sortOrder}
        />
      }

      { ! (onSort && tickerCount > 3) && <HeaderCellUI align='text-right' label='Chg%' /> }

      {
        wide && columnList.has('volume_formatted') &&
        <HeaderCellUI align='text-right' label='Vol' />
      }
      {
        wide && columnList.has('volume_pct_increase_over_avg') &&
        <HeaderCellUI align='text-right' label='Vol%' />
      }
      {
        wide && columnList.has('high') &&
        <HeaderCellUI align='text-right' label='High' />
      }

      {
        columnList.has('buy_price') &&
        <HeaderCellUI align='text-right' label='Low Alert' />
      }

      {
        columnList.has('sell_price') &&
        <HeaderCellUI align='text-right' label='High Alert' />
      }

      {
        onWatchTicker && !context.anonymous && !isWatchlist &&
        <th className='text-right text-muted' style={{borderTop: 'none'}}>
          <span className="glyphicon glyphicon-eye-open"></span>
        </th>
      }
    </tr>
  </tbody>

const HeaderCellSortUI = ({columnCode, label, onSort, sortColumn, sortOrder, align}) =>
  <th className={align + ' text-muted'} style={{borderTop: 0, cursor: 'pointer'}} onClick={onSort} data-column={columnCode} data-order={sortOrder}>
    {
      align == 'text-left' &&
      <span className="glyphicon glyphicon-sort" onClick={onSort} data-column={columnCode} data-order={sortOrder}></span>
    }
    {
      sortColumn === columnCode && sortOrder === 'asc' &&
      <span className="glyphicon glyphicon-chevron-down" onClick={onSort} data-column={columnCode} data-order={sortOrder}></span>
    }
    {
      sortColumn === columnCode && sortOrder === 'desc' &&
      <span className="glyphicon glyphicon-chevron-up" onClick={onSort} data-column={columnCode} data-order={sortOrder}></span>
    }
    {
      align == 'text-right' &&
      <span className="glyphicon glyphicon-sort" onClick={onSort} data-column={columnCode} data-order={sortOrder}></span>
    }
  </th>

const HeaderCellUI = ({label, align}) =>
  <th className={align + ' text-muted'} style={{borderTop: 0}}>
    {label}
  </th>

const TableRowUI = ({context, item, onRemoveTicker, onWatchTicker, popoverPlacement, wide, isWatchlist, onDetail, columnList}) =>
  <tr className='show-on-hover-trigger' style={{cursor: 'pointer'}} onClick={onDetail} data-ticker={item.ticker}>
    <td>
      <TickerPopoverUI
        ticker={item.ticker}
        company_name={item.company_name}
        placement={popoverPlacement}
        is_news_today={item.is_news_today}
        latest_news_title={item.latest_news_title}
      />
    </td>
    {
      onRemoveTicker &&
      <td>
        <a href='#remove' onClick={onRemoveTicker} className='show-on-hover-target text-muted'>
        <span className="glyphicon glyphicon-remove" data-ticker={item.ticker}></span>
        </a>
      </td>
    }
    <td className='text-right'>
      {item.close_formatted}
    </td>
    <ValueChangeCellUI changePercent={item.price_pct_increase_over_last_day} />

    {
      wide && columnList.has('volume_formatted') &&
      <td className='text-right'>{item.volume_formatted}</td>
    }

    {
      wide && columnList.has('volume_pct_increase_over_avg') &&
      <ValueChangeCellUI changePercent={item.volume_pct_increase_over_avg} />
    }

    {
      wide && columnList.has('high') &&
      <td className='text-right'>{Format.value(item.high)}</td>
    }

    {
      columnList.has('buy_price') &&
      <td className='text-right'>{Format.value(item.buy_price)}</td>
    }

    {
      columnList.has('sell_price') &&
      <td className='text-right'>{Format.value(item.sell_price)}</td>
    }

    {
      onWatchTicker && !context.anonymous && !isWatchlist &&
      <td className='text-right text-muted'>
        { item.is_in_watchlist &&
          <span className="glyphicon glyphicon-ok"></span>
        }
        { ! item.is_in_watchlist && !context.anonymous &&
          <span>
          <span  data-ticker={item.ticker} onClick={onWatchTicker}>
            <span className="glyphicon glyphicon-plus" data-ticker={item.ticker} onClick={onWatchTicker}></span>
          </span>
          {/*
          <a href='#watch'  data-ticker={item.ticker} onClick={onWatchTicker}>
            <span className="glyphicon glyphicon-plus" data-ticker={item.ticker} onClick={onWatchTicker}></span>
          </a>
          */}
          </span>
        }
      </td>
    }
  </tr>

export default PanelTickerTableUI;
